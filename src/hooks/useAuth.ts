import { useContext } from "react";
import { AuthContext, AuthContextDataProps } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
