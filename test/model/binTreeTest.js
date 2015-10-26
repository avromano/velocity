var BinTreeTest = function() {
		var compFunc = function compStrings(str1, str2) {
			return str1.localeCompare(str2);
		}
		
		//Query an empty tree
		function test1() {
				var res = BinTree.getValue('string', compFunc, null);
				console.log('test1: ' + (res == null));
		}

		//Query one-element tree with existing key
		function test2() {
			with(BinTree) {
				var tree1 = append('hello', '1', compFunc, null);
				
				var res = getValue('hello', compFunc, tree1);
				
				console.log('test2: ' + (res == 1));
			}
		}

		//Query one-element tree with non-existing key
		function test3() {
			with(BinTree) {
				var tree1 = append('hello', '1', compFunc, null);
				
				var res = getValue('world', compFunc, tree1);
				
				console.log('test3: ' + (res == null));
			}
		}

		//Consecutive queries to 2-complete tree
		function test4() {
			with(BinTree) {
				var tree1 = append('high', '1', compFunc, null);
				var tree2 = append('low', '2', compFunc, tree1);
				var tree3 = append('before', '3', compFunc, tree2);
				var tree4 = append('after', '4', compFunc, tree3);
				var tree5 = append('day', '5', compFunc, tree4);
				var tree6 = append('row', '6', compFunc, tree5);
				var tree6 = append('job', '7', compFunc, tree5);
				
				var res1 = getValue('job', compFunc, tree6);
				var res2 = getValue('day', compFunc, tree1);
				var res3 = getValue('hard', compFunc, tree4);
				
				console.log('test4: ' + (res1 == 7 && res2 == 5 && res3 == null));
			}
		}
		
		function runTests() {
			console.log('Starting unit tests for binTree.js...');

			test1();
			test2();
			test3();
			test4();
		}
		
		return {
			runTests:runTests,
		}
}();
