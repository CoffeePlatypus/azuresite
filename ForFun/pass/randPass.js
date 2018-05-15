var old = [];
var newPass ="";

function rand() {
  getRandomWord();
}

function generatePass() {
  var min = document.getElementById("minLenght").value;
  var num = document.getElementById("numWords").value;

  var pass = "";
  for(var i = 0; i<num; i++) {
    pass += getRandomWord()+ getRandomChar();
  }
  pass += Math.floor(Math.random()*10);
  while(pass.length<min) {
    pass += getRandomChar() + Math.floor(Math.random()*10);
  }
  old.unshift(newPass);
  newPass=pass;
  refresh();
}

function clear() {
  old = [];
  newPass = "";
  refresh();
}

function refresh() {
  var newCont = document.getElementById('new');
  removeChildren(newCont);
  var oldCont = document.getElementById("old");
  removeChildren(oldCont);
  newCont.appendChild(document.createTextNode(newPass));
  old.forEach(pass=>{
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(pass));
    oldCont.appendChild(div);
  });
}

// funtion printList(holder) {
//   old.forEach(pass=>{
//     var div = document.createElement("div");
//     div.appendChild(document.createTextNode(pass));
//     holder.appendChild(div);
//   });
// }

function removeChildren(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
