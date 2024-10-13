<?php
include_once "conexaoAlexa.php";

function getClientes(){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT id, UPPER(cliente) as cliente, bloqueado FROM cli ORDER BY cliente";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);    
}

function getCliente($id){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT * FROM cli WHERE cli.id = '$id';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetch(PDO::FETCH_ASSOC);
}

function getDevicesClientes($cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT dvc.* FROM cli INNER JOIN dvc ON dvc.cliente = cli.id where dvc.cliente = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function getGruposClientes($cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT grp.* FROM grp where grp.cliente = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function getGrupoById($id, $cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT * FROM grp where id =  '$id' and cliente = '$cliente';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function getQueryes($grupo,$cliente){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT qry.* FROM qry where qry.cliente = '$cliente' and qry.grupo = '$grupo';";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}


function getDashboardClientes(){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT count(id) as value FROM cli";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC)[0]['value'];
}

function getDashboardChamados(){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT count(id) as value FROM log where status = 1";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC)[0]['value'];
}

function getDashboardErros(){
    $conexao = criaConexaoAlexa();
    $conexao->exec("set names utf8mb4");

    $sql = "SELECT count(id) as value FROM log where status = 3";
    $statement = $conexao->prepare($sql);
    $statement->execute();
    
    return $statement->fetchAll(PDO::FETCH_ASSOC)[0]['value'];
}


?>