/**
 * Global utility functions
 */
var util = {};


/**
 * Wrapper for simple XHR requests
 * 
 * @param  {Object} 	args
 * @param  {String} 	args.url		http location
 * @param  {String} 	args.method 	http method
 * @param  {Object} 	args.data		json payload
 * @param  {Function} 	args.success	callback(xhr)
 * @param  {Function} 	args.error		callback(xhr)
 * @param  {Boolean} 	args.noCache	toggle cache busting
 */
util.simpleXHR = function (args) {
	
	if (args.noCache) {
		// use time to make url unique
		args.url += '#' + (new Date()).getTime();
	}
	
	// log request
	console.log('simpleXHR -> method=' + args.method + ' url=' + args.url);
	
	// prepare request
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			// not done cooking
			return;
		}
		if (xhr.status === 200) {
			// success
			if (args.success) {
				args.success(xhr);
			}
		} else {
			// error
			console.log('XHR error!');
			console.log('status = ' + xhr.status);
			console.log('responseText = ' + xhr.responseText);
			console.log(xhr);
			if (args.error) {
				args.error(xhr);
			}
		}
	};

	// send request
	xhr.open(args.method, args.url);
	xhr.send(args.data);
}


/**
 * Prevent choking on malformed JSON
 * 
 * @param  {String} string 	JSON string
 * @return {Object}        	parsed JSON
 */
util.safeParseJSON = function (string) {
	var json;
	try {
		json = JSON.parse(string);
		// success
		return json;
	} catch (exception) {
		// failure
		console.log('Failed to parse JSON');
		console.log('Input string = ' + string);
		console.log(exception);
		return null;
	}
}