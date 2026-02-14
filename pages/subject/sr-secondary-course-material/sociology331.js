"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Sociology331() {

  const chapters = [
    { name: "An Introduction to Sociology", url: "https://nios.ac.in/media/documents/331courseE/L-1%20ANINTRODUCTION%20TO%20SOCIOLOGY.pdf" },
    { name: "Emergence and Development of Sociology", url: "https://nios.ac.in/media/documents/331courseE/L-2%20EMERGENCE%20AND%20DEVELOPMENT%20OF%20SOCIOLOGY.pdf" },
    { name: "Sociology: Its Relationship with Other Social Sciences", url: "https://nios.ac.in/media/documents/331courseE/L-3%20SOCIOLOGY%20ITS%20RELATIONSHIP%20WITH%20OTHER%20SOCIAL%20SCIEN.pdf" },
    { name: "Methods and Techniques of Research in Sociology", url: "https://nios.ac.in/media/documents/331courseE/L-4%20METGODS%20AND%20TECHIQUES%20IN%20RESEARCH%20OF%20SOCIOKOGY.pdf" },
    { name: "Society, Community, Association and Institution", url: "https://nios.ac.in/media/documents/331courseE/L-5%20SPCIETY%20COMMUNITY%20ASSOCIATION%20AND%20INSTITUTION.pdf" },
    { name: "Social Groups", url: "https://nios.ac.in/media/documents/331courseE/L-6%20SOCIAL%20GROUP.pdf" },
    { name: "Social Structure and Social System", url: "https://nios.ac.in/media/documents/331courseE/L-7%20SOCIAL%20STRUCTURE%20AND%20SOCIAL%20SYSTEM.pdf" },
    { name: "Norms and Values", url: "https://nios.ac.in/media/documents/331courseE/L-8%20NORMS%20AND%20VALUES.pdf" },
    { name: "Status and Role", url: "https://nios.ac.in/media/documents/331courseE/L-9%20STATUS%20AND%20ROLE.pdf" },
    { name: "Cooperation, Competition and Conflict", url: "https://nios.ac.in/media/documents/331courseE/L-10%20CO-OPERATION%20COMPETITION%20AND%20CONFLICT.pdf" },
    { name: "Acculturation, Assimilation & Integration", url: "https://nios.ac.in/media/documents/331courseE/L-11%20ACCULTURATION%20ASSIMILATION%20AND%20INTEGRATION.pdf" },
    { name: "Marriage", url: "https://nios.ac.in/media/documents/331courseE/L-12%20MARRIAGE.pdf" },
    { name: "Family", url: "https://nios.ac.in/media/documents/331courseE/L-13%20FAMILY.pdf" },
    { name: "Kinship", url: "https://nios.ac.in/media/documents/331courseE/L-14%20KINSHIP.pdf" },
    { name: "Economy, Polity and Religion", url: "https://nios.ac.in/media/documents/331courseE/L-15%20ECONOMY.pdf" },
    { name: "Social Stratification", url: "https://nios.ac.in/media/documents/331courseE/L-16%20SOCIAL%20STRATIFICATION.pdf" },
    { name: "Factors of Social Change", url: "https://nios.ac.in/media/documents/331courseE/L-17%20FACTOR%20OF%20SOCIAL%20CHANGE.pdf" },
    { name: "Processes of Social Change", url: "https://nios.ac.in/media/documents/331courseE/L-18%20PROCESSES%20OF%20SOCIAL%20CHANGE.pdf" },
    { name: "Socialization", url: "https://nios.ac.in/media/documents/331courseE/L-19%20SOCIALIZATION%20AS%20A%20PROCESS%20OF%20LEARNING.pdf" },
    { name: "Social Control", url: "https://nios.ac.in/media/documents/331courseE/L-20%20SOCIAL%20CONTROL.pdf" },
    { name: "Social Deviance", url: "https://nios.ac.in/media/documents/331courseE/L-21%20SOCIAL%20DEVIANCE.pdf" },
    { name: "Society and Our Environment", url: "https://nios.ac.in/media/documents/331courseE/L-22%20SOCIETY%20AND%20ENVIRONMENT.pdf" },
    { name: "Indian Social Thinkers", url: "https://nios.ac.in/media/documents/331courseE/L-23%20INDIAN%20SOCIAL%20THINKERS.pdf" },
    { name: "Unity and Diversity", url: "https://nios.ac.in/media/documents/331courseE/L-24%20UNITY%20AND%20DIVERSITY.pdf" },
    { name: "National Integration: Concept and Challenge", url: "https://nios.ac.in/media/documents/331courseE/L-25%20NATIONAL%20INTEGRATION%20CONCEPT%20AND%20CHALLENGE.pdf" },
    { name: "Indian Society: Tribal, Rural and Urban", url: "https://nios.ac.in/media/documents/331courseE/L-26%20INDIAN%20SOCIETY%20TRIBAL%20RURAL%20AND%20URBAN.pdf" },
    { name: "Caste System in India", url: "https://nios.ac.in/media/documents/331courseE/L-27%20CASTE%20SYSTEM%20IN%20INDIA.pdf" },
    { name: "Major Religious Communities in India", url: "https://nios.ac.in/media/documents/331courseE/L-28%20MAJOR%20RELIGIOUS%20COMMUNITIES%20IN%20INDIA.pdf" },
    { name: "Major Social Problems of India", url: "https://nios.ac.in/media/documents/331courseE/L-29%20MAJOTR%20SOCIAL%20PROBLEMS%20OF%20INDIA.pdf" },
    { name: "Problems of Scheduled Castes and Scheduled Tribes", url: "https://nios.ac.in/media/documents/331courseE/L-30%20PROBLEMS%20OF%20SCHEDULED%20CASTES%20AND%20SCHEDULESD%20TR.pdf" },
    { name: "Problems of Other Deprived Sections", url: "https://nios.ac.in/media/documents/331courseE/L-31%20PROBLEMS%20OF%20OTHER%20DEPRIVED%20SECTIOS.pdf" },
    { name: "Historical and Cultural Perspective (32A)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-1%20L-32%20STATUS%20OF%20WOMEN%20IN%20INDIAN%20SOCIETY%20A%20SOCIO%20HISTOR.pdf" },
    { name: "Gender Discrimination (33A)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-1%20L-33%20GENDER%20DISCRIMINATION%20AND%20GENDER%20EQUALITY.pdf" },
    { name: "Problem of Women (34A)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-1%20L-34%20PROBLEMS%20OF%20WOMEN.pdf" },
    { name: "Quest for Equality and Women's Empowerment (35A)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-1%20L-35%20WOMENS%20EMPOWERMENT%20AND%20EMANCIPATION.pdf" },
    { name: "Culture: Concept and Characteristics (32B)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-2%20L-32%20CULTURE%20CONCEOT%20AND%20CHARACTERISTICS.pdf" },
    { name: "Indian Cultural Heritage (33B)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-2%20L-33%20INDIAN%20CULTURAL%20HERITAGE.pdf" },
    { name: "Cultural Pluralism (34B)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-2%20L-34%20CULTURAL%20PLURALISM.pdf" },
    { name: "Media and Culture (35B)", url: "https://nios.ac.in/media/documents/331courseE/OPTIONAL%20MODULE-2%20L-35%20IMPACT%20OF%20MEDIA%20ON%20CULTURE.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Sociology 331</title>
      </Head>

      <div id="paper-secondary-10th" className="tma-sr-secondary">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <section className="subject-table-section">
          <div className="container">

            <div className="hero-text">
              <h1 className="qustion-paper-hero-title">
                <span className="highlight text-left">
                  Sociology (331) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Chapter Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td className="text-center"><strong>{chapter.name}</strong></td>
                      <td className="text-center">
                        <a
                          href={chapter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pdf-icon"
                        >
                          <FaFilePdf />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <style jsx>{`
            .custom-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              background: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
              border: 1px solid #ddd;
            }

            thead tr { background: #f9fafc; }

            thead th {
              padding: 15px 10px;
              font-size: 16px;
              font-weight: 700;
              text-align: center;
            }

            tbody td {
              padding: 10px;
              font-size: 15px;
              border-top: 1px solid #f1f1f1;
              text-align: center;
            }

            .even-row { background-color: #f9fafc; }

            tbody tr:hover {
              background-color: #f1f5ff;
              transition: 0.2s ease;
            }

            .pdf-icon {
              color: #e63946;
              font-size: 22px;
              transition: 0.2s ease;
            }

            .pdf-icon:hover {
              transform: scale(1.1);
              color: #c71f1f;
            }
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
