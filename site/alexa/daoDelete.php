<?php
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM cli WHERE id = '$_GET[id]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../clientes.php");
?>