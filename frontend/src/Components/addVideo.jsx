import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function AddVideo(){

    const [categories, setCategories] = useState([{Category1Id:0, CategoryName:''}]);
    
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: '',
            Title: '',
            URL: '',
            Description: '',
            Likes: 0,
            Dislikes: 0,
            Views: 0,
            Comments:'',
            Category1Id:0
        },
        onSubmit : (values)=>{
            axios.post('http://127.0.0.1:3334/addvideos', values);
            alert('Video Added Successfully..');
            navigate('/admindashboard');
        }
    })

    function LoadCategories(){
        axios.get('http://127.0.0.1:3334/getcategories')
        .then(response=>{
            response.data.unshift({CategoryId:-1, CategoryName:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
    },[]);


    return(
        <div>
            <h4>New Video</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="URL" /></dd>
                    <dt>Description</dt>
                    <dd><textarea onChange={formik.handleChange} name="Description" rows="2" cols="30"></textarea></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Dislikes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="text" onChange={formik.handleChange}  name="Views"/></dd>

                    <dt>Comments</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" onChange={formik.handleChange}>
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
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
    // return(
    //     <div>
    //        <p>jdjdj</p>
    //     </div>
    // )
}