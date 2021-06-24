var myTable;
var severityCell;
var statucCell;
var buttonCell;
var dueDateCell;
var catCell;
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
                catCell=myTable.cell(rowIndex,1);
                clientName=myTable.cell(rowIndex,2).data();
                amount=myTable.cell(rowIndex,3).data();
                statucCell=myTable.cell(rowIndex,4);
                dueDateCell=myTable.cell(rowIndex,5);
                buttonCell=myTable.cell(rowIndex,6);
                if(statucCell.data()!=="Reviewed"){
                    Calculate();
                }else{
                    moreInfo();
                }

                    
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
                        {data: "severity" ,defaultContent:'Not Calculated'},
                        {data: "category" ,defaultContent:'Car Insurance'},
                        {data: "client_name"},
                        {data: "insurance_amount"},
                        {data: "status",defaultContent:'In Review'},
                        {data: "due_date",defaultContent:'1/9/2021'},
                        {data: "Button",className:"calc-button", "render":function(data,type,row){
                            if(row.status==='Reviewed'){
                                return  "<i class='fas fa-ellipsis-h'></i>";
                            }else{
                                return '<i class="fas fa-calculator calc-button"></i>';
                            }
                        }}
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

        var color='danger';
        console.log(data[0].severity);
        switch(data[0].severity){
            case 'Low':
                color='success';
                break;
            case 'Mid':
                color='secondary';
                break;
            case 'High':
                color='warning';
                break;
            case 'Severe':
                color='danger';
                break;
            default:
                color='light';
                break;
        }
        severityCell.data("<span class= 'badge badge-pill badge-"+color+"';>"+data[0].severity+"</span>");
        catCell.data(data[0].category);
        statucCell.data(data[0].status);
        dueDateCell.data(data[0].due_date);
        buttonCell.data("<i class='fas fa-ellipsis-h' onClick=moreInfo()></i>");
        location.reload();
    });
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


function moreInfo(body){
    $.post('/client-Info',{clientName},function(data,status){
       

        myTable =  $('#infoTable').DataTable( {
            dom: 'Bfrtip',  
            data: data,  
            rowId:'Button',
            buttons:[{
                extend: 'create',
                name: 'testj2e'
            }],                    
            columns: [
                {data: "request_id" },
                {data: "social"},
                {data: "client_name"},
                {data: "email"},
                {data: "phone"},
                {data: "insurance_amount"},
                {data: "previous_insurance_number"},
                {data: "previous_insurance_id"},
                {data: "previous_insurance_company"},
                {data: "comment"},
                {data: "severity"},
                {data: "category"},
                {data: "status"},
                {data: "due_date"}
                // {data: "insuranceCompanyName"},
                // {data: "RequestNumber"},
                // {data: "insuranceCompanyfee"},
                // {data: "insuranceEnable"},
                // {data: "dateofEnblment"},
                // {data: "CarStatus"},
                // {data: "UserRank"},
                // {data: "message"}
            ]
            
    }); 

    });
    $("#dataTable").DataTable().destroy();
    loadTable();
}