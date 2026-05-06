import React, { useEffect, useState } from 'react'

const Userdetail = () => { 

    const [user, setUser] = useState(null)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    // force a refresh to the signin page so the whole app updates 
    window.location.href = '/signin';
  };
  return (
    <div className="d-flex justify-content-end align-items-center p-3  text-light">

        {user ? (
        <div className="d-flex align-items-center gap-3">
          
          {/* Username */}
          <div className="fw-bold">
            👋 Hello, {user.username}
          </div>

          {/* Logout Button */}
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      ) : (
        <div className="text-muted">
          Not logged in
        </div>
      )}

    </div>
  )
}

export default Userdetail