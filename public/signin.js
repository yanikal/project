window.onload = function async (req,res) {
    let formSignin = document.getElementById("form");
        
      
    formSignin.addEventListener("submit", async (e)=> {
          e.preventDefault();
       let  email = document.getElementById("email");
        let password = document.getElementById("password");
        let errorMessage = document.getElementById("error");
        let successMessage = document.getElementById("success");
        
        if ( email.value == "" || password.value == "" )
        {
          errorMessage.textContent="All fields are required";
          errorMessage.style.color="red";
    
      
        }  
        else{
         
        const  data = {
          email:email.value ,
          password:password.value,    
          
            };
          // console.log("data",data);
          // successMessage.textContent="Success";
          // successMessage.style.color="green";
         
          
          
           let options={
             method:'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
             body:JSON.stringify(data)
         };
          
         const response = await fetch('/signin', options);
          const id= await response.json();
          console.log(id);
          const token = response.headers.get("x-auth-token");
        console.log(id, token);
          console.log(id);
          if(response.status==200){
            localStorage.setItem("x-auth-token", token);
           window.location.href="/menu"
           
           
        
          }else{
           errorMessage.innerHTML="invalid username/password."
           errorMessage.style.color="red";
          }
     
          };
          
        });
        
        
        
       }