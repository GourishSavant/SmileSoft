
// import { useContext } from 'react';
// import { AuthContext } from '../App.jsx';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, role }) => {

//   const { user } = useContext(AuthContext);

//   const accessrole = localStorage.getItem('role');

//   console.log('hi from protected route outside ', role, accessrole);

//   if (accessrole !== role) {

//     console.log('hi from protected route ', role, accessrole);
//     return <Navigate to="/auth/login" />;
//   }

//   return children;
// };
// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { role: userRole } = useSelector(state => state.auth);

  if (userRole !== role) {
    return <Navigate to="/auth/login"/>;
  }

  return children;
};

export default ProtectedRoute;




















// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const accesstoken = localStorage.getItem('accesstoken');
//   console.log('ProtectedRoute check:', accesstoken); 

//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// import { useContext } from 'react';
// import { AuthContext } from '../App.jsx';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, role }) => {
//     const { user } = useContext(AuthContext);
//     const accessrole = localStorage.getItem('role')?.toLowerCase();

//     console.log("ProtectedRoute Debug:", { user, role }); // Debugging

//     if (!user) {
//         return <Navigate to="/auth/login" />;
//     }

//     if (user.role !== role) {
//         return <Navigate to="/auth/login" />;
//     }

//     return children;
// };

// export default ProtectedRoute;

