var UsersController = {
	search : function (selUser, resCallback) {
		if (selUser != null && selUser != "") {
			Users.getPerson(selUser, function(result) {resCallback(result)});
		} else {
			resCallback(null);
		}
	}	
}
