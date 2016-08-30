<?php
	header('Content-type: text/html; charset=UTF-8');

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	require 'connDB.php';
	require 'buildTree.php';	
	$conn->query('SET CHARACTER SET utf8');
	$conn->query('SET NAMES utf8');

	$results = [""];
	$i=0;

	$query = '
		SELECT
			t1.id as nodeID,
			t1.name as nodeName,
			t1.parent_id as parentID,
			t1.depth as depth
		FROM gis_mproduccion.sectorTree AS t1
		WHERE t1.depth=1
		UNION
		SELECT
			t2.id as nodeID,
			t2.name as nodeName,
			t1.id as parentID,
			t2.depth as depth
		FROM gis_mproduccion.sectorTree AS t1
		LEFT JOIN gis_mproduccion.sectorTree AS t2 ON t2.parent_id = t1.child_id
		WHERE t1.depth=1 AND t2.depth=2
		UNION
		SELECT
			t2.id as nodeID,
			t2.name as nodeName,
			t1.id as parentID,
			t2.depth as depth
		FROM gis_mproduccion.sectorTree AS t1
		LEFT JOIN gis_mproduccion.sectorTree AS t2 ON t2.parent_id = t1.child_id
		WHERE t1.depth=2 AND t2.depth=3
		UNION
		SELECT
			t2.id as nodeID,
			t2.name as nodeName,
			t1.id as parentID,
			t2.depth as depth
		FROM gis_mproduccion.sectorTree AS t1
		LEFT JOIN gis_mproduccion.sectorTree AS t2 ON t2.parent_id = t1.child_id
		WHERE t1.depth=3 AND t2.depth=4		
		ORDER BY nodeID'; 

	$resultQuery = $conn->query($query);

	while($result = $resultQuery->fetch_assoc()) {				
     	$results[$i] = $result;
     	$i++;
    }

    //Para convertir a estructura arbol
    $results_tree = buildTree($results);
    //$results_tree = $results;

	if ($results_tree != NULL) {
		$json_string = json_encode($results_tree, JSON_PRETTY_PRINT);				
	}else{
		die($conn->error);
	}

	echo $json_string;
