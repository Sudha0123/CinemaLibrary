import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export function UserRegister(){
    let navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            UserId:"",
            UserName:"",
            password:'',
            Email:" ",
            Mobile:'',
            
        },
        onSubmit:(user)=>{
            axios.post("https://cinemalibrary.onrender.com/reguser",user)
            alert("register user successfully")
            navigate("/userlogin")

        }
    })

    return(
        <div>
           <form className=" bg-light p-3 w-25" onSubmit={formik.handleSubmit}>
            <h2 className="te">Register User</h2>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                <dt>UserName</dt>
                <dd><input type="text" name="UserName" onChange={formik.handleChange}/></dd>
                <dt>password</dt>
                <dd><input type="password"  name="password" onChange={formik.handleChange} /></dd>
                <dt>email</dt>
                <dd><input type="email" name="Email" onChange={formik.handleChange}/></dd>
                <dt>Mobile</dt>
                <dd><input type="text" name="Mobile" onChange={formik.handleChange}/></dd>
                
            </dl>
            <button className="btn btn-warning w-25 me-2"> Register</button>
          <Link to="/" className="btn btn-warning w-25" >Cancel</Link>
           </form>

       
        </div>
    )
}
