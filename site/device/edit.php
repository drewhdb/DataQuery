<?php //print_r($_GET); die();
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $device = getDevice($_GET['device']);
    $device = $device[0];
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
            <a title="Excluir" href="./daoDelete.php?id=<?= $device['id']; ?>&cliente=<?= $device['cliente']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
            <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
        <fieldset><legend>ID:</legend>
            <input type="text" class="input-content disabled" id="ID" name="ID" title="ID" required value="<?= $device['id']?>" readonly>
        </fieldset>
        <fieldset><legend>Cliente:</legend>
            <input type="text" class="input-content disabled" id="CLIENTE" name="CLIENTE" title="CLIENTE" required value="<?= $device['cliente']?>" readonly>
        </fieldset>
        <fieldset><legend>Descrição:</legend>
            <input type="text" class="input-content" id="DESCRICAO" name="DESCRICAO" title="DESCRICAO" required value="<?= $device['descricao']?>">
        </fieldset>
        <fieldset><legend>Bloqueado:</legend>
            <input type="checkbox" id="BLOQUEADO" name="BLOQUEADO" title="BLOQUEADO" <?php if($device['bloqueado'] == 1){ ?>checked <?php }; ?>>
        </fieldset>
    </container>
    </form>
    <container>
        <button class="input-content" onclick="copiarDevice('<?= $device['deviceid']?>')">Copiar Device</button>
    </container>

    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>