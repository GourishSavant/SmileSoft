
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import axiosApi from '../utils/axiosApi.js';
// function AdminDashboard() {


//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkAccess = async () => {
//             try {
//                 const accesstoken = localStorage.getItem("accesstoken");
//                 console.log('Hii access: ',accesstoken);
//                 if (!accesstoken) {
//                     toast.error("Please log in to access the dashboard.");
//                     navigate('/auth/login'); // Redirect to login page if no token
//                 } 
//             } catch (error) {
//                 console.error("Error verifying access token:", error);
//                 toast.error("Session expired. Please log in again.");
//                 navigate('/auth/login'); // Redirect if there's an error
//             }
//         };
//         checkAccess();
//     }, [navigate]);

//     const handleLogout = async () => {
//         await axiosApi.get('/auth/logout');
//         // Clear the token from localStorage
//         localStorage.removeItem("accesstoken");
//         localStorage.removeItem("role");
//         // Show logout success message
//         toast.success("Logged out successfully!");
//         // Redirect to the login page
//         navigate('/auth/login');
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="shadow-lg px-8 py-5 border w-55">
//                 <h2 className="text-2xl font-bold mb-4">Admin</h2>
//                 <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
//                 <p className="mb-6">You are logged in and can now access the dashboard.</p>
//                 <button
//                     className="w-full bg-red-600 text-white mt-4 py-2"
//                     onClick={handleLogout}
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// }
// export default AdminDashboard;
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/authSlice'; 
import axiosApi from '../utils/axiosApi.js';

function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access token and role from Redux state
    const { accessToken, role } = useSelector(state => state.auth);
    console.log("this is getting from admin dashboard page ",role)

    useEffect(() => {
      const checkAccess = () => {
          // if (!accessToken) {
          //     toast.error("Please log in to access the dashboard.");
          //     navigate('/auth/login'); 
          // }  else if (role!== 'Admin'){
          //     toast.error("You do not have the required permissions.");
          //     navigate('/unauthorized'); 
          // } else {
          //     navigate('/auth/v1/admin-dashboard'); 
          // }
          // not workking 
         try{
           if(!accessToken){
            navigate('/auth/login'); 
          }
         }catch(error){
          console.log(error);
         }
          if(accessToken && role ){
            if(role === 'Admin'){
              navigate('/auth/v1/admin-dashboard'); 
            }
          }
      };

      checkAccess();
  }, [accessToken, role, navigate]);

    const handleLogout = async () => {
        try {
            await axiosApi.get('/auth/logout');  // Perform the logout API call
            dispatch(logout());  // Dispatch the logout action to Redux to clear the session
            toast.success("Logged out successfully!");
            navigate('/auth/login');  // Redirect to the login page
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 border w-55">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
                <p className="mb-6">You are logged in and can now access the dashboard.</p>
                <button
                    className="w-full bg-red-600 text-white mt-4 py-2"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;