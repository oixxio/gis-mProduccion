<?php 

	$conn = new mysqli('localhost','root','','estadisticas_provincias_new');
    if($conn->connect_error){
        die($conn->connect_error);
    }
?>