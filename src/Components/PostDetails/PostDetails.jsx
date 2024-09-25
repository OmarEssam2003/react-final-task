import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get post ID from the URL
import axios from "axios"; // Import axios to make API requests
import "./PostDetails.css"; // Add CSS for styling

function PostDetails() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch post data and comments based on post ID
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Fetch post data (replace this with your actual API if necessary)
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(postResponse.data);

        // Fetch comments for the post
        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        setComments(commentsResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Loading state
  if (isLoading) {
    return <div className="loading-screen">Loading post details...</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <h5>{comment.name}</h5>
              <p>{comment.body}</p>
              <small>By: {comment.email}</small>
            </div>
          ))
        ) : (
          <p>No comments available for this post.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
