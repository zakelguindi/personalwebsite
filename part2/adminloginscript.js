

const loadAddProject = () => {
  document.getElementById("add-project").classList.toggle("hidden");
  console.log("Yo"); 
}

window.onload = () => {
  document.getElementById("add-project-button").onclick = loadAddProject; 
}