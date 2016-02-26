<?php
	
	/**
	 * Wrapper for a simple SQL database query
	 * 
	 * @param  string $query    	SQL query to run
	 * @param  array  $bindings 	associative array of ":name" => "value"
	 * @return array           		SQL results as associative array
	 */
	function fetchArray($query = '', $bindings = array()) {

		// create database interface
		$pdo = new PDO('mysql:host=localhost;dbname=boikobook', 'root', 'root');

		// prepare and execute sql statement
		// ~ more info @ http://php.net/manual/en/pdostatement.execute.php
		$statement = $pdo->prepare($query);
		$statement->execute($bindings);

		// fetch results into associative array
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}