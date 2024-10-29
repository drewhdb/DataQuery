<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "INSERT INTO DVC (cliente, deviceId, data_criacao) VALUES ('$_GET[cliente]', '$_GET[device]', now());";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    $sql = "select * from dvc order by id desc limit 1";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    $id = $statement->fetchAll(PDO::FETCH_ASSOC)[0]['id'];
    header("Location: ./edit.php?device=".$id."&cliente=".$_GET['cliente']);
    
?>