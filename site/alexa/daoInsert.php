<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $bloqueado = '0';
    if ($_GET['bloqueado'] == 'on'){
        $bloqueado = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $duplicidade = "SELECT 1 FROM cli WHERE cliente = '$_GET[cliente]'";
    $statement = $conexao->prepare($duplicidade);
    $statement->execute();

    if ($statement->rowCount() > 0) {
        header("Location: ./insert.php?aviso= Cliente $_GET[cliente] já cadastrado.");
    }

    $sql = "INSERT INTO cli (cliente, bloqueado, host, port, user, pass) VALUES ('$_GET[cliente]', $bloqueado, '$_GET[host]', '$_GET[port]', '$_GET[user]', '$_GET[pass]');";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../home.php");
?>