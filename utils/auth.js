export function isAuthenticated() {
    // Check if token is stored in localStorage
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      return true;
    }
  
    return false;
  }
  