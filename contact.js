window.onload=function async (req,res){
    let formContact=document.getElementById("form");
    
    
    formContact.addEventListener("submit", async (event)=>{
        event.preventDefault();
        let Name=document.getElementById("Name");
        let Email=document.getElementById("Email");
        //let option=document.getElementById("option");
        let describeYourIssue=document.getElementById("describeYourIssue");
        let errorMessage=document.getElementById("error");
       let successMessage=document.getElementById("success");

    if(Name.value == "" || Email.value == "" || describeYourIssue.value == ""){
    errorMessage.textContent="Please fill all the fields";
    errorMessage.style.color="red";       
        }else if(Name.value.length>30) {
            errorMessage.textContent="Please check the length of the characters";
    errorMessage.style.color="red";
    
         
          }else if(describeYourIssue.value.length>200){
    errorMessage.textContent="Please check the maximum length of characters";
    errorMessage.style.color="red";
          }
        else{ 
           const data2={
            Name:Name.value,
            Email:Email.value,
            //option:option.value,
            describeYourIssue:describeYourIssue.value    
           };
           console.log(data2)
           successMessage.textContent="Success";
           successMessage.style.color="green";
          
           let options={
            method:'POST',
           headers: { "Content-type": "application/json; charset=UTF-8" },
           body:JSON.stringify(data2)
            // body:JSON.parse(JSON.stringify(data2))
          
        };
        const response = await fetch('/contact', options);
       
      const id= await response.json();
      console.log(id);
      if(response.status==200){
        window.alert("thank you for your feedback")
        window.location.href="/"
      }else{
        console.log("error message",error)
        errorMessage.style.color="red";
       }


        }  
    });

    };

   

    