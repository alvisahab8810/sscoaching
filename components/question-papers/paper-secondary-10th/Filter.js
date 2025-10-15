import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const QuestionPapers = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [filters, setFilters] = useState({
    paperType: "All",
    session: "",
    subject: "",
    search: "",
    sort: "",
  });

  const handleToggle = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenMenu(null);
  };

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSort = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const papersData = [
    {
      id: 1,
      title: "Class 10 - 201 Hindi (April 2025)",
      session: "April 2025",
      subject: "Hindi",
      sample: false,
    },
    {
      id: 2,
      title: "Class 10 - 201 Hindi (Oct 2024)",
      session: "October 2024",
      subject: "Hindi",
      sample: false,
    },
    {
      id: 3,
      title: "Class 10 - 201 Hindi (April 2024)",
      session: "April 2024",
      subject: "Hindi",
      sample: false,
    },
    {
      id: 4,
      title: "Class 10 - 201 Hindi Sample paper",
      session: "2024",
      subject: "Hindi",
      sample: true,
    },
    {
      id: 5,
      title: "Class 10 - 202 English (April 2025)",
      session: "April 2025",
      subject: "English",
      sample: false,
    },
    {
      id: 6,
      title: "Class 10 - 202 English (Oct 2024)",
      session: "October 2024",
      subject: "English",
      sample: false,
    },
    {
      id: 7,
      title: "Class 10 - 202 English (April 2024)",
      session: "April 2024",
      subject: "English",
      sample: false,
    },
    {
      id: 8,
      title: "Class 10 - 202 English Sample paper",
      session: "2024",
      subject: "English",
      sample: true,
    },
    {
      id: 9,
      title: "Class 10 - 211 Maths (April 2025)",
      session: "April 2025",
      subject: "Maths",
      sample: false,
    },
    {
      id: 10,
      title: "Class 10 - 211 Maths Sample paper",
      session: "2024",
      subject: "Maths",
      sample: true,
    },
    {
      id: 11,
      title: "Class 10 - 212 Science (April 2025)",
      session: "April 2025",
      subject: "Science",
      sample: false,
    },
    {
      id: 12,
      title: "Class 10 - 212 Science Sample paper",
      session: "2024",
      subject: "Science",
      sample: true,
    },
  ];

  const filteredPapers = useMemo(() => {
    let filtered = [...papersData];

    if (filters.subject)
      filtered = filtered.filter(
        (p) => p.subject.toLowerCase() === filters.subject.toLowerCase()
      );

    if (filters.session)
      filtered = filtered.filter(
        (p) => p.session.toLowerCase() === filters.session.toLowerCase()
      );

    if (filters.search)
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );

    if (filters.sort === "newest") {
      filtered = filtered.sort((a, b) => b.session.localeCompare(a.session));
    } else if (filters.sort === "oldest") {
      filtered = filtered.sort((a, b) => a.session.localeCompare(b.session));
    } else if (filters.sort === "subject") {
      filtered = filtered.sort((a, b) => a.subject.localeCompare(b.subject));
    }

    return filtered;
  }, [filters, papersData]);

  const sessions = ["April 2025", "October 2024", "April 2024", "2024"];
  const subjects = ["Hindi", "English", "Maths", "Science"];

  return (
    <section className="qustion-paper-hero-section1">
      <div className="container">
        {/* FILTER CARDS */}
        <div className="filtercards-section">
          <div className="filtercards-row">
            {/* All Papers */}
            <div
              className="filtercards-card filtercards-blue"
              onClick={() => handleToggle("papers")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">All Secondary papers</p>
                  <h3 className="filtercards-value">{filteredPapers.length}</h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/file.svg"
                    alt="papers"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "papers" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "papers" && (
                <div className="filtercards-dropdown">
                  <ul>
                    <li onClick={() => handleSelect("paperType", "All")}>
                      All Papers
                    </li>
                    <li onClick={() => handleSelect("paperType", "Sample")}>
                      Sample Papers
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Latest Papers */}
            <div
              className="filtercards-card filtercards-green"
              onClick={() => handleToggle("latest")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Latest papers</p>
                  <h3 className="filtercards-value">
                    {filters.session || "Select"}
                  </h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/date.svg"
                    alt="calendar"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "latest" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "latest" && (
                <div className="filtercards-dropdown">
                  <ul>
                    {sessions.map((s) => (
                      <li key={s} onClick={() => handleSelect("session", s)}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Subjects */}
            <div
              className="filtercards-card filtercards-purple"
              onClick={() => handleToggle("subjects")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Subjects</p>
                  <h3 className="filtercards-value">
                    {filters.subject || "Select"}
                  </h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/book.svg"
                    alt="book"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "subjects" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "subjects" && (
                <div className="filtercards-dropdown">
                  <ul>
                    {subjects.map((sub) => (
                      <li
                        key={sub}
                        onClick={() => handleSelect("subject", sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH SECTION */}
        <div className="search-section">
          <div className="search-row">
            <div className="serarch-filter-bx p-relative">
              <img src="/assets/images/question-papers/icons/search.svg" alt="Search Icon" className="serach-icon"></img>
            <input
              type="text"
              className="search-input"
              placeholder="Search papers..."
              value={filters.search}
              onChange={handleSearch}
            />
            </div>
            <select
              className="sort-dropdown"
              value={filters.sort}
              onChange={handleSort}
            >
              <option value="">Sort By</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="subject">By Subject</option>
            </select>
          </div>
        </div>

        {/* PAPERS GRID */}
        <section className="papers-grid">
          {filteredPapers.map((paper) => (
            <article key={paper.id} className="paper-card">
              {paper.sample && <div className="sample-badge">sample</div>}
              <h2 className="paper-title">{paper.title}</h2>
              <div className="paper-details">
                <div className="paper-meta">
                  <div className="meta-item">
                    <img
                      src="/assets/images/question-papers/icons/calender.svg"
                      alt="Date"
                      className="meta-icon"
                    />
                    <span className="meta-text">{paper.session}</span>
                  </div>
                  <div className="meta-item">
                    <img
                      src="/assets/images/question-papers/icons/book-light.svg"
                      alt="Subject"
                      className="meta-icon"
                    />
                    <span className="meta-text">{paper.subject}</span>
                  </div>
                </div>
                <div className="paper-actions">
                  <a href="#" className="action-btn preview-btn">
                    <img
                      src="/assets/images/question-papers/icons/eye.svg"
                      alt="Preview"
                      className="meta-icon"
                    />
                    Preview
                  </a>
                  <a href="#" className="action-btn download-btn">
                    <img
                      src="/assets/images/question-papers/icons/download.svg"
                      alt="Download"
                      className="meta-icon"
                    />
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}

          {filteredPapers.length === 0 && (
            <p style={{ textAlign: "center", padding: "30px" }}>
              No papers found for the selected filters.
            </p>
          )}
        </section>


          <a href="#" className="cta-button">You can download Secondary class 10th previous year's NIOS question papers and NIOS Sample paper 2025 from SS Coaching website exclusively.</a>

      </div>
    </section>
  );
};

export default QuestionPapers;
