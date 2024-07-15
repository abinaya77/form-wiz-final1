import {
    FaInstagram,
    FaDribbble,
    FaXTwitter,
    FaYoutube,
  } from "react-icons/fa6";
  import { MdLocationPin } from "react-icons/md";
  import { MdOutlineEmail } from "react-icons/md";
  import { FaPhoneAlt } from "react-icons/fa";
  
  

const Endfoot = () => {
    const year=new Date().getFullYear()
    console.log(year)
    
      const showAlert =()=>{
         alert('subscribed to newsletter!'); // Replace with your desired alert message or function
      }
   
    const socialLinks = [
        { label: "YouTube", icon: FaYoutube },
        { label: "Instagram", icon: FaInstagram },
      ];
    
      const links = [
        [
          { label: "Company", key: "header-1" },
          { label: "About us", key: "item-1-1",href: "/aboutus" },
          { label: "Contact us", key: "item-1-2",href: "/aboutus" },
          { label: "Privacy Policy", key: "item-1-3" ,href: "/privacy"},
          { label: "Terms of service", key: "item-1-4",href: "/termsofservice" },
        ]
        
      ];
      return (
        <div className="app min-h-screen flex items-end justify-center font-poppins">
          <div className="py-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 bg-yellow-100 text-black w-full p-4 relative">
            <div className="  ">
              
              
            </div>
            
            <div className="footer-form flex flex-col items-start ">
              <label className="text-lg ml-2 font-semibold text-center px-20 items-center text-black">
                Stay up to date 
              </label>
              <div className="flex items-center ml-4">
              <input
                type="email"
                placeholder="Subscribe to our email"
                className="mt-2 w-full border-none rounded-lg py-3 px-6"
              />
              <button onClick={()=>showAlert()} className='inline-block mt-2  rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Submit</button>
              </div>
              <div className="infos mt-10 text-gray-800"> 
                <span>Copyright Form Wizard © {year}</span>
                <span>All rights reserved</span>
              </div>
              
              
            </div>
            
          </div>
        </div>
      );
    };

   
  

export default Endfoot
