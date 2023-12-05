const getProjects = async() => {
  try {
    return (await fetch("api/projects/")).json(); 
  } catch(error) {
    console.log(error); 
  }
};

const showProjects = async() => {
  let projects = await getProjects(); 
  let projectsDiv = document.getElementById("showingprojects");
  projectsDiv.innerHTML = ""; 
  projects.forEach((project) => {
    const section = document.createElement("section"); 
    section.classList.add("project"); 
    projectsDiv.append(section); 

    const link = document.createElement("a"); 
    link.href = "#"; 
    section.append(link); 

    const name = document.createElement("h3"); 
    name.innerHTML = project.name; 
    link.append(name); 

    link.onclick = (e) => {
      e.preventDefault(); 
      displayDetails(project);
    };

  });

};

// NOTE TO SELF- need to change links to actual links instead of strings. 
const displayDetails = (project) => {
  const details = document.getElementById("projects-details"); 
  details.innerHTML = ""; 

  const name = document.createElement("h3"); 
  name.innerHTML = project.name; 
  details.append(name); 

  const deleteLink = document.createElement("a"); 
  deleteLink.innerHTML = "	&#x2715;";
  details.append(deleteLink); 
  deleteLink.id = "delete-link"; 

  const editLink = document.createElement("a"); 
  editLink.innerHTML = "&#9998;"; 
  details.append(editLink); 
  editLink.id = "edit-link"; 

  const language = document.createElement("h5"); 
  language.innerHTML = project.language; 
  details.append(language); 

  const codeLink = document.createElement("p"); 
  codeLink.innerHTML = project.codeLink; 
  details.append(codeLink); 

  const description = document.createElement("p"); 
  description.innerHTML = project.description; 
  details.append(description); 

  const projectLink = document.createElement("p"); 
  projectLink.innerHTML = project.projectLink; 
  details.append(projectLink); 

  editLink.onclick = (e) => {
    e.preventDefault(); 
    document.querySelector(".dialog").classList.remove("transparent"); 
    document.getElementById("add-edit-title").innerHTML = "Edit Project"; 
  }

  deleteLink.onclick = (e) => {
    e.preventDefault(); 
    deleteProject(project); 
  }

  editProjectForm(project); 
};

const editProjectForm = (proj) => {
  const form = document.getElementById("add-edit-proj-form"); 
  form._id.value = proj._id;
  form.name.value = proj.name; 
  form.language.value = proj.language; 
  form.codeLink.value = proj.codeLink; 
  form.description.value = proj.description; 
  form.projectLink.value = proj.projectLink; 
};

const deleteProject = async(project) => {
  console.log(project._id); 
  let response = await fetch(`/api/projects/${project._id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type":"application/json;charset=utf-8"
    }
  });

  console.log(response.status); 

  if(response.status != 200) {
    console.log("delete error"); 
    return; 
  }

  let result = await response.json(); 
  showProjects(); 
  document.getElementById("projects-details").innerHTML = ""; 
};

const addEditProj = async(e) => {
  e.preventDefault(); 
  const form = document.getElementById("add-edit-proj-form"); 
  const formData = new FormData(form); 
  
  let response; 

  if(form._id == null) {
    form._id = -1; 
    form._id.value = -1; 
  }

  //adding project
  if(form._id.value == -1) {
    e.preventDefault(); 
    formData.delete("_id"); 

    console.log(...formData); 
    response = await fetch("/api/projects", {
      method: "POST", 
      body: formData
    });
  } else {
    console.log(...formData); 
    // I get a bug here saying it's undefined 
    response = await fetch(`/api/projects/${form._id.value}`, {
      method: "PUT", 
      body: formData
    });
  }

  //retrieved from server 
  if(response.status != 200) {
    console.log("error posting data"); 
  }

  project = await response.json(); 

  if(form._id.value != -1) {
    displayDetails(project); 
  }

  resetForm(); 
  document.querySelector(".dialog").classList.add("transparent"); 
  showProjects(); 
};

const resetForm = () => {
  const form = document.getElementById("add-edit-proj-form"); 
  form.reset(); 
  form._id = -1;
}

const showHideAdd = (e) => {
  e.preventDefault(); 
  document.querySelector(".dialog").classList.remove("transparent"); 
  document.getElementById("add-edit-title").innerHTML = "Add Project"; 
  resetForm(); 
}


window.onload = () => {
  showProjects(); 

  document.querySelector(".close").onclick = () => {
    document.querySelector(".dialog").classList.add("transparent"); 
  };

  document.getElementById("add-edit-proj-form").onsubmit = addEditProj; 
  document.getElementById("add-link").onclick = showHideAdd; 
  
}