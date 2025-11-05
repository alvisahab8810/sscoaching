import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import Popup from '@/components/home/Popup'
import Hero10th from '@/components/subjects/syllabus/Hero10th'
import SyllabusSecondary from '@/components/subjects/syllabus/SyllabusSecondary'
import React from 'react'

export default function SyllabusClass12th() {
  return (
    <div id='paper-secondary-10th'>
    <Header/>
    <Offcanvas/>
    <Hero10th/>
    <SyllabusSecondary/>
  
    <Footer/>
    <Popup/>

    </div>
  )
}
