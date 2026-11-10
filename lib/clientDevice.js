// Browser-side: the phone model from Chrome's client hints (Android only;
// other browsers do not expose it). Sent as X-Device-Model with the
// watch-progress ticks so the admin report can name the device.
let model = null;

export function deviceHeaders() {
  if (model === null && typeof navigator !== "undefined") {
    model = "";
    navigator.userAgentData?.getHighEntropyValues?.(["model"])
      .then((v) => { model = /^[\x20-\x7e]{1,60}$/.test(v?.model || "") ? v.model : ""; })
      .catch(() => {});
  }
  return model ? { "X-Device-Model": model } : {};
}
