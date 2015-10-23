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
	},
	
	getMatchingPeople : function (inputPref, callback) {
		inputPref.toLowerCase();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
			  var json = JSON.parse(xhttp.responseText);
			  var users = [];
			  for(i=0; i<json.length;i++) {
				  var curPerson = json[i];
				  users.push(curPerson.username);
			  }
			  var n = inputPref.length;
			  var selectedUsers = [];
			  for(i=0; i<users.length;i++) {
				  var curUser = users[i];
				  var curUserPref = curUser.substring(0, n).toLowerCase();
				  if (inputPref == curUserPref) {
					  selectedUsers.push(curUser);
				  }
			  }
			  callback(selectedUsers);
			} //TODO else?
		}
		xhttp.open("GET", "/data/users.json", true);
		xhttp.send();	
	}
}
