/**
 * Deep-merges the content stored in the DB over the page's default content.
 *
 * Pages like /nios-results keep their JSX and styling in code and pull only
 * the editable text/lists/tables from PageContent.content. If an admin (or a
 * bad save) ever drops a key, the default value is used instead, so the page
 * can never render a blank or broken section.
 *
 * Arrays are replaced, not merged -- a list the admin shortened must stay
 * short, otherwise deleted rows would reappear from the defaults.
 */
export function mergeContent(defaults, override) {
  if (override === undefined || override === null) return defaults;

  if (Array.isArray(defaults) || Array.isArray(override)) return override;

  if (
    typeof defaults === "object" &&
    typeof override === "object" &&
    defaults !== null
  ) {
    const out = { ...defaults };
    for (const key of Object.keys(override)) {
      out[key] = mergeContent(defaults[key], override[key]);
    }
    return out;
  }

  // Primitive: an empty string is a deliberate "clear this field", so only
  // undefined/null fall back to the default (handled above).
  return override;
}

export default mergeContent;
