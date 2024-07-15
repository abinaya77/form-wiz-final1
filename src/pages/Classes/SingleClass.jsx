import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import {FaUser ,FaLanguage,FaLevelUpAlt,FaUsers}from "react-icons/fa"
import {DialogActions} from "@mui/material"
import {BiTime} from "react-icons/bi"
import {GiClassicalKnowledge} from "react-icons/gi"
import {MdBookOnline} from "react-icons/md"
import bannerImg1 from "../../assets/home/banner-1.jpg"

const SingleClass = () => {
    const course=useLoaderData();
    //console.log(course)
    const {currentUser}=useUser();
    //console.log(currentUser.role);
    const [enrolledClasses,setEnrolledClasses]=useState([]);
    const axiosFetch=useAxiosFetch();
    const axiosSecure=useAxiosSecure();
    const navigate = useNavigate();

    const handleSelect = (id) => {
        console.log(id);
        if (!currentUser) {
          alert("Please login first");
          return navigate("/login");
        }
    
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
          .then((res) => setEnrolledClasses(res.data))
          .catch((err) => console.log(err));
    
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
          .then(res => {
            if (res.data.clasId === id) {
              return alert("Already selected");
            } else if (enrolledClasses.find(item => item.classes._id === id)) {
              return alert("Already enrolled");
            } else {
              const data = {
                clasId: id,
                userMail: currentUser.email,
                date: new Date()
              };
              axiosSecure.post('/add-to-cart', data)
                .then(res => {
                  alert("Successfully added to cart");
                  console.log(res.data);
                });
            }
          });
      };
  return (
    <>
    <div className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%]
    mx-auto' data-new-gr-c-s-check-loaded="14.1157.0"
    data-gr-ext-installed=""
    >
        {/**breadcrum or header banner */}
        <div className='breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
            <div className='container text-center'>
                <h2 className='font-bold '>Course Details</h2>
            </div>
        </div>

        <div className='nav-tab-wrapper tabs section-padding mt-8'>
            <div className='container'>
                <div className='grid grid-cols-12 md:gap-[30px]'>
                    {/**left side page grid */}
                    <div className='lg:col-span-8 col-span-12'>
                        <div>
                            <img src={course?.image} alt=""
                            className='rounded-md object-fut w-full h-full block'
                            />
                        </div>
                        <h2 className='text-2xl mb-2'> {course?.name} </h2>

                        <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center '>
                            <div className='flex space-x-4 items-center group'>
                                <div className='flex-none'>
                                    <div className='h-12 w-12 rounded'>
                                        <img 
                                          src={course?.image}
                                          alt=""
                                          className='object-cover w-full h-full rounded'
                                        />
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <p className='text-secondary '>Trainer
                                        <a href="#" className='text-black'>
                                            :{course.instructorName}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div>
                               <span className='text-secondary'> Last Update:
                                <a href="#" className='text-black ml-1'>
                                    {new Date(course.submitted).toLocaleDateString()}
                                </a>
                               </span>
                            </div>
                        </div>

                        <div className='new-tab-wrapper mt-12'>
                            <ul id="tabs-nav" className='course-tab mb-8'>
                                <li className='active'>
                                    <a href="#tab1">Overview</a>
                                </li>
                                <li>
                                    <a href="#tab2">Curriculam</a>
                                </li>
                                <li>
                                    <a href="#tab3">Instructor</a>
                                </li>
                                <li>
                                    <a href="#tab4">Reviews</a>
                                </li>
                            </ul>
                            <div id="tabs-content">
                                <div id="tab1" className='tab-content'>
                                    <div>
                                        <h3 className='text-2xl mt-8'> Course Description</h3>
                                        <p className='mt-4'>
                                        Yoga is an Art and Science of healthy living. It is a spiritual discipline based on an extremely subtle science, which focuses on bringing harmony between mind and body. The holistic approach of Yoga brings harmony to all walks of life. 
                                        <br/><br/>Yoga is also known for disease prevention, promotion of health and management of many lifestyle-related disorders. Through this Essay on Yoga,
                                        students will get to know the importance and benefits of performing yoga. By going through this essay, students will get different ideas on how to write an effective Essay on Yoga in English to score full marks in the writing section.
                                        </p>

                                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                            <h4 className='text-2xl'>What you will learn</h4>
                                            <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt=""/>
                                                    </div>
                                                    <div className='flex-1'>
                                                        Learn how perspective works and how to incorporate your art
                                                    </div>
                                                </li>

                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt=""/>
                                                    </div>
                                                    <div className='flex-1'>
                                                        Learn how perspective works and how to incorporate your art
                                                    </div>
                                                </li>

                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt=""/>
                                                    </div>
                                                    <div className='flex-1'>
                                                        Learn how perspective works and how to incorporate your art
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className='text-2xl'>What you will learn</h4>
                                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt=""/>
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Computer/Mobile
                                                    </span>
                                                </div>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt=""/>
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Paper &amp;pencil
                                                    </span>
                                                </div>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt=""/>
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Internet Connection
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="tab2" className='tab-content'>
                                    <div>
                                        <h3>Lesson Plan</h3>
                                        <p className='mt-4'>
                                        he word yoga literally means “to yoke” or “union”. More than just a practice of physical exercises, Yoga is the coming together of the individual self or consciousness, 
                                        with the infinite universal consciousness or spirit. Yoga is a method of inquiry into the nature of the mind, which emphasises practice and direct experience. Yoga is an ancient art based on a harmonising system for development of the body, mind, and spirit.
                                        Yoga signifies the ‘integration of personality at the highest level. It includes various practices and techniques mentioned in the yogic literature and is collectively referred to as Yoga.
                                        </p>
                                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                            <h4 className='text-2xl'>This course is for beggineers</h4>
                                        </div>
                                        <div>
                                            <h4 className='text-2xl'>What You will learn</h4>
                                            <p className='mt-4'>Yoga encourages a positive and healthy lifestyle for the physical, mental and emotional health of children. Yoga helps in the development of strength, stamina, endurance and high energy at the physical level. It also empowers oneself with increased concentration, calm, peace and contentment at a mental level leading to inner and outer harmony. With the help of yoga, 
                                            you can manage daily stress and its consequences.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/**right side */}
                    <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                        <div className='sidebarWrapper space-y-[30px]'>
                            <div className='wdiget custom-text space-y-5'>
                                <a className='h-[220px] rounded relative block' href="#">
                                    <img src={course.image } alt=""
                                    className='block w-full h-full object-cover rounded'/>
                                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                      <img src="/play.png"/>
                                    </div>
                                </a>
                                <h3>${course.price}</h3>
                                <button onClick={()=>handleSelect(course._id)} 
                                   title={course.role==='admin' ||course.role==='instructor'?'Instructor/Admin can not select'?course.availableSeats<1:'no seat available':'you can select this class'}
                                   disabled={course.role==='admin'||course.role==='instructor'||course.availableSeats<1} className='btn btn-primary w-full text-center bg-secondary py-2 text-white px-6'
                                   >Enroll
                                </button> 
                                <ul className='list'>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <FaUser className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Instructor
                                             </div>
                                        </div>
                                        <div className='flex-none'>{course.instructorName}</div>
                                    </li>

                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <MdBookOnline className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Lectures
                                             </div>
                                        </div>
                                        <div className='flex-none'>23</div>
                                    </li>

                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <BiTime className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Duration
                                             </div>
                                        </div>
                                        <div className='flex-none'>2 Hr 30 Min</div>
                                    </li>

                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <FaUsers className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Enrolled
                                             </div>
                                        </div>
                                        <div className='flex-none'>{course?.totalEnrolled}</div>
                                    </li>

                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <FaLevelUpAlt className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Course Level
                                             </div>
                                        </div>
                                        <div className='flex-none'>Intermediate</div>
                                    </li>

                                    <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                           <FaLanguage className='inline-flex'/>
                                            <div className='text-black font-semibold'>
                                               Language
                                             </div>
                                        </div>
                                        <div className='flex-none'>English</div>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                   </div>


                </div>

                
            </div>
            
        </div>
        
    </div>
    </>
  )
}

export default SingleClass
