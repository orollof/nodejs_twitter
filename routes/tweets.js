var express = require('express'), 
    cors = require('cors'),
    Twitter = require('twitter'),
    routeCache = require('route-cache'),
    config = require('../config'),
    router = express.Router(),
    client = new Twitter({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      access_token_key: config.twitter.access_token_key,
      access_token_secret: config.twitter.access_token_secret
    });

router.get('/:q', routeCache.cacheSeconds(config.routes.cacheSeconds), function(req, res) {
	client.get('search/tweets', {q: '#' + req.params.q, count: config.routes.take}, function(error, tweets, response){
    	res.json({ tweets: tweets });  
	});
});

module.exports = router;