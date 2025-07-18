// 
import { useEffect, useState } from "react";
import axios from "axios";

export function UserDashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [videos, setVideos] = useState([]);

  // Load categories on page load
  useEffect(() => {
    axios.get("http://localhost:3334/getcategories").then((res) => {
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
  if (selectedCategoryId === "" || selectedCategoryId === -1) {
    // Load all videos
    axios.get("http://localhost:3334/Videos").then((res) => {
      setVideos(res.data);
    });
  } else {
    // Load videos for selected category
    axios.get(`http://localhost:3334/Videoscat/${selectedCategoryId}`).then((res) => {
      setVideos(res.data);
    });
  }
}, [selectedCategoryId]);


  return (
    <div>
      <h2>User Dashboard</h2>

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


    

    


      {/* Display videos */}
      {/* <div>
        <h3>Videos</h3>
        {videos.length === 0 && selectedCategoryId && (
          <p>No videos found for this category</p>
        )}
        <ul>
          {videos.map((video) => (
            <li key={video.VideoId}>
              <h4>{video.Title}</h4>
              <iframe
                width="300"
                height="200"
                src={video.URL}
                title={video.Title}
              ></iframe>
              <p>{video.Description}</p>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="container mt-4">
  <h3 className="mb-4">Videos</h3>

  {videos.length === 0 && selectedCategoryId && (
    <div className="alert alert-warning">No videos found for this category</div>
  )}

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
