import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";


export function AdminLogin() {
  
    const [users, setUsers] = useState([{ UserId: '', Password: '' }]);
    const [userError, setUserError] = useState('');
    
const [cookies, setCookie, removeCookie] = useCookies('adminName');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues
: {
            UserId: '',
            Password: ''
        },
        onSubmit: (values) => {
            var user = users.find(item => item.UserId === values.UserId);
            if (user.Password === values.Password) {
                setCookie("adminName", user.UserId);
                navigate("/admindashboard");
            } else {
                setUserError("Invalid Credentials");
            }
        }


    })



   useEffect(function(){
    axios.get('http://127.0.0.1:3334/getadmin')
    // .then((response) => {
    //     setUsers(response.data);
    // })
    .then(function(res){
        setUsers(res.data);
    })

   },[])


    return(
        <div>
            <h1 className="text-primary">Admin Login</h1>
            <form  onSubmit={formik.handleSubmit} className="w-25">
                <div className="mb-3">
                   <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" onChange={formik.handleChange} name="Password" /></dd>
                   </dl>
                </div>
              
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="h3 text-danger">{userError}</p>

        </div>

    )



}