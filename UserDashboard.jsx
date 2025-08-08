// 
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addToLibrary } from "../slicers/like-slicer";
import { removeFromLibrary } from "../slicers/like-slicer";
import { Link } from "react-router-dom";

export function UserDashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["userName"]);

  const dispatch = useDispatch();


  const videosCount = useSelector((state) => state.store.videosCount);
  const myLibrary = useSelector((state) => state.store.MyVideoLibrary);

 
  useEffect(() => {
    axios.get("https://cinemalibrary.onrender.com/getcategories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  
  useEffect(() => {
    setIsLoading(true);
    const endpoint =
      selectedCategoryId === "" || selectedCategoryId === -1
        ? "https://cinemalibrary.onrender.com/Videos"
        : `https://cinemalibrary.onrender.com/Videoscat/${selectedCategoryId}`;

    axios.get(endpoint).then((res) => {
      setVideos(res.data);
      setIsLoading(false);
    });
  }, [selectedCategoryId]);

  // ✅ Handle save button
  function handleSaveClick(video) {
    dispatch(addToLibrary(video));
    alert(`${video.Title} has been added to your library!`);
  }

  function handleRemove(video) {
    dispatch(removeFromLibrary(video.VideoId));
    alert(`${video.Title} has been removed from your library!`);
  }

  return (
    <div className="container mt-3">
      <h2 style={{ color: "gold" }}>
        <span style={{ color: "red" }}>UserDashboard</span> - {cookie["userName"]}
        <button
          data-bs-target="#library"
          data-bs-toggle="modal"
          className="btn btn-warning ms-3 position-relative bi bi-camera-video"
        >
          <span className="badge position-absolute rounded-circle bg-danger" style={{ top: "-8px", right: "-10px" }}>
            {videosCount}
          </span>
        </button>
      </h2>

      {/* ✅ Saved Videos Modal */}
      <div className="modal fade" id="library" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Saved Videos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {myLibrary.length === 0 ? (
                <div className="alert alert-warning">No videos in your library yet.</div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Video ID</th>
                      <th>Title</th>
                      <th>URL</th>
                      <th>Comments</th>
                      <th>Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myLibrary.map((video) => (
                      <tr key={video.VideoId}>
                        <td>{video.VideoId}</td>
                        <td>{video.Title}</td>
                        <td>
                          <a href={video.URL} target="_blank" rel="noreferrer">
                            Link
                          </a>
                        </td>
                        <td>{video.Comments}</td>
                        <td>{video.Likes}</td>
                        <td><button className="btn btn-danger" onClick={()=>handleRemove(video)}>Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              )}
            </div>
            <div className="modal-footer">
              
              </div>

          </div>
        </div>
      </div>

      {/* ✅ Category Dropdown */}
      <div className="mt-4">
        <select
          onChange={(e) => {
            const val = e.target.value;
            setSelectedCategoryId(val === "" ? "" : parseInt(val));
          }}
          className="form-select w-25"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.CategoryId} value={cat.CategoryId}>
              {cat.CategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Video List */}
      {isLoading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-danger" role="status"></div>
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="alert alert-warning mt-4">No videos found for this category</div>
      ) : (
        <div className="row mt-4">
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
                <div className="card-body d-flex flex-column justify-content-between">
                  <button className="btn btn-danger w-100 mb-2" onClick={() => handleSaveClick(video)}>
                    Save
                  </button>
                  <h5 className="card-title">{video.Title}</h5>
                  <p className="card-text">{video.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
