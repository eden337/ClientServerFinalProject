function validate(val) 
{
    fname = document.getElementById("fname"); // 1
    lname = document.getElementById("lname"); // 2
    email = document.getElementById("email"); // 3
    mobile = document.getElementById("mob"); // 4
    social_num = document.getElementById("social_num"); // 5
    ins_amount = document.getElementById("ins_amount"); // 6
    pre_ins_num = document.getElementById("pre_ins_num"); // 7
    pre_ins_id = document.getElementById("pre_ins_id"); // 8
    pre_ins_comp = document.getElementById("pre_ins_comp"); // 9
    comment = document.getElementById("comment"); // 10
    
    
    fname_flag = true;
    lname_flag = true;
    email_flag = true;
    mobile_flag = true;
    social_num_flag = true;
    ins_amount_flag = true;
    pre_ins_num_flag = true;
    pre_ins_id_flag = true;
    pre_ins_comp_flag = true;
    comment_flag = true;
    
   




/*       FIRST NAME           */

    if(val=="fname" || val == "final_check") 
    {
        if(fname.value == "") 
        {
            fname.style.borderColor = "red";
            fname_flag = false;
        }
        else 
        {
            fname.style.borderColor = "green";
            fname_flag = true;
        }
    }

/*       LAST NAME           */

    if(lname == "lname" || val== "final_check") {
        if(lname.value == "") 
        {
            lname.style.borderColor = "red";
            lname_flag= false;
        }
        else 
        {
            lname.style.borderColor = "green";
            lname_flag = true;
        }
    }

/*       EMAIL NAME           */

    if(val == "email" || val=="final_check") {
        if(email.value == "") 
        {
            email.style.borderColor = "red";
            email_flag = false;
        }
        else 
        {
            email.style.borderColor = "green";
            email_flag = true;
        }
    }

/*       MOBILE           */

    if(mobile == "mob" || val=="final_check") {
        if(mobile.value == "") {
            mobile.style.borderColor = "red";
            mobile_flag = false;
        }
        else {
            mobile.style.borderColor = "green";
            mobile_flag = true;
        }
    }

/*       SOCIAL NUMBER           */

    if(social_num == "social_num" || val==0) 
    {
        if(social_num.value == "") 
        {
            social_num.style.borderColor = "red";
            social_num_flag = false;
        }
        else 
        {
            social_num.style.borderColor = "green";
            social_num_flag = true;
        }
    }

/*       INSURANCE AMOUNT           */

    if(ins_amount == "ins_amount" || val==0) {
        if(ins_amount.value == "") 
        {
            ins_amount.style.borderColor = "red";
            ins_amount_flag = false;
        }
        else 
        {
            ins_amount.style.borderColor = "green";
            ins_amount_flag = true;
        }
    }

    /*       EMAIL NAME           */

    if(val == "email" || val=="final_check") {
        if(email.value == "") 
        {
            email.style.borderColor = "red";
            email_flag = false;
        }
        else 
        {
            email.style.borderColor = "green";
            email_flag = true;
        }
    }

    /*       EMAIL NAME           */

    if(val == "email" || val=="final_check") {
        if(email.value == "") 
        {
            email.style.borderColor = "red";
            email_flag = false;
        }
        else 
        {
            email.style.borderColor = "green";
            email_flag = true;
        }
    }

    /*       EMAIL NAME           */

    if(val == "email" || val=="final_check") {
        if(email.value == "") 
        {
            email.style.borderColor = "red";
            email_flag = false;
        }
        else 
        {
            email.style.borderColor = "green";
            email_flag = true;
        }
    }
    
    flag = flag1 && flag2 && flag3 && flag4 && flag5 && flag6;
    
    return flag;
    }