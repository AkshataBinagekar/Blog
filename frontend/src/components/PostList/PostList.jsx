import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import axios from 'axios';
import './PostList.css'

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle error
            }
        };
        fetchPosts();
    }, []);

    return (


        <div className="post-list">
            {/* <h2>Post List</h2> */}
            {posts.map(post => (
                <div key={post.id} className="post-container">
                <img  className="postImg" src={`data:image/jpeg;base64,${post.image}`} alt={post.title}  />
                    {/* Use Link component for clickable post titles */}
                    <div className="postInfo">
        <div className="postCats">
                    <Link className="postLink" to={`/posts/${post.id}`}> 
                    <h3 className="postCat">{post.title}</h3>
                    </Link>
                    </div>
                    </div>
                    <p className="postDesc">{post.content}</p>
                    {/* Convert the image binary data to Base64 */}
                    
                </div>
              
            ))}
        </div>
      
    );
};

export default PostList;
