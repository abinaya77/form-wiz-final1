import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/effect-creative'
import {EffectCreative}from 'swiper'
import Hero from './Hero'

const HeroContainer = () => {
  return (
    <section>
        <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
            prev:{
                shadow:true,
                translate:["-120"]
            },
            next:{
                shadow:true,
                translate:["-120"]
            }
        }}
        modules={[EffectCreative]}
        className='mySwiper5'
        loop={true}
        autoplay={
            {
                delay:250,
                disableOnInteraction:false,
            }
        }
        >
            <SwiperSlide><Hero/></SwiperSlide>
           
        </Swiper>

    </section>
  )
}

export default HeroContainer
