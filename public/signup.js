window.onload = function async (req,res) {
  let formRegister = document.getElementById("form");
  

  formRegister.addEventListener("submit", async (e)=> {
    e.preventDefault();
 let   email=document.getElementById("email");
 console.log(email)
  let   fullname = document.getElementById("fullname");
  
  let password=document.getElementById("password");
  let confirmpassword = document.getElementById("confirmpassword");
  let errorMessage = document.getElementById("error")
  let successMessage = document.getElementById("success")
  
  if ( email.value == "" ||
  fullname.value == "" ||
  password.value == "" ||
  confirmpassword.value == "" )
  {
    errorMessage.textContent="All fields are required";
    errorMessage.style.color="red";
    
  } else if (password.value!==confirmpassword.value){
    errorMessage.textContent="Password does not match. Please check";
    errorMessage.style.color="red";
    // window.alert("Password does not match. Please check")

  } else if(fullname.value.length>30){
    errorMessage.textContent="Please check the length of the full name characters";
    errorMessage.style.color="red";
    // window.alert("Please check the length of the first name characters ")


  }else if(password.value.length<5 || password.value.length>15){
    errorMessage.textContent="Please check the length of the password";
    errorMessage.style.color="red";
    // window.alert("Please check the length of the password ")

  }  
  else{
   
  const  data = {
  email:email.value ,
  fullname:fullname.value ,
  password:password.value,
  confirmpassword:confirmpassword.value ,
   };
    console.log("data",data);
    // successMessage.textContent="Success";
    successMessage.style.color="green";
     let options={
       method:'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
       body:JSON.stringify(data)
       };
    
   const response = await fetch('/signup', options);
     
    const id= await response.json();
    console.log(id);
    if(response.status==200){
      
 window.alert("signup success")
     window.location.href="/signin"
    
    
    }else{
     errorMessage.innerHTML="User already Exists. Please check."
     errorMessage.style.color="red";
    }
//   .catch(error=>{
//      window.alert(error);
//      return;
//   })

// } 
    };
    
  });
  
  
  
 }