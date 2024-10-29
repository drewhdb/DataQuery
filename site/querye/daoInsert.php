<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $ativo = '0';
    if ($_GET['ativo'] == 'on'){
        $ativo = '1';
    }
    $query = addslashes($_GET['query']);

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "INSERT INTO QRY (cliente, grupo, descricao, query, ativo) VALUES ('$_GET[CLIENTE]', '$_GET[GRUPO]', '$_GET[descricao]', '$query', '$ativo');";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../grupo/edit.php?id=".$_GET['GRUPO']."&cliente=".$_GET['CLIENTE']);
?>