// 
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export function UserDashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [videos, setVideos] = useState([]);
  
       const [cookie,setCookie,removeCookie]=useCookies('userName')
         const [isLoading, setIsLoading] = useState(false);

  // Load categories on page load
  useEffect(() => {
    axios.get("https://cinemalibrary.onrender.com/getcategories").then((res) => {
      // const categoriesWithSelect = [
      //   { Category_Id: -1, CategoryName: "Select Category" },
      //   ...res.data,
      // ];
      setCategories(res.data);
    });
  }, []);

  // Fetch videos when category is selected
  // useEffect(() => {
  //   if (selectedCategoryId !== "" && selectedCategoryId !== -1) {
  //     axios.get(`http://localhost:3334/Videoscat/${selectedCategoryId}`).then((res) => {
  //       setVideos(res.data);
  //     });
  //   }
  // }, [selectedCategoryId]);

  useEffect(() => {
    setIsLoading(true);
  if (selectedCategoryId === "" || selectedCategoryId === -1) {
    // Load all videos
    axios.get("https://cinemalibrary.onrender.com/Videos").then((res) => {
      setVideos(res.data);
      setIsLoading(false);
    });
  } else {
    // Load videos for selected category
    axios.get(`https://cinemalibrary.onrender.com/Videoscat/${selectedCategoryId}`).then((res) => {
      setVideos(res.data);
      setIsLoading(false);
    });
  }
}, [selectedCategoryId]);


  return (
    <div>
      <h2 style={{color:"gold"}}><span style={{color:"red"}}>UserDashboard</span>-{cookie['userName']}</h2>

      {/* Dropdown to choose category */}
       <div>
     <select
      //  value={selectedCategoryId}
         onChange={(e) => {
      const val = e.target.value;
      setSelectedCategoryId(val === "" ? "" : parseInt(val));
    }} className="form-select mb-3 w-25" 
       >
       <option value="">All Categories</option>
         {categories.map((cat) => (
          <option key={cat.CategoryId} value={cat.CategoryId}>
             {cat.CategoryName}
          </option>
         ))}
       </select> 
      </div> 


    

    

  {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-danger" role="status"></div>
          <p>Loading videos...</p>
        </div>
      )}
      {!isLoading && videos.length === 0 && (
        <div className="alert alert-warning">No videos found for this category</div>
      )}
    
      <div className="container mt-4">
  <h3 className="mb-4">Videos</h3>

  {/* {videos.length === 0 && selectedCategoryId && (
    <div className="alert alert-warning">No videos found for this category</div>
  )} */}

  <div className="row">
    {videos.map((video) => (
      <div className="col-md-4 mb-4" key={video.VideoId}>
        <div className="card h-100">
          <iframe
            className="card-img-top"
            height="200"
            src={video.URL}
            title={video.Title}
            allowFullScreen
          ></iframe>
          <div className="card-body">
            <h5 className="card-title">{video.Title}</h5>
            <p className="card-text">{video.Description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
