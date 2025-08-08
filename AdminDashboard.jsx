import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export function AdminDashBoard(){
    const [cookies, setCookie, removeCookie] = useCookies('adminName');

    const[video,setVideo]=useState([{
VideoId:0, Titl:'', URL:'', 
Description:'', 
Likes:'',DisLikes:'',Views:'' ,Comments:'',CategoryId:''}])

    let navigate = useNavigate();

    function LoadVideos(){
        axios.get("https://cinemalibrary.onrender.com/Videos")
        .then((response)=>{
            setVideo(response.data);
        })
    }

    // function handleSignout(){
    //     removeCookie('adminName');
    //     navigate('/adminlogin');
    // }

     useEffect(()=>{
            
            if(cookies['adminName']===undefined){
                navigate('/adminlogin')
            }
            else{
                LoadVideos();
            }
            },[])
            



    return(
        <div className="container-fluid bg-dark text-light" style={{height:'100vh'}}>
            <h3>Admin Dashboard</h3>
            <p>Welcome to the Admin Dashboard</p>
            <p>Admin Name: {cookies['adminName']}</p>
             <div className="mb-4">
                <Link to="/addvideo" className="btn btn-primary">New Video</Link>
            </div>

                       <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        video.map(video=>
                            <tr key={video.VideoId}>
                                <td width="200">{video.Title}</td>
                                <td>
                                    <iframe src={video.URL} width="300" height="100"></iframe>
                                </td>
                                <td>
                                    <Link to={`/editvideo/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill me-2"></Link>
                                    <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
                </table>

        </div>
    )
}
