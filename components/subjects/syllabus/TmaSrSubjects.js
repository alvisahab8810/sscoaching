import React, { useState } from "react";

export default function TmaSrSubjects() {
  const [search, setSearch] = useState("");

  // SUBJECT DATA WITH PDF PATHS
  const subjects = [
    { code: "301", name: "Hindi", year: "2023-24", preview: "/papers/tma-secondary-12th/301-hindi.pdf", download: "/papers/tma-secondary-12th/301-hindi.pdf" },
    { code: "302", name: "English", year: "2023-24", preview: "/papers/tma-secondary-12th/302-english.pdf", download: "/papers/tma-secondary-12th/302-english.pdf" },
    { code: "311", name: "Maths", year: "2023-24", preview: "/papers/tma-secondary-12th/311-maths.pdf", download: "/papers/tma-secondary-12th/311-maths.pdf" },
    { code: "312", name: "Physics", year: "2023-24", preview: "/papers/tma-secondary-12th/312-physics.pdf", download: "/papers/tma-secondary-12th/312-physics.pdf" },
    { code: "313", name: "Chemistry", year: "2023-24", preview: "/papers/tma-secondary-12th/313-chemistry.pdf", download: "/papers/tma-secondary-12th/313-chemistry.pdf" },
    { code: "314", name: "Biology", year: "2023-24", preview: "/papers/tma-secondary-12th/314-biology.pdf", download: "/papers/tma-secondary-12th/314-biology.pdf" },
    { code: "315", name: "History", year: "2023-24", preview: "/papers/tma-secondary-12th/315-history.pdf", download: "/papers/tma-secondary-12th/315-history.pdf" },
    { code: "316", name: "Geography", year: "2023-24", preview: "/papers/tma-secondary-12th/316-geography.pdf", download: "/papers/tma-secondary-12th/316-geography.pdf" },
    { code: "317", name: "Political Science", year: "2023-24", preview: "/papers/tma-secondary-12th/317-political-science.pdf", download: "/papers/tma-secondary-12th/317-political-science.pdf" },
    { code: "318", name: "Economics", year: "2023-24", preview: "/papers/tma-secondary-12th/318-economics.pdf", download: "/papers/tma-secondary-12th/318-economics.pdf" },
    { code: "319", name: "Business Studies", year: "2023-24", preview: "/papers/tma-secondary-12th/319-business-studies.pdf", download: "/papers/tma-secondary-12th/319-business-studies.pdf" },
    { code: "320", name: "Accountancy", year: "2023-24", preview: "/papers/tma-secondary-12th/320-accountancy.pdf", download: "/papers/tma-secondary-12th/320-accountancy.pdf" },
    { code: "321", name: "Home Science", year: "2023-24", preview: "/papers/tma-secondary-12th/321-home-science.pdf", download: "/papers/tma-secondary-12th/321-home-science.pdf" },
    { code: "328", name: "Psychology", year: "2023-24", preview: "/papers/tma-secondary-12th/328-psychology.pdf", download: "/papers/tma-secondary-12th/328-psychology.pdf" },
    { code: "330", name: "Computer Science", year: "2023-24", preview: "/papers/tma-secondary-12th/330-computer-science.pdf", download: "/papers/tma-secondary-12th/330-computer-science.pdf" },
    { code: "331", name: "Sociology", year: "2023-24", preview: "/papers/tma-secondary-12th/331-sociology.pdf", download: "/papers/tma-secondary-12th/331-sociology.pdf" },
    { code: "332", name: "Painting", year: "2023-24", preview: "/papers/tma-secondary-12th/332-painting.pdf", download: "/papers/tma-secondary-12th/332-painting.pdf" },
    { code: "336", name: "Data Entry Operation", year: "2023-24", preview: "/papers/tma-secondary-12th/336-data-entry-operation.pdf", download: "/papers/tma-secondary-12th/336-data-entry-operation.pdf" },
    { code: "335", name: "Mass Communication", year: "2023-24", preview: "/papers/tma-secondary-12th/335-mass-communication.pdf", download: "/papers/tma-secondary-12th/335-mass-communication.pdf" },
    { code: "333", name: "Environmental Science", year: "2023-24", preview: "/papers/tma-secondary-12th/333-environmental-science.pdf", download: "/papers/tma-secondary-12th/333-environmental-science.pdf" },
    { code: "373", name: "Physical Education & Yog", year: "2023-24", preview: "/papers/tma-secondary-12th/373-physical-education-&-yog.pdf", download: "/papers/tma-secondary-12th/373-physical-education-&-yog.pdf" },
  ];

  // FILTER SUBJECTS
  const filteredSubjects = subjects.filter((subj) =>
    `${subj.code} ${subj.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container tma-subjects">

      {/* Search */}
      <div className="search-section">
        <div className="search-row">
          <div className="serarch-filter-bx p-relative">
            <img
              src="/assets/images/question-papers/icons/search.svg"
              alt="Search Icon"
              className="serach-icon"
            />
            <input
              type="text"
              className="search-input"
              placeholder="Search subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Subject List */}
      <section className="subject-list-container">
        <div className="subject-list">

          {filteredSubjects.map((subj, index) => (
            <div className="subject-row" key={index}>
              <div className="subject-name">
                {subj.code} - {subj.name} ({subj.year})
              </div>

              <div className="subject-actions">

                {/* Preview */}
                <a
                  href={subj.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn preview-btn"
                >
                  <img
                    src="/assets/images/question-papers/icons/eye.svg"
                    alt="Preview"
                    className="meta-icon"
                  />
                  Preview
                </a>

                {/* Download */}
                <a
                  href={subj.download}
                  download
                  className="action-btn download-btn"
                >
                  <img
                    src="/assets/images/question-papers/icons/download.svg"
                    alt="Download"
                    className="meta-icon"
                  />
                  Download
                </a>

              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
