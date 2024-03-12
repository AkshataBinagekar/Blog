import React, { useState } from "react";
import axios from "axios";
import "./Write.css";
import Topbar from "../../components/topbar/Topbar";


const Write = ( ) => {



  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessage1, setAlertMessage1] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData1 = new FormData();
    formData1.append("image", image);
    formData1.append("title", title);
    formData1.append("content", content);
 
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Pass the user ID through a custom header
       
          },
        }
      );
      console.log(response.data);
      setAlertMessage1("Published successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      setAlertMessage("Error publishing post. Please try again later.");
    }
  };

  return (
    <div className="write">
      <Topbar />
      
      <form className="writeForm" onSubmit={handleSubmit}>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      {alertMessage1 && <div className="alert1">{alertMessage1}</div>}
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="writeImg" /> }
        {!image && <img src={'https://i.pinimg.com/474x/ad/a9/1c/ada91c89077c1b70f39f532febaa3eb9.jpg'} alt="Default" className="writeImg" /> }
        <input className="imgInput"  type="file" accept="image/*" onChange={handleImageChange} />
        <div className="writeFormGroup1">
        <input
         className="writeInput"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div className="writeFormGroup">
        <textarea   className="writeInput writeText"
           placeholder="Write your Recipe..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
</div>
        <button type="submit" className="writeSubmit">PUBLISH</button>
      </form>
    </div>
  );
};

export default Write;
