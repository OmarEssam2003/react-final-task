import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPost, updatePost, deletePost } from "../../../APIs/postsApis";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd, faEye } from "@fortawesome/free-solid-svg-icons"; // Added faEye for View Details
import { ToastContainer, toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Home() {
  const allPosts = useSelector((state) => state.postsData.posts);
  const isLoading = useSelector((state) => state.postsData.setLoading); // Track loading state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({ title: "", body: "" }); // State for validation errors
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (!allPosts.length) { // Only fetch posts if there are no posts in the store
      dispatch(fetchPosts());
    }
  }, [dispatch, allPosts.length]); // Only rerun when allPosts.length changes

  const handleCloseModal = () => setShow(false);

  // Validation function for both adding and editing posts
  const validatePost = (post) => {
    const newErrors = {};
    
    // Validate Title
    if (!post.title) {
      newErrors.title = "Title is required";
    } else if (post.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    } else if (post.title.length > 150) {
      newErrors.title = "Title must not exceed 150 characters";
    }

    // Validate Body
    if (!post.body) {
      newErrors.body = "Body is required";
    } else if (post.body.length < 50) {
      newErrors.body = "Body must be at least 50 characters";
    } else if (post.body.length > 300) {
      newErrors.body = "Body must not exceed 300 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  // Handle Add Post
  const handleAddPost = () => {
    if (validatePost(newPost)) {
      dispatch(addPost(newPost)).then(() => {
        setNewPost({
          title: "",
          body: "",
        });
        toast.success("Your post has been added successfully");
      });
    }
  };

  // Show Update Modal
  const handleShowModal = (post) => {
    setShow(true);
    setCurrentPost(post);
  };

  // Handle Update Post
  const handleUpdatePost = () => {
    if (validatePost(currentPost)) {
      const updatedPostData = { title: currentPost.title, body: currentPost.body };
      dispatch(updatePost({ id: currentPost.id, updatedData: updatedPostData })).finally(() => {
        handleCloseModal();
        toast.success("Your post has been updated successfully");
      });
    }
  };

  // Handle Delete Post
  const handleDeletePost = (id) => {
    dispatch(deletePost(id)).then(() => {
      toast.success("Your post has been deleted successfully");
    });
  };

  // Navigate to Post Details
  const viewPostDetails = (id) => {
    navigate(`/post/${id}`); // Navigate to Post Details page with dynamic post ID
  };

  // Disable Add Post button if validation fails
  const isAddPostDisabled =
    !newPost.title ||
    newPost.title.length < 10 ||
    newPost.title.length > 150 ||
    !newPost.body ||
    newPost.body.length < 50 ||
    newPost.body.length > 300;

  // Render a loading screen if posts are being fetched
  if (isLoading) {
    return (
      <div className="loading-screen">
        <h1>Loading Posts...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {allPosts.map((post) => (
                <div className="card post-item" key={post.id}>
                  <div className="card-body">
                    <h5>
                      {post.id} - {post.title}
                    </h5>
                    <p className="card-text">{post.body}</p>
                    <div className="postControlButtons">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleShowModal(post);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => viewPostDetails(post.id)} // Navigate to Post Details
                      >
                        <FontAwesomeIcon icon={faEye} /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                {errors.title && <p className="text-danger">{errors.title}</p>}

                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                {errors.body && <p className="text-danger">{errors.body}</p>}

                <button
                  className="btn btn-success"
                  onClick={handleAddPost}
                  disabled={isAddPostDisabled} // Disable button if validation fails
                >
                  <FontAwesomeIcon icon={faAdd} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateModal
        show={show}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangedData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
    </>
  );
}

export default Home;
