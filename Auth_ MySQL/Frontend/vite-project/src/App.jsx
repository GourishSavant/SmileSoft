


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { createContext, useState } from 'react';
// import Home from './Pages/Home';
// import Register from './Pages/Register';
// import Login from './Pages/Login';
// import AdminDashboard from './Pages/AdminDashboard'
// import ProtectedRoute from './Pages/ProtectedRoute'
// import SuperAdminDashboard from "./Pages/SuperAdminDashboard";
// import TeacherDashboard from "./Pages/TeacherDashboard";
// import StudentDashboard from "./Pages/StudentDashboard";
// import axiosApi from "./utils/axiosApi";
// import RequestResetPassword from "./Pages/RequestResetPassword";

// import { Provider } from 'react-redux';
// import store from './redux/store';
// export const AuthContext = createContext(null);



// function App() {

//    const [user, setUser] = useState(null);
//    const login = async (credentials) => {
//     const { data } = await axiosApi.post('/auth/login', credentials);
//     localStorage.setItem('accesstoken', data.accesstoken);
//     setUser(data);
//     console.log('setUser data ', data);
//   };


//   // const logout = async () => {
//   //   await api.post('/logout');
//   //   localStorage.removeItem('accessToken');
//   //   setUser(null);
//   // };
  

//   return (
//     // <AuthContext.Provider value={{ user, login }}>
//     //     <BrowserRouter>
//     //         <Routes>
//     //             <Route path="/" element={<Home />} />
//     //             <Route path="/auth/register" element={<Register />} />
//     //             <Route path="/auth/login" element={<Login />} />
//     //             {/* <Route path="/auth/login" element={<ProtectedRoute ><Login /></ProtectedRoute>} /> */}
//     //             <Route path="/auth/v1/admin-dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
//     //             <Route path="/auth/v1/super-admin-dashboard" element={<ProtectedRoute role="superAdmin"><SuperAdminDashboard /></ProtectedRoute>} />
//     //             <Route path="auth/RequestResetPassword"element={<RequestResetPassword/>}/>
//     //             <Route path="/auth/v1/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
//     //             <Route path="/auth/v1/teacher-dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
//     //             <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//     //         </Routes>
//     //     </BrowserRouter>
//     // </AuthContext.Provider>
//     <Provider store={store}>
//          <Routes>
//             <Route path="/" element={<Home />} />
//                <Route path="/auth/register" element={<Register />} />
//                <Route path="/auth/login" element={<Login />} />
//              {/* <Route path="/auth/login" element={<ProtectedRoute ><Login /></ProtectedRoute>} /> */}
//               <Route path="/auth/v1/admin-dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
//                <Route path="/auth/v1/super-admin-dashboard" element={<ProtectedRoute role="superAdmin"><SuperAdminDashboard /></ProtectedRoute>} />
//                 <Route path="auth/RequestResetPassword"element={<RequestResetPassword/>}/>
//                 <Route path="/auth/v1/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
//                 <Route path="/auth/v1/teacher-dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
//               <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//            </Routes>
//     </Provider>
// );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from 'react';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard'
import ProtectedRoute from './Pages/ProtectedRoute'
import SuperAdminDashboard from "./Pages/SuperAdminDashboard";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import axiosApi from "./utils/axiosApi";
import RequestResetPassword from "./Pages/RequestResetPassword";
import NotAuthorizedRoute from "./Pages/NotAuthorizedRoute";

import { Provider } from 'react-redux';
import store from './redux/store';
export const AuthContext = createContext(null);

function App() {
   const [user, setUser] = useState(null);

   const login = async (credentials) => {
    const { data } = await axiosApi.post('/auth/login', credentials);
    localStorage.setItem('accesstoken', data.accesstoken);
    setUser(data);
    console.log('setUser data ', data);
  };

  return (
    <Provider store={store}>
      {/* Wrap everything with BrowserRouter */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<NotAuthorizedRoute><Register /></NotAuthorizedRoute>} />
          <Route path="/auth/login" element={<NotAuthorizedRoute><Login /></NotAuthorizedRoute> } />
          <Route path="/auth/v1/admin-dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/auth/v1/super-admin-dashboard" element={<ProtectedRoute role="superAdmin"><SuperAdminDashboard /></ProtectedRoute>} />
          <Route path="auth/RequestResetPassword" element={<NotAuthorizedRoute><RequestResetPassword /></NotAuthorizedRoute>} />
          <Route path="/auth/v1/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/auth/v1/teacher-dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
