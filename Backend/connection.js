const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://kavyaa:kavyaa@cluster0.tbvsia6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
