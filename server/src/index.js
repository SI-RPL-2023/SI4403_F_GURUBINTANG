const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require('body-parser');
const cors = require('cors');

const signupCollection = require("./daftarModel");
const mentorCollection = require("./mentorModel");
const CourseCollection = require("./courseModel");

app.use(cors());
app.use(bodyParser.json());

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) =>{
    res.render("signup");
})

app.get("/addCourse", (req, res) =>{
    res.render("addCourse");
})

app.get("/addMentor", (req, res) =>{
  res.render("addMentor");
})

app.get("/course", (req, res)=>{
    try {
      CourseCollection.find().then(data => {
        res.json({
          data
        })
      })
    } catch (error) {
      // catch error
    }
})

app.get("/mentor", (req, res)=>{
  try {
    mentorCollection.find().then(data => {
      res.json({
        data
      })
    })
  } catch (error) {
    // catch error
  }
})

app.post("/signup", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user"
    };
  
    try {
      const result = await signupCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "Signup successful", id: data._id, email: data.email, role: data.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/signup/mentor", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "mentor"
    };
  
    try {
      const result = await signupCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "Signup successful", id: data._id, email: data.email, role: data.role});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  
  app.post("/login", async (req, res) => {
    try {
      const data = await signupCollection.findOne({ email: req.body.email });
  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" });
        return;
      }
  
      if (data.password === req.body.password && data.role === "user") {
        res.json({ success: true, message: "Login successful", id: data._id, username: data.username, role: data.role});
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  app.post("/login/mentor", async (req, res) => {
    try {
      const data = await signupCollection.findOne({ email: req.body.email });  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" });
        return;
      }
  
      if (data.password === req.body.password && data.role === "mentor") {
        res.json({ success: true, message: "Login successful", id: data._id, username: data.username, role: data.role});
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/addCourse", async (req, res) => {
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      kategoriKelas: req.body.kategoriKelas,
      materiKelas: req.body.materiKelas,
      totalMateriKelas: req.body.totalMateriKelas,
      hargaCoretKelas:req.body.hargaCoretKelas,
      hargaAsliKelas:req.body.hargaAsliKelas,
      mentorKelas: req.body.mentorKelas
    };
  
    try {
      const result = await CourseCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "insert class successful", id: data._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/addMentor", async (req, res) => {
    const data = {
      namaMentor: req.body.namaMentor,
      descMentor: req.body.descMentor,
      muridMentor: req.body.muridMentor,
      keahlianMentor: req.body.keahlianMentor,
    };
  
    try {
      const result = await mentorCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "add mentor successful", id: data._id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});