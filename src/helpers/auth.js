class UserSession {
  saveUser(user) {
    return localStorage.setItem("user", user);
  }

  getUser() {
    return localStorage.getItem("user");
  }

  deleteUser() {
    return localStorage.removeItem("user");
  }
}

export const userSession = new UserSession();
