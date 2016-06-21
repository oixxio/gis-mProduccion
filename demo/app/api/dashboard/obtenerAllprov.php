<?php 
	require '../connDB.php';
    
    $i=0;

	$queryS = 'SELECT * FROM provincia'; 		
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