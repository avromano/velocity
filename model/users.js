var Users = function() {
	
	/* Cached array of object reprsentations of file users.json */
	var usersJson = null;
	/* Cached binary tree of positions in array usersJson indexed by username */
	var usersTree = null;
	/* Cahed users of users.json*/
	var usersList = [];
	/* Cached suggestions for given username inputs */
	var cachedSug = {};
	
	/*
	 * Sends the person that exact matches the entered user to the
	 * callback taken as parameter.
	 * 
	 * Input parameters:
	 *  selUser: username of the person to be searched
	 *  callback: function to be called to send the result
	 */
	function getPerson(selUser, callback) {
		if (!selUser) {
			callback(null);
			return;
		}
		//Get contents in usersJson
		filterUsersJson(function(json, freshValue) {
			selUser = selUser.toLowerCase();
			var result = null;
			if (json) {
				var compFunc = function compStrings(str1, str2) {
					return str1.localeCompare(str2);
				}
				//If usersJson has been updated or usersTree is not set,
				//update usersTree
				if (freshValue || !usersTree) {
					var newBinTree = null;
					for(i in json) {
						//Each node of the tree has as value the position
						//of the person in array usersJson
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
	
	/*
	 * Sends a list of similar usernames to the 
	 * callback taken as parameter.
	 * 
	 * Input parameters:
	 *  enteredUsr: entered username to search similar matches
	 *  callback: function to be called to send the similar matches
	 */
	function getMatchingUsers(enteredUsr, callback) {
		if (!enteredUsr || enteredUsr.trim() == '') {
			callback([]);
			return;
		}
		//Get contents in usersJson
		filterUsersJson(function(json, freshValue) {	  
			//If usersJson is updated or there are no cached users,
			//update usersList
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
				//Clear cache of previous suggestions
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
	
	/*
	 * Applies the filter taken as argument to the values of users.json.
	 * 
	 * Input parameters:
	 *  filter : function to be executed on the values of users.json.
	 *  If the cache for users.json is updated (usersJson) the second
	 *  parameter must be 'true', otherwise, 'false'.
	 */
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
			//A random number is added at the end in order to prevent
			//the browser to get catched values
			xhttp.open("GET", "/data/users.json?"+Math.random(), true);
			xhttp.send();
		}
	}
	
	return {
		getPerson:getPerson,
		getMatchingUsers:getMatchingUsers,
	}
}();
