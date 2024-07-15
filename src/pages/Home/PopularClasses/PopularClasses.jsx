import React, { useEffect, useState } from 'react'
import useAxiosFetch  from '../../../hooks/useAxiosFetch'
import Card from './Card';

const PopularClasses = () => {
    const axiosFetch =useAxiosFetch();
    const [classes,setClasses]=useState([]);
    useEffect(()=>{
        const fetchClasses =async()=>{
            const response=await axiosFetch.get('/classes');
            console.log(response.data);
            setClasses(response.data);
        }
        fetchClasses();

    },[])

    console.log(classes);


  return (
    <div className='md:w-[80%]mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Popular</span> Classes</h1>
        <div className='w-[405] text-centermx-auto my-4'>
            <p className='text-grey-500 dark:text-white'>Explore our popular classes.here is some popular classes based on many students enrollment</p>
        </div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          classes.slice(0,3).map((item,index)=><Card key={index} item={item}/>)
        }
      </div>
    </div>
  )
}

export default PopularClasses
