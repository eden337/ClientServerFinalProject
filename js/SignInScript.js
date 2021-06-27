    var rmCheck = document.getElementById("customCheck");
    var emailInput = document.getElementById("email");
    var pass = document.getElementById("pass");

function loginValidation(){
    
    var email= document.getElementById("email").value;
    var currentPass =pass.value;
    var message ="One of the parameters is incorrect please try again\n mail : "+email+"\n pass : "+currentPass;

    isRememberMe();
    $.post('/DB-login',{email:email,pass:currentPass},function(data,textStatus){
        if(data==="not ok"){
            $("#message1-text").html(message.replaceAll('\n','<br>'));
            $("#exampleModalLabel").html("Failure");
            $('#exampleModal').modal('show');
        }
        else{
            window.location=data;   
        }
    });
    
}


function isRememberMe(){
    if (rmCheck.checked && emailInput.value !== "") {
        localStorage.username = emailInput.value;
        localStorage.password= pass.value;
        localStorage.checkbox = rmCheck.value;
      } else {
        localStorage.username = "";
        localStorage.password= "";
        localStorage.checkbox = "";
      }
}


function loadRememberMe(){
    if (localStorage.checkbox && localStorage.checkbox !== "") {
        rmCheck.setAttribute("checked", "checked");
        emailInput.value = localStorage.username;
        pass.value = localStorage.password;
    } else {
        rmCheck.removeAttribute("checked");
        emailInput.value = "";
        pass.value="";

    }
}

$(document).ready(function(){
    loadRememberMe();
});
