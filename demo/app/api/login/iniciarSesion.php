<?php

session_start();

if (isset($_SESSION['user'])) {
   echo $_SESSION['user'];
}else{
   require_once '../connDB.php';
    
    $data = file_get_contents('php://input');
    if ($data != "") {
        $comData = json_decode($data);
        $user = $comData->usuario;
        $pass = $comData->contrasenia; 
     }
     else{
        $user = "facundo";
        $pass = "";
    }    
    $pass_encriptada4 = sha1($pass); 
    $query = "SELECT id,usuario FROM usuario where usuario = '".$user."' and contrasenia = '".$pass_encriptada4."'";
    $result = $conn->query($query);
    if ($result != NULL) {
        $arr = $result->fetch_row();
        $bdUser = $arr[1];
        $bdIdUsuario = $arr[0];  
        $_SESSION['c_sesion_reg'] = true;
        $_SESSION['user'] = $bdUser;
        $_SESSION['name'] = $bdUser;
        $_SESSION['id'] = $bdIdUsuario;
        $_SESSION['permit'] = '1';
        echo $_SESSION['user'];          
    }else{
        echo "ERROR";
    }  
}

?>