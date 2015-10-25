var UsersController = function() {
	function search(selUser, resCallback) {
		if (selUser != null && selUser.trim != '') {
			Users.getPerson(selUser, function(result) {
				var error = '';
				if (result == null) {
					error = 'No matching people';
				}
				resCallback(result, error);
				});
		} else {
			resCallback(null, 'No user selected to start the search');
		}
	}
	
	function suggest(enteredText, resCallback) {
		if (enteredText != null && enteredText.trim() != '') {
			Users.getMatchingUsers(enteredText, function (result) {
				resCallback(result);
				});
		} else {
			resCallback([]);
		}
	}
	
	return {
		search:search,
		suggest:suggest,
	}
}();
