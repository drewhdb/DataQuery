<?php
include_once "conexaoAlexa.php";

function getClientes(){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT UPPER(cliente) as cliente, bloqueado FROM cli ORDER BY cliente";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);    
}

function getDevicesClientes($cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT dvc.* FROM cli INNER JOIN dvc ON dvc.cliente = cli.id where dvc.cliente = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function getQueryesClientes($cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT qry.* FROM cli INNER JOIN qry ON qry.cliente = cli.id WHERE cli.id = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function getCliente($cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT * FROM cli WHERE cli.cliente = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetch(PDO::FETCH_ASSOC);
}
?>