var Users = {
	getPerson : function (selUser, callback) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
			  var json = JSON.parse(xhttp.responseText);
			  var result = null;
			  //TODO 'Encapsularlo' en funcion
			  for(i=0; i<json.length;i++) {
				  var curPerson = json[i];
				  //TODO Considerar usar localeCompare
				  if (curPerson.username == selUser) {
					  result = curPerson;
				  }
			  }
			  callback(result);
			} //TODO else?
		}
		xhttp.open("GET", "/data/users.json", true);
		xhttp.send();
	}
}
