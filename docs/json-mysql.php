<?php 

	$hn = 'localhost';
	$pw = '';
	$db = 'estadisticas_provincias_new';
	$un = 'root';

	$conn = new mysqli($hn,$un,$pw,$db);
	if($conn->connect_error)
		die($conn->connect_error);

	$plainData = file_get_contents('concepto.json');
	$jsonData = json_decode($plainData);
	 
	foreach ($jsonData as $data) {

		$queryConceptCreation = 'INSERT INTO concepto 
		(id,
		sector_id,
		provincia_id,
		empleo_sector,
		part_empleo_prov,
		part_empleo_prov_nacion,
		var_empleo_2007_2014,
		dinamica_empleo,
		exportaciones,
		part_exportaciones_pvciales,
		part_exp_prov_nacion,
		dinamica_exportaciones_pvciales,
		dinamica_part_exportaciones_pvciales,
		coefesp,
		remuneracion,
		dif_salario_sector) 
			VALUES(
			NULL,"'
			.$data->sector_id.'","'
			.$data->provincia_id.'","'
			.$data->empleo_sector.'","'
			.$data->part_empleo_prov.'","'
			.$data->part_empleo_prov_nacion.
			'","'.$data->var_empleo_2007_2014.
			'","'.$data->dinamica_empleo.
			'","'.$data->exportaciones.
			'","'.$data->part_exportaciones_pvciales.
			'","'.$data->part_exp_prov_nacion.
			'","'.$data->dinamica_exportaciones_pvciales.
			'","'.$data->dinamica_part_exportaciones_pvciales.
			'","'.$data->coefesp.
			'","'.$data->remuneracion.
			'","'.$data->dif_salario_sector.'")';
				$conceptQuery = $conn->query($queryConceptCreation);
				
	}
	//echo $queryConceptCreation;
	if ($conceptQuery) {
		echo "ya ta";
	}else{
		echo json_encode($conceptQuery);
	}
?>