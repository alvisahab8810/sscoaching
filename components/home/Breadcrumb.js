import { useRouter } from "next/router";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

// ── Complete label map built from sscoaching.in sitemap ──
// Every slug from every URL is mapped here — no manual work needed per page
const LABEL_MAP = {

  // ── Top-level pages ──
  "about-us":                    "About Us",
  "blogs":                       "Blogs",
  "contact-us":                  "Contact Us",
  "disclaimer":                  "Disclaimer",
  "faq":                         "FAQ",
  "gallery":                     "Gallery",
  "onlineforms":                 "Online Forms",
  "privacy-policy":              "Privacy Policy",
  "terms-&-conditions":          "Terms & Conditions",
  "nios-hall-ticket":            "NIOS Hall Ticket",
  "nios-datesheet":              "NIOS Date Sheet",
  "nios-coaching-hazratganj-lucknow":  "Hazratganj Branch",
  "nios-coaching-indiranagar-lucknow": "Indira Nagar Branch",
  "nios-coaching-alambagh-lucknow":    "Alambagh Branch",

  // ── NIOS Admission ──
  "nios-admission":                    "NIOS Admission",
  "admission-in-nios-stream-1":        "Stream 1 Admission",
  "admission-in-nios-stream-2":        "Stream 2 Admission",
  "admission-in-nios-stream-3&4":      "Stream 3 & 4 Admission",

  // ── NIOS Results ──
  "nios-results":                "NIOS Results",
  "nios-12th-result":            "NIOS 12th Result",
  "nios-10th-result":            "NIOS 10th Result",
  "nios-class-10th-result":      "Nios Class 10th Result",
  "nios-class-12th-result":      "Nios Class 12th Result",

  // ── Question Papers ──
  "question-papers":             "Question Papers",
  "paper-secondary-10th":        "10th Secondary Papers",
  "paper-secondary-12th":        "12th Sr. Secondary Papers",
  "tma-secondary-10th":          "TMA Secondary (10th)",
  "tma-sr-secondary-12th":       "TMA Sr. Secondary (12th)",

  // ── Subject section ──
  "subject":                     "Subjects",
  "nios-10th-secondary":         "NIOS 10th Secondary",
  "nios-12th-senior-secondary":  "NIOS 12th Sr. Secondary",

  // ── Syllabus 10th ──
  "syllabus-class-10th":                          "Syllabus Class 10th",
  "syllabus-hindi-nios-201":                      "Hindi Syllabus (201)",
  "syllabus-english-nios-202":                    "English Syllabus (202)",
  "syllabus-mathematics-nios-211":                "Mathematics Syllabus (211)",
  "syllabus-science-&-technology-212":            "Science & Technology Syllabus (212)",
  "syllabus-social-science-nios-213":             "Social Science Syllabus (213)",
  "syllabus-economics-nios-214":                  "Economics Syllabus (214)",
  "syllabus-business-studioes-nios-215":          "Business Studies Syllabus (215)",
  "syllabus-home-science-216":                    "Home Science Syllabus (216)",
  "syllabus-psychology-nios-222":                 "Psychology Syllabus (222)",
  "syllabus-Indian-heritage-culture-nios-223":    "Indian Heritage & Culture Syllabus (223)",
  "syllabus-painting-nios-225":                   "Painting Syllabus (225)",
  "syllabus-data-entry-operations-229":           "Data Entry Operations Syllabus (229)",
  "syllabus-sanskrit-nios-209":                   "Sanskrit Syllabus (209)",

  // ── Syllabus 12th ──
  "syllabus-class-12th":                                    "Syllabus Class 12th",
  "syllabus-hindi-senior-secondary-nios-301":               "Hindi Syllabus (301)",
  "syllabus-english-senior-secondary-nios-302":             "English Syllabus (302)",
  "syllabus-sanskrit-senior-secondary-nios-309":            "Sanskrit Syllabus (309)",
  "syllabus-mathematics-senior-secondary-nios-311":         "Mathematics Syllabus (311)",
  "syllabus-physics-senior-secondary-nios-312":             "Physics Syllabus (312)",
  "syllabus-chemistry-senior-secondary-nios-313":           "Chemistry Syllabus (313)",
  "syllabus-biology-senior-secondary-nios-314":             "Biology Syllabus (314)",
  "syllabus-history-senior-secondary-nios-315":             "History Syllabus (315)",
  "syllabus-geography-senior-secondary-316":                "Geography Syllabus (316)",
  "syllabus-political-science-senior-secondary-nios-317":   "Political Science Syllabus (317)",
  "syllabus-economics-senior-secondary-nios-318":           "Economics Syllabus (318)",
  "syllabus-commerce-senior-secondary-nios-319":            "Commerce Syllabus (319)",
  "syllabus-accountancy-senior-secondary-nios-320":         "Accountancy Syllabus (320)",
  "syllabus-home-science-senior-secondary-nios-321":        "Home Science Syllabus (321)",
  "syllabus-psychology-senior-secondary-nios-328":          "Psychology Syllabus (328)",
  "syllabus-computer-science-senior-secondary-nios-330":    "Computer Science Syllabus (330)",
  "syllabus-sociology-senior-secondary-nios-331":           "Sociology Syllabus (331)",
  "syllabus-painting-senior-secondary-nios-332":            "Painting Syllabus (332)",
  "syllabus-environmental-science-senior-secondary-nios-333": "Environmental Science Syllabus (333)",
  "syllabus-mass-communication-senior-secondary-nios":      "Mass Communication Syllabus",
  "syllabus-data-entry-operations-senior-secondary-nios-336": "Data Entry Operations Syllabus (336)",
  "syllabus-urdu-senior-secondary-nios-306":                "Urdu Syllabus (306)",

  // ── Summary 10th ──
  "summary-10th":                        "Summary 10th",
  "summary-english":                     "English Summary",
  "summary-hindi":                       "Hindi Summary",
  "summary-mathematics":                 "Mathematics Summary",
  "summary-science-technology":          "Science & Technology Summary",
  "summary-social-science":              "Social Science Summary",
  "summary-economics":                   "Economics Summary",
  "summary-business-studies":            "Business Studies Summary",
  "summary-home-science":                "Home Science Summary",
  "summary-psychology":                  "Psychology Summary",
  "summary-indian-culture-and-heritage": "Indian Culture & Heritage Summary",
  "summary-painting":                    "Painting Summary",
  "summary-data-entry":                  "Data Entry Summary",
  "summary-sanskrit":                    "Sanskrit Summary",

  // ── Summary 12th ──
  "summary-12th":                  "Summary 12th",
  "summary-accountancy":           "Accountancy Summary",
  "summary-biology":               "Biology Summary",
  "summary-chemistry":             "Chemistry Summary",
  "summary-commerce":              "Commerce Summary",
  "summary-computer-science":      "Computer Science Summary",
  "summary-environmental-science": "Environmental Science Summary",
  "summary-geography":             "Geography Summary",
  "summary-history":               "History Summary",
  "summary-mass-communication":    "Mass Communication Summary",
  "summary-physics":               "Physics Summary",
  "summary-political-science":     "Political Science Summary",
  "summary-sociology":             "Sociology Summary",
  "summary-urdu":                  "Urdu Summary",

  // ── Curriculum 10th ──
  "curriculum-10th":                        "Curriculum 10th",
  "curriculum-english-202":                 "English Curriculum (202)",
  "curriculum-hindi":                       "Hindi Curriculum",
  "curriculum-mathematics":                 "Mathematics Curriculum",
  "curriculum-science":                     "Science Curriculum",
  "curriculum-social-science":              "Social Science Curriculum",
  "curriculum-economics":                   "Economics Curriculum",
  "curriculum-business-studies":            "Business Studies Curriculum",
  "curriculum-home-science":                "Home Science Curriculum",
  "curriculum-psychology":                  "Psychology Curriculum",
  "curriculum-indian-culture-and-heritage": "Indian Culture & Heritage Curriculum",
  "curriculum-painting":                    "Painting Curriculum",
  "curriculum-data-entry":                  "Data Entry Curriculum",
  "curriculum-sanskrit":                    "Sanskrit Curriculum",

  // ── Curriculum 12th ──
  "curriculum-12th":               "Curriculum 12th",
  "curriculum-english":            "English Curriculum",
  "curriculum-accountancy":        "Accountancy Curriculum",
  "curriculum-biology":            "Biology Curriculum",
  "curriculum-chemistry":          "Chemistry Curriculum",
  "curriculum-commerce":           "Commerce Curriculum",
  "curriculum-computer-science":   "Computer Science Curriculum",
  "curriculum-environmental-science": "Environmental Science Curriculum",
  "curriculum-geography":          "Geography Curriculum",
  "curriculum-history":            "History Curriculum",
  "curriculum-mass-communication": "Mass Communication Curriculum",
  "curriculum-mathematics":        "Mathematics Curriculum",
  "curriculum-physics":            "Physics Curriculum",
  "curriculum-political-science":  "Political Science Curriculum",
  "curriculum-psychology":         "Psychology Curriculum",
  "curriculum-sanskrit":           "Sanskrit Curriculum",
  "curriculum-sociology":          "Sociology Curriculum",
  "curriculum-urdu":               "Urdu Curriculum",

  // ── Secondary Course Material (10th) ──
  "secondary-course-material": "Secondary Course Material",
  "hindi201":                  "Hindi (201)",
  "english202":                "English (202)",
  "socialscience213":          "Social Science (213)",
  "ich223":                    "Indian Culture & Heritage (223)",
  "painting225":               "Painting (225)",
  "deo229":                    "Data Entry Operations (229)",
  "homescience216":            "Home Science (216)",
  "mathematics211":            "Mathematics (211)",
  "science212":                "Science (212)",
  "economics214":              "Economics (214)",
  "business-studies215":       "Business Studies (215)",
  "psychology222":             "Psychology (222)",
  "accountancy224":            "Accountancy (224)",

  // ── Sr. Secondary Course Material (12th) ──
  "sr-secondary-course-material": "Sr. Secondary Course Material",
  "hindi301":                     "Hindi (301)",
  "english302":                   "English (302)",
  "sanskrit309":                  "Sanskrit (309)",
  "mathematics311":               "Mathematics (311)",
  "physics312":                   "Physics (312)",
  "chemistry313":                 "Chemistry (313)",
  "biology314":                   "Biology (314)",
  "history315":                   "History (315)",
  "geography316":                 "Geography (316)",
  "political-science317":         "Political Science (317)",
  "economics318":                 "Economics (318)",
  "business-studies319":          "Business Studies (319)",
  "accountancy320":               "Accountancy (320)",
  "homescience321":               "Home Science (321)",
  "psychology328":                "Psychology (328)",
  "computer-science330":          "Computer Science (330)",
  "sociology331":                 "Sociology (331)",
  "painting332":                  "Painting (332)",
  "environmental-science333":     "Environmental Science (333)",
  "mass-communication335":        "Mass Communication (335)",
  "deo336":                       "Data Entry Operations (336)",
  "tourism337":                   "Tourism (337)",
  "law338":                       "Law (338)",
  "physical-education373":        "Physical Education (373)",
};

// Slugs that need a virtual parent crumb injected before them
const PARENT_MAP = {
  "nios-class-10th-result": { label: "NIOS Results", href: "/nios-results" },
  "nios-class-12th-result": { label: "NIOS Results", href: "/nios-results" },
};

// Fallback: auto-format unknown slugs — strips numbers at end
// e.g. "some-slug-123" → "Some Slug"
function formatLabel(slug) {
  return slug
    .replace(/-?\d+$/, "")       // remove trailing numbers
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getLabel(slug) {
  return LABEL_MAP[slug] || formatLabel(slug);
}

export default function Breadcrumb({ customPaths }) {
  const router = useRouter();

  const segments = router.asPath
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean);

  // Don't show on homepage
  if (segments.length === 0) return null;

  const crumbs = customPaths || (() => {
    const result = [{ label: "Home", href: "/" }];
    segments.forEach((seg, i) => {
      const parent = PARENT_MAP[seg];
      if (parent && !result.find(c => c.href === parent.href)) {
        result.push(parent);
      }
      result.push({
        label: getLabel(decodeURIComponent(seg)),
        href: "/" + segments.slice(0, i + 1).join("/"),
      });
    });
    return result;
  })();

  // JSON-LD for Google Search breadcrumb display
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `https://sscoaching.in${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="bc-wrap" aria-label="Breadcrumb">
        <ol className="bc-list">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="bc-item">
                {i === 0 && <FiHome className="bc-home-icon" />}
                {isLast ? (
                  <span className="bc-current" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="bc-link">
                    {crumb.label}
                  </Link>
                )}
                {!isLast && <FiChevronRight className="bc-sep" />}
              </li>
            );
          })}
        </ol>
      </nav>

      <style jsx>{`
        .bc-wrap {
          padding: 10px 0;
        }
        .bc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 2px;
        }
        .bc-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
        }
        .bc-home-icon {
          font-size: 0.85rem;
          color: #8491a8;
          flex-shrink: 0;
          margin-right: 2px;
        }
        .bc-link {
          color: #6b7a99;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.18s;
          white-space: nowrap;
        }
        .bc-link:hover {
          color: #4441e5;
        }
        .bc-sep {
          color: #c0c8da;
          font-size: 0.78rem;
          flex-shrink: 0;
        }
        .bc-current {
          color: #4441e5;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
        }
        @media (max-width: 640px) {
          .bc-item { font-size: 0.75rem; }
          .bc-current { max-width: 160px; }
        }
      `}</style>
    </>
  );
}