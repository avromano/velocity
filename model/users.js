var Users = function() {
	
	var usersJson = null;
	
	function getPerson(selUser, callback) {
		filterUsersJson(function(json) {
			var result = null;
			if (json) {
				for(i in json) {
					var curPerson = json[i];
					if (curPerson.username == selUser) {
						result = curPerson;
					}
				}
			}
			callback(result);
		});
	}
	
	function getMatchingUsers(inputPref, callback) {
		filterUsersJson(function(json) {	  
			inputPref = inputPref.toLowerCase();
			var selectedUsers = [];
			if (json) {
				var users = [];
				for(i in json) {
					var curPerson = json[i];
					users.push(curPerson.username);
				}
				var n = inputPref.length;
				for(i in users) {
					var curUser = users[i];
					var curUserPref = curUser.substring(0, n).toLowerCase();
					if (inputPref == curUserPref) {
						selectedUsers.push(curUser);
					}
				}
			}
			callback(selectedUsers);
		});
	}
	
	function filterUsersJson(filter) {
		if (usersJson) {
			filter(usersJson);
		} else {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4) {
					if (xhttp.status == 200) {
					  var json = JSON.parse(xhttp.responseText);
					  filter(json);
					  usersJson = json;
					} else { //For this use case, status codes other than 200 (OK) will be rejected
						filter(null);
					}
				}
			}
			xhttp.open("GET", "/data/users.json?"+Math.random(), true);
			xhttp.send();
		}
	}
	
	return {
		getPerson:getPerson,
		getMatchingUsers:getMatchingUsers,
	}
}();
