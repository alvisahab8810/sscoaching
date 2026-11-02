/**
 * The signed-in admin's session, fetched once per browser session.
 *
 * The sidebar and the topbar are remounted on every dashboard navigation.
 * Without this cache each of them re-requested /api/admin/me and rendered
 * empty until it came back, which made the whole shell blink on every page
 * change. The answer is the same for every page, so it is fetched once and
 * handed back synchronously after that.
 */

let cached = null;
let inflight = null;

export function getCachedAdminSession() {
  return cached;
}

export function fetchAdminSession() {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    inflight = fetch("/api/admin/me")
      .then((r) => r.json())
      .then((data) => {
        if (data?.role) cached = data;
        inflight = null;
        return cached;
      })
      .catch(() => {
        inflight = null;
        return null;
      });
  }
  return inflight;
}

// Called after logging out, so a different admin never sees the previous
// session on the first paint.
export function clearAdminSession() {
  cached = null;
  inflight = null;
}
