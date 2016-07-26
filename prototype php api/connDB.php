<?php 
	$conn = new mysqli('localhost','root','','gis_mproduccion');
    if($conn->connect_error){
        die($conn->connect_error);
    }
?>
