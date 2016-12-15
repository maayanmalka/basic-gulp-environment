// localStorage.js

// user that enters the website is not subscribed (no cookies yet)


isUserSubscribed = function () {
	return localStorage.getItem("subscribed") === 'true'
}


setUserSubscribed = function () {
	localStorage.setItem("subscribed", true)
}

// set "subscribed" to false only on the first site visit.
localStorageInit = function () {
	if (localStorage.getItem("subscribed") === null || ""){
		// alert ("subscribed is null, setting subscribed to false")
		localStorage.setItem("subscribed", false)
	// } else {
	// 	alert ("subscribed is NOT null")
	// }
	}
}


localStorageInit();











// new user


// setFirstTimeUser = function () {	
//   localStorage.setItem("ftu", "true")
// }

// setFirstTimeUser();

// isFirstTimeUser = function () {
// 	return localStorage.getItem("ftu")
// }

// setReturningUser = function () {
// 	localStorage.setItem("ftu", "false")
// 	alert ("user subscribed! yey!")
// }

// isFirstTimeUser()
