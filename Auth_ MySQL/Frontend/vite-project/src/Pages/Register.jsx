
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; 
import axiosApi from '../utils/axiosApi.js';

function Register() {
    const [value, setValue] = useState({
        fullName: "",  
        email: "",
        password: "",
        role: "",  
    });

    const navigate = useNavigate();


    const handleChanges = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value, // Correctly bind the name to the state
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all fields are filled out
        if (!value.fullName || !value.email || !value.password || !value.role) {
            toast.error('All fields are required!');
            return;
        }
        try {
            // Show a loading toast when sending the request
            toast.info('Registering... Please wait.');
            // Send data to the backend with the correct endpoint and payload
            const response = await axiosApi.post('/auth/register', value);
            if (response.status === 201) {
                toast.success('Registered successfully!');
                // Redirect to login page after successful registration
                navigate("/auth/login");
            }
        } catch (error) {
            console.log("Error registering:", error);
            toast.error('Registration failed. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 border w-55">
                <h2 className="text-lg font-bold mb-4"> Register </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Full Name" 
                            name="fullName" 
                            value={value.fullName}
                            onChange={handleChanges} 
                        />
                    </div>
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
                    {/* Creating the radio button for selecting role */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <div className="flex space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={value.role === "student"}
                                    onChange={handleChanges}
                                    className="mr-2"
                                />
                                Student
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={value.role === "teacher"}
                                    onChange={handleChanges}
                                    className="mr-2"
                                />
                                Teacher
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={value.role === "admin"}
                                    onChange={handleChanges}
                                    className="mr-2"
                                />
                                Admin
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="superAdmin"
                                    checked={value.role === "superAdmin"}
                                    onChange={handleChanges}
                                    className="mr-2"
                                />
                                SuperAdmin
                            </label>
                        </div>
                    </div>
                    <button className="w-full bg-green-600 text-white mt-4 py-2">Submit</button>
                </form>
                <div>
                    <p className="text-center"><span>Already have an account? </span>
                    <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">Login</Link></p>                
                </div>
            </div>

            {/* ToastContainer to display toast notifications */}
            <ToastContainer />
        </div>
    );
}

export default Register;
// src/components/Register.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; 
// import { toast, ToastContainer } from 'react-toastify'; 
// // import axiosApi from '../utils/axiosApi';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../redux/authSlice';
// import axios from 'axios'

// function Register() {
//     const [value, setValue] = useState({
//         fullName: "",  
//         email: "",
//         password: "",
//         role: "",  
//     });

//     const navigate = useNavigate();
//     const dispatch = useDispatch();  // Dispatch Redux actions

//     const handleChanges = (e) => {
//         setValue({
//             ...value,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Check if all fields are filled out
//         if (!value.fullName || !value.email || !value.password || !value.role) {
//             toast.error('All fields are required!');
//             return;
//         }
//         try {
//             // Show loading toast while registering
//             toast.info('Registering... Please wait.');
            
//             // Send the registration data to the backend
//             const response = await axios.post('http://localhost:5000/auth/register',value,{
//                 headers:{
//                     'Content-Type':'application/json'
//                   },
//                   withCredentials:true
//             });
//             console.log(response)
//             if (response.status === 201) {
//                 toast.success('Registered successfully!');
                
//                 // Destructure the response data
//                 const { accesstoken, user } = response.data;
//                 const role = user.role.toLowerCase();

//                 // Store the access token and role in localStorage
//                 localStorage.setItem('accesstoken', accesstoken);
//                 localStorage.setItem('role', role);

//                 // Dispatch Redux action to update the user state
//                 dispatch(setUser({ accessToken: accesstoken, role, user }));

//                 // Redirect to login page after a short delay to allow Redux state update
//                 setTimeout(() => {
//                     navigate("/auth/login");
//                 }, 1000);  // Short delay to ensure Redux state update
//             }
//         } catch (error) {
//             console.log("Error registering:", error);
//             toast.error('Registration failed. Please try again later.');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="shadow-lg px-8 py-5 border w-55">
//                 <h2 className="text-lg font-bold mb-4"> Register </h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
//                         <input 
//                             type="text" 
//                             className="w-full px-3 py-2 border"
//                             placeholder="Enter Full Name" 
//                             name="fullName" 
//                             value={value.fullName}
//                             onChange={handleChanges} 
//                         />
//                     </div>
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
//                     {/* Role Selection */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Role</label>
//                         <div className="flex space-x-6">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={value.role === "student"}
//                                     onChange={handleChanges}
//                                     className="mr-2"
//                                 />
//                                 Student
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="teacher"
//                                     checked={value.role === "teacher"}
//                                     onChange={handleChanges}
//                                     className="mr-2"
//                                 />
//                                 Teacher
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="admin"
//                                     checked={value.role === "admin"}
//                                     onChange={handleChanges}
//                                     className="mr-2"
//                                 />
//                                 Admin
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="role"
//                                     value="superAdmin"
//                                     checked={value.role === "superAdmin"}
//                                     onChange={handleChanges}
//                                     className="mr-2"
//                                 />
//                                 SuperAdmin
//                             </label>
//                         </div>
//                     </div>
//                     <button className="w-full bg-green-600 text-white mt-4 py-2">Submit</button>
//                 </form>
//                 <div>
//                     <p className="text-center"><span>Already have an account? </span>
//                     <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">Login</Link></p>                
//                 </div>
//             </div>

//             {/* ToastContainer to display toast notifications */}
//             <ToastContainer />
//         </div>
//     );
// }

// export default Register;



