
const showAboutMe = () => {
  // console.log("here!"); 
  document.getElementById("aboutme-content").classList.toggle("hidden"); 
};

const showWorkExperiences = () => {
  document.getElementById("workexperience-content").classList.toggle("hidden"); 
};

window.onload = () => {
  document.getElementById("about-me-link").onclick = showAboutMe; 
  document.getElementById("work-exp-link").onclick = showWorkExperiences; 
}