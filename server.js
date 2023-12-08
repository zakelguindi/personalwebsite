const express = require("express"); 
const app = express(); 
const Joi = require("joi"); 
const multer = require("multer"); 
app.use(express.static("public")); 
app.use(express.json()); 
const cors = require("cors"); 
app.use(cors()); 
const mongoose = require("mongoose"); 
const User = require("./user");
let currentUser; 

const upload = multer({ dest:__dirname + "/public/images"});

/**
 * things left to do: 

 * 3: uploading physical projects 
 * 5: making it look pretty. 
 */

/**
 * (5) making it look pretty: 
 * 1. menu hover effect 
 * 2. drop-down menu 
 * 3. optimize for mobile. 
 */


/**
 * for render: 
 * use render only for /api/projects 
 * copy render link to every "/api/projects" that I have in script. server stays same except for one
 * take everything out of public folder and move it to github.io. 
 * 
 */

mongoose
  .connect(
    "mongodb+srv://zakelguindi:4weNIKaXtsZo1kFI@cluster0.9jv0xxn.mongodb.net/"
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

  // get rid of this method 
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/adminpage.html"); 
// });

const projectSchema = new mongoose.Schema({
  language: String, 
  name: String, 
  date: String, 
  codeLink: String, 
  description: String, 
  projectLink: String, 
  favorite: Array, 
});

const Proj = mongoose.model("Project", projectSchema); 

app.get("/api/projects", (req, res) => {
  getProjects(res); 
});

const getProjects = async(res) => {
  const projects = await Proj.find(); 
  res.send(projects); 
};

app.post("/api/projects", upload.single("img"), (req, res) => {
  const result = validateProject(req.body); 

  if(result.error) {
    res.status(400).send(result.error.details[0].message); 
    return; 
  }

  const project = new Proj ({
    language: req.body.language, 
    name: req.body.name, 
    date: req.body.date, 
    codeLink: req.body.codeLink, 
    description: req.body.description, 
    projectLink: req.body.projectLink,
    favorite: req.body.favorite, 
  });

  createProject(project, res); 
});

const createProject = async(project, res) => {
  const result = await project.save(); 
  res.send(project);
};

app.put("/api/projects/:id", upload.single("img"), (req, res) => {
  const result = validateProject(req.body); 

  if(result.error) {
    res.status(400).send(result.error.details[0].message); 
    return; 
  }

  updateProject(req, res); 
});

//updates a project once edited 
const updateProject = async(req, res) => {
  let fieldsToUpdate = {
    language: req.body.language,
    name: req.body.name, 
    date: req.body.date, 
    codeLink: req.body.codeLink, 
    description: req.body.description, 
    projectLink: req.body.projectLink, 
    favorite: req.body.favorite
  };

  const result = await Proj.updateOne({_id: req.params.id}, fieldsToUpdate); 
  const project = await Proj.findById(req.params.id); 

  res.send(project); 
};


//delete works
//deleting project 
app.delete("/api/projects/:id", upload.single("img"), (req, res) => {
  removeProject(res, req.params.id); 
});

//removes project
const removeProject = async(res, id) => {
  console.log("here"); 
  const project = await Proj.findByIdAndDelete(id); 
  res.send(project); 
}

const validateProject = (project) => {
  const schema = Joi.object({ 
    _id:Joi.allow(""), 
    language: Joi.string().min(2), 
    name: Joi.string().min(2), 
    date: Joi.string().min(2), 
    codeLink: Joi.string(), 
    description: Joi.string(), 
    projectLink: Joi.allow(),
    favorite: Joi.allow(), 
  });

  return schema.validate(project);
}

app.post("/api/signup", async(req, res) => {
  const result = validateUser(req.body);

  if(result.error) {
    res.status(400).send(result.error.details[0].message); 
    return; 
  }
  
  if(!(await validateUnique(res, req.body.username))) {
    return; 
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10); 
  user.password = await bcrypt.hash(user.password, salt); 

  await user.save(); 
  res.send("success!"); 


});

app.post("/api/login", async(req, res) => {
  const result = validateLoginUser(req.body); 

  if(result.error) {
    res.status(400).send(result.error.details[0].message); 
    return; 
  }

  const user = await User.findOne({username: req.body.username});

  if(!user) {
    return res.status(400).send("username not found"); 
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password); 
  if(!isMatch) {
    return res.status(400).send("Incorrect Password"); 
  }

  currentUser = user; 
  res.send("Success"); 
});

const validateUnique = async (res, username) => {
  const user = await User.findOne({username: username});
  if(user) {
    res.status(400).send("Error duplicate user"); 
    return false; 
  }
  return true; 
}

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(), 
    password: Joi.string().min(6).required(), 
  });
  return schema.validate(user); 
};

const validateLoginUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(), 
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user); 
};


app.listen(3011, () => {
  console.log("listening"); 
})
