import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import CourseDetail from "../pages/Dashboard/Student/Enroll/CourseDetail";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourse from "../pages/Dashboard/Instructor/PendingCourse";
import ApprovedCourse from "../pages/Dashboard/Instructor/ApprovedCourse";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManagaUsers from "../pages/Dashboard/Admin/ManagaUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import Aboutus from "../pages/About/Aboutus";
import Privacypolicy from "../components/footers/Privacypolicy";
import Terms from "../components/footers/Terms";
import App from "../layout/DashboardLayout/App";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[{
        path:"/",
        element:<Home/>
      },
      {
        path:"/createform",
        element:<App/>
      },
      {
        path:"/classes",
        element:<Classes/>
      },
      {
        path:"/aboutus",
        element:<Aboutus/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/class/:id",
        element:<SingleClass/>,
        loader:({params})=>fetch(`https://form-wiz.onrender.com/class/${params.id}`)
      },
      {
        path:"/privacy",
        element:<Privacypolicy/>
      },
      {
        path:"/termsofservice",
        element:<Terms/>
      },
    ]
    },
    {
      path:"/dashboard",
      element:<DashboardLayout/>,
      children:[{
        index:true,
        element:<Dashboard/>
      },
      //student dashboard route
      {
        path:"student-cp",
        element:<StudentCP/>
      },
      {
        path:"enrolled-class",
        element:<EnrolledClasses/>
      },
      {
        path:"my-selected",
        element:<SelectedClass/>
      },
      {
        path:"my-payments",
        element:<MyPaymentHistory/>
      },
      {
        path:"apply-instructor",
        element:<AsInstructor/>
      },
      {
        path:"user/payment",
        element:<Payment/>
      },
      {
        path:"course-details",
        element:<CourseDetail/>
      },

      //instructor dashboard
      {
        path:"instructor-cp",
        element:<InstructorCP/>
      },
      {
        path:"add-class",
        element:<AddClass/>
      },
      {
        path:"my-classes",
        element:<MyClasses/>
      },
      {
        path:"my-pending",
        element:<PendingCourse/>
      },
      {
        path:"my-approved",
        element:<ApprovedCourse/>
      }, 

      //Admin dashboard
      {
        path:"admin-home",
        element:<AdminHome/>
      },
      {
        path:"manage-class",
        element:<ManageClasses/>
      },
      {
        path:"manage-users",
        element:<ManagaUsers/>
      },
      {
        path:"update-user/:id",
        element:<UpdateUser/>,
        loader:({params})=>fetch(`https://form-wiz.onrender.com/users/${params.id}`)
      }
    ]
    }
  ]);
  

