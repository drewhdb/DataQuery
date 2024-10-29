<?php //print_r($_GET); die();
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM qry WHERE id = '$_GET[id]' and cliente = '$_GET[cliente]' and grupo = '$_GET[grupo]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../grupo/edit.php?id=".$_GET['grupo']."&cliente=".$_GET['cliente']);
?>