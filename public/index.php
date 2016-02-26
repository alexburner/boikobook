<?php

	/**
	 * Extract request path from URL
	 * ~ more info 	http://php.net/manual/en/reserved.variables.server.php
	 * 				http://php.net/manual/en/function.parse-url.php
	 */
	$request = parse_url($_SERVER['REQUEST_URI']);
	$request_path = $request['path'];


	/**
	 * Log request info
	 */
	if (!empty($request['path'])) {
		error_log('request path = ' . $request['path']);
	}
	if (!empty($request['query'])) {
		error_log('request query = ' . $request['query']);
	}


	/**
	 * Route request
	 */
	if (preg_match('/^\/pages/', $request_path)) {
		
		// load page file
		include('../views' . $request_path . '.html');

	} else if (preg_match('/^\/templates/', $request_path)) {
		
		// load template file
		include('../views' . $request_path . '.html');

	} else if (preg_match('/^\/json/', $request_path)) {
		
		// load json handling file
		require('../json.php');
		
		// send response
		sendJSON($request_path);

	} else {

		// oops
		header('HTTP/1.0 404 Not Found');

	}