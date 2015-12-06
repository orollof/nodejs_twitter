var config = {};

config.twitter = {};
config.routes = {};

config.twitter.consumer_key = '' || 'key';
config.twitter.consumer_secret =  '' || 'secret';
config.twitter.access_token_key =  '' || 'token_key';
config.twitter.access_token_secret =  '' || 'token_secret';

config.routes.routeCacheSeconds = 30;
config.routes.take = 10;

module.exports = config;