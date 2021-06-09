var myTable;
var severityCell;
var statucCell;
var buttonCell;
var clientName;
var amount;
var colIndex;
var rowIndex;
function loadTable()
{
    $.ajax({
        url: '/dashboardTable',
        method: 'get',
        dataType: 'json',
        success: function (data){
            $('#dataTable').on('click', 'td.calc-button', function() {
                colIndex = myTable.cell(this).index().column;
                rowIndex = myTable.cell(this).index().row;
                severityCell=myTable.cell(rowIndex,0);
                statucCell=myTable.cell(rowIndex,4);
                buttonCell=myTable.cell(rowIndex,6);
                clientName=myTable.cell(rowIndex,2).data();
                amount=myTable.cell(rowIndex,3).data();
                Calculate();
              });
            myTable =  $('#dataTable').DataTable( {
                    dom: 'Bfrtip',  
                    data: data,  
                    rowId:'Button',
                    buttons:[{
                        extend: 'create',
                        name: 'testj2e'
                    }],                    
                    columns: [
                        {data: "severity"},
                        {data: "category"},
                        {data: "client_name"},
                        {data: "insurance_amount"},
                        {data: "status"},
                        {data: "due_date"},
                        {data: "Button",className:"calc-button",defaultContent:'<i class="fas fa-calculator calc-button"></i>'}
                    ]
                    
            }); 
           
        }
    });
}
$(document).ready(function() {             
    loadTable();
});
function Calculate(body){
    $.post('/test',{clientName,amount},function(data,status){
        console.log(JSON.stringify(data));
        severityCell.data("<span style='color:red;'>High</span>")
        statucCell.data("eden");
        buttonCell.data("<i class='fas fa-ellipsis-h'></i>")

    })
    // var name=myTable.cell(rowIndex,2).data();
    // var amount=myTable.cell(rowIndex,3).data();
    // console.log(name);
    // $.post('/calculate',name,function(data,status){
    //     console.log(data);    
    //     myTable.cell(rowIndex,0).data("severe");
    // })
    // console.log(name);
    // if(rowIndex!=null && colIndex!=null){
    //     myTable.cell(rowIndex, colIndex).data("new");
    // }
    
}