function loginValidation(){
    var email= document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    if(email!="Class"||pass!="1234"){
        $("#message1-text").html("One of the parameters is incorrect please try again\n "+email+"\n"+pass);
        $("#exampleModalLabel").html("Failure");
        $('#exampleModal').modal('show');
    }
    /*
    GET request and go to Dashboard
    */
}