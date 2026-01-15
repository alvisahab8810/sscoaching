import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusAccountancySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Accountancy Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Accounting (320)"
        />
        <meta
          name="keywords"
          content="NIOS Accounting 320 syllabus, Accountancy Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Accountancy Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Accounting (320)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Accounting (320)
            </p>

            {/* COURSE STRUCTURE TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>MODULE</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Accounting: An Introduction</td>
                    <td></td>
                    <td>
                      L-4 Accounting for Business Transactions<br />
                      L-5 Journal<br />
                      L-6 Ledger
                    </td>
                  </tr>

                  <tr>
                    <td>2. Trial Balance and Computers</td>
                    <td></td>
                    <td>
                      L-12 Errors and their Rectification<br />
                      L-13 Computer and Computerised Accounting System
                    </td>
                  </tr>

                  <tr>
                    <td>3. Financial statements</td>
                    <td></td>
                    <td>
                      L-16 Financial Statements: An Introduction<br />
                      L-17 Financial Statements -I<br />
                      L-18 Financial Statements -II<br />
                      L-19 NPO: An Introduction<br />
                      L-20 Financial Statements (NPOs)<br />
                      L-21 Accounts from Incomplete Records
                    </td>
                  </tr>

                  <tr>
                    <td>4. Partnership Accounts</td>
                    <td></td>
                    <td>
                      L-23 Admission of a Partner<br />
                      L-24 Retirement and Death of a Partner<br />
                      L-25 Dissolution of a Partnership Firm
                    </td>
                  </tr>

                  <tr>
                    <td>5. Company Accounts</td>
                    <td></td>
                    <td>
                      L-27 Issue of Shares<br />
                      L-28 Forfeiture of Shares<br />
                      L-29 Reissue of Forfeited Shares
                    </td>
                  </tr>

                  <tr>
                    <td>6A. Analysis of Financial Statements</td>
                    <td></td>
                    <td>
                      L-32 Accounting Ratio-I<br />
                      L-33 Accounting Ratio- II<br />
                      L-34 Cash Flow Statement
                    </td>
                  </tr>

                  <tr>
                    <td>OR</td>
                    <td></td>
                    <td>OR</td>
                  </tr>

                  <tr>
                    <td>6B.Application of Computers in Financial Accounting</td>
                    <td></td>
                    <td>
                      L-36 Use of spreadsheet in Business<br />
                      L-37 Graphs and Charts for Business<br />
                      L-38 Database Management System for Accounting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          <div className="spacer-area">
               {/* MODULE DETAILS */}
            <h3>Module-I: Accounting: An Introduction</h3>
            <p>L-4 Accounting for Business Transactions</p>
            <p>L-5 Journal</p>
            <p>L-6 Ledger</p>

            <h3>Module-II: Trial Balance and Computers</h3>
            <p>L-12 Errors and their Rectification</p>
            <p>L-13 Computer and Computerised Accounting System</p>

            <h3>Module-III: Financial statements</h3>
            <p>L-16 Financial Statements: An Introduction</p>
            <p>L-17 Financial Statements -I</p>
            <p>L-18 Financial Statements -II</p>
            <p>L-19 NPO: An Introduction</p>
            <p>L-20 Financial Statements (NPOs)</p>
            <p>L-21 Accounts from Incomplete Records</p>

            <h3>Module-IV: Partnership Accounts</h3>
            <p>L-23 Admission of a Partner</p>
            <p>L-24 Retirement and Death of a Partner</p>
            <p>L-25 Dissolution of a Partnership Firm</p>

            <h3>Module-V: Company Accounts</h3>
            <p>L-27 Issue of Shares</p>
            <p>L-28 Forfeiture of Shares</p>
            <p>L-29 Reissue of Forfeited Shares</p>
          </div>

            <h3>Module-VI: Optional Module</h3>

            <div className="table-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>6A. Analysis of Financial Statements</strong><br />
                      L-32 Accounting Ratio-I<br />
                      L-33 Accounting Ratio- II<br />
                      L-34 Cash Flow Statement
                    </td>
                    <td>Or</td>
                    <td>
                      <strong>6B. Application of Computers in Financial Accounting</strong><br />
                      L-36 Use of spreadsheet in Business<br />
                      L-37 Graphs and Charts for Business<br />
                      L-38 Database Management System for Accounting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/320Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Accounts (320) Syllabus Here.
              </a>

              <a href="/papers/12th/320-accountancy-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Accounts (320) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
