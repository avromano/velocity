var BinTree = function() {
	function append(k, val, compFunc, tree) {
		var newNode = {
			key : k,
			value : val,
			right : null,
			left : null
		}
		
		if (tree == null) {
			return newNode;
		}
		
		var curTree = tree;
		
		while (true) {
			var compRes = compFunc(k, curTree.key);
			if (compRes == -1) { //Less than current node key -> Go left
				if (curTree.left == null) {
					curTree.left = newNode;
					break;
				} else {
					curTree = curTree.left;
				}
			} else if (compRes == 0) { //Repeated element -> Return input tree unchanged
				break;
			} else if (compRes == 1) { //Greater than current node key -> Go right
				if (curTree.right == null) {
					curTree.right = newNode;
					break;
				} else {
					curTree.right = newNode;
				}
			} else { //Unexpected result of comp function -> Return input tree unchanged
				break;
			}
		}
		
		return tree;
	}
	
	function isInTree(k, compFunc, tree) {
		if (tree == null) {
			return false;
		}
		var curTree = tree;
		while(true) {
			var compRes = compFunc(k, curTree.key);
			if (compRes == 0) { //Match found
				return true;
			} else if (compRes == -1) {
				if (curTree.left != null) {
					curTree = curTree.left;
				} else {
					return false;
				}
			} else if (compRes == 1) {
				if (curTree.right != null) {
					curTree = curTree.right;
				} else {
					return false;
				}
			} else { //Unexpected result of comp function -> Return false
				return false;
			}
		}
	}
	
	function test() {
		var compFunc = function compStrings(str1, str2) {
			return str1.localeCompare(str2);
		}
		var tree1 = append('hola', 'hola', compFunc, null);
		var tree2 = append('chau', 'chau', compFunc, tree1);
		var tree3 = append('como', 'como', compFunc, tree2);
		
		console.log(tree3.left);
		
		var isIn = isInTree('chau', compFunc, tree2);
		
		console.log(isIn);
	}
	
	return {
		append:append,
		test:test,
	}	
}();
