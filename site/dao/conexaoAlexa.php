<?php 

define("SERVER_ALEXA", '187.0.7.139'); 
define("USER_ALEXA", 'root'); 
define("PASSWORD_ALEXA", 'j4c4r3z40!'); 
define("DB_ALEXA", 'alexa'); 

function criaConexaoAlexa()
{
    try {
        return new PDO("mysql:host=" . SERVER_ALEXA . ";dbname=" . DB_ALEXA, USER_ALEXA, PASSWORD_ALEXA);
    } catch (PDOException $e) {
        print("Error: " . $e->getMessage());
    }
}


?>