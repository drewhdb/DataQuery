<?php
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";
    $dados = getCliente($_GET['cliente']);
    $devices = getDevicesClientes($dados['id']);
    $queryes = getQueryesClientes($dados['id']);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>edição</title>
    <?php include_once "../padroes/head.html"; ?>
    <link rel="stylesheet" href="../css/clientes.css">
    <link rel="stylesheet" href="../css/device.css">
</head>
<body>
    <?php include_once "../padroes/menu.html"; ?>

    <div class="content-wrap">
    <form action="./daoUpdate.php" method="get">
        <header>
            <div>
                <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
            </div>
            <div>
                <a title="Excluir" href="./daoDelete.php?cliente=<?= $_GET['cliente']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
                <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
        <fieldset><legend>ID:</legend>
            <input type="text" class="input-content disabled" id="id" name="id" title="ID" value="<?= $dados['id']?>">
        </fieldset>
        <fieldset><legend>Cliente:</legend>
            <input type="text" class="input-content" value="<?= $_GET['cliente']; ?>" id="cliente" name="cliente" title="CLIENTE">
        </fieldset>
        <fieldset><legend>Host:</legend>
            <input type="text" class="input-content" id="host" name="host" placeholder="000.000.000.000" title="IP" required value="<?= $dados['host']?>">
        </fieldset>
        <fieldset><legend>Porta:</legend>
            <input type="text" class="input-content" id="port" name="port" value="3306" title="PORTA" required value="<?= $dados['port']?>">
        </fieldset>
        <fieldset><legend>Usuário:</legend>
            <input type="text" class="input-content" id="user" name="user" value="root" title="USUÁRIO" required value="<?= $dados['user']?>">
        </fieldset>
        <fieldset><legend>Senha:</legend>
            <input type="password" class="input-content" id="pass" name="pass" title="SENHA" required value="<?= $dados['pass']?>">
        </fieldset>
        <fieldset><legend>Bloquear:</legend>
            <input type="checkbox" id="bloqueado" name="bloqueado" title="BLOQUEADO">
        </fieldset>
        </fieldset>
    </container>

    <div class="block">
        <div class="block-head">
            <p style="text-align: center;">DEVICES</p>
        </div>
        <?php foreach ($devices as $device) { ?>
            <button type="text" class="input-content"><?= $device['descricao']; ?></button>
        <?php };?>
    </div>

    <div class="block">
        <div class="block-head">
            <p style="text-align: center;">QUERYES</p>
            <a href="./alexa/insert.php" title="ADICIONAR QUERY"><ion-icon class="icon50" name="add"></ion-icon></a>
            <?php foreach ($queryes as $query) { ?>
                <button type="text" class="input-content"><?= $query['query']; ?></button>
            <?php };?>
        </div>

    </div>

    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>