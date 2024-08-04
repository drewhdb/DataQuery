<?php
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM dvc WHERE deviceid = '$_GET[device]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ./edit.php?cliente=$_GET[cliente]");
?>