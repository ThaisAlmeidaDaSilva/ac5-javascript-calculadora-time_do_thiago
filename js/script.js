document.getElementById('resultado').value ="";
function validaEntrada(param, ptext){
	var strOper = "*+-/";
	returnOper = "";
	var ExisteOper = false;
    for(i=0; i< strOper.length; i++){
		
		if(param.indexOf(strOper[i]) !== -1)
		{
			returnOper = strOper[i];
			ExisteOper = true;
			break
		}
	}
	debugger;
	var strExp = "";
	if(ExisteOper){
		listresult = document.getElementById('resultado').value.split(returnOper);
		if(listresult.length ===2){
			listresult[1] = ValidaNumeros(listresult[1], ptext).trim();
			strExp = listresult[0].trim() +returnOper+listresult[1].trim()
		}
		else if(listresult.length ===1)
		{
			//listresult[1] = ValidNumbers(listresult[1], ptext).trim();	
		}
		else{
		  //document.getElementById('resultado').value = ValidNumbers(document.getElementById('resultado').value, ptext).trim();
		  strExp = ValidaNumeros(param, ptext).trim(); 
		}
	}
	else{
		//document.getElementById('resultado').value = ValidNumbers(document.getElementById('resultado').value, ptext).trim();
		strExp = ValidaNumeros(param, ptext).trim(); 
	}
	console.log(strExp);
	return {
		"ExistsOperation": ExisteOper,
		"TypeOperation": returnOper,
		"ResultExpression": strExp
		};
}
function ValidaNumeros(ParamNumeros, pConc){
	var resultado = "";
	if(pConc == "."){
	  if(ParamNumeros.indexOf(".") == -1){
		if(ParamNumeros.length >0){  
		  result= ParamNumeros + pConc;     
		}
	  }
	  else{
		result = ParamNumeros;
	  }
    }
    else{
	  result= ParamNumeros + pConc; 
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
