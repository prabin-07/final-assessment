import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    img_url: "",
  });

  const location = useLocation();

  const dummyData = [
    {
      _id: "1",
      title: "Travel the world!!!!!",
      category: "Travel",
      img_url:
        "https://img.freepik.com/premium-vector/time-travel-world-vector-design-travel-explore-world-different-countries_572288-755.jpg?w=740",
    },
    {
      _id: "2",
      title: "Art!!!!!!!!!!!!",
      category: "Art",
      img_url:
        "https://i.pinimg.com/736x/cc/88/80/cc8880b5e8ae7236e0bd840a91485fda.jpg",
    },
    {
      _id: "3",
      title: "Food is Art!!!!",
      category: "Food",
      img_url:
        "https://blogs.uoregon.edu/aad250f13huette/files/2013/10/Fish_Food_Art-203oss6.jpg",
    },
  ];

  // Load blogs from localStorage or dummyData
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs"));
    if (!stored || stored.length === 0) {
      localStorage.setItem("blogs", JSON.stringify(dummyData));
      setBlogs(dummyData);
    } else {
      setBlogs(stored);
    }
  }, [location]);

  const saveToStorage = (updatedBlogs) => {
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updated = blogs.filter((blog) => blog._id !== id);
      saveToStorage(updated);
    }
  };

  const handleUpdate = (blog) => {
    setEditId(blog._id);
    setInputs({
      title: blog.title,
      category: blog.category,
      img_url: blog.img_url,
    });
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = () => {
    if (!inputs.title || !inputs.category || !inputs.img_url) {
      alert("All fields are required!");
      return;
    }

    const updatedBlogs = blogs.map((blog) =>
      blog._id === editId ? { ...blog, ...inputs } : blog
    );
    saveToStorage(updatedBlogs);

    alert("Blog updated!");
    setEditId(null);
    setInputs({ title: "", category: "", img_url: "" });
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              elevation={3}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="secondary" gutterBottom>
                  {blog.category}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(blog._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(blog)}
                  >
                    UPDATE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editId && (
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Update Blog
          </Typography>
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
              label="Title"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="img_url"
              value={inputs.img_url}
              onChange={handleInputChange}
              fullWidth
            />
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleUpdateSubmit}>
                Submit Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditId(null)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Home;
