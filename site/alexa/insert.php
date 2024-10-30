<?php
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>edição</title>
    <?php include_once "../padroes/head.php"; ?>
    <link rel="stylesheet" href="../css/clientes.css">
    <link rel="stylesheet" href="../css/device.css">
</head>
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
            <fieldset><legend>Cliente:</legend>
                <input type="text" class="input-content" id="cliente" name="cliente" title="CLIENTE">
            </fieldset>
            <fieldset><legend>Host:</legend>
                <input type="text" class="input-content" id="host" name="host" placeholder="000.000.000.000" title="IP" required>
            </fieldset>
            <fieldset><legend>Porta:</legend>
                <input type="text" class="input-content" id="port" name="port" value="3306" title="PORTA" required>
            </fieldset>
            <fieldset><legend>Usuário:</legend>
                <input type="text" class="input-content" id="user" name="user" value="root" title="USUÁRIO" required>
            </fieldset>
            <fieldset><legend>Senha:</legend>
                <input type="password" class="input-content" id="pass" name="pass" title="SENHA" required>
            </fieldset>
        </container>
    </div></form>

    <?php include_once "../padroes/footer.php"; ?>
</body>
</html>