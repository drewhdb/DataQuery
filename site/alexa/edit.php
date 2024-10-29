<?php //print_r($_GET); die();
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";
    $dados = getCliente($_GET['id']);
    $devices = getDevicesClientes($dados['id']);
    $grupos = getGruposClientes($dados['id']);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>edição</title>
    <?php include_once "../padroes/head.html"; ?>
    <link rel="stylesheet" href="../css/device.css">
    <link rel="stylesheet" href="../css/clientes.css">
<body>
    <?php include_once "../padroes/menu.html"; ?>

    <div class="content-wrap">
    <form action="./daoUpdate.php" method="get">
        <header>
            <div>
                <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
            </div>
            <div>
                <a title="Excluir" href="./daoDelete.php?id=<?= $dados['id']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
                <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
        <fieldset><legend>ID:</legend>
            <input type="text" class="input-content disabled" id="id" name="id" title="ID" value="<?= $dados['id']?>">
        </fieldset>
        <fieldset><legend>Cliente:</legend>
            <input type="text" class="input-content" id="cliente" name="cliente" title="CLIENTE" value="<?= $dados['cliente']; ?>" required>
        </fieldset>
        <fieldset><legend>Host:</legend>
            <input type="text" class="input-content" id="host" name="host" placeholder="000.000.000.000" title="IP" value="<?= $dados['host']?>" required>
        </fieldset>
        <fieldset><legend>Porta:</legend>
            <input type="text" class="input-content" id="port" name="port" title="PORTA" required value="<?= $dados['port']?>" required>
        </fieldset>
        <fieldset><legend>Usuário:</legend>
            <input type="text" class="input-content" id="user" name="user" title="USUÁRIO" required value="<?= $dados['user']?>" required>
        </fieldset>
        <fieldset><legend>Senha:</legend>
            <input type="password" class="input-content" id="pass" name="pass" title="SENHA" required value="<?= $dados['pass']?>" required>
        </fieldset>
        <fieldset><legend>Bloquear:</legend>
            <input type="checkbox" id="bloqueado" name="bloqueado" title="BLOQUEADO" <?php if($dados['bloqueado'] == 1){ ?>checked <?php }; ?>>
        </fieldset>
        </fieldset>
    </container>

    <div class="block">
        <div class="block-head">
            <p style="text-align: center;">APARELHOS</p>
            <div class="add">
                <a href="../device/insert.php?cliente=<?= $dados['id']?>" title="ADICIONAR APARELHO" ><ion-icon class="icon50" name="add"></ion-icon></a>
            </div>
        </div>
        <?php if($devices == []){?> <div style="margin-bottom: 1em;">Nenhum aparelho encontrado.</div>
        <?php } else {
        foreach ($devices as $device) { ?>
            <a href="../device/edit.php?device=<?= $device['id']?>" title="EDITAR APARELHO" >
                <div type="text" class="input-content" <?php if($device['bloqueado'] == 1) {?> style="background-color: tomato;" <?php }; ?>><?= $device['descricao']; ?></div>
            </a>
        <?php }};?>
    </div>

    <div class="block">
        <div class="block-head">
            <p style="text-align: center;">GRUPOS</p>
            <div class="add">
                <a href="../grupo/insert.php?cliente=<?= $dados['id']?>" title="ADICIONAR GRUPO" ><ion-icon class="icon50" name="add"></ion-icon></a>
            </div>
        </div>
        <?php if($grupos == []){?> <div style="margin-bottom: 1em;">Nenhum grupo encontrado.</div>
        <?php } else { 
        foreach ($grupos as $grupo) { ?>
            <a href="../grupo/edit.php?cliente=<?= $dados['id']?>&id=<?= $grupo['id']?>" title="EDITAR GRUPO">
                <div type="text" class="input-content" <?php if($grupo['ativo'] == 1) {?> style="background-color: rgba(39, 206, 47, 0.829);" <?php }; ?>><?= $grupo['grupo']; ?></div>
            </a>
        <?php }};?>
    </div>

    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>