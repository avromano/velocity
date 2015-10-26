//Suggested usernames
var curSuggestions = [];
//Position of the currently selected suggestion (if any)
var selectedSug = 0;
		
function searchUsers() {
	var selUser = document.getElementById("searchText").value
	UsersController.search(selUser, populateSearchResult);
}
		
function populateSearchResult(result, error) {
	if (error != null && error != '') {
		document.getElementById("error").innerHTML = error;

		document.getElementById("id").innerHTML = '';
		document.getElementById("firstName").innerHTML = '';
		document.getElementById("title").innerHTML = '';
		document.getElementById("lastName").innerHTML = '';
		document.getElementById("userName").innerHTML = '';
		document.getElementById("email").innerHTML = '';
		document.getElementById("city").innerHTML = '';
		document.getElementById("country").innerHTML = '';
		document.getElementById("fav_color").innerHTML = '';
		document.getElementById("fav_color").style.backgroundColor = '';
		document.getElementById("blog").innerHTML = '';
	} else {
		document.getElementById("error").innerHTML = '';
		
		document.getElementById("id").innerHTML = result.id;
		document.getElementById("firstName").innerHTML = result.first_name;
		document.getElementById("title").innerHTML = result.title;
		document.getElementById("lastName").innerHTML = result.last_name;
		document.getElementById("userName").innerHTML = result.username;
		document.getElementById("email").innerHTML = result.email;
		document.getElementById("city").innerHTML = result.city;
		document.getElementById("country").innerHTML = result.country;
		document.getElementById("fav_color").style.backgroundColor = result.fav_color;

		var htmlBlog = '';
		var blogLink = result.blog;
		if (blogLink != null && blogLink.trim() != '') {
			htmlBlog = '<a href="' + blogLink + '"> Link </a>';
		}
		document.getElementById("blog").innerHTML = htmlBlog;
	}
}
		
function newUserEntered(event) {
	var keyPressedCode;

    if (window.event) {
    	keyPressedCode = event.keyCode;
    } else if (event.which) {
    	keyPressedCode = event.which;
	} else {
		return;
	}
	switch(keyPressedCode) {
		case 38: //Arrow up key
		case 40: //Arrow down key
			var totalSug = curSuggestions.length;
			if (totalSug > 0) {
				//If the up or down arrow is pressed, modify the selected suggestion
				if (keyPressedCode == 38) {
					selectedSug = (selectedSug <= 0) ? totalSug-1 : selectedSug-1;
				} else {
					selectedSug = (selectedSug+1) % totalSug;
				}
				//Show the suggestions list with the new selected value
				promptSuggestions(curSuggestions);
			}
			break;
		case 13: //Enter key
			if (selectedSug != -1) {
				//Put selected suggestion in search box and reset list
				document.getElementById("searchText").value = curSuggestions[selectedSug];
				curSuggestions = [];
				hideSuggestions();
			}
			break;
		case 27: //Esc key
			hideSuggestions();
			break;
		default:
			//If other key is pressed, update the suggestions list
			var enteredUser = document.getElementById("searchText").value;
			UsersController.suggest(enteredUser, getAndPromptSuggestions);
			break;
	}
}
		
function getAndPromptSuggestions(suggestions) {
	if (suggestions.length > 0) {
		selectedSug = 0;
	}
	promptSuggestions(suggestions);
	curSuggestions = suggestions;
}

//Builds the HTML code for the suggestions list
function promptSuggestions(suggestions) {
	if (suggestions != null) {
		var listSugHTML = '';
		listSugHTML += '<ul id="sugList">';
		for (i in suggestions) {
			var selected = '';
			if (i == selectedSug) {
				selected = ' class ="selected" ';
			}
			listSugHTML += '<li'+selected+'>' + suggestions[i] + '</li>';
		}
		listSugHTML += '</ul>';
		document.getElementById("suggestions").style.display = "block";
		document.getElementById("suggestions").innerHTML = listSugHTML;
	}
}
		
function hideSuggestions() {
	selectedSug = -1;
	document.getElementById("suggestions").innerHTML = "";
	document.getElementById("suggestions").style.display = "none";
}

function promptSuggestionsIfLoaded() {
	if (curSuggestions.length > 0) {
		promptSuggestions(curSuggestions);
	}
}

function preventDefBehaviours(event) {
	var keyPressedCode;

    if (window.event) {
    	keyPressedCode = event.keyCode;
    } else if (event.which) {
    	keyPressedCode = event.which;
	} else {
		alert('The suggestions cannot be displayed. Error: The entered key could not be processed');
		return;
	}
	
	//Prevent default behaviour for 'Enter' and 'Esc' keys in order not
	//interfere with the suggestions list navigation
	if (keyPressedCode == 13 || keyPressedCode == 27) {
		event.preventDefault();
	}
}
