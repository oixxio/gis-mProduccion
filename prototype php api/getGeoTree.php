<?php
	header('Content-type: text/html; charset=UTF-8');

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	require 'connDB.php';
	$conn->query('SET CHARACTER SET utf8');
	$conn->query('SET NAMES utf8');
    
    //$i=0;
	//$data = file_get_contents('php://input');

	$results = [""];
	$i=0;

	$query = '
		SELECT
			t1.id as nodeID,
			t1.name as nodeName,
			t1.parent_id as parentID
		FROM gis_mproduccion.geoTree AS t1
		WHERE t1.depth=1
		UNION
		SELECT
			t2.id as nodeID,
			t2.name as nodeName,
			t1.id as parentID
		FROM gis_mproduccion.geoTree AS t1
		LEFT JOIN gis_mproduccion.geoTree AS t2 ON t2.parent_id = t1.child_id
		WHERE t1.depth=1 AND t2.depth=2
		UNION
		SELECT
			t2.id as nodeID,
			t2.name as nodeName,
			t1.id as parentID
		FROM gis_mproduccion.geoTree AS t1
		LEFT JOIN gis_mproduccion.geoTree AS t2 ON t2.parent_id = t1.child_id
		WHERE t1.depth=2 AND t2.depth=3
		ORDER BY nodeID'; 

	$resultQuery = $conn->query($query);

	while($result = $resultQuery->fetch_assoc()) {				
     	$results[$i] = $result;
     	$i++;
    }

	if ($results[0] != NULL) {
		$json_string = json_encode($results);				
	}else{
		die($conn->error);
	}

	echo $json_string;
