function loginValidation(){
    
    var email= document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var message ="One of the parameters is incorrect please try again\n mail : "+email+"\n pass : "+pass;
    $.post('/DB-login',{email:email,pass:pass},function(data,textStatus){
        if(data=="not ok"){
            $("#message1-text").html(message.replaceAll('\n','<br>'));
            $("#exampleModalLabel").html("Failure");
            $('#exampleModal').modal('show');
        }
        else{
            window.location=data;   
        }
    });
}