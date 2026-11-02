// Domain configuration for the SS Coaching NIOS Complete Package (online admission).
// Ported unchanged from the approved prototype; shared by the API and the pages.
// Everything a non-developer may need to change lives here or in the admin Settings screen.

const PACKAGES = {
  '10': {
    id: '10', label: 'Class 10th', course: 'Secondary', price: 11600,
    tagline: 'Complete package',
  },
  '12': {
    id: '12', label: 'Class 12th', course: 'Senior Secondary', price: 12600,
    tagline: 'The complete NIOS package',
  },
};

const INCLUSIONS = [
  { key: 'admission', title: 'Admission', text: 'NIOS admission and form submission support' },
  { key: 'classes', title: 'Classes', text: 'All recorded and live classes' },
  { key: 'study', title: 'Study', text: 'Study materials and question banks' },
  { key: 'tma', title: 'TMA', text: 'TMA support for every subject' },
  { key: 'doubts', title: 'Doubts', text: 'Doubt clearing sessions' },
  { key: 'exam', title: 'Exam', text: 'Support until your exam' },
];

// Stream / block definitions, taken from SS Coaching's six physical enquiry slips
// (10th & 12th: Stream 1 Block 1, Stream 1 Block 2, Stream 2) and NIOS rules.
const STREAMS = {
  '1-1': {
    stream: '1', block: '1', label: 'Stream 1, Block 1',
    who: 'First-time NIOS admission (fresh learner)',
    window: 'NIOS admission window: 16 March – 15 September',
    exam: 'March – April session',
    timeline: [
      ['TMA submission', 'December'],
      ['Practical file submission', 'February'],
      ['Practical exams', 'Mid March'],
      ['Theory exams', 'March – April'],
      ['Result', 'Last week of May'],
    ],
    tma: true, maxToc: 2,
  },
  '1-2': {
    stream: '1', block: '2', label: 'Stream 1, Block 2',
    who: 'First-time NIOS admission (fresh learner)',
    window: 'NIOS admission window: 16 September – 15 March',
    exam: 'October – November session',
    timeline: [
      ['TMA submission', 'July'],
      ['Practical file submission', 'August'],
      ['Practical exams', 'Mid September'],
      ['Theory exams', 'October'],
      ['Result', 'Last week of December'],
    ],
    tma: true, maxToc: 2,
  },
  '2': {
    stream: '2', block: null, label: 'Stream 2',
    who: 'Failed / compartment in 10th or 12th from a recognised board (appear directly in the exam, up to 4 subjects)',
    window: 'Admission for the October – November exam',
    exam: 'October – November session',
    timeline: [
      ['Practical file submission', 'August'],
      ['Practical exams', 'Mid September'],
      ['Theory exams', 'October – November'],
      ['Result', 'Last week of December'],
    ],
    tma: false, maxToc: 4, maxSubjects: 4,
  },
};

// NIOS subject lists (source: NIOS Regional Centre Prayagraj — Secondary & Sr. Secondary pages).
const SUBJECTS = {
  '10': [
    // group A = languages
    ...[[201, 'Hindi'], [202, 'English'], [203, 'Bengali'], [204, 'Marathi'], [205, 'Telugu'], [206, 'Urdu'],
      [207, 'Gujarati'], [208, 'Kannada'], [209, 'Sanskrit'], [210, 'Punjabi'], [228, 'Assamese'], [231, 'Nepali'],
      [232, 'Malayalam'], [233, 'Odia'], [235, 'Arabic'], [236, 'Persian'], [237, 'Tamil'], [238, 'Sindhi']]
      .map(([code, name]) => ({ code, name, group: 'A', practical: false })),
    ...[[211, 'Mathematics', 1], [212, 'Science and Technology', 1], [213, 'Social Science', 0], [214, 'Economics', 0],
      [215, 'Business Studies', 0], [216, 'Home Science', 1], [222, 'Psychology', 0], [223, 'Indian Culture & Heritage', 0],
      [224, 'Accountancy', 0], [225, 'Painting', 1], [229, 'Data Entry Operations', 1], [242, 'Hindustani Music', 1],
      [243, 'Carnatic Sangeet', 1], [245, 'Veda Adhyayan (Sanskrit medium)', 0], [246, 'Sanskrit Vyakaran (Sanskrit medium)', 0],
      [247, 'Bharatiya Darshan (Sanskrit medium)', 0], [248, 'Sanskrit Sahitya (Sanskrit medium)', 0]]
      .map(([code, name, p]) => ({ code, name, group: 'B', practical: !!p })),
  ],
  '12': [
    ...[[301, 'Hindi'], [302, 'English'], [303, 'Bengali'], [304, 'Tamil'], [305, 'Odia'], [306, 'Urdu'], [307, 'Gujarati'],
      [309, 'Sanskrit'], [310, 'Punjabi'], [341, 'Arabic'], [342, 'Persian'], [343, 'Malayalam']]
      .map(([code, name]) => ({ code, name, group: 'A', practical: false })),
    ...[[311, 'Mathematics', 'B', 0], [321, 'Home Science', 'B', 1], [328, 'Psychology', 'B', 0], [316, 'Geography', 'B', 1],
      [318, 'Economics', 'B', 0], [319, 'Business Studies', 'B', 0], [332, 'Painting', 'B', 1], [336, 'Data Entry Operations', 'B', 1],
      [345, 'Veda Adhyayan (Sanskrit medium)', 'B', 0], [346, 'Sanskrit Vyakaran (Sanskrit medium)', 'B', 0],
      [347, 'Bharatiya Darshan (Sanskrit medium)', 'B', 0], [348, 'Sanskrit Sahitya (Sanskrit medium)', 'B', 0],
      [312, 'Physics', 'C', 1], [315, 'History', 'C', 0], [333, 'Environmental Science', 'C', 1], [339, 'Library & Information Science', 'C', 1],
      [313, 'Chemistry', 'D', 1], [317, 'Political Science', 'D', 0], [335, 'Mass Communication', 'D', 1], [374, 'Military Studies', 'D', 0],
      [314, 'Biology', 'E', 1], [320, 'Accountancy', 'E', 0], [338, 'Introduction to Law', 'E', 0], [375, 'Military History', 'E', 0],
      [330, 'Computer Science', 'F', 1], [331, 'Sociology', 'F', 0], [337, 'Tourism', 'F', 0], [373, 'Physical Education & Yog', 'F', 1]]
      .map(([code, name, group, p]) => ({ code, name, group, practical: !!p })),
  ],
};
const SCIENCE_CODES = [212, 312, 313, 314];

// Documents, per SS Coaching's enquiry slips. `when` decides if the slot is shown.
const DOCUMENTS = [
  { type: 'photo', label: 'Passport-size photograph', hint: 'Recent colour photo, light background (JPG/PNG). SS slips ask for 4 prints with name & date at the centre.', required: () => true, accept: 'image' },
  { type: 'signature', label: "Student's signature", hint: 'Sign on white paper with a black/blue pen and photograph it', required: () => true, accept: 'image' },
  { type: 'aadhaar', label: 'Aadhaar card (front & back)', hint: 'Clear scan or photo; PDF allowed', required: () => true, accept: 'any' },
  { type: 'class8_or_birth', label: 'Result of Class 8th / 9th, or Nagar Nigam birth certificate', hint: 'Any one of these proves eligibility and date of birth for Class 10th', required: (a) => a.class === '10' && a.stream === '1', show: (a) => a.class === '10' && a.stream === '1', accept: 'any' },
  { type: 'class10_marksheet', label: '10th pass marksheet & certificate', hint: 'Both sides; required for Class 12th', required: (a) => a.class === '12', show: (a) => a.class === '12', accept: 'any' },
  { type: 'failed_admit_card', label: 'Admit card of the failed exam', hint: `Admit card of the Class ${'{class}'} exam you appeared in`, required: (a) => a.stream === '2', show: (a) => a.stream === '2' || a.toc_wanted, accept: 'any' },
  { type: 'failed_marksheet', label: 'Failed marksheet (TOC)', hint: 'Scan now; the ORIGINAL is collected later for Transfer of Credit (TOC)', required: (a) => a.stream === '2' || !!a.toc_wanted, show: (a) => a.stream === '2' || a.toc_wanted, accept: 'any' },
  { type: 'category_cert', label: 'Caste / category certificate', hint: 'Only if you selected SC or ST', required: () => false, show: (a) => ['SC', 'ST'].includes(a.category), accept: 'any' },
  { type: 'disability_cert', label: 'Disability certificate', hint: 'From a government hospital, only if applicable', required: () => false, show: (a) => a.disability === 'yes', accept: 'any' },
];

function docSlots(app) {
  const ctx = { class: app.class, stream: app.stream, toc_wanted: !!(app.form && app.form.toc_wanted),
    category: app.form && app.form.category, disability: app.form && app.form.disability };
  return DOCUMENTS.filter(d => !d.show || d.show(ctx)).map(d => ({
    type: d.type, label: d.label, hint: d.hint.replace('{class}', app.class + 'th'), required: d.required(ctx), accept: d.accept,
  }));
}

// Admission status machine. Payment is unlocked ONLY in `verified`.
const STATUSES = [
  { key: 'draft', label: 'Draft', student: 'Complete your form and upload documents' },
  { key: 'submitted', label: 'Under verification', student: 'Our consultant is checking your details and documents' },
  { key: 'changes_requested', label: 'Changes requested', student: 'Please fix the items marked below and resubmit' },
  { key: 'verified', label: 'Verified, payment due', student: 'Documents verified. Your payment link is now active' },
  { key: 'paid', label: 'Paid, form filling', student: 'Payment received. Your consultant is preparing your NIOS form' },
  { key: 'form_in_progress', label: 'NIOS form in progress', student: 'Your consultant is filling your NIOS admission form' },
  { key: 'submitted_to_nios', label: 'Submitted to NIOS', student: 'Form submitted to NIOS. Waiting for your enrollment number' },
  { key: 'enrolled', label: 'Enrolled', student: 'You are enrolled with NIOS. Exam fee will be submitted by SS' },
  { key: 'exam_fee_paid', label: 'Exam fee submitted', student: 'Exam fee submitted. Keep preparing — we are with you till your exam' },
  { key: 'cancelled', label: 'Cancelled', student: 'This application was cancelled' },
];

const TRANSITIONS = {
  draft: ['submitted', 'cancelled'],
  submitted: ['verified', 'changes_requested', 'cancelled'],
  changes_requested: ['submitted', 'cancelled'],
  verified: ['paid', 'changes_requested', 'cancelled'],
  paid: ['form_in_progress'],
  form_in_progress: ['submitted_to_nios', 'paid'],
  submitted_to_nios: ['enrolled', 'form_in_progress'],
  enrolled: ['exam_fee_paid'],
  exam_fee_paid: [],
  cancelled: [],
};

function currentBlock(date = new Date()) {
  // NIOS Stream 1: Block 1 = 16 Mar – 15 Sep, Block 2 = 16 Sep – 15 Mar
  const m = date.getMonth() + 1, d = date.getDate();
  const md = m * 100 + d;
  return (md >= 316 && md <= 915) ? '1' : '2';
}

// What the consultant ticks off while filling the NIOS SDMIS form. "Mark form
// submitted to NIOS" stays locked until every item is done.
const CHECKLIST = [
  { key: 'eligibility', label: 'Eligibility, stream & block re-checked against NIOS rules' },
  { key: 'registered', label: 'Registered on SDMIS with the student’s mobile (OTP taken from student)' },
  { key: 'personal', label: 'Personal details entered exactly as on Aadhaar' },
  { key: 'address_centre', label: 'Address entered and allotted study centre (AI code) selected' },
  { key: 'subjects', label: 'Subjects, medium and TOC details entered' },
  { key: 'uploads', label: 'Photo, signature and documents uploaded on SDMIS' },
  { key: 'preview', label: 'Preview cross-checked field by field with the student file' },
  { key: 'fee', label: 'NIOS admission fee paid (included in package)' },
];

const STATUS_BY_KEY = Object.fromEntries(STATUSES.map(s => [s.key, s]));
const streamInfo = (a) => STREAMS[a.stream === '2' ? '2' : `1-${a.block}`] || null;
const EDITABLE = ['draft', 'changes_requested'];

export { CHECKLIST, STATUS_BY_KEY, streamInfo, EDITABLE, PACKAGES, INCLUSIONS, STREAMS, SUBJECTS, SCIENCE_CODES, DOCUMENTS, docSlots, STATUSES, TRANSITIONS, currentBlock };
