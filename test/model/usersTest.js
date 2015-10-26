var UsersTest = function() {
	//Calling getPerson with null
	function test1() {
		Users.getPerson(null, function(result) {
			console.log('test1: ' + (result == null));
		});
	}

	//Calling getPerson with empty string
	function test2() {
		Users.getPerson('', function(result) {
			console.log('test2: ' + (result == null));
		});
	}

	//Calling getPerson with existing username
	function test3() {
		Users.getPerson('swebb0', function(result) {
			console.log('test3: ' + (result.username == 'swebb0'));
		});
	}
	
	//Calling getPerson with non-existing username
	function test4() {
		Users.getPerson('seera0', function(result) {
			console.log('test4: ' + (result == null));
		});
	}

	//Calling getPerson with non-existing username usgin special characters
	function test5() {
		Users.getPerson('ñ%&#wá', function(result) {
			console.log('test5: ' + (result == null));
		});
	}

	//Calling getPerson consecutive times to test the cache
	function test6() {
		var res = true;
		Users.getPerson('swebb0', function(result) {
			res &= (result.username == 'swebb0');
		});
		Users.getPerson('seera0', function(result) {
			res &= (result == null);
		});
		Users.getPerson('swebb0', function(result) {
			res &= (result.username == 'swebb0');
		});
		Users.getPerson('seera0', function(result) {
			res &= (result == null);
		});
		
		console.log('test6:' + res);
	}

	//Calling getMatchingUsers with null
	function test7() {
		Users.getMatchingUsers(null, function(result) {
			console.log('test7: ' + (result.length == 0));
		});
	}

	//Calling getMatchingUsers with empty string
	function test8() {
		Users.getMatchingUsers('', function(result) {
			console.log('test8: ' + (result.length == 0));
		});
	}

	//Calling getMatchingUsers with existing user
	function test9() {
		Users.getMatchingUsers('swebb0', function(result) {
			console.log('test9: ' + (result.indexOf('swebb0') != -1));
		});
	}

	//Calling getMatchingUsers with non-existing user
	function test10() {
		Users.getMatchingUsers('seera0', function(result) {
			console.log('test10: ' + (result.length == 0));
		});
	}

	//Calling getMatchingUsers with great number of matches
	function test11() {
		Users.getMatchingUsers('a', function(result) {
			var testRes = true;
			for(i in result) {
				var curRes = result[i];
				var re = new RegExp('a', 'i');
				if (!curRes.match(re)) {
					testRes = false;
					break;
				}
				Users.getPerson(curRes, function(searchRes){
					if (searchRes == null) {
						console.log('test11: false');
					}
				});
				
			}
			console.log('test11 (partial): ' + testRes);
		});
	}

	function runTests() {
		console.log('Starting unit tests for users.js...');

		test1();
		test2();
		test3();
		test4();
		test5();
		test6();
		test7();
		test8();
		test9();
		test10();
		test11();
	}
	
	return {
		runTests:runTests,
	}
}();
