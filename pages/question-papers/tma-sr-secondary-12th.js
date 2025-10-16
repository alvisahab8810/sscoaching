import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'

import TmaSrContact from '@/components/subjects/syllabus/TmaSrContact'
import TmaSrDownload from '@/components/subjects/syllabus/TmaSrDownload'
import TmaSrHero from '@/components/subjects/syllabus/TmaSrHero'
import TmaSrSubjects from '@/components/subjects/syllabus/TmaSrSubjects'
import React from 'react'

export default function TmaSrsecondary12th() {
  return (
    <div id='paper-secondary-10th'>
    <Header/>
    <Offcanvas/>

    <TmaSrHero/>
    <TmaSrSubjects/>
    <TmaSrContact/>

    <TmaSrDownload/>

    <FAQ/>
  
    <Footer/>

    </div>
  )
}
