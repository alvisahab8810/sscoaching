import React, { useState, useEffect, useCallback } from 'react';

const tabImages = {
  hazratganj: [
    '/assets/images/gallery/hazratganj/gallery1.webp',
    '/assets/images/gallery/hazratganj/gallery2.webp',
    '/assets/images/gallery/hazratganj/gallery3.webp',
    '/assets/images/gallery/hazratganj/gallery4.webp',
    '/assets/images/gallery/hazratganj/gallery5.webp',
    '/assets/images/gallery/hazratganj/gallery6.webp',
    '/assets/images/gallery/hazratganj/gallery7.webp',
    '/assets/images/gallery/hazratganj/gallery8.webp',
    '/assets/images/gallery/hazratganj/gallery9.webp',
    '/assets/images/gallery/hazratganj/gallery10.webp',
    '/assets/images/gallery/hazratganj/gallery11.webp',
    '/assets/images/gallery/hazratganj/gallery12.webp',
    '/assets/images/gallery/hazratganj/gallery13.webp',
    '/assets/images/gallery/hazratganj/gallery14.webp',
    '/assets/images/gallery/hazratganj/gallery15.webp',
    '/assets/images/gallery/hazratganj/gallery16.webp',
    '/assets/images/gallery/hazratganj/gallery17.webp',
    '/assets/images/gallery/hazratganj/gallery18.webp',
    '/assets/images/gallery/hazratganj/gallery19.webp',
    '/assets/images/gallery/hazratganj/gallery20.webp',
    '/assets/images/gallery/hazratganj/gallery21.webp',
    '/assets/images/gallery/hazratganj/gallery22.webp',
    // '/assets/images/gallery/hazratganj/gallery23.webp',
      '/assets/images/gallery/hazratganj/gallery47.webp', 
      '/assets/images/gallery/hazratganj/gallery48.webp', 

    '/assets/images/gallery/hazratganj/gallery24.webp',
    '/assets/images/gallery/hazratganj/gallery25.webp',
    '/assets/images/gallery/hazratganj/gallery26.webp',
    '/assets/images/gallery/hazratganj/gallery27.webp',
    '/assets/images/gallery/hazratganj/gallery28.webp',
    '/assets/images/gallery/hazratganj/gallery29.webp',
    '/assets/images/gallery/hazratganj/gallery30.webp',
    '/assets/images/gallery/hazratganj/gallery31.webp',
    '/assets/images/gallery/hazratganj/gallery32.webp',
    '/assets/images/gallery/hazratganj/gallery33.webp',
    '/assets/images/gallery/hazratganj/gallery34.webp',
    // '/assets/images/gallery/hazratganj/gallery35.webp',
    '/assets/images/gallery/hazratganj/gallery36.webp',
    // '/assets/images/gallery/hazratganj/gallery37.webp',
    '/assets/images/gallery/hazratganj/gallery38.webp',
    '/assets/images/gallery/hazratganj/gallery39.webp',
    '/assets/images/gallery/hazratganj/gallery40.webp', 
    '/assets/images/gallery/hazratganj/gallery41.webp', 
    '/assets/images/gallery/hazratganj/gallery42.webp', 
    '/assets/images/gallery/hazratganj/gallery43.webp', 
      '/assets/images/gallery/hazratganj/gallery44.webp',
      '/assets/images/gallery/hazratganj/gallery45.webp', 
      '/assets/images/gallery/hazratganj/gallery46.webp', 







    




  ],

  
  alambagh: [
    '/assets/images/gallery/alambagh/gallery1.webp',
    '/assets/images/gallery/alambagh/gallery2.webp',
    '/assets/images/gallery/alambagh/gallery3.webp',
    '/assets/images/gallery/alambagh/gallery4.webp',
    '/assets/images/gallery/alambagh/gallery5.webp',
    '/assets/images/gallery/alambagh/gallery6.webp',
    '/assets/images/gallery/alambagh/gallery7.webp',
    '/assets/images/gallery/alambagh/gallery8.webp',
    '/assets/images/gallery/alambagh/gallery9.webp',
    '/assets/images/gallery/alambagh/gallery10.webp',
    '/assets/images/gallery/alambagh/gallery11.webp',
    '/assets/images/gallery/alambagh/gallery12.webp',
    // '/assets/images/gallery/alambagh/gallery13.webp',


    
  ],
  indiranagar: [
    '/assets/images/gallery/indiranagar/gallery1.webp',
    '/assets/images/gallery/indiranagar/gallery2.webp',
    '/assets/images/gallery/indiranagar/gallery3.webp',
    '/assets/images/gallery/indiranagar/gallery4.webp',
    '/assets/images/gallery/indiranagar/gallery5.webp',
    '/assets/images/gallery/indiranagar/gallery6.webp',
    '/assets/images/gallery/indiranagar/gallery7.webp',
    '/assets/images/gallery/indiranagar/gallery8.webp',
    '/assets/images/gallery/indiranagar/gallery9.webp',
    '/assets/images/gallery/indiranagar/gallery10.webp',
    '/assets/images/gallery/indiranagar/gallery11.webp',
    '/assets/images/gallery/indiranagar/gallery12.webp',
    '/assets/images/gallery/indiranagar/gallery13.webp',
    '/assets/images/gallery/indiranagar/gallery14.webp',
    '/assets/images/gallery/indiranagar/gallery15.webp',
    '/assets/images/gallery/indiranagar/gallery16.webp',
    '/assets/images/gallery/indiranagar/gallery17.webp',
    '/assets/images/gallery/indiranagar/gallery18.webp',
    '/assets/images/gallery/indiranagar/gallery19.webp',
    '/assets/images/gallery/indiranagar/gallery20.webp',
    '/assets/images/gallery/indiranagar/gallery21.webp',
    '/assets/images/gallery/indiranagar/gallery22.webp',
    '/assets/images/gallery/indiranagar/gallery23.webp',
    '/assets/images/gallery/indiranagar/gallery24.webp',


   
  ],
  events: [
    '/assets/images/gallery/events/gallery1.webp',
    // '/assets/images/gallery/events/gallery2.webp',
    // '/assets/images/gallery/events/gallery3.webp',
    '/assets/images/gallery/events/gallery4.webp',
    // '/assets/images/gallery/events/gallery5.webp',
    // '/assets/images/gallery/events/gallery6.webp',
    '/assets/images/gallery/events/gallery7.webp',
    '/assets/images/gallery/events/gallery8.webp',
    '/assets/images/gallery/events/gallery9.webp',
    '/assets/images/gallery/events/gallery10.webp',
    // '/assets/images/gallery/events/gallery11.webp',
    '/assets/images/gallery/events/gallery12.webp',
    '/assets/images/gallery/events/gallery13.webp',
    '/assets/images/gallery/events/gallery14.webp',
    // '/assets/images/gallery/events/gallery15.webp',
    // '/assets/images/gallery/events/gallery16.webp',
    // '/assets/images/gallery/events/gallery17.webp',
    '/assets/images/gallery/events/gallery18.webp',
    '/assets/images/gallery/events/gallery19.webp',
    '/assets/images/gallery/events/gallery20.webp',
    '/assets/images/gallery/events/gallery21.webp',
    '/assets/images/gallery/events/gallery22.webp',
    '/assets/images/gallery/events/gallery23.webp',
    '/assets/images/gallery/events/gallery24.webp',
    '/assets/images/gallery/events/gallery25.webp',
    '/assets/images/gallery/events/gallery26.webp',
    '/assets/images/gallery/events/gallery27.webp',
    '/assets/images/gallery/events/gallery28.webp',
    '/assets/images/gallery/events/gallery29.webp',
    '/assets/images/gallery/events/gallery30.webp',
    '/assets/images/gallery/events/gallery31.webp',
    '/assets/images/gallery/events/gallery32.webp',
    '/assets/images/gallery/events/gallery33.webp',
    '/assets/images/gallery/events/gallery34.webp',
    '/assets/images/gallery/events/gallery35.webp',
    '/assets/images/gallery/events/gallery36.webp',
    '/assets/images/gallery/events/gallery37.webp',
    '/assets/images/gallery/events/gallery38.webp',
    '/assets/images/gallery/events/gallery39.webp',
    '/assets/images/gallery/events/gallery40.webp',
    '/assets/images/gallery/events/gallery41.webp',
    '/assets/images/gallery/events/gallery42.webp',
    '/assets/images/gallery/events/gallery43.webp',
    '/assets/images/gallery/events/gallery44.webp',
    '/assets/images/gallery/events/gallery45.webp',
    '/assets/images/gallery/events/gallery46.webp',
    '/assets/images/gallery/events/gallery47.webp',
    '/assets/images/gallery/events/gallery48.webp',
    '/assets/images/gallery/events/gallery49.webp',
    '/assets/images/gallery/events/gallery50.webp',
    '/assets/images/gallery/events/gallery51.webp',
    '/assets/images/gallery/events/gallery52.webp',
    '/assets/images/gallery/events/gallery53.webp',
    '/assets/images/gallery/events/gallery54.webp',
    '/assets/images/gallery/events/gallery55.webp',
    '/assets/images/gallery/events/gallery56.webp',
    '/assets/images/gallery/events/gallery57.webp',
    '/assets/images/gallery/events/gallery58.webp',
    '/assets/images/gallery/events/gallery59.webp',
    '/assets/images/gallery/events/gallery60.webp',
    '/assets/images/gallery/events/gallery61.webp',
    '/assets/images/gallery/events/gallery62.webp',
    '/assets/images/gallery/events/gallery63.webp',
    '/assets/images/gallery/events/gallery64.webp',
    '/assets/images/gallery/events/gallery65.webp',
    '/assets/images/gallery/events/gallery66.webp',
    '/assets/images/gallery/events/gallery67.webp',
    '/assets/images/gallery/events/gallery68.webp',
    '/assets/images/gallery/events/gallery69.webp',
    '/assets/images/gallery/events/gallery70.webp',
    '/assets/images/gallery/events/gallery71.webp',
    '/assets/images/gallery/events/gallery72.webp',
    '/assets/images/gallery/events/gallery73.webp',
    '/assets/images/gallery/events/gallery74.webp',
    '/assets/images/gallery/events/gallery75.webp',
    '/assets/images/gallery/events/gallery76.webp',
    // '/assets/images/gallery/events/gallery77.webp',
    '/assets/images/gallery/events/gallery78.webp',
    '/assets/images/gallery/events/gallery79.webp',
    '/assets/images/gallery/events/gallery80.webp',
    '/assets/images/gallery/events/gallery81.webp',
    '/assets/images/gallery/events/gallery82.webp',
    '/assets/images/gallery/events/gallery83.webp',
    '/assets/images/gallery/events/gallery84.webp',
    '/assets/images/gallery/events/gallery85.webp',
    '/assets/images/gallery/events/gallery86.webp',
    // '/assets/images/gallery/events/gallery87.webp',
    // '/assets/images/gallery/events/gallery88.webp',
    // '/assets/images/gallery/events/gallery89.webp',
    '/assets/images/gallery/events/gallery90.webp',
    // '/assets/images/gallery/events/gallery91.webp',
    '/assets/images/gallery/events/gallery92.webp',
    // '/assets/images/gallery/events/gallery93.webp',
    '/assets/images/gallery/events/gallery94.webp',
    // '/assets/images/gallery/events/gallery95.webp',
    '/assets/images/gallery/events/gallery96.webp',
    '/assets/images/gallery/events/gallery97.webp',
    '/assets/images/gallery/events/gallery98.webp',
    '/assets/images/gallery/events/gallery99.webp',
    '/assets/images/gallery/events/gallery100.webp',
    '/assets/images/gallery/events/gallery101.webp',
    '/assets/images/gallery/events/gallery102.webp',
    '/assets/images/gallery/events/gallery103.webp',
    '/assets/images/gallery/events/gallery104.webp',
    '/assets/images/gallery/events/gallery105.webp',
    '/assets/images/gallery/events/gallery106.webp',
    '/assets/images/gallery/events/gallery107.webp',
    '/assets/images/gallery/events/gallery108.webp',
    '/assets/images/gallery/events/gallery109.webp',
    '/assets/images/gallery/events/gallery110.webp',
    '/assets/images/gallery/events/gallery111.webp',
    '/assets/images/gallery/events/gallery112.webp',
    '/assets/images/gallery/events/gallery113.webp',
    '/assets/images/gallery/events/gallery114.webp',
    '/assets/images/gallery/events/gallery115.webp',
    '/assets/images/gallery/events/gallery116.webp',
    '/assets/images/gallery/events/gallery117.webp',
    '/assets/images/gallery/events/gallery118.webp',
    '/assets/images/gallery/events/gallery119.webp',
    '/assets/images/gallery/events/gallery120.webp',
    '/assets/images/gallery/events/gallery121.webp',
    '/assets/images/gallery/events/gallery122.webp',
    '/assets/images/gallery/events/gallery123.webp',
    '/assets/images/gallery/events/gallery124.webp',
    '/assets/images/gallery/events/gallery125.webp',
    '/assets/images/gallery/events/gallery126.webp',
    '/assets/images/gallery/events/gallery127.webp',
    '/assets/images/gallery/events/gallery128.webp',
    '/assets/images/gallery/events/gallery129.webp',
    '/assets/images/gallery/events/gallery130.webp',
    '/assets/images/gallery/events/gallery131.webp',
    '/assets/images/gallery/events/gallery132.webp',
    '/assets/images/gallery/events/gallery133.webp',
    '/assets/images/gallery/events/gallery134.webp',
    '/assets/images/gallery/events/gallery135.webp',
    '/assets/images/gallery/events/gallery136.webp',
    '/assets/images/gallery/events/gallery137.webp',
    '/assets/images/gallery/events/gallery138.webp',
    '/assets/images/gallery/events/gallery139.webp',
    '/assets/images/gallery/events/gallery140.webp',
    '/assets/images/gallery/events/gallery141.webp',
    '/assets/images/gallery/events/gallery142.webp',
    '/assets/images/gallery/events/gallery143.webp',
    '/assets/images/gallery/events/gallery144.webp',
    '/assets/images/gallery/events/gallery145.webp',
    '/assets/images/gallery/events/gallery146.webp',
    // '/assets/images/gallery/events/gallery147.webp',
    // '/assets/images/gallery/events/gallery148.webp',
    // '/assets/images/gallery/events/gallery149.webp',
    // '/assets/images/gallery/events/gallery150.webp',
    // '/assets/images/gallery/events/gallery151.webp',
    // '/assets/images/gallery/events/gallery152.webp',
    // '/assets/images/gallery/events/gallery153.webp',
    // '/assets/images/gallery/events/gallery154.webp',
    // '/assets/images/gallery/events/gallery155.webp',
    // '/assets/images/gallery/events/gallery156.webp',
    // '/assets/images/gallery/events/gallery157.webp',
    // '/assets/images/gallery/events/gallery158.webp',
    // '/assets/images/gallery/events/gallery159.webp',
    // '/assets/images/gallery/events/gallery160.webp',
    '/assets/images/gallery/events/gallery161.webp',
    // '/assets/images/gallery/events/gallery162.webp',
    '/assets/images/gallery/events/gallery163.webp',
    // '/assets/images/gallery/events/gallery164.webp', 
    '/assets/images/gallery/events/gallery165.webp',
    '/assets/images/gallery/events/gallery166.webp',
    '/assets/images/gallery/events/gallery167.webp',
    '/assets/images/gallery/events/gallery168.webp',
    '/assets/images/gallery/events/gallery169.webp',
    '/assets/images/gallery/events/gallery170.webp',
    '/assets/images/gallery/events/gallery171.webp',
    '/assets/images/gallery/events/gallery172.webp',
    '/assets/images/gallery/events/gallery173.webp',
    '/assets/images/gallery/events/gallery174.webp',
    '/assets/images/gallery/events/gallery175.webp',
    // '/assets/images/gallery/events/gallery176.webp',
    // '/assets/images/gallery/events/gallery177.webp',
    '/assets/images/gallery/events/gallery178.webp',
    // '/assets/images/gallery/events/gallery179.webp',
    '/assets/images/gallery/events/gallery180.webp',
    '/assets/images/gallery/events/gallery181.webp',
    // '/assets/images/gallery/events/gallery182.webp',
    '/assets/images/gallery/events/gallery183.webp',
    '/assets/images/gallery/events/gallery184.webp',
    '/assets/images/gallery/events/gallery185.webp',
    '/assets/images/gallery/events/gallery186.webp',
    '/assets/images/gallery/events/gallery187.webp',
    '/assets/images/gallery/events/gallery188.webp',
    '/assets/images/gallery/events/gallery189.webp',
    '/assets/images/gallery/events/gallery190.webp',
    '/assets/images/gallery/events/gallery191.webp',
    '/assets/images/gallery/events/gallery192.webp',
    '/assets/images/gallery/events/gallery193.webp',
    '/assets/images/gallery/events/gallery194.webp',
    '/assets/images/gallery/events/gallery195.webp',
    '/assets/images/gallery/events/gallery196.webp',
    '/assets/images/gallery/events/gallery197.webp',
    '/assets/images/gallery/events/gallery198.webp',
    '/assets/images/gallery/events/gallery199.webp',
    '/assets/images/gallery/events/gallery200.webp',
    '/assets/images/gallery/events/gallery201.webp',
    '/assets/images/gallery/events/gallery202.webp',
    '/assets/images/gallery/events/gallery203.webp',
    '/assets/images/gallery/events/gallery204.webp',
    '/assets/images/gallery/events/gallery205.webp',
  ],
};

const indiranagaMeta = [
  { title: "nios-coaching-classroom-session-in-lucknow",           alt: "Students attending interactive NIOS coaching class with teacher explaining concepts in classroom." },
  { title: "expert-faculty-teaching-nios-students",                alt: "Teacher guiding NIOS students during classroom session at coaching institute." },
  { title: "nios-students-attending-classroom-lecture",            alt: "Group of students learning in NIOS coaching classroom with notebooks and study material." },
  { title: "smart-board-teaching-for-nios-coaching",              alt: "Faculty teaching mathematics on digital smart board in NIOS coaching class." },
  { title: "nios-coaching-office-entrance",                        alt: "Glass door entrance with NIOS branding at coaching institute office." },
  { title: "personalized-guidance-for-nios-students",             alt: "Teacher helping students individually during NIOS coaching session." },
  { title: "student-counselling-session-at-nios-coaching",        alt: "Students discussing academic plans with mentor in coaching institute office." },
  { title: "director-cabin-at-nios-coaching-institute",           alt: "Coaching institute director sitting in modern office cabin at SS Coaching." },
  { title: "founder-office-at-ss-coaching-lucknow",               alt: "Coaching institute founder seated in professional office setup with awards and decor." },
  { title: "nios-admission-assistance-desk",                       alt: "Staff member assisting student with NIOS admission and counselling process." },
  { title: "student-verification-and-counselling-process",        alt: "Counsellor interacting with student for NIOS course guidance and admission support." },
  { title: "ss-coaching-reception-and-counselling-area",          alt: "Reception and counselling area of SS Coaching with NIOS admission banner display." },
  { title: "student-counselling-session-at-ss-coaching",          alt: "Students and parents sitting in counselling lounge at SS Coaching for NIOS admission guidance." },
  { title: "one-on-one-academic-counselling-for-nios-students",   alt: "Counsellor discussing admission and course details with student and parent at coaching institute." },
  { title: "nios-admission-office-at-ss-coaching",                alt: "Modern counselling office setup with staff assisting students for NIOS admissions and queries." },
  { title: "experienced-counsellors-at-ss-coaching-lucknow",      alt: "Two female counsellors sitting at office desk for NIOS student support and guidance." },
  { title: "student-registration-and-documentation-support",      alt: "Staff helping students complete NIOS admission paperwork and documentation process." },
  { title: "parent-and-student-counselling-meeting",              alt: "Counselling session with students and parents discussing NIOS courses and future planning." },
  { title: "personalized-career-guidance-for-nios-students",      alt: "Mentors providing educational counselling and admission assistance to students in office cabin." },
  { title: "academic-guidance-session-at-nios-coaching",          alt: "Student interacting with counsellor during NIOS admission and academic consultation session." },
];

const eventsMeta = [
  { title: "nios-orientation-programme-event",               alt: "Speaker standing beside NIOS orientation programme banner for school principals and counsellors." },
  { title: "conference-hall-setup-for-nios-seminar",         alt: "Elegant conference hall prepared for NIOS orientation and educational seminar event." },
  { title: "banquet-arrangement-for-educational-event",      alt: "Dining and buffet setup arranged for NIOS orientation programme guests and attendees." },
  { title: "guests-at-nios-orientation-programme",           alt: "Group of guests posing together during NIOS educational orientation event." },
  { title: "welcome-bouquet-arrangement-for-event-guests",   alt: "Decorative flower bouquets placed on table for guest welcome at NIOS seminar." },
  { title: "event-stage-decoration-for-nios-seminar",        alt: "Floral decoration and event backdrop setup for NIOS orientation programme stage." },
  { title: "chief-guest-at-nios-educational-event",          alt: "Guest speaker standing on stage during NIOS orientation and counselling programme." },
  { title: "organizers-attending-nios-orientation-programme",alt: "Event organizers seated together during NIOS educational seminar and orientation event." },
  { title: "seminar-speaker-addressing-audience",            alt: "Speaker delivering presentation at NIOS orientation programme for school representatives." },
  { title: "gift-bags-prepared-for-event-participants",      alt: "Red welcome gift bags arranged for guests attending NIOS orientation programme." },
  { title: "discussion-session-at-educational-seminar",      alt: "Organizers discussing arrangements and educational topics during NIOS orientation event." },
  { title: "networking-at-nios-orientation-event",           alt: "Guests interacting and networking during NIOS educational orientation programme." },
  { title: "traditional-welcome-at-nios-orientation-event",  alt: "Event volunteers welcoming guest with tilak and flower petals at NIOS orientation programme." },
  { title: "organizers-and-guests-at-educational-seminar",   alt: "Group photo of organizers and guests during NIOS orientation and counselling event." },
  { title: "nios-ss-coaching-welcome-kit-bag",               alt: "Customized NIOS SS Coaching welcome bag arranged for seminar participants and guests." },
  { title: "orientation-programme-banner-for-nios-event",    alt: "Guest standing beside official NIOS orientation programme banner for school counsellors and principals." },
  { title: "educational-seminar-welcome-display",            alt: "Event guest posing near NIOS orientation seminar banner at educational programme venue." },
  { title: "guest-registration-desk-at-nios-event",          alt: "Attendees completing registration process at NIOS orientation programme reception desk." },
  { title: "welcome-gift-bags-for-event-attendees",          alt: "Multiple NIOS SS Coaching gift bags arranged for seminar guests and participants." },
  { title: "registration-and-entry-process-at-seminar",      alt: "Participants signing registration forms during NIOS orientation and counselling programme." },
];

const tabImageMeta = {
  indiranagar: indiranagaMeta,
  events: eventsMeta,
};

const TABS = [
  { key: 'hazratganj', label: 'Hazratganj' },
  { key: 'alambagh', label: 'Alambagh' },
  { key: 'indiranagar', label: 'Indiranagar' },
  { key: 'events', label: 'Events' },
];

const tabCTA = {
  hazratganj: {
    address: 'S.S. Coaching, IIIrd Floor, Shree Chamber, Naza Computer Market, Near Basant Cinema, Hazratganj, Lucknow. ',
     phones: [{ label: '9839065533', href: 'tel:9839065533' },  { label: '06387563947', href: 'tel:06387563947' }],
  },
  alambagh: {
    address: 'U.R. Plaza, Near Phoenix Mall, Beside Acumen Hotel (LDA), Alambagh, Lucknow. ',
     phones: [{ label: '09935035316', href: 'tel:09935035316' },  { label: '09236062837', href: 'tel:09236062837' }],
  },
  indiranagar: {
    address: '3rd Floor, Upstair Rama Sarees, In Bhootnath Market, Indira Nagar, Lucknow. ',
     phones: [{ label: '09792111121', href: 'tel:09792111121' },  { label: '09956493857', href: 'tel:09956493857' }],
  },
  events: null,
};

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState('hazratganj');
  const [lightbox, setLightbox] = useState(null); // { images: [], index: number }

  const images = tabImages[activeTab];

  const openLightbox = useCallback((imgs, index) => {
    setLightbox({ images: imgs, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback((e) => {
    e.stopPropagation();
    setLightbox((lb) => lb && ({
      ...lb,
      index: (lb.index - 1 + lb.images.length) % lb.images.length,
    }));
  }, []);

  const showNext = useCallback((e) => {
    e.stopPropagation();
    setLightbox((lb) => lb && ({
      ...lb,
      index: (lb.index + 1) % lb.images.length,
    }));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightbox((lb) => lb && ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }));
      if (e.key === 'ArrowRight') setLightbox((lb) => lb && ({ ...lb, index: (lb.index + 1) % lb.images.length }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setLightbox(null);
  };

  return (
    <>
      <div className="pg-tabs-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`pg-tab-btn${activeTab === tab.key ? ' pg-tab-active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pg-grid">
        {images.map((src, i) => {
          const meta = tabImageMeta[activeTab]?.[i];
          return (
          <div
            key={src}
            className="pg-grid-item"
            onClick={() => openLightbox(images, i)}
          >
            <img src={src} alt={meta?.alt || `Gallery image ${i + 1}`} title={meta?.title || undefined} />
            <div className="pg-overlay">
              <svg className="pg-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
          );
        })}
      </div>

      {tabCTA[activeTab] && (
        <div className="cta-button-gallery cta-button1">
          <span>{tabCTA[activeTab].address}</span>
          <span className="pg-cta-phones">
            Mob No-{' '}
            {tabCTA[activeTab].phones.map((p, i) => (
              <span key={p.href}>
                <a href={p.href}>{p.label}</a>
                {i < tabCTA[activeTab].phones.length - 1 && ', '}
              </span>
            ))}
          </span>
        </div>
      )}

      {lightbox && (
        <div className="pg-lb-overlay" onClick={closeLightbox}>
          <button className="pg-lb-close" onClick={closeLightbox} aria-label="Close">&#x2715;</button>
          <button className="pg-lb-arrow pg-lb-prev" onClick={showPrev} aria-label="Previous">&#8249;</button>
          <img
            className="pg-lb-img"
            src={lightbox.images[lightbox.index]}
            alt={tabImageMeta[activeTab]?.[lightbox.index]?.alt || "Gallery preview"}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="pg-lb-arrow pg-lb-next" onClick={showNext} aria-label="Next">&#8250;</button>
          <div className="pg-lb-counter">{lightbox.index + 1} / {lightbox.images.length}</div>
        </div>
      )}

      <style jsx global>{`
        /* ── Tabs ── */
        .pg-tabs-wrap {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }
        .pg-tab-btn {
          padding: 10px 30px;
          border-radius: 50px;
          border: 2px solid #4441e5;
          background: transparent;
          color: #293347;
          font-size: 15px;
          font-family: 'DM Sans', Arial, sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          letter-spacing: 0.3px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pg-tab-btn:hover {
          background: #4441e5;
          color: #fff;
          transform: translateY(-1px);
        }
        .pg-tab-btn.pg-tab-active {
          background: #4441e5;
          color: #fff;
          border-color: #4441e5;
          box-shadow: 0 4px 16px rgba(68,65,229,0.35);
        }

        /* ── Grid ── */
        .pg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .pg-grid-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 4/3;
          cursor: zoom-in;
          background: #e8ecf2;
          box-shadow: 0 2px 12px rgba(41,51,71,0.08);
          transition: box-shadow 0.25s;
        }
        .pg-grid-item:hover {
          box-shadow: 0 6px 28px rgba(68,65,229,0.22);
        }
        .pg-grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.38s ease;
        }
        .pg-grid-item:hover img {
          transform: scale(1.08);
        }
        .pg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(68, 65, 229, 0.22);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s ease;
          border-radius: 12px;
        }
        .pg-grid-item:hover .pg-overlay {
          opacity: 1;
        }
        .pg-zoom-icon {
          width: 48px;
          height: 48px;
          color: #fff;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }

        /* ── Lightbox ── */
        .pg-lb-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: pg-lb-fade 0.2s ease;
        }
        @keyframes pg-lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .pg-lb-img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.6);
          animation: pg-lb-zoom 0.22s ease;
          cursor: default;
        }
        @keyframes pg-lb-zoom {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .pg-lb-close {
          position: fixed;
          top: 16px;
          right: 20px;
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          font-size: 24px;
          line-height: 1;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10000;
        }
        .pg-lb-close:hover { background: #4441e5; }
        .pg-lb-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          font-size: 48px;
          line-height: 1;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10000;
          user-select: none;
        }
        .pg-lb-arrow:hover { background: #4441e5; }
        .pg-lb-prev { left: 12px; }
        .pg-lb-next { right: 12px; }
        .pg-lb-counter {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          font-family: 'DM Sans', Arial, sans-serif;
          letter-spacing: 1px;
          background: rgba(0,0,0,0.4);
          padding: 4px 14px;
          border-radius: 20px;
        }

        /* ── CTA phones ── */
        .pg-cta-phones a {
          color: inherit;
          text-decoration: underline;
          font-weight: 700;
          white-space: nowrap;
        }
        .pg-cta-phones a:hover {
          color: #4441e5;
        }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .pg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .pg-tabs-wrap {
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding: 4px 0 8px;
            margin-bottom: 24px;
            gap: 8px;
          }
          .pg-tabs-wrap::-webkit-scrollbar { display: none; }
          .pg-tab-btn { padding: 8px 20px; font-size: 13px; }
          .pg-lb-arrow { width: 40px; height: 40px; font-size: 36px; }
          .pg-lb-prev { left: 4px; }
          .pg-lb-next { right: 4px; }
          .pg-lb-img { max-width: 96vw; max-height: 80vh; }
        }
      `}</style>
    </>
  );
}
