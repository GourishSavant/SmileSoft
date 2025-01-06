// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosApi from "../../api/axiosApi";
// const AdminLoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Fetch JSON data (make sure the path is correct)
//       // const response = await fetch("/admin/logindata.json");
//       const response = await axiosApi.post('/auth/login', value);
//       const { accesstoken, user } = response.data;
//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       // const users = await response.json();

//       /*Check if usersMaster is already available or not
//       If exits don't re-create*/
//       let getUsersMasterData = JSON.parse(localStorage.getItem("usersMaster"));
//       if (getUsersMasterData == null || undefined)
//         localStorage.setItem("usersMaster", JSON.stringify(users));
//       console.log("Fetched users:", users); // Log to check the structure


//       // Check if users is an array
//       if (Array.isArray(users)) {
//         // Find the user based on username and password
//         const user = users.find(
//           (user) => user.username === username && user.password === password
//         );
//         sessionStorage.setItem("loginInfo", JSON.stringify(user));

//         if (user) {
//           // Redirect based on role
//           if (user.role === "admin") {
//             navigate("/admin/dashboard");
//           } else if (user.role === "student") {
//             navigate("/admin/student");
//           } else if (user.role === "teacher") {
//             navigate("/admin/dashboard");
//           } else if (user.role === "parent") {
//             navigate("/parent/dashboard");
//           }
//           //31-12-2024 start
//           let getUserLoginInfo = JSON.parse(localStorage.getItem("usersMaster"));
//           let dataToStoreInLoginSession = JSON.parse(sessionStorage.getItem("loginInfo"));
//           for (let i = 0; i < getUserLoginInfo.length; i++) {
//             if (getUserLoginInfo[i].roleid == '101') {
//               dataToStoreInLoginSession.permissions = getUserLoginInfo[i].permissions;
//               break;
//             }
//           }
//           sessionStorage.setItem("loginInfo", JSON.stringify(dataToStoreInLoginSession));
//           //31-12-2024 end
//         } else {
//           setError("Invalid username or password");
//         }
//       } else {
//         setError("Invalid data format for users.");
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error); // Log fetch errors
//       setError("Failed to load users");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosApi.post('/auth/login', {
        email: username,
        password
      });
      console.log("Login response data:", response.data);
  
      const { accessToken, refreshToken, staff } = response.data;
  
      // Check if tokens are returned and handle them
      if (accessToken && refreshToken) {
        // Store the accessToken in localStorage
        localStorage.setItem("accessToken", accessToken);
  
        // Store staff info if needed
        // sessionStorage.setItem("staff", JSON.stringify(staff));
  
        // Navigate based on the role
        switch (staff.role) {
          case "Super Admin":
          case "Admin":
            navigate("/admin/dashboard");
            break;
          case "student":
            navigate("/admin/student");
            break;
          case "Teacher":
            navigate("/admin/dashboard");
            break;
          case "parent":
            navigate("/parent/dashboard");
            break;
          default:
            setError("Unknown role. Please contact support.");
        }
      } else {
        setError("Login failed. Invalid credentials or missing tokens.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data?.error || "Login failed. Please check your credentials.");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
