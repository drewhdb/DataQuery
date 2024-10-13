<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $ativo = '0';
    if ($_GET['ativo'] == 'on'){
        $ativo = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE grp SET ativo = '$ativo', grupo = '$_GET[grupo]' WHERE id = '$_GET[id]' and cliente = '$_GET[cliente]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    header("Location: ./edit.php?id=".$_GET['id']."&cliente=".$_GET['cliente']);
?>