<?php 
	$conn = new mysqli('localhost','root','','m6000296_min_dev');
    if($conn->connect_error){
        die($conn->connect_error);
    }
?>