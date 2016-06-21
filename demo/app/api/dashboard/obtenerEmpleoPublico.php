<?php 
	require '../connDB.php';   
    $i=0;
	$data = file_get_contents('php://input');
	$queryDatos = 'SELECT * FROM empleo_publico WHERE provincia_id = '.$data; 		
	$results = [""];
	$conn->query('SET CHARACTER SET utf8');
	$resultQuery = $conn->query($queryDatos);	
			
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