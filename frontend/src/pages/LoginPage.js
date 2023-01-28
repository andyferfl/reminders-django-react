import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

function LoginPage (){

  let {loginUser} = useContext(AuthContext)

  let submitHandler = (e) => {
    e.preventDefault();

    if (e.target.username.value === '' ||  e.target.password.value === '') {
      return;
    }

    let user = {
      username:e.target.username.value,
      password:e.target.password.value
    }
    
    loginUser(user);
  }

  return (
    <div className='w-100 h-100 d-flex justify-content-around align-items-center' style={{background: "rgb(64,224,208)"}}>
        <form onSubmit={submitHandler} className='mb-3'>
            <input type='text' name='username' className='form-control ml-3 mt-5 mb-3' placeholder='username' />
            <input type='password' name='password' className='form-control ml-3 mb-3' placeholder='password' />
            <button type='submit' className='btn btn-primary mb-3 ml-3'>Log in</button>
        </form>
    </div>
  );
  

}



export default LoginPage

