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
                    {data: "FirstName"}, 
                    {data: "LastName"},
                    {data: "insuranceType"},
                    {data: "insuranceAmountRequested"},
                    {data: "insuranceCompanyName"},
                    {data: "CarSatus"},
                    {data: "UserRank"}        
                ]
            });
           }
    });
}