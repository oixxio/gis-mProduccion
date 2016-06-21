<?php
	function validarGET($camposGET){		
		foreach ($camposGET as $campo) {			
			if(empty($_GET[$campo])){
				die("Error en la ejecución. Falta el campo: " + $campo);
			}
		}
	}
	
	function validarPOST($camposPOST){						
		foreach ($camposPOST as $campo) {
			if(empty($_POST[$campo])){
				die("Error en la ejecución. Falta el campo: " + $campo);
			}
		}
	}
	
	function opcionalesPOST($opcionalesPOST){
		$idCampo = "campo";
		$idValorEmpty = "valorEmpty";
		$idValorNotEmpty = "valorNotEmpty";
		$return = array();
		
		foreach ($opcionalesPOST as $campo) {
							
			if(!empty($_POST[$campo[$idCampo]])){
				empty($campo[$idValorNotEmpty]) ? $return[$campo[$idCampo]] = $_POST[$campo[$idCampo]] : 
					$return[$campo[$idCampo]] = $campo[$idValorNotEmpty];				 
			
			}else{
				$return[$campo[$idCampo]] = $campo[$idValorEmpty]; 
			}
		}
		
		return $return;
	}
?>