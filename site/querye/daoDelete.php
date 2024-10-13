<?php
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM grp WHERE id = '$_GET[id]' and cliente = '$_GET[cliente]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../alexa/edit.php?id=".$_GET['cliente']);
?>