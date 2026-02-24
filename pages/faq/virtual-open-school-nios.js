import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function VirtualOpenSchoolNIOS() {
  return (
    <>
      <Head>
        <title>
          What is Virtual Open School in NIOS India | SS Coaching
        </title>
        <meta
          name="description"
          content="Learn about Virtual Open Schooling (VOS) in NIOS India, its benefits, technology requirements and how it works."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              What is Virtual Open School in NIOS India
            </h1>

            <p>
              Virtual Open Schooling can be defined as an educational practice that provides opportunity to learners to study a formal school-based course online and gain credit for certification purpose. The courses are based on existing Open Educational Resources, and are built around a learning management system with content stored on online data centres. Digital media integration would facilitate effectiveness of curriculum. Synchronous and asynchronous technologies would facilitate interaction - with students, with teachers, and with course content.
            </p>

      

            <p>
              In India, NIOS has initiated to launch and start VOS in collaboration with CEMCA (Commonwealth Educational Media Centre for ASIA) to serve learners to continue their education and skill development. Currently, NIOS is offering two vocational courses under the Virtual Open Schooling (VOS) system i.e. ICT Applications and Rural Technology which are already developed in the form of NIOS board OER and will be used the same material for the learners to complete the course.
            </p>

            <p>
              After the successful completion of the course learners will appear in final examination (term end) for certification. Virtual Open Schooling systems are beneficial in the following manners: they offer
            </p>

            <ul className="chapter-list">
              <li>
                Personalized, tailored content: suited to individual learning
              </li>
              <li>
                Flexibility: Anywhere Anytime access, students can enrich their skills in learning a new subject or take up a course or class normally not available at their schools
              </li>
              <li>
                Lower costs: Saves on permanent infrastructure costs
              </li>
              <li>
                Access to high quality education: Access to quality teachers and peers, increases collaboration
              </li>
            </ul>

            <p>
              To make most of what is available to them, institutions are examining alternatives to the exclusive face-to-face learning models. Internet has emerged as the most important medium of learning and exchanging new information through various resources, including social networks. There is a steady rise in the number of face-to-face/online hybrid learning models and thus equipping students with digital skills. Such models empower students to learn at their own pace, time and place convenient to them. Internet is enabling learning anytime, anyplace. Emergence of virtual (or online) schools is one such phenomenon as a result of such paradigm shift. Virtual schools may be described as schools where students can learn and carry out tasks online as they would have done them in a regular classroom.
            </p>

            <p>
              Establishing virtual open schooling in India would address the urgent need of expanding the education base at secondary and senior secondary level. It would integrate the facilities of physical institution with virtual learning environment to provide quality education on controlled expenses. The platform would be a blend of synchronous and asynchronous technologies as delivery mechanisms.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Technology for Functional requirements
            </h3>

            <p>
              Suitable technologies and tools would be employed to meet the requirement of different processes like course development, teaching-learning, administration, evaluation, feedback etc. Online technology would be integral to all these processes. There are very effective tools like Model as learning management system (LMS) which is one of the most popular LMS globally, Wiki tools for collaborative content development, tools for audio-video interactive communication between teacher and students, rubrics for evaluation etc. are recommended to create the Virtual Open Schooling platform. The Virtual Open Schooling platform would have a repository of course content, assignment materials, unit tests, Email, online chat, threaded discussions, audio and video conferences, as well as telephone, print and fax would facilitate asynchronous communications. The system suggested is an integrated platform of a suitable Open Source LMS, Media Wiki, virtual conference tools, and online student assessment system. However considering the present ICT use and penetration in open schools, a complete online assessment system can be in place at a later stage.
            </p>

            <p>
              In order to further collaboration of the COL and NIOS, the Commonwealth Educational Media Centre for Asia (CEMCA) – regional centre of COL in New Delhi, has started a joint initiative with NIOS to explore the possibility of offering Virtual Open Schooling – a new model of educational delivery using online technologies. NIOS is in the right level of development to add another option for its students by offering online learning. The one day national consultative workshop to be held on 16 October 2012 shall discuss the concepts and technology for virtual open schooling with the stakeholders, especially with the State Open Schools in India. With the growing access to Internet, mobile telephone and broadband, it would be worthwhile to consider new opportunities to increase access to quality education. Virtual Schools are very successful in Australia, Canada, Korea, Turkey, and the United States. Experiences of these countries in using technology for teaching and learning at the school level can help India in promoting access to secondary education and vocational education.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream (
              <a
                href="/nios-admission/admission-in-nios-stream-1"
                className="nios-125h-senior-highlight"
              >
                stream 1
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-2"
                className="nios-125h-senior-highlight"
              >
                stream 2
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-3&4"
                className="nios-125h-senior-highlight"
              >
                stream 3 & 4
              </a>
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
