import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import Popup from '@/components/home/Popup'
import Contact from '@/components/subjects/syllabus/Contact'
import Download from '@/components/subjects/syllabus/Download'
import Hero10th from '@/components/subjects/syllabus/Hero10th'
import SyllabusSecondary from '@/components/subjects/syllabus/SyllabusSecondary'
import TmaHero from '@/components/subjects/syllabus/TmaHero'
import TmaSubjects from '@/components/subjects/syllabus/TmaSubjects'
import React from 'react'

export default function SyllabusClass12th() {
  return (
    <div id='paper-secondary-10th' className='paper-secondary-10th paper-secondary-12th'>
    <Header/>
    <Offcanvas/>
    <TmaHero/>
    <TmaSubjects/>
    <Download/>

    <Contact/>
    <FAQ/>
  
    <Footer/>
    <Popup/>

    </div>
  )
}
