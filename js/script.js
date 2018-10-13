document.getElementById('resultado').value ="";


/// Valida existencia de Operação
function hasOperation(param, ptext){
	var strOperation = "*+-/";
	returnOperation = "";
	var ExistsOperation = false;
	
    for(i=0; i< strOperation.length; i++){
		
		if(param.indexOf(strOperation[i]) !== -1)
		{
			returnOperation = strOperation[i];
			ExistsOperation = true;
			break
		}
	}
	debugger;
	var strExpression = "";
	if(ExistsOperation){
		
		listresult = document.getElementById('resultado').value.split(returnOperation);
		
		if(listresult.length ===2){
			listresult[1] = ValidNumbers(listresult[1], ptext).trim();
			strExpression = listresult[0].trim() +returnOperation+listresult[1].trim()
		}
		else if(listresult.length ===1)
		{
			//listresult[1] = ValidNumbers(listresult[1], ptext).trim();
			
		}
		else{
		  //document.getElementById('resultado').value = ValidNumbers(document.getElementById('resultado').value, ptext).trim();
		  strExpression = ValidNumbers(param, ptext).trim(); 
		}
	}
	else{
		//document.getElementById('resultado').value = ValidNumbers(document.getElementById('resultado').value, ptext).trim();
		strExpression = ValidNumbers(param, ptext).trim(); 
	}
	console.log(strExpression);
	
	return {
		"ExistsOperation": ExistsOperation,
		"TypeOperation": returnOperation,
		"ResultExpression": strExpression
		};
}

function ValidNumbers(ParamNumber, pConcate){
	var result = "";
	if(pConcate == "."){
	  if(ParamNumber.indexOf(".") == -1){
		if(ParamNumber.length >0){  
		  result= ParamNumber + pConcate;     
		}
	  }
	  else{
		result = ParamNumber;
	  }
    }
    else{
	  result= ParamNumber + pConcate; 
    }
	
	return result;
}




function RemoveItemInvaid()
{
	
	if(document.getElementById('resultado').value.length ===1)
	{
		var strOperation = "*+-/.";
		var isExistsOperation = false;
		
		for(i=0; i< strOperation.length; i++){
			
			if(document.getElementById('resultado').value.indexOf(strOperation[i]) !== -1)
			{
				isExistsOperation = true;
				break
			}
		}
		
		if(isExistsOperation)
		{
			document.getElementById('resultado').value ="";
		}
	}
		
	
}

function ClickResultado_v2(e){
        RemoveItemInvaid();	
    if(e.className && e.className.indexOf('resultar')!=-1){
        try{
			if(document.getElementById('resultado').value !="")
			{
				document.getElementById('resultado').value = eval(document.getElementById('resultado').value);
			}
			
		}
		catch
		{
			document.getElementById('resultado').value = "Erro de operação";
		}
		
    }
}


function ClickNumber(e){
   if(e.className && e.className.indexOf('numero')!=-1){
      
	   document.getElementById('resultado').value = hasOperation(document.getElementById('resultado').value,e.innerText ).ResultExpression;
	  
   } 
}


function RegraOperador(e){
    if(e.className && e.className.indexOf('operacao')!=-1){
        
        if(hasOperation(document.getElementById('resultado').value, "").ExistsOperation ===false){
			document.getElementById('resultado').value = hasOperation(document.getElementById('resultado').value,e.innerText).ResultExpression;
		} 
       
    }
}

document.body.onclick= function(e){
	  e=window.event? event.srcElement: e.target;
	  RegraOperador(e);
	  ClickNumber(e);
	  ClickResultado_v2(e);    

}
