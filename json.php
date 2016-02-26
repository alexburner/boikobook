<?php


	/**
	 * Load database helper file
	 */
	require('db.php');


	/**
	 * Fetches JSON data based on request path
	 * Sends response to user and exits application
	 *
	 * @param  string $request_path 	path of JSON to fetch
	 */
	function sendJSON($request_path) {

		// response container
		$response = array(
			'data' => array()
		);

		// get requested json
		switch ($request_path) {

			case '/json/events':
				$query = 'SELECT * FROM events';
				$events = fetchArray($query);
				$response['data']['events'] = $events;
				break;

			default:
				$response['error'] = array(
					'message' => 'Did not recongnize JSON request path'
				);

		}

		// convert PHP associative array into JSON string
		$response_json = json_encode($response);

		// send JSON response to user
		header('Content-Type: application/json');
		exit($response_json);

	}