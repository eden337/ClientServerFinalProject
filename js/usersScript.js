var myTable;
function loadTable(){
    $.ajax({
        url: '/usersTable',
        method: 'get',
        dataType: 'json',
        success: function(data){
            myTable = $('#dataTable').DataTable({
                dom: 'Bfrtip',
                data: data,
                rowId: 'Button',
                columns: [
                    {data: "client_name"},
                    {data: "category"},
                    {data: "insurance_amount"},
                    {data: "previus_insurance_company"},
                    {data: "Status"}
                ]
            });
           }
    });
}

$(document).ready(function() {             
    loadTable();
});