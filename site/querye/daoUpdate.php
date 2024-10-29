<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $ativo = '0';
    if ($_GET['ativo'] == 'on'){
        $ativo = '1';
    }

    $query = addslashes($_GET['query']);
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE qry SET ativo = '$ativo', descricao = '$_GET[descricao]', query = '$query' WHERE id = '$_GET[id]' and cliente = '$_GET[cliente]' and grupo = '$_GET[grupo]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    header("Location: ../grupo/edit.php?id=".$_GET['grupo']."&cliente=".$_GET['cliente']);
?>