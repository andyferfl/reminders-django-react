import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Header() {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <header className='bg-secondary'>

      {user &&
        <div className='text-end'>
          <button onClick={logoutUser}
          className='btn btn-danger my-2 mx-2'>Logout</button>
        </div>
      }

      <div className="text-center text-white p-3 bg-secondary">
        {user===null ? <h5 className='fs-1 fw-bold'>Welcome, please log in</h5> 
        : <h5 className='fs-1 fw-bold'>Welcome {user.username}</h5>}
      </div>
    </header>
  )
}

export default Header
