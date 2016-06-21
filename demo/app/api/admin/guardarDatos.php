<?php 
	require_once '../connDB.php';

	$data = file_get_contents('php://input');
	$comData = json_decode($data);
    
    $i=0;

	$queryS = 'UPDATE concepto SET empleo_sector = "'.$comData->empleo_sector.'", part_empleo_prov ="'
	.$comData->part_empleo_prov.'", dinamica_empleo ="'.$comData->dinamica_empleo.'",exportaciones="'.$comData->exportaciones.'", part_exportaciones_pvciales= "'.$comData->part_exportaciones_pvciales.'", dinamica_exportaciones_pvciales ="'.$comData->dinamica_exportaciones_pvciales.'", empleo_sector_nacion ="'
	.$comData->empleo_sector_nacion.'",empleo_total_nacion="'.$comData->empleo_total_nacion.'",dinamica_empleo_nacion="'.$comData->dinamica_empleo_nacion.'",participacion_sector_nacion="'
	.$comData->participacion_sector_nacion.'",coefesp="'.$comData->coefesp.'",remuneracion="'.$comData->remuneracion.'",remuneracion_promedio_nacion="'.$comData->remuneracion_promedio_nacion.
	'",dif_salario_sector ="'.$comData->dif_salario_sector.'" WHERE id = '.$comData->id; 		

	$conn->query('SET CHARACTER SET utf8');	
	$resultQuery = $conn->query($queryS);	
	
	if ($resultQuery) {
		echo "campo actualizado";				
	}else{
		die($conn->error);
	}

?>