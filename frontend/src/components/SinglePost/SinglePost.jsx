// PostDisplay.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SinglePost.css'
const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
                setPost(response.data.post);
            } catch (error) {
                console.error('Error fetching post:', error);
                // Handle error
            }
        };
        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="singlePost">
      <a href='/recipe' className='backBtn'>  BACK  </a>
              <div className="singlePostWrapper">
         <img  className="singlePostImg"
         src={`data:image/jpeg;base64,${post.image}`} alt={post.title}  />
            <h2 className="singlePostTitle">{post.title}</h2>
            <p className="singlePostDesc">{post.content}</p>
            </div>
        </div>
    );
};

export default SinglePost;
