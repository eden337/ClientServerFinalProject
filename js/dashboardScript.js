const fs= require('fs');


function Calculate(){
    var data = fs.readFileSync('/static/json/IsraelIsraeli.json')
    const UTF8_BOM = "\u{FEFF}";                    
    if( data.includes(UTF8_BOM)){
        data.subarray(1);
    }
    console.log(JSON.parse(data));
}