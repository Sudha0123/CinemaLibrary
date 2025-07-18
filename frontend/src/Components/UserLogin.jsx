import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Formik,useFormik } from 'formik'
import axios from 'axios'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export function UserLogin(){
    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const [error,setError]=useState('')
    
     const navigate=useNavigate()
     const [cookie,setCookie,removeCookie]=useCookies('userName')
        const formik=useFormik({

            
            initialValues:{
                UserId:'',
                Password:''
            },

            // onSubmit:values=>{

            //     var user=users.find(item=>item.UserId===values.UserId)
            //     if(user.Password===values.Password){
            //         setCookie('username',user.UserName)
            //         // navigate('/')
            //     }
            //     else{
            //         setError('Invalid UserId or Password')  
            //     }

            // }

            onSubmit: values => {
                const user = users.find(item => item.UserId === values.UserId);
                // alert(values.Password)
                // alert(user.Password)
                if (user && user.Password === values.Password) {
                  setCookie('userName', user.UserName);
                  navigate('/user');
                } else {
                  setError('Invalid UserId or Password');
                }
              }
              
        })
        useEffect(()=>{
            axios.get('http://127.0.0.1:3334/getusers')
            .then(res=>{
                setUsers(res.data)
            })

        },[])
    return(
        <div>
            <h1 style={{color:"green"}}>User Login</h1>
            <form onSubmit={formik.handleSubmit} className='w-50 m-auto mt-4 p-4 border border-gold rounded green'>
                <h1 className='text-center' style={{color:"green"}}>Login</h1>
                <dl>
                    <dt style={{color:"green"}}>UserId</dt>
                    <dd><input type="text" name='UserId' onChange={formik.handleChange}/></dd>
                    <dt style={{color:'green'}}>Password</dt>
                    <dd><input type="password" name='Password' onChange={formik.handleChange}/></dd>


                </dl>
                <button type='submit' className='btn btn-danger'>Login</button>
                <Link to='/userregister' className='btn btn-danger ms-2'>Register</Link>
                <h1 className='text-danger'>{error}</h1>
                


            </form>


        </div>
    )
}