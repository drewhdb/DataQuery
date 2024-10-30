<?php //print_r($_GET); die();
    include_once "../dao/conexaoAlexa.php";

    $conexao = criaConexaoAlexa();

    $sql = "DELETE FROM slc WHERE deviceid = '$_GET[deviceid]';";
    $statement = $conexao->prepare($sql);
    $statement->execute();

    header("Location: ../solicitacoes.php");
?>