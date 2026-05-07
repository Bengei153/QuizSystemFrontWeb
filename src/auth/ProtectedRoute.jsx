import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAppRole } from "../api/utils";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const role = getAppRole(user?.role);

  if (!user) return <Navigate to="/Signin" />;
  if (roles && !roles.includes(role))
    return <Navigate to="/Unauthorized" />;

  return children;
}
