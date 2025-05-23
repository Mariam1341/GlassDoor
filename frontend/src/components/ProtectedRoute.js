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

        console.log("ProtectedRoute: Rendering component for path", rest.path, "user role:", user.role);
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;