<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $bloqueado = '0';
    if ($_GET['bloqueado'] == 'on'){
        $bloqueado = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE cli SET cliente = '$_GET[cliente]', bloqueado = '$bloqueado', user = '$_GET[user]', pass = '$_GET[pass]', port = '$_GET[port]', host = '$_GET[host]' WHERE id = '$_GET[id]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../home.php");
?>