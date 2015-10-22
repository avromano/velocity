var UsersController = {
	search : function (selUser, resCallback) {
		//TODO Usar localeCompare por si hay espacios?
		if (selUser != null && selUser != "") {
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
}