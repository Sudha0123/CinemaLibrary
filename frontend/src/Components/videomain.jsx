import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function RegisterClick(){

    return(
        <div>
            <p className='text-danger'>Account not found - <Link to='/userregister' className='btn btn-light'>Register</Link></p>
        </div>
    )
        
}

export function VideoMain() {

    const[users,setUsers]=useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}])

    const[email,setEmail]=useState('')
    const[error,setError]=useState('')
    const[password,setPassword]=useState(false)
    const[login,setLogin]=useState(false)
    const[showPassword,setShowPassword]=useState(false)
    const[showEmail,setshowEmail]=useState(true)

    let usenavigate=useNavigate()
   

    useEffect(()=>{
        axios.get('https://cinemalibrary.onrender.com/getusers')
        .then(response => {
            setUsers(response.data);
        })
     },[]);

    function handleEmail(e){
        setEmail(e.target.value)
    }
   
    function handlegetStarted(){
        var user=users.find(item=>item.Email==email)
        
        if(user==undefined){
            setError(<RegisterClick/>)
            setPassword(false)

           
        }
        else{
            setError('');
            setshowEmail(false)
            setShowPassword(true);
            setLogin(user);
            // usenavigate("/userlogin")
        }
    }

    function handlePassword(e){
        setPassword(e.target.value)
    }

    function handleLogin(){
        if (login && login.Password === password) {
      
            
            // redirect or take user to the videos page
            alert('Login successful');
                  usenavigate("/user");
        } else {
            setError(<p className='text-danger'>Incorrect password</p>);
        }
    }

    
     

    return(
        <div>
             <main className='d-flex justify-content-center align-items-center vh-100 mt-4'>
                  <div>
                     <h1  style={{color:'gold'}}>Watch Tollywood Videos Any where</h1>
                     <p className='text-center mt-4 mb-4' style={{color:'gold'}}>Please register for more  videos</p>
                     <div className='input-group'>
                        {showEmail &&(
                            <>
                              <input  type="email" onChange={handleEmail} className='form-control' placeholder='Your email addess' />
                              <button onClick={handlegetStarted} className='btn btn-danger ms-2'>Get Started</button>
                            </>

                        )}
                      
                       
                     </div>
                        <div className='input-group mt-4'>
                            {showPassword && (
                                <>
                                <input type="password" onChange={handlePassword} className='form-control' placeholder='Your password' />
                                <button onClick={handleLogin} className='btn btn-danger ms-2'>Login</button>
                                </>
                            )}
                        </div>
                   
                    
                  <div className='text-center mt-4'>
                     <p className='text-danger'>{error}</p>
                     </div>
                  
                  </div>
             </main>

        </div>
    )
}
