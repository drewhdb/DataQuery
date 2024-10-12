<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $bloqueado = '0';
    if ($_GET['bloqueado'] == 'on'){
        $bloqueado = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE cli SET bloqueado = '$bloqueado', cliente = '$_GET[cliente]', user = '$_GET[user]', pass = '$_GET[pass]', port = '$_GET[port]', host = '$_GET[host]' WHERE id = '$_GET[id]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../clientes.php");
?>