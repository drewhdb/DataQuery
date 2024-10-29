<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $ativo = '0';
    if ($_GET['BLOQUEADO'] == 'on'){
        $ativo = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE DVC SET bloqueado = '$ativo', descricao = '$_GET[DESCRICAO]' WHERE id = '$_GET[ID]' and cliente = '$_GET[CLIENTE]';";
    
    $statement = $conexao->prepare($sql);
    $statement->execute();
    header("Location: ../alexa/edit.php?id=".$_GET['CLIENTE']);
?>