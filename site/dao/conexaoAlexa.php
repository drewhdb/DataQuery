<?php 

define("SERVER", '187.0.7.139'); 
define("USER", 'root'); 
define("PASSWORD", 'j4c4r3z40!'); 
define("DB", 'dataquery'); 

function criaConexaoAlexa()
{
    try {
        return new PDO("mysql:host=" . SERVER . ";dbname=" . DB, USER, PASSWORD);
    } catch (PDOException $e) {
        print("Error: " . $e->getMessage());
    }
}


?>