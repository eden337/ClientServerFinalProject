function validate(val) 
{
    var fname = document.getElementById("fname"); // 1
    var lname = document.getElementById("lname"); // 2
    var email = document.getElementById("email"); // 3
    var mobile = document.getElementById("mob"); // 4
    var social_num = document.getElementById("social_num"); // 5
    var ins_amount = document.getElementById("ins_amount"); // 6
    var pre_ins_num = document.getElementById("pre_ins_num"); // 7
    var pre_ins_id = document.getElementById("pre_ins_id"); // 8
    var pre_ins_comp = document.getElementById("pre_ins_comp"); // 9
    var comment = document.getElementById("comment"); // 10
    
    var fname2 = document.getElementById("fname").value; // 1
    var lname2 = document.getElementById("lname").value; // 2
    var email2 = document.getElementById("email").value; // 3
    var mobile2 = document.getElementById("mob").value; // 4
    var social_num2 = document.getElementById("social_num").value; // 5
    var ins_amount2 = document.getElementById("ins_amount").value; // 6
    var pre_ins_num2 = document.getElementById("pre_ins_num").value; // 7
    var pre_ins_id2 = document.getElementById("pre_ins_id").value; // 8
    var pre_ins_comp2 = document.getElementById("pre_ins_comp").value; // 9
    var comment2 = document.getElementById("comment").value; // 10
    
    var requirements = ""; 
    
/*       FIRST NAME           */

    if(val=="fname" || val == "final_check") 
    {
        if(fname.value == "") 
        {
            fname.style.borderColor = "red";
            requirements += "Fill the first name field\n";

        }
        else 
        {
            fname.style.borderColor = "green";

        }
    }

/*       LAST NAME           */

    if(val == "lname" || val== "final_check") 
    {
        if(lname.value == "") 
        {
            lname.style.borderColor = "red";
            requirements += "Fill the last name field\n";

        }
        else 
        {
            lname.style.borderColor = "green";

        }
    }

/*       EMAIL NAME           */

    if(val == "email" || val=="final_check") 
    {
        email_requst = "";
        if(email.value == "") 
            email_requst+= "Fill the email field\n";

        str = email.value;
        shindex = str.indexOf('@',0);
        if (shindex != -1)
            shindex = str.indexOf('.',shindex);
        if (shindex == -1 )
            email_requst+= "Email not correct\n";
        if(email_requst == "")
        {
            email.style.borderColor = "green";
        }
        else 
        {
            email.style.borderColor = "red";
        }
        requirements += email_requst;
    }

/*       MOBILE           */

    if(val == "mob" || val=="final_check") 
    {
        if(mobile.value == "") {
            mobile.style.borderColor = "red";
            requirements += "Fill the mobile number field\n";

        }
        else {
            mobile.style.borderColor = "green";

        }
    }

/*       SOCIAL NUMBER           */

    if(val === 'social_num' || val === "final_check") 
    {
        social_num_requst = "";
        
        if(social_num.value === "")
            social_num_requst += "Fill the social number field\n";

        my_var = social_num.value;
        for(var i = 0 ; i < my_var.length ;i++)
        {
            if (! Number.isInteger(my_var.charAt(i) - '0') )
            {
                social_num_requst += "Social number has to be only numeric";
                break;
            }
        }

        if(social_num.value.length != 9)
            social_num_requst += "Social number has to be 9 digits\n";
        
        
        if(social_num_requst === "") {
            social_num.style.borderColor = "green";
        } else { 
            social_num.style.borderColor = "red";
        }
        
        requirements += social_num_requst;
    }

/*       INSURANCE AMOUNT           */

    if(val == "ins_amount" || val==0) 
    {
        if(ins_amount.value == "") 
        {
            ins_amount.style.borderColor = "red";
            requirements += "Fill the insurance amount field\n";

        }
        else 
        {
            ins_amount.style.borderColor = "green";

        }
    }

    /*       PREVIOUS INSURANCE NUMBER           */

    if(val == "pre_ins_num" || val=="final_check") 
    {
        if(pre_ins_num.value == "") 
        {
            pre_ins_num.style.borderColor = "red";
            requirements += "Fill the previous insurance number field\n";

        }
        else 
        {
            pre_ins_num.style.borderColor = "green";

        }
    }

    /*       PREVIOUS INSURANCE ID           */

    if(val == "pre_ins_id" || val=="final_check") 
    {
        if(pre_ins_id.value == "") 
        {
            pre_ins_id.style.borderColor = "red";
            requirements += "Fill the previous insurance id field\n";
        }
        else 
        {
            pre_ins_id.style.borderColor = "green";
        }
    }

    /*       PREVIOUS INSURANCE COMPANY          */

    if(val == "pre_ins_comp" || val=="final_check") 
    {
        if(pre_ins_comp.value == "") 
        {
            pre_ins_comp.style.borderColor = "red";
            requirements += "Fill the previous insurance company field\n";

        }
        else 
        {
            pre_ins_comp.style.borderColor = "green";

        }
    }

    /*       COMMENT           */

    if(val == "comment" || val=="final_check") 
    {
        if(comment.value == "") 
        {
            comment.style.borderColor = "red";
            requirements += "Fill the comment field\n";

        }
        else 
        {
            comment.style.borderColor = "green";

        }
    }
    
    if (requirements == "")
    {
        if(val=="final_check"){
            $.post('/send-request',{fname2,lname2,email2,mobile2,social_num2,ins_amount2,pre_ins_num2,pre_ins_id2,pre_ins_comp2,comment2},function(data,textstatus){
                console.log(data);
                window.location=data;
            });
        }   
        return true;
    }
    else
    {
        
        if(val=="final_check"){
            $("#message1-text").html(requirements.replaceAll('\n','<br>'));
            $("#exampleModalLabel").html("Failure");
            $('#exampleModal').modal('show');
        }
        return false;
    }
}