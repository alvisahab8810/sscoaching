import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ProfileOfNIOSLearner() {
  return (
    <>
      <Head>
        <title>What is The profile of a NIOS Learner? | SS Coaching</title>
        <meta
          name="description"
          content="Profile of a NIOS Learner including gender, category and age wise enrollment statistics."
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
              What is The profile of a NIOS Learner?
            </h1>

            <p>
              The NIOS main goal is to have an embracive and dynamic learning society .The NIOS is constantly striving to make efforts to reach out the marginalized groups such as school dropouts, girls and women, scheduled cast and scheduled tribes, ex-servicemen, differently able learners, and attract large number of students from all over the country. This makes it all the more important to make a student profile to get an exact number of student under a particular category and also other important data for each category.
            </p>


            <p>
              The students profile based on the gender is shown in the table given below. The table shows the enrollment of student making gender the entity from, the year 2001 to 2007.The table clearly indicates the majority of male over female in the students that are enrolling in NIOS every year. This clearly signify, the male-female ratio (68:32) at NIOS has remained stable since 2003 for four consecutive years
            </p>

            <h3>Enrollment chart on the basis of Gender from 2001-2007</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Serial number</th>
                    <th>Academic year</th>
                    <th>Total enrollment</th>
                    <th>Male</th>
                    <th>Male %</th>
                    <th>Female</th>
                    <th>Female %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>2001-2002</td><td>214582</td><td>152286</td><td>70.97</td><td>62,296</td><td>29.03</td></tr>
                  <tr><td>2</td><td>2002-2003</td><td>278234</td><td>164550</td><td>59.14</td><td>113,684</td><td>40.86</td></tr>
                  <tr><td>3</td><td>2003-2004</td><td>321010</td><td>220103</td><td>68.57</td><td>100,907</td><td>31.43</td></tr>
                  <tr><td>4</td><td>2004-2005</td><td>238069</td><td>162351</td><td>68.19</td><td>75,718</td><td>31.81</td></tr>
                  <tr><td>5</td><td>2005-2006</td><td>267026</td><td>182440</td><td>68.32</td><td>84,586</td><td>31.68</td></tr>
                  <tr><td>6</td><td>2206-2007</td><td>290983</td><td>199788</td><td>68.66</td><td>91,195</td><td>31.34</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              All along the number of male students has been higher than that of female students. Rather than attributing this disparity to the functioning or the offerings of NIOS, it has a better and convincing explanation in the general national/Indian scenario, wherein the level of female participation in education is much lower than that of their male counterparts. Interestingly, however, the male-female ratio (68:32) at NIOS has remained stable since 2003 for four consecutive years. From the Indian viewpoint, it is a positive development that women’s enrolment is showing consistency and that NIOS board is making visible contributions in resolving the issue of access and equity at the secondary level of education, though the participation of girls and women has yet to reach a level that corresponds favourably with the national male-female literacy ratio169—75 per cent: 58 per cent.
            </p>

            <p>
              Nearly 80 per cent of the students at NIOS belong to the general category comprising the rural and the urban youth. About 20 per cent of the students enrolled belong to scheduled castes and tribes, which is close to the percentage of seats officially reserved for them. It goes to the credit of NIOS that it attracts a reasonable percentage of students from these two categories, as the percentage participation of these two categories of students in other educational institutions in the country remains a sore issue in the context of equity in the national provision for education
            </p>

            <h3>Enrollment chart On the basis of Student Category</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Categories</th>
                    <th>Year 2004-2005 Enrollment</th>
                    <th>%</th>
                    <th>Year 2005-2006 Enrollment</th>
                    <th>%</th>
                    <th>Year 2006-2007 Enrollment</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>General</td><td>183,668</td><td>77.15</td><td>214,667</td><td>80.39</td><td>231,334</td><td>79.50</td></tr>
                  <tr><td>2</td><td>Scheduled Castes</td><td>35,098</td><td>14.74</td><td>30,679</td><td>11.49</td><td>36,599</td><td>12.58</td></tr>
                  <tr><td>3</td><td>Scheduled Tribes</td><td>17,140</td><td>07.20</td><td>19,933</td><td>07.46</td><td>21,029</td><td>07.23</td></tr>
                  <tr><td>4</td><td>Ex- servicemen</td><td>324</td><td>00.14</td><td>304</td><td>00.11</td><td>434</td><td>00.15</td></tr>
                  <tr><td>5</td><td>Differently able</td><td>1,839</td><td>00.77</td><td>1,443</td><td>00.54</td><td>1,587</td><td>00.55</td></tr>
                  <tr><td colSpan="2">Total</td><td>238,069</td><td>100.00</td><td>267,026</td><td>99.99</td><td>290,983</td><td>100.01</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Enrollment chart on the basis of AGE</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Age in Years</th>
                    <th>Enrollment 2004-2005</th>
                    <th>%</th>
                    <th>Enrollment 2005-2006</th>
                    <th>%</th>
                    <th>Enrollment 2006-2007</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>10-14</td><td>2,967</td><td>01.25</td><td>8,662</td><td>03.24</td><td>10,873</td><td>03.74</td></tr>
                  <tr><td>2</td><td>15-20</td><td>190,555</td><td>80.03</td><td>204,791</td><td>76.67</td><td>215,233</td><td>73.95</td></tr>
                  <tr><td>3</td><td>21-25</td><td>30409</td><td>12.77</td><td>36,709</td><td>13.74</td><td>43,022</td><td>14.78</td></tr>
                  <tr><td>4</td><td>26- 30</td><td>7439</td><td>03.13</td><td>8,814</td><td>03.30</td><td>11,642</td><td>04.00</td></tr>
                  <tr><td>5</td><td>31-35</td><td>3288</td><td>01.38</td><td>3,961</td><td>01.48</td><td>5,122</td><td>01.76</td></tr>
                  <tr><td>6</td><td>36-40</td><td>1911</td><td>00.80</td><td>2,264</td><td>00.85</td><td>2,864</td><td>00.98</td></tr>
                  <tr><td>7</td><td>41-45</td><td>988</td><td>00.42</td><td>1,191</td><td>00.45</td><td>1,394</td><td>00.48</td></tr>
                  <tr><td>8</td><td>46-50</td><td>388</td><td>00.16</td><td>502</td><td>00.19</td><td>648</td><td>00.22</td></tr>
                  <tr><td>9</td><td>51-55</td><td>91</td><td>00.038</td><td>111</td><td>00.04</td><td>153</td><td>00.05</td></tr>
                  <tr><td>10</td><td>56-60</td><td>13</td><td>00.006</td><td>11</td><td>00.004</td><td>22</td><td>00.008</td></tr>
                  <tr><td>11</td><td>61-65</td><td>5</td><td></td><td>5</td><td></td><td>4</td><td></td></tr>
                  <tr><td>12</td><td>66-70</td><td>6</td><td></td><td>1</td><td></td><td>2</td><td></td></tr>
                  <tr><td>13</td><td>71-75</td><td>5</td><td></td><td>2</td><td></td><td>0</td><td></td></tr>
                  <tr><td>14</td><td>76-80</td><td>4</td><td>00.008</td><td>2</td><td>00.004</td><td>4</td><td>00.003</td></tr>
                  <tr><td colSpan="2">Total</td><td>238,069</td><td>99.99</td><td>267,026</td><td>99.97</td><td>290,983</td><td>99.97</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              The NIOS has therefore achieved a great success rate of increasing the literacy rate.The student profile helps in finding out the date easily to know the exact stats about the students by bifurcating them using these categories and the above charts tell volume just by examine them.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream (
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
