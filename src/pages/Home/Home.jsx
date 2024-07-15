import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import Gallery from './Gallery/Gallery'

const Home = () => {
  return (
    <section>
      <HeroContainer/>
      <Gallery/>
      <PopularTeacher/>
      
    </section>
  )
}

export default Home
