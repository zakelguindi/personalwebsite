

const loadAddProject = () => {
  document.getElementById("add-project").classList.toggle("hidden");
  // console.log("Yo"); 
};

const loadRemoveProject = () => {
  document.getElementById("remove-project").classList.toggle("hidden"); 
};

const loadEditProject = () => {
  document.getElementById("edit-project").classList.toggle("hidden"); 
};

const submitAddProj = (e) => {
  e.preventDefault(); 
  document.getElementById("add-results").classList.toggle("hidden"); 

  const form = document.getElementById("add-project");
  const lang = form.elements["add-proj-lang"].value;
  const name = form.elements["add-proj-name"].value; 
  const link = form.elements["add-proj-link"].value; 
  const desc = form.elements["add-proj-description"].value; 
  const output = form.elements["add-proj-output"].value;

  let response = document.getElementById("add-results"); 
  response.innerHTML = ""; 
  response.innerHTML += "Lang: " +lang; 
  response.innerHTML += "\nName: " +name; 
  response.innerHTML += "\nLink: " +link; 
  response.innerHTML += "\nDescription: " + desc; 
  response.innerHTML += "\nOutput: " +output; 



  console.log(response); 
};

const submitRemoveProj = (e) => {
  e.preventDefault(); 
  document.getElementById("remove-results").classList.toggle("hidden"); 
  const form = document.getElementById("remove-project");
  const search = form.elements["search-project"].value; 

  let response = document.getElementById("remove-results"); 
  response.innerHTML = ""; 
  response.innerHTML += "Search: " +search; 
};

const submitEditProj = (e) => {
  e.preventDefault(); 
  document.getElementById("edit-results").classList.toggle("hidden"); 

  const form = document.getElementById("edit-project");
  const lang = form.elements["edit-proj-lang"].value;
  const name = form.elements["edit-proj-name"].value; 
  const link = form.elements["edit-proj-link"].value; 
  const desc = form.elements["edit-proj-description"].value; 
  const output = form.elements["edit-proj-output"].value;

  let response = document.getElementById("edit-results"); 
  response.innerHTML = ""; 
  response.innerHTML += "Lang: " +lang; 
  response.innerHTML += "\nName: " +name; 
  response.innerHTML += "\nLink: " +link; 
  response.innerHTML += "\nDescription: " + desc; 
  response.innerHTML += "\nOutput: " +output; 

};



window.onload = () => {
  document.getElementById("add-project-button").onclick = loadAddProject; 
  document.getElementById("remove-project-button").onclick = loadRemoveProject; 
  document.getElementById("edit-project-button").onclick = loadEditProject; 
  document.getElementById("add-project").onsubmit = submitAddProj; 
  document.getElementById("remove-project").onclick = submitRemoveProj; 
  document.getElementById("edit-project").onclick = submitEditProj; 

}