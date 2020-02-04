function getHistory() {
	return document.getElementById("history-value").innerText;
}

function printHistory(value) {
	document.getElementById("history-value").innerText = value;
}

function getOutput() {
	return document.getElementById("output-value").innerText;
}

function printOutput(value) {
	if (value == ""){
		document.getElementById("output-value").innerText=value;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(value);
	}
}

function getFormattedNumber(value){
	if(value=="-"){
		return "";
	}
	return Number(value).toLocaleString("en");
}

function reverseNumberFormat(value){
	return Number(value.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length; i++){
	operator[i].addEventListener('click', function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){
				printOutput(output.substr(0,output.length-1)); 
			}
		}else if(this.id=="%"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){
				printOutput(eval(output/100)); 
				printHistory("");
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history=history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history+=output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					printHistory(history+this.id);
					printOutput("");
				}
			}
		}
	})
}

var number = document.getElementsByClassName("number");
for(var j=0;j<number.length; j++){
	number[j].addEventListener('click', function(){
		var output=reverseNumberFormat(getOutput());
		if(!isNaN(output)){
			printOutput(output+this.id);
		}
	})
}