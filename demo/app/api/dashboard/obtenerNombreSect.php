<?php 
	require '../connDB.php';
   
	$data = file_get_contents('php://input');

    if ($data == "") {
        $data = '-1';
     }
    
    $i=0;

	$queryS = 'SELECT * FROM sector where id = '.$data; 		
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