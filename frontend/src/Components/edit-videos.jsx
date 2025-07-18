import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";

export function EditVideo(){


    const [categories, setCategories] = useState([{Category_Id:0, CategoryName:''}]);
    const [videos, setVideos] = useState([{VideoId:0, Title:'', URL:'', Likes:0, Dislikes:0,Views:"", Comments:'', Category_Id:0}]);
    
    let navigate = useNavigate();
    
    let params = useParams();

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            URL:  videos[0].URL,
            Likes: videos[0].Likes,
            Views: videos[0].Views,
            Dislikes: videos[0].Dislikes,
            Comments:videos[0].Comments,
            CategoryId:videos[0].CategoryId
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.put(`http://127.0.0.1:3334/updatevideos/${params.id}`,values);
            alert('Video Updated..');
            navigate('/admindashboard');
        }
    })

    function LoadCategories(){
        axios.get('http://127.0.0.1:3334/getcategories')
        .then(response=>{
            response.data.unshift({Category_Id:-1, CategoryName:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:3334/Videosid/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);



    return (
        <div>
           <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="text" value={formik.values.VideoId}  onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title}  onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.URL}  onChange={formik.handleChange} name="URL" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.Likes}  onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="text" value={formik.values.Views}  onChange={formik.handleChange}  name="Views"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes}  onChange={formik.handleChange}  name="Dislikes"/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" value={formik.values.Comments} onChange={formik.handleChange} name="Comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" value={formik.values.CategoryId}  onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.CategoryId} key={category.CategoryId}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/admindashboard" className='btn btn-danger ms-2'>Cancel</Link>
            </form>
        </div>
    )
}