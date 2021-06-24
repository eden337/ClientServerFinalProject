
function loadTable()
{
    $.ajax({
        url: '/dashboardTable',
        method: 'get',
        dataType: 'json',
        success: function (data){
            myTable =  $('#dataTable').DataTable( {
                    dom: 'Bfrtip',  
                    data: data,  
                    rowId:'Button',
                    buttons:[{
                        extend: 'create',
                        name: 'testj2e'
                    }],                    
                    columns: [
                        {data: "severity" ,defaultContent:'Not Calculated'},
                       
                        
                    ]
                    
            }); 
           
        }
    });
}
$(document).ready(function() {  
    loadTable();
});