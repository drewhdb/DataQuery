<?php

$usuario = $_POST['user'];
$senha = $_POST['pass'];

if ($senha == 'abacaxi'){
    session_start();
    
    $_SESSION['user'] = 'admin';
    $_SESSION['tipo_usuario'] = 'admin';
    $_SESSION['logado'] = true;
    $_SESSION['hora_acesso'] = date('Y-m-d H:i:s');
    
    header('Location: ./home.php');
} else {
    header('Location: ./index.php?aviso=Usuario inexistente ou senha incorreta.');
}