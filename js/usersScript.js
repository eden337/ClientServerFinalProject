var myTable;
function loadTable(){
    $.ajax({
        url: '/usersTable',
        method: 'get',
        dataType: 'json',
        success: function(data){
            myTable = $('#usersTable').DataTable({
                dom: 'Bfrtip',
                data: data,
                rowId: 'Button',
                columns: [
                    {data: "client_name"},
                    {data: "category"},
                    {data: "insurance_amount"},
                    {data: "previous_insurance_company"},
                    {data: "status"}
                ]
            });
           }
    });
}

$(document).ready(function() {             
    loadTable();
});