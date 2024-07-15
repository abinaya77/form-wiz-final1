import React, { useEffect, useState } from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import useAxiosSecure from "../../../../hooks/useAxiosSecure"
import useUser from "../../../../hooks/useUser"
import { Navigate, useNavigate } from 'react-router-dom'

const CheckoutPayment = ({price,cartItm}) => {
    const URL=`https://form-wiz.onrender.com/payment-info?${cartItm && `classId=${cartItm}`}`
    const stripe=useStripe();
    const elements=useElements();
    const axiosSecure=useAxiosSecure()
    const {currentUser,isLoading}=useUser()
    const[clientSecret,setClientSecret]=useState('');
    const[succeeded,setSucceeded]=useState('');
    const [message,setMessage]=useState('');
    const[cart,setCart]=useState([]);
    const navigate=useNavigate();

    if(price<0 || !price){
        return <Navigate to="/dashboard/my-selected"replace/>
    }

    useEffect(()=>{
        axiosSecure.get(`/cart/${currentUser?.email}`).then((res)=>{
            const classesId=res.data.map(item=>item._id);
            setCart(classesId)
        }

        ).catch((err)=>console.log(err))
    },[])
    //console.log(cart)

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price:price}).then(res=>{
            setClientSecret(res.data.clientSecret)
        })
    },[]);

    //handlesubmit 
    const handleSubmit =async (event)=>{
        setMessage('');
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card=elements.getElement(CardElement);
        if(card==null){
            return;
        }
        //payment method
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card
        });
        if(error){
            console.log(error);
            setMessage(error.message);
        }else{
            console.log('[PaymentMethod]',paymentMethod)
        }

        const {paymentIntent, error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    name:currentUser?.name || "unknown",
                    email:currentUser?.email ||"not defined",
                },
            }
        })
        if(confirmError){
            console.log("[Confirm Error]",confirmError)
        }else{
            console.log("[Payment Intent]",paymentIntent)
            if(paymentIntent.status==="succeeded"){
                const transactionId=paymentIntent.id;
                const paymentMethod=paymentIntent.payment_method;
                const amount=paymentIntent.amount/100;
                const currency=paymentIntent.currency;
                const paymentStatus=paymentIntent.status;
                const userName=currentUser?.name;
                const userEmail=currentUser?.email;

                const data={
                    transactionId,paymentMethod,amount,currency,paymentStatus,userName,userEmail,
                    classId:cartItm? [cartItm] : cart,
                    date:new Date()
                }
                
                fetch(URL,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(data)
                }).then(res=>res.json()).then(res=>{
                    console.log(res);
                    if(res.deletedResult.deletedCount>0 &&  res.paymentResult.insertedId &&res.updatedResult.modifiedCount>0 ){
                        setSucceeded('payment succedded--now you can access your classes')
                        navigate('/dashboard/enrolled-class')
                    }else{
                        setSucceeded('payment failed---please try again')
                    }
                }).catch(err=>console.log(err))
            }
        }


    }


  return (
    <>
    <div className='text-center'>
      <h1 className='text-2xl font-bold'>Payment Amount:<span className='text-secondary'>${price}</span></h1>
    </div>
    <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row gap-4 mt-10'>
            <div className='md:w-3/4'>
                
               <CardElement options={
                 {
                    base:{
                      fontSize:'16px',
                      color:'#424770',
                       '::placeholder':{
                        color:'#aab7c4,'
                    },
                 },
                 invalid:{
                    color:'#9e2146',
                 },
                 }
                }/>
                <button type="submit" disabled={isLoading || !stripe || !clientSecret} className='bg-secondary text-white py-2 px-4 rounded-lg mt-10 w-full '>pay</button>
                {message && <p className='text-red-500'>{message}</p>}
                {succeeded && <p className="text-green-500">{succeeded}</p>}
            </div>
        </div>
    </form>
    </>
    
  )
}

export default CheckoutPayment
