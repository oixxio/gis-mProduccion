<?php 
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	require_once '../connDB.php';

	$data = file_get_contents('php://input');

    if ($data == "") {
        $data = '-1';
     }
    
    $i=0;

	$queryS = 'SELECT * FROM concepto_scatter_prov_fake where provincia_id = '.$data; 		
	$results = [""];
	$conn->query('SET CHARACTER SET utf8');	
	$resultQuery = $conn->query($queryS);	
			
	while($result = $resultQuery->fetch_assoc()) {				
     	$results[$i] = $result;
     	$i++;
    }
	if ($results[0] != NULL) {
		echo json_encode($results);				
	}else{
		die($conn->error);
	}

?>