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
          return <Redirect to="/SignIn" />;
        }

        if (user.role === "JOB_SEEKER" && rest.path !== "/dashboard") {
          return <Redirect to="/dashboard" />;
        }
        if (user.role === "RECRUITER" && rest.path !== "/co-dashboard") {
          return <Redirect to="/co-dashboard" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;