import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = () => {
    const { title, content, img_url } = inputs;

    if (!title || !content || !img_url) {
      alert("All fields are required!");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      _id: Date.now().toString(),
      title,
      category: content, // treat "content" as "category"
      img_url,
    };

    localStorage.setItem("blogs", JSON.stringify([newBlog, ...existing]));

    alert("Blog added successfully!");
    navigate("/");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Category"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={addData}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
