import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from "moment";

const ApprovedCourse = () => {
  const [classes, setClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`)
            .then(res => {
                // Filter classes where status is "pending"
                const pendingClasses = res.data.filter(cls => cls.status === "approved");
                setClasses(pendingClasses);
                console.log("length is", pendingClasses.length);
            })
            .catch(err => console.log(err));
    }, [isLoading]);

    const handleFeedback = (classId) => {
        // Implement your feedback handling logic here
        console.log("Handle feedback for class:", classId);
    };

    return (
        <div>
            <div className='my-10'>
                <h1 className='text-4xl font-bold text-center'> My Pending Classes</h1>
                <p className='text-[12px] text-center my-2'>Here you can see all your pending classes and reviews</p>
            </div>
            <div>
                {
                    classes.length === 0 ? (
                        <div className='text-2xl font-bold text-center mt-10'>You don't have any pending classes!</div>
                    ) : (
                        classes.map((cls, index) => (
                            <div key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                                <div className='bg-white flex rounded-lg gap-8'>
                                    <div>
                                        <img src={cls?.image} className='max-h-[200px] max-w-[300px]' alt={cls.name} />
                                    </div>
                                    <div className='w-full '>
                                        <h2 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h2>
                                        <div className='flex flex-wrap justify-between'>
                                            <div className='w-1/3 pr-4'>
                                                <div>
                                                    <h1 className='font-bold mb-3'>Some Info :</h1>
                                                    <h1 className='text-secondary'><span className='text-black'>Total Student :</span> {cls.totalEnrolled ? cls.totalEnrolled : 0}</h1>
                                                    <h1 className='text-secondary'><span className='text-black'>Total Seats :</span> {cls.availableSeats}</h1>
                                                    <h1 className='text-secondary my-2'>
                                                        <span className='text-black'>Status :</span>
                                                        <span className={`font-bold ${cls.status === "pending" ? "text-orange-400" : cls.status === "checking" ? "text-yellow-300" : cls.status === "approved" ? "text-green-500" : "text-red-600"}`}>
                                                            {cls.status}
                                                        </span>
                                                    </h1>
                                                </div>
                                            </div>

                                            <div className='w-1/3 pr-4'>
                                                <div>
                                                    <h1 className='font-bold mb-3'>....</h1>
                                                    <h1 className='text-secondary'><span className='text-black'>Price :</span>{cls.price}<span className='text-black'>$</span></h1>
                                                    <h1 className='text-secondary my-2'><span className='text-black'>Submitted:</span><span>{cls.submitted ? moment(cls.submitted).format("MMMM Do YYYY") : "not got data"}</span></h1>
                                                </div>
                                            </div>

                                            <div className='w-1/3'>
                                                <div>
                                                    <h1 className='font-bold mb-3'>Action :</h1>
                                                    <button onClick={() => handleFeedback(cls._id)} className='px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg'>View Feedback</button>
                                                    <button className='px-3 bg-green-400 font-bold py-1 text-white w-full my-3 rounded-lg'>View Details</button>
                                                    <button onClick={() => navigate(`/dashboard/update/${cls._id}`)} className='px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg'>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};
  


export default ApprovedCourse
