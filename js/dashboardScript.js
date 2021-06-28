var myTable;
var moreInfoTable;
var severityCell;
var statucCell;
var buttonCell;
var dueDateCell;
var catCell;
var clientName;
var amount;
var colIndex;
var rowIndex;


//loading Table after the page is loaded
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
              //constucting the data table
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
    //Initialize of More Info table
    moreInfoTable =  $('#infoTable').DataTable( {
        dom: 'Bfrtip',   
        rowId:'Button',
        "searching": false,
        buttons:[{
            extend: 'create',
            name: 'testj2e'
        }]                  
        
    }); 
});

//updating severity level after pressing on the calculator
function Calculate(body){
    $.post('/calculate',{clientName},function(data,status){
        var color='danger';
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
}

//after pressing the 3 dots, more info will be displayed on the "More info" table 
function moreInfo(body){
    $.post('/client-Info',{clientName},function(data,status){

        console.log(data[0].userrank);
        var rowContent='<tr><td>'+data[0].request_id+'</td>'+
        '<td>'+data[0].social+'</td>'+
        '<td>'+data[0].client_name+'</td>'+
        '<td>'+data[0].email+'</td>'+
        '<td>'+data[0].phone+'</td>'+
        '<td>'+data[0].insurance_amount+'</td>'+
        '<td>'+data[0].previous_insurance_number+'</td>'+
        '<td>'+data[0].previous_insurance_id+'</td>'+
        '<td>'+data[0].previous_insurance_company+'</td>'+
        '<td>'+data[0].comment+'</td>'+
        '<td>'+data[0].severity+'</td>'+
        '<td>'+data[0].category+'</td>'+
        '<td>'+data[0].status+'</td>'+
        '<td>'+data[0].due_date+'</td>'+
        '<td>'+data[0].previous_insurance_company+'</td>'+
        '<td>'+data[0].prevrequestnumber+'</td>'+
        '<td>'+data[0].insurancecompanyfee+'</td>'+
        '<td>'+data[0].insuranceenable+'</td>'+
        '<td>'+data[0].dateofenblment+'</td>'+
        '<td>'+data[0].userrank+'</td>'+
        '<td>'+data[0].message+'</td>'+
        '</tr>';
        $('#infoTable').append(rowContent);
        $('#infoTable')[0].rows[1].remove();

    });
}