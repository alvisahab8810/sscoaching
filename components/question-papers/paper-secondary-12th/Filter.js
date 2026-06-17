import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const QuestionPapers12 = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [filters, setFilters] = useState({
    paperType: "All",
    session: "",
    subject: "",
    search: "",
    sort: "newest",
  });

  const handleToggle = (name) => setOpenMenu(openMenu === name ? null : name);
  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenMenu(null);
  };
  const handleSearch = (e) =>
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  const handleSort = (e) =>
    setFilters((prev) => ({ ...prev, sort: e.target.value }));

  // -----------------------------------
  // CLASS 12 PAPERS — FULL DATASET
  // -----------------------------------
  const papersData = [
    // 301 - Hindi
    { id: 301001, code: "301", subject: "Hindi", title: "301 - Hindi (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/301-hindi-apr-2025.pdf" },
    { id: 301002, code: "301", subject: "Hindi", title: "301 - Hindi (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/301-hindi-oct-2024.pdf" },
    { id: 301003, code: "301", subject: "Hindi", title: "301 - Hindi (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/301-hindi-apr-2024.pdf" },
    { id: 301004, code: "301", subject: "Hindi", title: "301 - Hindi (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/301-hindi-sample-2024.pdf" },
    { id: 301005, code: "301", subject: "Hindi", title: "301 - Hindi (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/301-hindi-apr-2023.pdf" },
    { id: 301006, code: "301", subject: "Hindi", title: "301 - Hindi (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/301-hindi-oct-2022.pdf" },
    { id: 301007, code: "301", subject: "Hindi", title: "301 - Hindi (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/301-hindi-apr-2022.pdf" },

    // 302 - English
    { id: 302001, code: "302", subject: "English", title: "302 - English (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/302-english-apr-2025.pdf" },
    { id: 302002, code: "302", subject: "English", title: "302 - English (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/302-english-oct-2024.pdf" },
    { id: 302003, code: "302", subject: "English", title: "302 - English (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/302-english-apr-2024.pdf" },
    { id: 302004, code: "302", subject: "English", title: "302 - English (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/302-english-sample-2024.pdf" },
    { id: 302005, code: "302", subject: "English", title: "302 - English (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/302-english-apr-2023.pdf" },
    { id: 302006, code: "302", subject: "English", title: "302 - English (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/302-english-oct-2022.pdf" },
    { id: 302007, code: "302", subject: "English", title: "302 - English (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/302-english-apr-2022.pdf" },

    // 309 - Sanskrit
    { id: 309001, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/309-sanskrit-apr-2025.pdf" },
    { id: 309002, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/309-sanskrit-oct-2024.pdf" },
    { id: 309003, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/309-sanskrit-apr-2024.pdf" },
    { id: 309004, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/309-sanskrit-sample-2024.pdf" },
    { id: 309005, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/309-sanskrit-apr-2023.pdf" },
    { id: 309006, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/309-sanskrit-oct-2022.pdf" },
    { id: 309007, code: "309", subject: "Sanskrit", title: "309 - Sanskrit (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/309-sanskrit-apr-2022.pdf" },

    // 311 - Maths
    { id: 311001, code: "311", subject: "Maths", title: "311 - Maths (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/311-maths-apr-2025.pdf" },
    { id: 311002, code: "311", subject: "Maths", title: "311 - Maths (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/311-maths-oct-2024.pdf" },
    { id: 311003, code: "311", subject: "Maths", title: "311 - Maths (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/311-maths-apr-2024.pdf" },
    { id: 311004, code: "311", subject: "Maths", title: "311 - Maths (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/311-maths-sample-2024.pdf" },
    { id: 311005, code: "311", subject: "Maths", title: "311 - Maths (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/311-maths-apr-2023.pdf" },
    { id: 311006, code: "311", subject: "Maths", title: "311 - Maths (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/311-maths-oct-2022.pdf" },
    { id: 311007, code: "311", subject: "Maths", title: "311 - Maths (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/311-maths-apr-2022.pdf" },

        // 312 - Physics
    { id: 312001, code: "312", subject: "Physics", title: "312 - Physics (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/312-physics-apr-2025.pdf" },
    { id: 312002, code: "312", subject: "Physics", title: "312 - Physics (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/312-physics-oct-2024.pdf" },
    { id: 312003, code: "312", subject: "Physics", title: "312 - Physics (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/312-physics-apr-2024.pdf" },
    { id: 312004, code: "312", subject: "Physics", title: "312 - Physics (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/312-physics-sample-2024.pdf" },
    { id: 312005, code: "312", subject: "Physics", title: "312 - Physics (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/312-physics-apr-2023.pdf" },
    { id: 312006, code: "312", subject: "Physics", title: "312 - Physics (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/312-physics-oct-2022.pdf" },
    { id: 312007, code: "312", subject: "Physics", title: "312 - Physics (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/312-physics-apr-2022.pdf" },

    // 313 - Chemistry
    { id: 313001, code: "313", subject: "Chemistry", title: "313 - Chemistry (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/313-chemistry-apr-2025.pdf" },
    { id: 313002, code: "313", subject: "Chemistry", title: "313 - Chemistry (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/313-chemistry-oct-2024.pdf" },
    { id: 313003, code: "313", subject: "Chemistry", title: "313 - Chemistry (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/313-chemistry-apr-2024.pdf" },
    { id: 313004, code: "313", subject: "Chemistry", title: "313 - Chemistry (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/313-chemistry-sample-2024.pdf" },
    { id: 313005, code: "313", subject: "Chemistry", title: "313 - Chemistry (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/313-chemistry-apr-2023.pdf" },
    { id: 313006, code: "313", subject: "Chemistry", title: "313 - Chemistry (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/313-chemistry-oct-2022.pdf" },
    { id: 313007, code: "313", subject: "Chemistry", title: "313 - Chemistry (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/313-chemistry-apr-2022.pdf" },

    // 314 - Biology
    { id: 314001, code: "314", subject: "Biology", title: "314 - Biology (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/314-biology-apr-2025.pdf" },
    { id: 314002, code: "314", subject: "Biology", title: "314 - Biology (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/314-biology-oct-2024.pdf" },
    { id: 314003, code: "314", subject: "Biology", title: "314 - Biology (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/314-biology-apr-2024.pdf" },
    { id: 314004, code: "314", subject: "Biology", title: "314 - Biology (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/314-biology-sample-2024.pdf" },
    { id: 314005, code: "314", subject: "Biology", title: "314 - Biology (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/314-biology-apr-2023.pdf" },
    { id: 314006, code: "314", subject: "Biology", title: "314 - Biology (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/314-biology-oct-2022.pdf" },
    { id: 314007, code: "314", subject: "Biology", title: "314 - Biology (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/314-biology-apr-2022.pdf" },

    // 315 - History
    { id: 315001, code: "315", subject: "History", title: "315 - History (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/315-history-apr-2025.pdf" },
    { id: 315002, code: "315", subject: "History", title: "315 - History (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/315-history-oct-2024.pdf" },
    { id: 315003, code: "315", subject: "History", title: "315 - History (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/315-history-apr-2024.pdf" },
    { id: 315004, code: "315", subject: "History", title: "315 - History (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/315-history-sample-2024.pdf" },
    { id: 315005, code: "315", subject: "History", title: "315 - History (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/315-history-apr-2023.pdf" },
    { id: 315006, code: "315", subject: "History", title: "315 - History (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/315-history-oct-2022.pdf" },
    { id: 315007, code: "315", subject: "History", title: "315 - History (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/315-history-apr-2022.pdf" },

    // 316 - Geography
    { id: 316001, code: "316", subject: "Geography", title: "316 - Geography (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/316-geography-apr-2025.pdf" },
    { id: 316002, code: "316", subject: "Geography", title: "316 - Geography (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/316-geography-oct-2024.pdf" },
    { id: 316003, code: "316", subject: "Geography", title: "316 - Geography (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/316-geography-apr-2024.pdf" },
    { id: 316004, code: "316", subject: "Geography", title: "316 - Geography (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/316-geography-sample-2024.pdf" },
    { id: 316005, code: "316", subject: "Geography", title: "316 - Geography (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/316-geography-apr-2023.pdf" },
    { id: 316006, code: "316", subject: "Geography", title: "316 - Geography (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/316-geography-oct-2022.pdf" },
    { id: 316007, code: "316", subject: "Geography", title: "316 - Geography (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/316-geography-apr-2022.pdf" },

    // 317 - Political Science
    { id: 317001, code: "317", subject: "Political Science", title: "317 - Political Science (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/317-political-science-apr-2025.pdf" },
    { id: 317002, code: "317", subject: "Political Science", title: "317 - Political Science (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/317-political-science-oct-2024.pdf" },
    { id: 317003, code: "317", subject: "Political Science", title: "317 - Political Science (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/317-political-science-apr-2024.pdf" },
    { id: 317004, code: "317", subject: "Political Science", title: "317 - Political Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/317-political-science-sample-2024.pdf" },
    { id: 317005, code: "317", subject: "Political Science", title: "317 - Political Science (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/317-political-science-apr-2023.pdf" },
    { id: 317006, code: "317", subject: "Political Science", title: "317 - Political Science (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/317-political-science-oct-2022.pdf" },
    { id: 317007, code: "317", subject: "Political Science", title: "317 - Political Science (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/317-political-science-apr-2022.pdf" },

    // 318 - Economics
    { id: 318001, code: "318", subject: "Economics", title: "318 - Economics (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/318-economics-apr-2025.pdf" },
    { id: 318002, code: "318", subject: "Economics", title: "318 - Economics (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/318-economics-oct-2024.pdf" },
    { id: 318003, code: "318", subject: "Economics", title: "318 - Economics (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/318-economics-apr-2024.pdf" },
    { id: 318004, code: "318", subject: "Economics", title: "318 - Economics (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/318-economics-sample-2024.pdf" },
    { id: 318005, code: "318", subject: "Economics", title: "318 - Economics (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/318-economics-apr-2023.pdf" },
    { id: 318006, code: "318", subject: "Economics", title: "318 - Economics (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/318-economics-oct-2022.pdf" },
    { id: 318007, code: "318", subject: "Economics", title: "318 - Economics (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/318-economics-apr-2022.pdf" },

    // 319 - Business Studies
    { id: 319001, code: "319", subject: "Business Studies", title: "319 - Business Studies (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/319-business-studies-apr-2025.pdf" },
    { id: 319002, code: "319", subject: "Business Studies", title: "319 - Business Studies (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/319-business-studies-oct-2024.pdf" },
    { id: 319003, code: "319", subject: "Business Studies", title: "319 - Business Studies (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/319-business-studies-apr-2024.pdf" },
    { id: 319004, code: "319", subject: "Business Studies", title: "319 - Business Studies (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/319-business-studies-sample-2024.pdf" },
    { id: 319005, code: "319", subject: "Business Studies", title: "319 - Business Studies (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/319-business-studies-apr-2023.pdf" },
    { id: 319006, code: "319", subject: "Business Studies", title: "319 - Business Studies (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/319-business-studies-oct-2022.pdf" },
    { id: 319007, code: "319", subject: "Business Studies", title: "319 - Business Studies (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/319-business-studies-apr-2022.pdf" },

    // 320 - Accountancy
    { id: 320001, code: "320", subject: "Accountancy", title: "320 - Accountancy (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/320-accountancy-apr-2025.pdf" },
    { id: 320002, code: "320", subject: "Accountancy", title: "320 - Accountancy (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/320-accountancy-oct-2024.pdf" },
    { id: 320003, code: "320", subject: "Accountancy", title: "320 - Accountancy (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/320-accountancy-apr-2024.pdf" },
    { id: 320004, code: "320", subject: "Accountancy", title: "320 - Accountancy (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/320-accountancy-sample-2024.pdf" },
    { id: 320005, code: "320", subject: "Accountancy", title: "320 - Accountancy (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/320-accountancy-apr-2023.pdf" },
    { id: 320006, code: "320", subject: "Accountancy", title: "320 - Accountancy (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/320-accountancy-oct-2022.pdf" },
    { id: 320007, code: "320", subject: "Accountancy", title: "320 - Accountancy (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/320-accountancy-apr-2022.pdf" },

    // 321 - Home Science
    { id: 321001, code: "321", subject: "Home Science", title: "321 - Home Science (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/321-home-science-apr-2025.pdf" },
    { id: 321002, code: "321", subject: "Home Science", title: "321 - Home Science (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/321-home-science-oct-2024.pdf" },
    { id: 321003, code: "321", subject: "Home Science", title: "321 - Home Science (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/321-home-science-apr-2024.pdf" },
    { id: 321004, code: "321", subject: "Home Science", title: "321 - Home Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/321-home-science-sample-2024.pdf" },
    { id: 321005, code: "321", subject: "Home Science", title: "321 - Home Science (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/321-home-science-apr-2023.pdf" },
    { id: 321006, code: "321", subject: "Home Science", title: "321 - Home Science (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/321-home-science-oct-2022.pdf" },
    { id: 321007, code: "321", subject: "Home Science", title: "321 - Home Science (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/321-home-science-apr-2022.pdf" },

    // 328 - Psychology
    { id: 328001, code: "328", subject: "Psychology", title: "328 - Psychology (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/328-psychology-apr-2025.pdf" },
    { id: 328002, code: "328", subject: "Psychology", title: "328 - Psychology (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/328-psychology-oct-2024.pdf" },
    { id: 328003, code: "328", subject: "Psychology", title: "328 - Psychology (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/328-psychology-apr-2024.pdf" },
    { id: 328004, code: "328", subject: "Psychology", title: "328 - Psychology (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/328-psychology-sample-2024.pdf" },
    { id: 328005, code: "328", subject: "Psychology", title: "328 - Psychology (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/328-psychology-apr-2023.pdf" },
    { id: 328006, code: "328", subject: "Psychology", title: "328 - Psychology (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/328-psychology-oct-2022.pdf" },
    { id: 328007, code: "328", subject: "Psychology", title: "328 - Psychology (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/328-psychology-apr-2022.pdf" },

    // 330 - Computer Science
    { id: 330001, code: "330", subject: "Computer Science", title: "330 - Computer Science (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/330-computer-science-apr-2025.pdf" },
    { id: 330002, code: "330", subject: "Computer Science", title: "330 - Computer Science (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/330-computer-science-oct-2024.pdf" },
    { id: 330003, code: "330", subject: "Computer Science", title: "330 - Computer Science (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/330-computer-science-apr-2024.pdf" },
    { id: 330004, code: "330", subject: "Computer Science", title: "330 - Computer Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/330-computer-science-sample-2024.pdf" },
    { id: 330005, code: "330", subject: "Computer Science", title: "330 - Computer Science (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/330-computer-science-apr-2023.pdf" },
    { id: 330006, code: "330", subject: "Computer Science", title: "330 - Computer Science (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/330-computer-science-oct-2022.pdf" },
    { id: 330007, code: "330", subject: "Computer Science", title: "330 - Computer Science (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/330-computer-science-apr-2022.pdf" },

    // 331 - Sociology
    { id: 331001, code: "331", subject: "Sociology", title: "331 - Sociology (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/331-sociology-apr-2025.pdf" },
    { id: 331002, code: "331", subject: "Sociology", title: "331 - Sociology (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/331-sociology-oct-2024.pdf" },
    { id: 331003, code: "331", subject: "Sociology", title: "331 - Sociology (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/331-sociology-apr-2024.pdf" },
    { id: 331004, code: "331", subject: "Sociology", title: "331 - Sociology (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/331-sociology-sample-2024.pdf" },
    { id: 331005, code: "331", subject: "Sociology", title: "331 - Sociology (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/331-sociology-apr-2023.pdf" },
    { id: 331006, code: "331", subject: "Sociology", title: "331 - Sociology (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/331-sociology-oct-2022.pdf" },
    { id: 331007, code: "331", subject: "Sociology", title: "331 - Sociology (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/331-sociology-apr-2022.pdf" },

    // 332 - Painting
    { id: 332001, code: "332", subject: "Painting", title: "332 - Painting (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/332-painting-apr-2025.pdf" },
    { id: 332002, code: "332", subject: "Painting", title: "332 - Painting (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/332-painting-oct-2024.pdf" },
    { id: 332003, code: "332", subject: "Painting", title: "332 - Painting (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/332-painting-apr-2024.pdf" },
    { id: 332004, code: "332", subject: "Painting", title: "332 - Painting (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/332-painting-sample-2024.pdf" },
    { id: 332005, code: "332", subject: "Painting", title: "332 - Painting (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/332-painting-apr-2023.pdf" },
    { id: 332006, code: "332", subject: "Painting", title: "332 - Painting (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/332-painting-oct-2022.pdf" },
    { id: 332007, code: "332", subject: "Painting", title: "332 - Painting (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/332-painting-apr-2022.pdf" },

    // 336 - Data Entry Operation
    { id: 336001, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/336-data-entry-apr-2025.pdf" },
    { id: 336002, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/336-data-entry-oct-2024.pdf" },
    { id: 336003, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/336-data-entry-apr-2024.pdf" },
    { id: 336004, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/336-data-entry-sample-2024.pdf" },
    { id: 336005, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/336-data-entry-apr-2023.pdf" },
    { id: 336006, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/336-data-entry-oct-2022.pdf" },
    { id: 336007, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/336-data-entry-apr-2022.pdf" },

    // 335 - Mass Communication
    { id: 335001, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (April 2025)", session: "April 2025", sample: false, file: "/papers/12th/335-mass-comm-apr-2025.pdf" },
    { id: 335002, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (October 2024)", session: "October 2024", sample: false, file: "/papers/12th/335-mass-comm-oct-2024.pdf" },
    { id: 335003, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (April 2024)", session: "April 2024", sample: false, file: "/papers/12th/335-mass-comm-apr-2024.pdf" },
    { id: 335004, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/12th/335-mass-comm-sample-2024.pdf" },
    { id: 335005, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (April 2023)", session: "April 2023", sample: false, file: "/papers/12th/335-mass-comm-apr-2023.pdf" },
    { id: 335006, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (October 2022)", session: "October 2022", sample: false, file: "/papers/12th/335-mass-comm-oct-2022.pdf" },
    { id: 335007, code: "335", subject: "Mass Communication", title: "335 - Mass Communication (April 2022)", session: "April 2022", sample: false, file: "/papers/12th/335-mass-comm-apr-2022.pdf" },

    // ── April 2026 Papers ──────────────────────────────────────────────────
    { id: 3012601, code: "301", subject: "Hindi", title: "301 - Hindi (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/301-hindi-apr-2026.pdf" },
    { id: 3022601, code: "302", subject: "English", title: "302 - English (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/302-english-apr-2026.pdf" },
    { id: 3122601, code: "312", subject: "Physics", title: "312 - Physics (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/312-physics-apr-2026.pdf" },
    { id: 3142601, code: "314", subject: "Biology", title: "314 - Biology (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/314-biology-apr-2026.pdf" },
    { id: 3182601, code: "318", subject: "Economics", title: "318 - Economics (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/318-economics-apr-2026.pdf" },
    { id: 3192601, code: "319", subject: "Business Studies", title: "319 - Business Studies (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/319-business-studies-apr-2026.pdf" },
    { id: 3202601, code: "320", subject: "Accountancy", title: "320 - Accountancy (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/320-accountancy-apr-2026.pdf" },
    { id: 3302601, code: "330", subject: "Computer Science", title: "330 - Computer Science (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/330-computer-science-apr-2026.pdf" },
    { id: 3322601, code: "332", subject: "Painting", title: "332 - Painting (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/332-painting-apr-2026.pdf" },
    { id: 3362601, code: "336", subject: "Data Entry Operation", title: "336 - Data Entry Operation (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/336-data-entry-apr-2026.pdf" },
    { id: 3732601, code: "373", subject: "Physical Education", title: "373 - Physical Education (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/373-physical-education-set-a-apr-2026.pdf" },
    { id: 3732602, code: "311", subject: "Mathematics", title: "311 - Mathematics (April 2026)", session: "April 2026", sample: false, file: "/papers/10th-2026/311-mathematics-apr-2026.pdf" },

  ];

  const sessionToDate = (session) => {
    const monthMap = { April: 4, October: 10 };
    const [month, year] = session.split(" ");
    return (parseInt(year) || 0) * 100 + (monthMap[month] || 0);
  };

  // FILTER + SORT
  const filteredPapers = useMemo(() => {
    let filtered = [...papersData];

    if (filters.paperType === "Sample") {
      filtered = filtered.filter((p) => p.sample);
    }

    if (filters.subject) {
      filtered = filtered.filter(
        (p) => p.subject.toLowerCase() === filters.subject.toLowerCase()
      );
    }

    if (filters.session) {
      filtered = filtered.filter(
        (p) => p.session.toLowerCase() === filters.session.toLowerCase()
      );
    }

    if (filters.search) {
      filtered = filtered.filter((p) =>
        (p.title + " " + p.code + " " + p.subject)
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    if (filters.sort === "newest") {
      filtered.sort((a, b) => sessionToDate(b.session) - sessionToDate(a.session));
    } else if (filters.sort === "oldest") {
      filtered.sort((a, b) => sessionToDate(a.session) - sessionToDate(b.session));
    } else if (filters.sort === "subject") {
      filtered.sort((a, b) => a.subject.localeCompare(b.subject));
    }

    return filtered;
  }, [filters]);

  // DROPDOWN VALUES
  const sessions = [
    "April 2026",
    "April 2025",
    "October 2024",
    "April 2024",
    "April 2023",
    "October 2022",
    "April 2022",
  ];

  const subjects = [
    "Hindi",
    "English",
    "Sanskrit",
    "Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Political Science",
    "Economics",
    "Business Studies",
    "Accountancy",
    "Home Science",
    "Psychology",
    "Computer Science",
    "Sociology",
    "Painting",
    "Data Entry Operation",
    "Mass Communication",
    "Physical Education",
  ];

  return (
    <section className="qustion-paper-hero-section1">
      <div className="container">
        {/* FILTER CARDS */}
        <div className="filtercards-section">
          <div className="filtercards-row">
            
            {/* Paper Type */}
            <div
              className="filtercards-card filtercards-blue"
              onClick={() => handleToggle("papers")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Paper Type</p>
                  <h3 className="filtercards-value">
                    {filters.paperType || "All"}
                  </h3>
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
                  </ul>
                </div>
              )}
            </div>

            {/* Session */}
            <div
              className="filtercards-card filtercards-green"
              onClick={() => handleToggle("latest")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Session</p>
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
                    <li onClick={() => handleSelect("session", "")}>All Sessions</li>
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
                    <li onClick={() => handleSelect("subject", "")}>All Subjects</li>
                    {subjects.map((sub) => (
                      <li key={sub} onClick={() => handleSelect("subject", sub)}>
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
              <img
                src="/assets/images/question-papers/icons/search.svg"
                alt="Search Icon"
                className="serach-icon"
              />
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
              {paper.sample && <div className="sample-badge">Sample</div>}

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
                    <span className="meta-text">
                      {paper.code} • {paper.subject}
                    </span>
                  </div>
                </div>

                <div className="paper-actions">
                  <a
                    href={paper.file}
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

                  <a
                    href={paper.file}
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
            </article>
          ))}

          {filteredPapers.length === 0 && (
            <p style={{ textAlign: "center", padding: "30px" }}>
              No papers found for the selected filters.
            </p>
          )}
        </section>

        <a href="#" className="cta-button">
          Download Class 12th NIOS Question Papers & Sample Papers 2026 from our website.
        </a>
      </div>
    </section>
  );
};

export default QuestionPapers12;






