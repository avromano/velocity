var Users = function() {
	
	var usersJson = null;
	var usersTree = null;
	var usersList = [];
	var cachedSug = {};
	
	function getPerson(selUser, callback) {
		filterUsersJson(function(json, freshValue) {
			selUser = selUser.toLowerCase();
			var result = null;
			if (json) {
				var compFunc = function compStrings(str1, str2) {
					return str1.localeCompare(str2);
				}
				if (freshValue || !usersTree) {
					var newBinTree = null;
					for(i in json) {
						newBinTree = BinTree.append(json[i].username.toLowerCase(), i, compFunc, newBinTree);
					}
					usersTree = newBinTree;
				}
				var indexPerson = BinTree.getValue(selUser, compFunc, usersTree);
				if (indexPerson) {
					result = json[indexPerson];
				}
			}
			callback(result);
		});
	}
	
	function getMatchingUsers(enteredUsr, callback) {
		filterUsersJson(function(json, freshValue) {	  
			if (freshValue || !usersList || usersList.length == 0) {
				if (json) {
					var users = [];
					for(i in json) {
						var curPerson = json[i];
						users.push(curPerson.username);
					}
					usersList = users;
				} else {
					usersList = [];
				}
				cachedSug = {};
			}
			var selectedUsers = [];
			var cache = cachedSug[enteredUsr];
			if (cache) {
				selectedUsers = cache;
			} else {
				for(i in usersList) {
					var curUser = usersList[i];
					var re = new RegExp(enteredUsr, 'i');
					if (curUser.match(re)) {
						selectedUsers.push(curUser);
					}
				}
				cachedSug[enteredUsr] = selectedUsers;
			}

			callback(selectedUsers);
		});
	}
	
	function filterUsersJson(filter) {
		if (usersJson) {
			filter(usersJson, false);
		} else {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4) {
					if (xhttp.status == 200) {
					  var json = JSON.parse(xhttp.responseText);
					  filter(json, true);
					  usersJson = json;
					} else { //For this use case, status codes other than 200 (OK) will be rejected
						filter(null, true);
						usersJson = null;
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
