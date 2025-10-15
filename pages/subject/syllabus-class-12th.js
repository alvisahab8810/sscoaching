import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import Contact from '@/components/question-papers/paper-secondary-10th/Contact'
import Download from '@/components/question-papers/paper-secondary-10th/Download'
import QuestionPapers from '@/components/question-papers/paper-secondary-10th/Filter'
import Hero from '@/components/subjects/syllabus/Hero'
import SeniosSecondary from '@/components/subjects/syllabus/SeniosSecondary'
import React from 'react'

export default function SyllabusClass12th() {
  return (
    <div id='paper-secondary-10th'>
    <Header/>
    <Offcanvas/>
    <Hero/>
    <SeniosSecondary/>
  
    <Footer/>

    </div>
  )
}
