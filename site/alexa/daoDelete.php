<?php
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM cli WHERE cliente = '$_GET[cliente]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../home.php");
?>