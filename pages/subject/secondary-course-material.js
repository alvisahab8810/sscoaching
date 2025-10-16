import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Offcanvas from '@/components/header/Offcanvas'
import FAQ from '@/components/home/FAQ'
import SubjectTable from '@/components/subjects/SecondaryCourseMaterial'
import SecondaryCourseMaterial from '@/components/subjects/SecondaryCourseMaterial'

import React from 'react'

export default function TmaSrsecondary12th() {
  return (
    <div id='paper-secondary-10th'>
    <Header/>
    <Offcanvas/>

    <SubjectTable/>


    <FAQ/>
  
    <Footer/>

    </div>
  )
}
