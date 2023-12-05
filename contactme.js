const showEmailResult = async (e) => {
  //prevent the default 
  e.preventDefault(); 

  const input = document.getElementById("userInput"); 
  let response = await getEmailResult(); 
  if(response.status == 200) {
    input.innerHTML = "Email successfully sent!";
  } else {
    input.innerHTML = "Sorry, email was not sent"; 
  }
};

const getEmailResult = async (e) => {
  const message = document.getElementById("contact-me-content"); 
  const formData = new FormData(message); 
  const object = Object.fromEntries(formData); 
  const json = JSON.stringify(object); 
  const input = document.getElementById("userInput"); 
  input.innerHTML = "Please hold...";

  try {
    const systemResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
      },
      body: json, 
    });
    return systemResponse; 
  } catch(error) {
    console.log(error); 
    document.getElementById("userInput").innerHTML = "Sorry, email couldn't be sent"; 
  }
};

document.getElementById("contact-me-content").onsubmit = showEmailResult; 