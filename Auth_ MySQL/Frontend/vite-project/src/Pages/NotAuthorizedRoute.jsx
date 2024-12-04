import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const NotAuthorizedRoute = ({ children, role }) => {
  const { role: userRole } = useSelector(state => state.auth);
  console.log("tis is coming from not authorized ",userRole)


//   if (userRole !== role) {
//     return <Navigate to="/auth/login"/>;
//   }
if (userRole) {
    console.log("mesage hidden")
               
                if (userRole === "Admin") {
                    return <Navigate to="/auth/v1/admin-dashboard"/>;
                    // return( navigate("/auth/v1/admin-dashboard"));
                } else if (userRole === "teacher") {
                    return <Navigate to="/auth/v1/teacher-dashboard"/>;
                    // navigate("/auth/v1/teacher-dashboard");
                } else if (userRole === "student") {
                    return <Navigate to="/auth/v1/student-dashboard"/>;
                    // navigate("/auth/v1/student-dashboard");
                } else if (userRole === "superAdmin") {
                    return <Navigate to="/auth/v1/super-admin-dashboard"/>;
                    // navigate("/auth/v1/super-admin-dashboard");
                }
}
   

  return children;
};

export default NotAuthorizedRoute;
