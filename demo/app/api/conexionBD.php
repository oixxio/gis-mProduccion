<?php
        
    define("archivoINI", "config.ini");

    $array_conn = parametrosDB();
    $conexionbd = new mysqli($array_conn["host"], $array_conn["usuario"], $array_conn["contrasenia"],$array_conn["base"]);
    if($conexionbd->connect_error)
		die($conexionbd->connect_error);
        
	$conexionbd->query("SET NAMES 'utf8'");
    $conexionbd->query("SET AUTOCOMMIT=0");
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 * @param SI LOS EVENTOS SON ALLDAY O NO
	 */
	function realizarConsultaCalendario($query, $conexionbd, $allDay){		
		$datos = array();
		
		$result = mysql_query($query, $conexionbd);
		if(mysql_num_rows($result) > 0){
			
			while($arr = mysql_fetch_array($result, MYSQL_ASSOC)){
				$arr['allDay'] = $allDay;
				$datos[] = $arr;
			}
		}
		
		return json_encode($datos);
	}
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 * @param EL IDENTIFICADOR EN EL ARRAY DE RETORNO
	 */
	function realizarConsulta($query, $conexionbd, $idArray){		
		$datos = array();
		
		$result = mysql_query($query, $conexionbd);
		if(mysql_num_rows($result) > 0){
			
			while($arr = mysql_fetch_array($result, MYSQL_ASSOC)){
				$datos[] = $arr;
			}
		}
		
		return json_encode(array($idArray => $datos));
	}
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 * @param EL IDENTIFICADOR EN EL ARRAY DE RETORNO
	 */
	function realizarConsultaArray($query, $conexionbd, $idArray){		
		$datos = array();
		
		$result = mysql_query($query, $conexionbd);
		if(mysql_num_rows($result) > 0){
			
			while($arr = mysql_fetch_array($result, MYSQL_ASSOC)){
				$datos[] = $arr;
			}
		}
		
		return($datos);
	}
	
	
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 * @param EL IDENTIFICADOR EN EL ARRAY DE RETORNO
	 */
	function realizarConsultaRegistro($query, $conexionbd, $idArray){		
		$datos = array();
		
		$result = mysql_query($query, $conexionbd);
		if(mysql_num_rows($result) == 1){
			
			while($arr = mysql_fetch_array($result, MYSQL_ASSOC)){
				$datos[] = $arr;
			}
		}
		
		return json_encode(array($idArray => $datos));
	}
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 */
	function realizarConsultaRegistroArray($query, $conexionbd){		
		$datos = array();
		
		$result = $conexionbd->query($query);
		if($result->num_rows == 1){
			while($arr = $result->fetch_array()){
				$datos[] = $arr;
			}
		}	
		return $result;
	}
	
	/**
	 * Funcion que realiza una consulta DE TIPO CALENDARIO
	 * @param LA CONSULTA A REALIZAR
	 * @param LA CONEXION A LA BD
	 */
	function realizarOperacion($query, $conexionbd, $permitirCeroAfectados = false){
				
		$result = mysql_query($query, $conexionbd) or onDieOperacion(); 
		if(! $permitirCeroAfectados){
			if($result && mysql_affected_rows() > 0){
				return "exito_" .mysql_insert_id();
			}else{
				return "Error al realizar la operacion.";
			}	
		}else{
			if($result){
				return "exito_" .mysql_insert_id();
			}else{
				return "Error al realizar la operacion.";
			}
		}
			
	}
	
	function onDieOperacion(){
		$error = "Error: ";
		switch (mysql_errno()) {
			case 1062:
				$error .= "Código o parametro duplicado. Verificar los datos ingresados.";
				break;
				
			case 1451:
				$error .= "Código o parametro no habilitado para modificarlo y/o eliminarlo. Verificar los datos ingresados.";
				break;
			
			default:
				$error .= "Error al realizar la operación. Verificar los datos ingresados. Error Nro: " .mysql_errno();
				break;
		}
		die($error);
	}
        
        function comenzarTransaccion($conexionbd) {
            $sql = "BEGIN;";
            $resultado = mysql_query($sql, $conexionbd);
            return $resultado;
        }

        function finalizarTransaccion($resultado, $conexionbd){
            if ($resultado) {
                $sql = "COMMIT";
                $resultado = mysql_query($sql, $conexionbd);
            } else {
                $sql = "ROLLBACK;";
                $resultado = mysql_query($sql, $conexionbd);
            }
            
            return $resultado;
        }
        
        function parametrosDB(){
            $array_ini = parse_ini_file(archivoINI, true);
            return $array_ini["base_de_datos"];
        }
?>