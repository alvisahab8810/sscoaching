import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import Download from '@/components/question-papers/paper-secondary-10th/Download'
import QuestionPapers from '@/components/question-papers/paper-secondary-10th/Filter'
import Contact from '@/components/question-papers/paper-secondary-12th/Contact'
import Hero from '@/components/question-papers/paper-secondary-12th/Hero'
import React from 'react'

export default function paperSeconday12th() {
  return (
    <div id='paper-secondary-10th'>
    <Header/>
    <Offcanvas/>
    <Hero/>
    <QuestionPapers/>
    <Contact/>
    <Download />
    <FAQ/>

    <Footer/>

    </div>
  )
}
