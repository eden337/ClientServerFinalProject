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

    /*       PREVIOUS INSURANCE NUMBER           */

    if(pre_ins_num == "pre_ins_num" || val=="final_check") {
        if(pre_ins_num.value == "") 
        {
            pre_ins_num.style.borderColor = "red";
            pre_ins_num_flag = false;
        }
        else 
        {
            pre_ins_num.style.borderColor = "green";
            pre_ins_num_flag = true;
        }
    }

    /*       PREVIOUS INSURANCE ID           */

    if(pre_ins_id == "pre_ins_id" || val=="final_check") {
        if(pre_ins_id.value == "") 
        {
            pre_ins_id.style.borderColor = "red";
            pre_ins_id_flag = false;
        }
        else 
        {
            pre_ins_id.style.borderColor = "green";
            pre_ins_id_flag = true;
        }
    }

    /*       PREVIOUS INSURANCE COMPANY          */

    if(pre_ins_comp == "pre_ins_comp" || val=="final_check") {
        if(pre_ins_comp.value == "") 
        {
            pre_ins_comp.style.borderColor = "red";
            pre_ins_comp_flag = false;
        }
        else 
        {
            pre_ins_comp.style.borderColor = "green";
            pre_ins_comp_flag = true;
        }
    }

    /*       COMMENT           */

    if(comment == "comment" || val=="final_check") {
        if(comment.value == "") 
        {
            comment.style.borderColor = "red";
            comment_flag = false;
        }
        else 
        {
            comment.style.borderColor = "green";
            comment_flag = true;
        }
    }
    

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

    final_check_flag = fname_flag && lname_flag && email_flag && mobile_flag && social_num_flag && ins_amount_flag
    && pre_ins_num_flag && pre_ins_id_flag && pre_ins_comp_flag && comment_flag;
    
    return final_check_flag;
    }