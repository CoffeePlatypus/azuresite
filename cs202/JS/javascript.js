function getRisk() {
  var height = document.getElementById("height");
  var weight = document.getElementById("weight");
  var sex = document.getElementById('male');
  sex.checked? sex="M" : sex="F";
  var hold = document.getElementById("riskOutput");
  var message;
  removeChildren(hold)
  var risky = risk(height.value,weight.value,sex);
  if(risky=="error") {
    message=risky;
  }else if(risky) {
    console.log(true);
    message="You are at risk";
  }else {
    console.log(false);
    message="You are not at risk";
  }
  hold.appendChild(makeText("div",message));
  hold.setAttribute("class","");
}

function makeText(type, text) {
  var holder = document.createElement(type);
  holder.appendChild(document.createTextNode(text));
  return holder;
}

function risk(height, weight, sex) {
  var bmi = (weight*.45) / Math.pow((height*.025),2);
  console.log(bmi===NaN);
  if(bmi=="NaN") {
    return "error";
  }
  console.log(bmi);
  return (sex == "F" && (bmi<19.4 || bmi>27.6)) || (sex == "M" && (bmi<20.4 || bmi>31.9));
}

function fromRoman() {
  var hold = document.getElementById("fromRomanOutput");
  removeChildren(hold);
  var num=document.getElementById("romanNumeral").value;
  hold.appendChild(makeText("div",roman(num)));
  hold.setAttribute("class","");
}

function toRoman() {
  var hold = document.getElementById("toRomanOutput");
  removeChildren(hold);
  var num=Number(document.getElementById("romanNum").value);
  hold.appendChild(makeText("div",roman(num)));
  hold.setAttribute("class","");
}

function roman(num) {
	var roman=["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX","X"];
	if(typeof(num) == "number") {
		return roman[num-1];
	}else if(typeof(num) =="string") {
		num=num.toUpperCase();
		for(var i=0; i<roman.length; i++) {
			if(roman[i]==num) {
				return i+1;
			}
		}
	}
}

function follow() {
  var hold = document.getElementById("followOutput");
  removeChildren(hold);
  var text = document.getElementById("followString").value;
  var ch = document.getElementById("followChar").value;
  hold.appendChild(makeText("div",lettersThatFollow(text,ch)));
  hold.setAttribute("class","");
}

function lettersThatFollow(text,ch) {
  var temp=text.split(ch);
  var result="";
  temp.shift();
  for(var x in temp) {
  	if(result.indexOf(temp[x].charAt(0)) == -1) {
  		result+=temp[x].charAt(0);
  	}
  }
  return result;
}

function props(list, propertyName){
  var result=[];
  for(var x in list) {
  	result.push(list[x][propertyName]);
  }
  return result;
}

function listify(item,listType) {
	var result="";
	for(var i=0; i<item.length; i++) {
		if(Array.isArray(item[i])) {
			result=result+"<li>"+item[i].shift()+listify(item[i],listType) +"</li>";
		}else{
			result=result+"<li>"+item[i]+"</li>";
		}
	}
	return "<"+listType+">"+result+"</"+listType+">";
}

function getChange() {
  var hold = document.getElementById("changeOutput");
  removeChildren(hold);
  var price = Number(document.getElementById("price").value);
  var payment = Number(document.getElementById("payment").value);
  var change = cashier(price,payment);
  for(var money in change) {
    hold.appendChild(makeText("div",money+" : "+change[money]));
  }
  hold.setAttribute("class","");
}

function cashier(price,payment) {
	var changeAmount;
	if(price>payment) {
		changeAmount=payment;
	}else{
		changeAmount=payment-price;
	}
	var change = {twenties:0, tens:0, ones:0, quarters:0, dimes:0, nickels:0, pennies:0};
	while(changeAmount-20>=0) {
		change.twenties++;
		changeAmount=changeAmount-20;
	}
	while(changeAmount-10>=0) {
		change.tens++;
		changeAmount=changeAmount-10;
	}
	while(changeAmount-1>=0) {
		change.ones++;
		changeAmount=changeAmount-1;
	}
	while(changeAmount-0.25>=0) {
		change.quarters++;
		changeAmount=changeAmount-0.25;
	}
	while(changeAmount-0.1>=0) {
		change.dimes++;
		changeAmount=changeAmount-0.1;
	}
	while(changeAmount-0.05>=0) {
		change.nickels++;
		changeAmount=changeAmount-0.05;
	}
	while(changeAmount-0.01>=0) {
		change.pennies++;
		changeAmount=changeAmount-0.01;
	}
	return change;
}
//cashier( 10.32, 80 )  // 5 penny diff
function peat() {
  var hold = document.getElementById("repeatOutput");
  removeChildren(hold);
  var n = Number(document.getElementById("repeatNum").value);
  var text = document.getElementById("repeatString").value;
  hold.appendChild(makeText("div",repeat(text,n)));
  hold.setAttribute("class","");

}

function repeat(text,n) {
	result="";
	for(var i=0; i<n;i++) {
		result+=text;
	}
	return result;
}

function repeatf(f,n) {
	if(n<=0) {return "";}
	var result= new Array(n);
	for(var i=0; i<n; i++) {
		result[i]=  f();
	}
	return result;
}
//sequence error because sequence is not defined

function matchmaker(obj) {
	function pred(input) {
		for(var x in obj) {
			if(obj[x]!= input[x]) {
				return false;
			}
		}
		return true;
	}
	return pred;
}

function breakup(list,partitioner) {
	var result = {};
	for(var i=0; i<list.length; i++) {
		var prop=partitioner(list[i]);
		if(!Array.isArray(result[prop])) {
			result[prop] = [];
		}
		result[prop].push(list[i]);
	}
	return result;
}

function eachOne(list) {
	for(var i=0; i<list.length; i++) {
		if(!list[i]) {
			return list[i];
		}
	}
	return true;
}

function noSql(list, query) {
	var result=[];
	var match = matchmaker(query);
	for(var i=0; i<list.length; i++) {
		var temp = list[i];
		if(match(temp)) {
			result.push(temp);
		}
	}
	return result;
}

function justOnce(f) {
	var called=false;
	var ret;
	return function once() {
		if(called==false) {
			called=true;
		  ret = f.apply(null,arguments);
		}
		return ret;
	}
}

function removeChildren(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
