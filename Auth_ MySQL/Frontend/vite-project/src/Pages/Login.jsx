// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosApi from '../utils/axiosApi.js';


// function Login() {
//     // State for form inputs
//     const navigate = useNavigate();
//     const [value, setValue] = useState({
//         email: "",
//         password: ""
//     });

//     useEffect(() => {
//         // Check if the user is already logged in
//         const accesstoken = localStorage.getItem("accesstoken");
//         const role = localStorage.getItem("role")?.toLowerCase();
//         if (accesstoken && role) {
//             // Redirect to the appropriate dashboard
//             if (role === "admin") {
//                 navigate("/auth/v1/admin-dashboard");
//             } else if (role === "teacher") {
//                 navigate("/auth/v1/teacher-dashboard");
//             } else if (role === "student") {
//                 navigate("/auth/v1/student-dashboard");
//             } else if (role === "superadmin") {
//                 navigate("/auth/v1/super-admin-dashboard");
//             }
//         }
//     }, [navigate]);


//     // Handle input changes
//     const handleChanges = (e) => {
//         const { name, value } = e.target;
//         setValue((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
    
//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         try {
//             const response = await axiosApi.post('/auth/login', value);
//             console.log("getting data from login ", response);
//             // Store tokens in localStorage
//             localStorage.setItem('accesstoken', response.data.accesstoken);
//             localStorage.setItem('role', response.data.user.role);
//             console.log("role from login", response.data.user.role);
//             console.log("accessToken from login", response.data.accesstoken);
//             console.log("Naveen: ",localStorage.getItem('accesstoken'));
//             console.log(localStorage.getItem('role'));
    
//             // Check role and navigate
//             const role = localStorage.getItem('role')?.toLowerCase();
//             if (role === "admin") {
//                 navigate('/auth/v1/admin-dashboard');
//             } else if (role === "teacher") {
//                 navigate('/auth/v1/teacher-dashboard');
//             } else if (role === "student") {
//                 navigate('/auth/v1/student-dashboard');
//             } else if (role === "superadmin") {
//                 navigate('/auth/v1/super-admin-dashboard');
//             } else {
//                 navigate('/auth/login');
//             }

//         } catch (error) {
//             console.log("Error registering:", error);
//             toast.error('Login failed. Please try again!');
//         }
//     };
    
//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="shadow-lg px-8 py-5 border w-80">
//                 <h2 className="text-lg font-bold mb-4">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             className="w-full px-3 py-2 border"
//                             placeholder="Enter email"
//                             name="email"
//                             value={value.email}
//                             onChange={handleChanges}
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             className="w-full px-3 py-2 border"
//                             placeholder="Enter password"
//                             name="password"
//                             value={value.password}
//                             onChange={handleChanges}
//                         />
//                     </div>
//                     <button className="w-full bg-green-600 text-white mt-4 py-2">Login</button>
//                 </form>
                // <div>
                //     <p className="text-center">
                //         <span>Don't have an account? </span>
                //         <Link to="/auth/register" className="text-blue-500 hover:text-blue-700">
                //             Sign Up
                //         </Link>
                //     </p>
                //     <p>
                //         <Link to="/auth/RequestResetPassword" className="text-blue-500 items-center  hover:text-blue-700">
                //             forgot Password
                //         </Link>
                //     </p>
                // </div>
//             </div>
//         </div>
//     );
// }
// export default Login;



// // src/components/Login.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosApi from '../utils/axiosApi'; // Ensure axiosApi is correctly imported
// import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/authSlice';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [value, setValue] = useState({
//     email: "",
//     password: "",
//   });

  // useEffect to check if user is already logged in
  // useEffect(() => {
  //   const accesstoken = localStorage.getItem("accesstoken");
  //   const role = localStorage.getItem("role")?.toLowerCase();
  //   if (accesstoken && role) {
  //     // Avoid unnecessary re-renders by directly navigating based on role
  //     if (role === "admin") {
  //       navigate("/auth/v1/admin-dashboard");
  //     } else if (role === "teacher") {
  //       navigate("/auth/v1/teacher-dashboard");
  //     } else if (role === "student") {
  //       navigate("/auth/v1/student-dashboard");
  //     } else if (role === "superadmin") {
  //       navigate("/auth/v1/super-admin-dashboard");
  //     }
  //   }
  // }, [navigate]); // Only re-run this effect when `navigate` changes (should not change often)

  import { useState } from "react";
  import { useNavigate ,Link} from "react-router-dom";
  import { toast } from "react-toastify";
  import axiosApi from '../utils/axiosApi'; // Ensure axiosApi is correctly imported
  import { useDispatch } from 'react-redux';
  import { setUser } from '../redux/authSlice';
  
  const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({
      email: "",
      password: "",
    });
  
    // Handles input changes for email and password
    const handleChanges = (e) => {
      const { name, value } = e.target;
      setValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Handles form submission for login
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Sending the login request
        const response = await axiosApi.post('/auth/login', value);
        const { accesstoken, user } = response.data;
        const role = user.role; 
  
        // Store token and role in localStorage
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('role', role);
  
        // Dispatch action to set user data in Redux
        dispatch(setUser({ accessToken: accesstoken, role, user }));
        if(setUser.role == role ){
          console.log("suceess")
        }
  
        // Redirect to the appropriate dashboard based on the role
        if (role === "Admin") {
          navigate('/auth/v1/admin-dashboard');
        } else if (role === "teacher") {
          navigate('/auth/v1/teacher-dashboard');
        } else if (role === "student") {
          navigate('/auth/v1/student-dashboard');
        } else if (role === "superAdmin") {
          navigate('/auth/v1/super-admin-dashboard');
        }
      } catch (error) {
        console.log("Error logging in:", error);
        toast.error('Login failed. Please try again!');
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="shadow-lg px-8 py-5 border w-80">
          <h2 className="text-lg font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter email"
                name="email"
                value={value.email}
                onChange={handleChanges}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="Enter password"
                name="password"
                value={value.password}
                onChange={handleChanges}
              />
            </div>
            <button className="w-full bg-green-600 text-white mt-4 py-2">Login</button>
          </form>
          <div>
                    <p className="text-center">
                        <span>Don't have an account? </span>
                        <Link to="/auth/register" className="text-blue-500 hover:text-blue-700">
                            Sign Up
                        </Link>
                    </p>
                    <p>
                        <Link to="/auth/RequestResetPassword" className="text-blue-500 items-center  hover:text-blue-700">
                            forgot Password
                        </Link>
                    </p>
                </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
  











