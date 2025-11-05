import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import Popup from '@/components/home/Popup'
import Contact from '@/components/question-papers/paper-secondary-10th/Contact'
import Download from '@/components/question-papers/paper-secondary-10th/Download'
import QuestionPapers from '@/components/question-papers/paper-secondary-10th/Filter'
import Hero from '@/components/question-papers/paper-secondary-10th/Hero'
import React from 'react'

export default function paperSeconday10th() {
  return (
    <div id='paper-secondary-10th' >
    <Header/>
    <Offcanvas/>
    <Hero/>
    <QuestionPapers/>
    <Contact/>
    <Download />
    <FAQ/>

    <Footer/>

    <Popup/>

    </div>
  )
}
