// Returns an HTML page that renders PDF as canvas via PDF.js
// Canvas = no "Save As PDF", no toolbar, watermark embedded on every page
export default function handler(req, res) {
  const { token, courseId, matId, title, subject } = req.query;
  if (!token || !courseId || !matId)
    return res.status(400).send("Missing params");

  const fileApiUrl = `/api/student/file?token=${encodeURIComponent(token)}&courseId=${encodeURIComponent(courseId)}&matId=${encodeURIComponent(matId)}`;
  const displayTitle = (title || "Document").replace(/'/g, "\\'");
  const displaySubject = (subject || "").replace(/'/g, "\\'");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${displayTitle}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#404040;font-family:sans-serif;user-select:none;-webkit-user-select:none;}
    #loader{display:flex;flex-direction:column;align-items:center;justify-content:center;
      min-height:100vh;color:#fff;gap:16px;}
    .spinner{width:40px;height:40px;border:3px solid rgba(255,255,255,.2);
      border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg)}}
    #pages{display:flex;flex-direction:column;align-items:center;padding:20px;gap:20px;}
    canvas{display:block;max-width:100%;box-shadow:0 4px 20px rgba(0,0,0,.5);border-radius:2px;}
    #error{color:#fca5a5;text-align:center;padding:40px;font-size:14px;}
  </style>
</head>
<body>
  <div id="loader"><div class="spinner"></div><div>Loading document…</div></div>
  <div id="pages" style="display:none"></div>
  <div id="error" style="display:none"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script>
    // Block all saving shortcuts and right-click
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && ['s','S','p','P','c','C','a','A'].includes(e.key))
        e.preventDefault();
      if (e.key === 'F12') e.preventDefault();
    });

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const FILE_URL  = '${fileApiUrl}';
    const WM_TEXT   = 'SS Coaching — Protected';
    const WM_TEXT2  = '© ss coaching.in';

    function drawWatermark(ctx, w, h) {
      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = '#6c47d4';
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-30 * Math.PI / 180);
      ctx.textAlign = 'center';
      for (let y = -h; y < h; y += 120) {
        ctx.fillText(WM_TEXT, 0, y);
        ctx.fillText(WM_TEXT2, 0, y + 36);
      }
      ctx.restore();
    }

    // Rendering every page as a full-resolution canvas up front — the old
    // code — was the actual crash cause: a 50+ page PDF meant 50+ canvases
    // around ~1500x2100px each (scale 1.8) ALL held in memory at once. A
    // mobile WebView's renderer process gets a much smaller memory budget
    // than a real desktop browser tab, so this blew past it and the OS
    // OOM-killed the WebView — which is exactly the "opened the PDF,
    // scrolled a bit, app just closed" symptom (and the occasional
    // freeze-before-crash is the same memory pressure making the WebView's
    // UI thread briefly unresponsive, so even the back button stops
    // reacting). Fix: create a lightweight, correctly-sized placeholder for
    // every page up front (so scroll position/scrollbar stay accurate),
    // then only actually rasterize a page's canvas once it scrolls near
    // the viewport, and tear it back down to a placeholder once it scrolls
    // away — so only a handful of pages are ever resident in memory,
    // regardless of how long the document is.
    async function render() {
      try {
        const loadTask = pdfjsLib.getDocument(FILE_URL);
        const pdf = await loadTask.promise;
        const pagesEl = document.getElementById('pages');
        document.getElementById('loader').style.display = 'none';
        pagesEl.style.display = 'flex';

        const pageStates = [];
        for (let n = 1; n <= pdf.numPages; n++) {
          const page = await pdf.getPage(n);
          const vp   = page.getViewport({ scale: 1.8 });
          const wrap = document.createElement('div');
          wrap.style.width    = vp.width + 'px';
          wrap.style.height   = vp.height + 'px';
          wrap.style.maxWidth = '100%';
          wrap.dataset.page   = String(n);
          pagesEl.appendChild(wrap);
          pageStates.push({ page, vp, wrap, canvas: null, rendering: false });
        }

        async function renderPage(state) {
          if (state.canvas || state.rendering) return;
          state.rendering = true;
          const canvas = document.createElement('canvas');
          canvas.width  = state.vp.width;
          canvas.height = state.vp.height;
          canvas.style.display = 'block';
          canvas.style.maxWidth = '100%';
          canvas.style.boxShadow = '0 4px 20px rgba(0,0,0,.5)';
          canvas.style.borderRadius = '2px';
          try {
            const ctx = canvas.getContext('2d');
            await state.page.render({ canvasContext: ctx, viewport: state.vp }).promise;
            drawWatermark(ctx, state.vp.width, state.vp.height);
            state.wrap.innerHTML = '';
            state.wrap.appendChild(canvas);
            state.canvas = canvas;
          } catch (e) { /* left as placeholder — will retry next time it scrolls into view */ }
          state.rendering = false;
        }

        function unrenderPage(state) {
          if (!state.canvas) return;
          state.wrap.innerHTML = '';
          state.canvas = null;
        }

        // rootMargin keeps roughly a viewport-height of pages pre-rendered
        // above/below what's on screen (smooth scroll, no visible pop-in),
        // while still bounding total resident pages to a small constant.
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const state = pageStates[Number(entry.target.dataset.page) - 1];
            if (entry.isIntersecting) renderPage(state);
            else unrenderPage(state);
          });
        }, { rootMargin: '800px 0px', threshold: 0 });

        pageStates.forEach(s => io.observe(s.wrap));
      } catch (err) {
        document.getElementById('loader').style.display = 'none';
        const el = document.getElementById('error');
        el.style.display = 'block';
        el.textContent = 'Could not load document. Please close and try again. (' + err.message + ')';
      }
    }
    render();
  </script>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, no-cache");
  // Allow embedding in the mobile app WebView and Expo web iframe from any origin
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  res.status(200).send(html);
}
