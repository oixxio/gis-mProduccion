<?php
    session_start();
    if( (empty($_SESSION['c_sesion_reg'])) || (!$_SESSION['c_sesion_reg']) ){	
            die("No puede realizar la operación. No tiene privilegios de Usuario");		
    }
?>