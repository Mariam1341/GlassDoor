import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          console.log("ProtectedRoute: No user, redirecting to /SignIn");
          return <Redirect to="/SignIn" />;
        }

        // Allow JOB_SEEKER to access /dashboard and /Profile
        if (user.role === "JOB_SEEKER" && rest.path !== "/dashboard" && rest.path !== "/Profile") {
          console.log("ProtectedRoute: JOB_SEEKER redirecting to /dashboard");
          return <Redirect to="/dashboard" />;
        }

        // Allow RECRUITER to access /co-dashboard and /Profile
        if (user.role === "RECRUITER" && rest.path !== "/co-dashboard" && rest.path !== "/Profile") {
          console.log("ProtectedRoute: RECRUITER redirecting to /co-dashboard");
          return <Redirect to="/co-dashboard" />;
        }

        console.log("ProtectedRoute: Rendering component for path", rest.path);
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;