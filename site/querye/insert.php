<?php
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $cliente = $_GET['cliente'];
    $grupo = $_GET['grupo'];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Inserir</title>
    <?php include_once "../padroes/head.php"; ?>
    <link rel="stylesheet" href="../css/device.css">
    <link rel="stylesheet" href="../css/clientes.css">
<body>
    <?php include_once "../padroes/menu.php"; ?>

    <div class="content-wrap">
    <form action="./daoInsert.php" method="get">
        <header>
            <div>
                <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
            </div>
            <div>
                <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
            <fieldset><legend>CLIENTE:</legend>
                <input type="text" class="input-content disabled" id="CLIENTE" name="CLIENTE" title="CLIENTE" value="<?= $cliente?>" READONLY>
            </fieldset>
            <fieldset><legend>GRUPO:</legend>
                <input type="text" class="input-content disabled" id="GRUPO" name="GRUPO" title="GRUPO" value="<?= $grupo?>" READONLY>
            </fieldset>
            <fieldset><legend>Descrição:</legend>
                <input type="text" class="input-content" id="descricao" name="descricao" title="DESCRICAO" require>
            </fieldset>
            <fieldset><legend>Ativo:</legend>
                <input type="checkbox" id="ativo" name="ativo" title="ATIVO">
            </fieldset>
        </container>
            
        <container>
            <fieldset style="width: 90%;"><legend>Querye:</legend>
            <textarea class="input-content" style="width: 100%; height: 10em;" id="query" name="query" title="QUERY"></textarea>
            </fieldset>
        </container>

    </div>

    <?php include_once "../padroes/footer.php"; ?>
</body>
</html>