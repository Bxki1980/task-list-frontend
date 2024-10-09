// auth.js

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token !== null;
};

// Set the token to localStorage or sessionStorage based on rememberMe flag
export const setToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

// Get the token from either localStorage or sessionStorage
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Remove the token
export const removeToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};
