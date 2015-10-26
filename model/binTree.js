var BinTree = function() {
	/* 
	 * Appends a new node to the binary tree taken as parameter.
	 * 
	 * Input parameters:
	 *  k : key of the node to be added 
	 *  val : val of the node to be added
	 *  compFunc : function used to compare two keys in the tree 
	 *  tree : tree to which the new node will be added
	 * 
	 * Returns:
	 *  New tree 
	 */
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
	
    /* 
	 * Gets the value of the node identified by the key taken as argument or null if
	 * there is no such node.
	 * 
	 * Input parameters:
	 *  k : key of the node whose value wants to be retrieved
	 *  compFunc : function used to compare two keys in the tree
	 *  tree : binary tree to be searched
	 */ 
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
