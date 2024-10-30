<?php //print_r($_GET); die();
    require_once "../dao/conexaoAlexa.php";

    $bloqueado = '0';
    if ($_GET['bloqueado'] == 'on'){
        $bloqueado = '1';
    }

    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "UPDATE slc SET bloqueado = '$bloqueado', nome = '$_GET[nome]' WHERE deviceid = '$_GET[deviceid]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    header("Location: ../solicitacoes.php");
?>