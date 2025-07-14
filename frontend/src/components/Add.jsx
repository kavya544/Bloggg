import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });


  useEffect(() => {
    if (location.state && location.state.blog) {
      setInputs(location.state.blog); 
    }
  }, [location]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (location.state && location.state.blog) {
      axios.put(`http://localhost:3001/update/${location.state.blog._id}`,inputs)
        .then((res) => {
          alert(res.data.message || "Blog updated successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Update error:", err);
        });
    } else {
      axios.post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message || "Blog added successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Add error:", err);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {location.state ? "Edit Blog" : "Add New Blog"}
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
            variant="outlined"
            placeholder="Title"
            name="title"
            value={inputs.title}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            name="content"
            value={inputs.content}
            onChange={inputHandler}
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            name="img_url"
            value={inputs.img_url}
            onChange={inputHandler}
          />

          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {location.state ? "Update Blog" : "Submit Blog"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
