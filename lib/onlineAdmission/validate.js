// Validation of the unified admission form (one form for every class / stream / block).
// Ported unchanged from the approved prototype; shared by the API and the pages.
import { SUBJECTS, STREAMS, docSlots } from "./config";

// Verhoeff checksum used by Aadhaar numbers — catches most typing mistakes.
const D = [[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]];
const P = [[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]];
function aadhaarOk(n) {
  n = String(n || '').replace(/\s/g, '');
  if (!/^[2-9]\d{11}$/.test(n)) return false;
  let c = 0; const a = n.split('').reverse().map(Number);
  for (let i = 0; i < a.length; i++) c = D[c][P[i % 8][a[i]]];
  return c === 0;
}

function ageOn(dob, on) {
  const b = new Date(dob + 'T00:00:00'); if (isNaN(b)) return null;
  let age = on.getFullYear() - b.getFullYear();
  if (on.getMonth() < b.getMonth() || (on.getMonth() === b.getMonth() && on.getDate() < b.getDate())) age--;
  return age;
}

function checkSubjects(app) {
  const errors = [], warnings = [];
  const list = SUBJECTS[app.class];
  const chosen = (app.subjects || []).map(Number).filter(c => list.some(s => s.code === c));
  const sel = chosen.map(c => list.find(s => s.code === c));
  const langs = sel.filter(s => s.group === 'A').length;
  if (app.stream === '2') {
    if (sel.length < 1) errors.push('Select the subject(s) you want to appear in');
    if (sel.length > 4) errors.push('Stream 2 allows up to 4 subjects');
  } else {
    if (sel.length < 5) errors.push('Select at least 5 subjects (needed for the pass certificate)');
    if (sel.length > 7) errors.push('You can take at most 7 subjects (5 + 2 additional)');
    if (langs < 1) errors.push('Select at least one language (Group A)');
    if (langs > 2) errors.push('At most two languages (Group A) are allowed');
  }
  if (app.class === '12') {
    for (const g of ['C', 'D', 'E', 'F']) {
      const inG = sel.filter(s => s.group === g);
      if (inG.length > 1) warnings.push(`${inG.map(s => s.name).join(' & ')} are in the same group (${g}) — check the NIOS date sheet for clashes`);
    }
  }
  if (sel.some(s => /Sanskrit medium/.test(s.name)) && (app.form.medium || '') !== 'Sanskrit') warnings.push('Veda/Sanskrit subjects are offered only in Sanskrit medium');
  return { errors, warnings, practicals: sel.filter(s => s.practical).map(s => s.name) };
}

function validateForSubmit(app, docs) {
  const f = app.form || {}; const e = {};
  const need = (k, msg) => { if (!String(f[k] ?? '').trim()) e[k] = msg || 'Required'; };
  need('full_name', 'Enter name exactly as on Aadhaar');
  need('father_name'); need('mother_name'); need('dob'); need('gender'); need('category'); need('medium');
  need('alt_mobile', 'A second active mobile number is required');
  if (f.alt_mobile && !/^[6-9]\d{9}$/.test(f.alt_mobile)) e.alt_mobile = 'Enter a valid 10-digit mobile number';
  if (f.alt_mobile && f.alt_mobile === f.mobile) e.alt_mobile = 'Alternate number must be different from the main number';
  if (!aadhaarOk(f.aadhaar)) e.aadhaar = 'Enter a valid 12-digit Aadhaar number';
  need('email', 'Enter your email. We send admission updates and your receipt here');
  if (f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = 'Check the email address';
  const a = f.address || {};
  if (!/^[1-9]\d{5}$/.test(a.pincode || '')) e['address.pincode'] = 'Enter your 6-digit pincode';
  if (!String(a.line1 || '').trim()) e['address.line1'] = 'House / street address is required';
  if (!String(a.district || '').trim()) e['address.district'] = 'Required';
  if (!String(a.state || '').trim()) e['address.state'] = 'Required';
  need('last_school', 'Name of the last school attended');
  if (f.dob) {
    const age = ageOn(f.dob, new Date());
    const min = app.class === '10' ? 14 : 15;
    if (age == null) e.dob = 'Invalid date';
    else if (age < min) e.dob = `Minimum age for Class ${app.class}th admission is ${min} years`;
    else if (age > 80) e.dob = 'Check the year of birth';
  }
  if (app.class === '12') { need('board_10', '10th board is required'); need('year_10', 'Year of passing 10th'); need('roll_10', '10th roll number'); }
  if (app.class === '10' && app.stream === '1') need('highest_class', 'Select the last class you passed');
  const st = STREAMS[app.stream === '2' ? '2' : `1-${app.block}`];
  if (!st) e.stream = 'Select stream and block';
  if (app.stream === '2' || f.toc_wanted) {
    need('failed_board', 'Board of the exam you failed'); need('failed_year', 'Year of that exam'); need('failed_roll', 'Roll number of that exam');
    const toc = (f.toc_subjects || []).filter(s => s && s.name);
    if (f.toc_wanted && st && toc.length > st.maxToc) e.toc_subjects = `Up to ${st.maxToc} passed subjects can be transferred (TOC)`;
  }
  if (!f.declaration) e.declaration = 'Please accept the declaration';
  const subj = checkSubjects(app);
  if (subj.errors.length) e.subjects = subj.errors.join('. ');
  const missing = docSlots(app).filter(s => s.required && !docs.some(d => d.type === s.type && d.current && d.status !== 'rejected'));
  if (missing.length) e.documents = 'Upload: ' + missing.map(m => m.label).join(', ');
  const rejected = docs.filter(d => d.current && d.status === 'rejected');
  if (rejected.length) e.documents = (e.documents ? e.documents + '. ' : '') + 'Re-upload rejected: ' + rejected.map(d => (docSlots(app).find(x => x.type === d.type) || { label: d.type }).label).join(', ');
  return { errors: e, warnings: subj.warnings };
}

export { aadhaarOk, ageOn, checkSubjects, validateForSubmit };
