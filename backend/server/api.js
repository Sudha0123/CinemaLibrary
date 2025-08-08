






const express = require("express");
const path = require("path");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3334;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

// Routes

app.get("/getadmin", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Admin").find({}).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.get("/getusers", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Users").find({}).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.get("/getcategories", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Categories").find({}).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.get("/Videos", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Videos").find({}).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.get("/Videosid/:id", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Videos").find({ VideoId: parseInt(req.params.id) }).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.get("/Videoscat/:id", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Videos").find({ CategoryId: parseInt(req.params.id) }).toArray().then((docu) => {
      res.send(docu);
    });
  });
});

app.post("/reguser", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    const user = {
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
    };
    db.collection("Users").insertOne(user).then((result) => {
      console.log(result);
      res.send("User Registered Successfully");
    });
  });
});

app.post("/addvideos", (req, res) => {
  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    const video = {
      VideoId: parseInt(req.body.VideoId),
      Title: req.body.Title,
      URL: req.body.URL,
      Description: req.body.Description,
      Likes: parseInt(req.body.Likes),
      Dislikes: parseInt(req.body.Dislikes),
      Views: req.body.Views,
      Comments: req.body.Comments,
      CategoryId: parseInt(req.body.CategoryId),
    };
    db.collection("Videos").insertOne(video).then((result) => {
      console.log(result);
      res.send("Video added");
    });
  });
});

app.put("/updatevideos/:id", (req, res) => {
  const videoid = parseInt(req.params.id);

  MongoClient.connect(MONGO_URI)
    .then((clientObj) => {
      const db = clientObj.db("VideoPrj");
      const video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        URL: req.body.URL,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: req.body.Views,
        Comments: req.body.Comments,
        CategoryId: parseInt(req.body.CategoryId),
      };

      db.collection("Videos")
        .updateOne({ VideoId: videoid }, { $set: video })
        .then((result) => {
          if (result.modifiedCount === 0) {
            res.send("No matching video found to update.");
          } else {
            res.send("Video updated successfully.");
          }
        });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      res.status(500).send("DB connection failed");
    });
});

app.delete("/deletevideos/:id", (req, res) => {
  const videoid = parseInt(req.params.id);

  MongoClient.connect(MONGO_URI).then((clientObj) => {
    const db = clientObj.db("VideoPrj");
    db.collection("Videos").deleteOne({ VideoId: videoid }).then((result) => {
      console.log(result);
      res.send("Video deleted");
    });
  });
});

// Serve frontend from build (for production)
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});



