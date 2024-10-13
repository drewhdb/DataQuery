<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "INSERT INTO GRP (cliente, grupo) VALUES ('$_GET[CLIENTE]', '$_GET[GRUPO]');";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    $sql = "select * from grp order by id desc limit 1";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    $id = $statement->fetchAll(PDO::FETCH_ASSOC)[0]['id'];
    header("Location: ./edit.php?id=$id&cliente=$_GET[CLIENTE]");
?>