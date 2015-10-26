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
					curTree = curTree.right;
				}
			} else { //Unexpected result of comp function -> Return input tree unchanged
				break;
			}
		}
		
		return tree;
	}
	
	function getValue(k, compFunc, tree) {
		if (tree == null) {
			return null;
		}
		var curTree = tree;
		while(true) {
			var compRes = compFunc(k, curTree.key);
			if (compRes == 0) { //Match found
				return curTree.value;
			} else if (compRes == -1) {
				if (curTree.left != null) {
					curTree = curTree.left;
				} else {
					return null;
				}
			} else if (compRes == 1) {
				if (curTree.right != null) {
					curTree = curTree.right;
				} else {
					return null;
				}
			} else { //Unexpected result of comp function -> Return null
				return null;
			}
		}
	}
	
	return {
		append:append,
		getValue:getValue,
	}	
}();
