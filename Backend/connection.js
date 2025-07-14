const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://febinaazeez0539:Febieefebzz@cluster0.mbplmx1.mongodb.net/Blogapp?retryWrites=true&w=majority&appName=Cluster0", {
    
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
