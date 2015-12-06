Tweet = {
	loadTweets: function(searchPhrase, callback) {
		var r = new XMLHttpRequest();
		r.open("GET", "/tweets/" + searchPhrase, true);
		r.onreadystatechange = function () {
		if (r.readyState != 4 || r.status != 200) return;
			var jsonResponse = JSON.parse(r.responseText);
			if (callback && typeof(callback) === "function") {
				callback(Tweet.buildMarkup(jsonResponse.tweets.statuses));
			}
		};
		r.send();
	}, 
	buildMarkup: function (tweets) {
		var html = '';
		tweets.forEach(function(tweet) {		
			html += '<div> \
						<blockquote class="twitter-tweet"> \
							<div> \
								<div class="profile-img" style="background-image:url(' + tweet.user.profile_image_url_https + ')"></div> \
								<p lang="' + tweet.lang + '" xml:lang="' + tweet.lang + '">' + Tweet.text.clean(tweet.text) + '</p> \
							</div> \
							<div class="meta-data">' + tweet.user.name + 
								'<a class="status-link" target="_blank" href="https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str + '">' + Tweet.timeAgo(tweet.created_at) + '</a> \
							</div> \
						</blockquote> \
					</div>';
		});
		return html || '<div class="no-result"><span>Din sökning gav tyvärr inga träffar.</span></div>';
	},
    timeAgo: function(dateString) {
		var rightNow = new Date();
		var then = new Date(dateString);
		var diff = rightNow - then;
		var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
		
		if (window.navigator.userAgent.indexOf("msie") != -1) {
			then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
		}

		if (isNaN(diff) || diff < 0) {
			return ""; // return blank string if unknown
		}

		if (diff < second * 2) {
			// within 2 seconds
			return "just nu";
		}

		if (diff < minute) {
			return Math.floor(diff / second) + " sekunder sedan";
		}

		if (diff < minute * 2) {
			return "ungefär en minut sedan";
		}

		if (diff < hour) {
			return Math.floor(diff / minute) + " minuter sedan";
		}

		if (diff < hour * 2) {
			return "ungefär en timme sedan";
		}

		if (diff < day) {
			return  Math.floor(diff / hour) + " timmar sedan";
		}

		if (diff > day && diff < day * 2) {
			return "igår";
		}

		if (diff < day * 365) {
			return Math.floor(diff / day) + " dagar sedan";
		}

		else {
			return "över ett år sedan";
		}
	},
    text:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    }
};