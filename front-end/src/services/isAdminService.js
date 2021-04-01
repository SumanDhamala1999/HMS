import jwt_decode from "jwt-decode";
import auth from "../services/authService";

export function isAdmin() {
  const user = auth.getCurrentUser();

  if (user) {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);

    return decoded.isAdmin;
  }
}
