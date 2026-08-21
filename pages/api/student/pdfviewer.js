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
    .pwrap{background:#4a4a4a;border-radius:2px;display:flex;align-items:center;justify-content:center;max-width:100%;}
    .pspin{width:28px;height:28px;border:3px solid rgba(255,255,255,.2);
      border-top-color:#a5b4fc;border-radius:50%;animation:spin .8s linear infinite;}
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

    // Rendering every page as a full-resolution canvas up front used to be
    // the crash cause: a 50+ page PDF meant 50+ canvases around ~1500x2100px
    // each (scale 1.8) ALL held in memory at once. A mobile WebView's
    // renderer process gets a much smaller memory budget than a real
    // desktop browser tab, so this blew past it and the OS OOM-killed the
    // WebView — the "opened the PDF, scrolled a bit, app just closed"
    // symptom. Fix: a lightweight, correctly-sized placeholder for every
    // page up front (so scroll position/scrollbar stay accurate), each
    // page's canvas rasterized once it scrolls near the viewport — and,
    // unlike the very first version of this fix, a rendered page is now
    // KEPT once rendered (no blank pop-in on re-scroll) unless the resident
    // page count grows past MAX_RESIDENT below, in which case the oldest
    // off-screen page is recycled first. Short/medium documents never hit
    // that cap, so in practice they render once and stay fully visible.
    async function render() {
      try {
        const loadTask = pdfjsLib.getDocument(FILE_URL);
        const pdf = await loadTask.promise;
        const pagesEl = document.getElementById('pages');

        // Only fetch page 1's real metadata up front — awaiting getPage()
        // for every single page before showing anything (the old code) is
        // what made big documents feel slow: a 40-page PDF meant 40
        // sequential round-trips before the very first pixel appeared.
        // Every other page's viewport is assumed equal to page 1's (true
        // for virtually every course PDF, which use one page size
        // throughout) so all placeholders can be laid out instantly; each
        // page's real object is only fetched right when it's about to
        // render, and the placeholder is corrected on the rare document
        // where a page's actual size differs.
        const firstPage = await pdf.getPage(1);
        const baseVp    = firstPage.getViewport({ scale: 1.8 });

        document.getElementById('loader').style.display = 'none';
        pagesEl.style.display = 'flex';

        const pageStates = [];
        for (let n = 1; n <= pdf.numPages; n++) {
          const wrap = document.createElement('div');
          wrap.className       = 'pwrap';
          wrap.style.width     = baseVp.width + 'px';
          wrap.style.height    = baseVp.height + 'px';
          wrap.dataset.page    = String(n);
          wrap.innerHTML       = '<div class="pspin"></div>'; // shown until this page's canvas is ready — no more empty gray gaps
          pagesEl.appendChild(wrap);
          pageStates.push({
            num: n,
            page: n === 1 ? firstPage : null,
            vp: n === 1 ? baseVp : null,
            wrap, canvas: null, rendering: false,
          });
        }

        async function renderPage(state) {
          if (state.canvas || state.rendering) return;
          state.rendering = true;
          try {
            if (!state.page) {
              state.page = await pdf.getPage(state.num);
              state.vp   = state.page.getViewport({ scale: 1.8 });
              // Correct the placeholder size if this page's real dimensions
              // differ from the page-1 assumption used to lay it out.
              if (state.vp.width !== baseVp.width || state.vp.height !== baseVp.height) {
                state.wrap.style.width  = state.vp.width + 'px';
                state.wrap.style.height = state.vp.height + 'px';
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width  = state.vp.width;
            canvas.height = state.vp.height;
            canvas.style.display = 'block';
            canvas.style.maxWidth = '100%';
            canvas.style.boxShadow = '0 4px 20px rgba(0,0,0,.5)';
            canvas.style.borderRadius = '2px';
            const ctx = canvas.getContext('2d');
            await state.page.render({ canvasContext: ctx, viewport: state.vp }).promise;
            drawWatermark(ctx, state.vp.width, state.vp.height);
            state.wrap.innerHTML = '';
            state.wrap.appendChild(canvas);
            state.canvas = canvas;
            resident++;
            evictIfNeeded();
          } catch (e) { /* left as placeholder — will retry next time it scrolls into view */ }
          state.rendering = false;
        }

        let resident = 0; // how many pages currently have a rendered canvas
        function unrenderPage(state) {
          if (!state.canvas) return;
          state.wrap.innerHTML = '<div class="pspin"></div>';
          state.canvas = null;
          resident--;
        }

        // Unrendering a page the moment it scrolls off-screen (the old
        // behaviour) is what caused the visible blank pop-in the student
        // reported: normal scroll speed easily outran the render, and a
        // page you'd already seen would blank back out and have to
        // re-render every time you passed it again. Instead, a page that
        // scrolls off-screen is only marked *eligible* for eviction — it
        // keeps its canvas. Eviction only actually runs once MAX_RESIDENT
        // pages are rendered at once, oldest off-screen page first. Short
        // and medium documents (assignments, TMAs, sample papers — almost
        // everything students open) never reach that cap, so once a page
        // has rendered it stays rendered permanently: zero blank space.
        // Only genuinely long documents (50+ page books) start recycling
        // old pages, which is the original OOM-crash protection, preserved.
        const MAX_RESIDENT = 24;
        const offscreenQueue = [];
        function evictIfNeeded() {
          while (resident > MAX_RESIDENT) {
            const idx = offscreenQueue.findIndex(s => s.canvas && !s.visible);
            if (idx === -1) break; // nothing safe to evict right now
            unrenderPage(offscreenQueue.splice(idx, 1)[0]);
          }
        }

        // rootMargin pre-renders roughly two viewport-heights of pages
        // above/below what's on screen, so pages are ready well before
        // they're scrolled into view.
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const state = pageStates[Number(entry.target.dataset.page) - 1];
            state.visible = entry.isIntersecting;
            if (entry.isIntersecting) {
              renderPage(state);
            } else if (state.canvas && !offscreenQueue.includes(state)) {
              offscreenQueue.push(state);
            }
          });
        }, { rootMargin: '1200px 0px', threshold: 0 });

        pageStates.forEach(s => io.observe(s.wrap));
        // Kick off page 1 immediately instead of waiting for the observer's
        // first async callback round-trip — the very first thing the
        // student sees should start rasterizing with zero delay.
        if (pageStates[0]) renderPage(pageStates[0]);
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
