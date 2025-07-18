import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { VideoMain } from './Components/videomain';
import { UserLogin } from './Components/UserLogin';
import { UserRegister } from './Components/UserRegister';
import { AdminLogin } from './Components/AdminLogin';
import { AdminDashBoard } from './Components/AdminDashboard';
import { AddVideo } from './Components/addVideo';
import { DeleteVideo } from './Components/delete-video';
import { EditVideo } from './Components/edit-videos';
import { UserDashboard } from './Components/UserDashboard';






function App() {
return(
  <div className="container-fluid"> 
<div className='bg-shade'>
  <BrowserRouter>
<header className='p-2 d-flex justify-content-between'>
<div>
  <span className='h4'><Link to='/' style={{color:'red',textDecoration:'none'}}>Cinema Library</Link></span>
</div>

<div>
<span className='h4'><Link to='/userlogin' className='btn btn-light'>UserLogin</Link></span>
<span className='h4'><Link to='/adminlogin'className='btn btn-light ms-2'><span className='bi bi-person-fill'></span>Admin Dasboard</Link></span>
 
</div>



</header>
<Routes>
  <Route path='/' element={<VideoMain/>} />
  <Route path='/userlogin' element={<UserLogin/>}/> 
  <Route path='/userregister' element={<UserRegister/>} /> 
  <Route path='/adminlogin' element={<AdminLogin/>} />
  <Route path='/admindashboard' element={<AdminDashBoard/>} />
  <Route path='/addvideo' element={<AddVideo/>} />
  <Route path='/deletevideo/:id' element={<DeleteVideo/>} />
  <Route path='/editvideo/:id' element={<EditVideo/>} />
  <Route path='/user' element={<UserDashboard/>} />

  <Route path='*' element={<h1 className='text-danger'>Page Not Found</h1>} />

  </Routes>




</BrowserRouter>




</div>


    </div>

)

}

export default App;
