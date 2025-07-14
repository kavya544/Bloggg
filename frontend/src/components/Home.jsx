import {Box,Card,CardActions,CardContent,CardMedia,Typography,Button,Grid,} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/delete/${id}`);
    alert(res.data.message || "Blog deleted successfully");
    getData(); 
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("Failed to delete blog");
  }
};


 const handleUpdateClick = (blog) => {
  navigate("/add", { state: { blog } }); 
};


  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ padding: "30px" }}>
      <Grid container spacing={4} justifyContent="center">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item key={blog._id}>
              <Card sx={{ width: 300, boxShadow: 3, borderRadius: 3, p: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    blog.img_url ||
                    "https://via.placeholder.com/300x180?text=No+Image"
                  }
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-around" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdateClick(blog)} 
                  >
                 Update
                 </Button>

                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ marginTop: 4 }}>
            No blogs to display.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
