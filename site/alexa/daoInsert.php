<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "INSERT INTO cli (cliente, host, port, user, pass) VALUES ('$_GET[cliente]', '$_GET[host]', '$_GET[port]', '$_GET[user]', '$_GET[pass]');";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    $sql = "select * from cli order by id desc limit 1";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    $id = $statement->fetchAll(PDO::FETCH_ASSOC)[0]['id'];
    header("Location: ./edit.php?id=$id");
?>