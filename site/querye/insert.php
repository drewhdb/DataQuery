<?php
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $cliente = $_GET['cliente'];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Inserir</title>
    <?php include_once "../padroes/head.html"; ?>
    <link rel="stylesheet" href="../css/device.css">
    <link rel="stylesheet" href="../css/clientes.css">
<body>
    <?php include_once "../padroes/menu.html"; ?>

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
            <input type="text" class="input-content" id="GRUPO" name="GRUPO" title="GRUPO" required>
        </fieldset>
    </container>
    </div>

    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>