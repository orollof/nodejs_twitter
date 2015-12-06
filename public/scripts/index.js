document.addEventListener("DOMContentLoaded", function(event) {
	document.querySelector('form').addEventListener("submit", function(e) {
		e.preventDefault();
		var searchPhrase = document.getElementById('search').value;
		Tweet.loadTweets(searchPhrase, function (markup) {
			document.querySelector('.result').innerHTML = markup;
		});
	}, false);		
});