import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAxiosFetch from "../../../../../hooks/useAxiosFetch"
import useUser from '../../../../../hooks/useUser';
import moment from "moment";

const MyPaymentHistory = () => {
  const axiosFetch=useAxiosFetch();
  const axiosSecure=useAxiosSecure();
  const {currentUser}=useUser();
  const[payments,setPayments]=useState([]);
  const[loading,setLoading]=useState(true);
  const[paginatedPayments,setPaginatedPayments]=useState([]);
  const totalItem=payments.length;
  const[page,setPage]=useState(1);
  let totalPage=Math.ceil(totalItem/5);
  let itemsPerPage=5;

  const handleChange=(event,value)=>{
    setPage(value);
  }

  useEffect(()=>{
    const lastIndex=page * itemsPerPage;
    const firstIndex= lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex,lastIndex);
    setPaginatedPayments(currentItems)

  },[page,payments])
  
  useEffect(()=>{
    axiosFetch.get(`/payment-history/${currentUser?.email}`)
    .then(res=>{
      setPayments(res.data);
      setLoading(false)
    }).catch(err=>console.log(err))
  },[currentUser?.email])

  const totalPaidAmount= payments.reduce((acc,curr)=> acc + curr.amount,0);

  if(loading){
    return <p>Loading...</p>
  }


  return (
    <div>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>Hey,<span className='text-secondary font-bold'>{currentUser?.name}</span>welcome</p>
        <h1 className='text-4xl font-bold'>My <span className='text-secondary'>Payment </span> History</h1>
        <p className='text-gray-500 text-sm my-3'>you can see your payment history here</p>
      </div>  

      {/**table here */} 
      <div>
        <div>
          <p className='font-bold'>Total Payments : {payments.length}</p>
          <p className='font-bold'>Total Paid :{totalPaidAmount}</p>
        </div>

        <div>
          <div>
            <table className='w-full flex justify-between items-center'>
                  <thead>
                    <tr>
                      <th className='text-left font-semibold'>#</th>
                      <th className='text-left font-semibold px-5'>Price</th>
                      <th className='text-left font-semibold px-5'>Currency</th>
                      <th className='text-left font-semibold px-5'>Date</th>
                    </tr>
                    <tbody>
                      {
                        paginatedPayments.map((payment,idx)=>(
                          <tr>
                            <td>{idx+1}</td>
                            <td className='whitespace-nowrap px-6 py-4'>${payment.amount}</td>
                            <td className='whitespace-nowrap px-6 py-4'>{payment.currency}</td>
                            <td className='whitespace-nowrap px-6 py-4'>{payment.date}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </thead>
            </table>

            <div className=' h-12 w-12 rounded bg-green-500' style={{ marginTop: '20px' }}>
            {Array.from({ length: totalPage }, (_, index) => (
              <button  className='  btn btn-primary  text-center px-6 py-3 text-white'key={index + 1} onClick={() => handleChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default MyPaymentHistory
