<?php //print_r($_GET); die();
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $solicitacao = getSolicitacao($_GET['deviceid']);
    $solicitacao = $solicitacao[0];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>edição</title>
    <?php include_once "../padroes/head.php"; ?>
    <link rel="stylesheet" href="../css/device.css">
    <link rel="stylesheet" href="../css/clientes.css">
<body>
    <?php include_once "../padroes/menu.php"; ?>

    <div class="content-wrap">
    <form action="./daoUpdate.php" method="get">
        <header>
            <div>
                <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
            </div>
            <div>
            <a title="Excluir" href="./daoDelete.php?deviceid=<?= $solicitacao['deviceid']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
            <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
            <fieldset><legend>device:</legend>
                <input type="text" class="input-content disabled" id="deviceid" name="deviceid" title="DEVICE" value="<?= $solicitacao['deviceid']?>" readonly>
            </fieldset>
            <fieldset><legend>Nome:</legend>
                <input type="text" class="input-content" id="nome" name="nome" title="NOME" value="<?= $solicitacao['nome']?>">
            </fieldset>
            <fieldset><legend>Tentativas:</legend>
                <input type="text" class="input-content disabled" title="TENTATIVAS" value="<?= $solicitacao['tentativas']?>" readonly>
            </fieldset>
            <fieldset><legend>Ultima tentativa:</legend>
                <input type="text" class="input-content disabled" title="ULTIMA SOLICITAÇÃO" value="<?= $solicitacao['data_solicitacao']?>" readonly>
            </fieldset>
            <fieldset><legend>Bloqueio:</legend>
                <input type="checkbox" id="bloqueado" name="bloqueado" title="BLOQUEIO" <?php if($solicitacao['bloqueado'] == 1){ ?>checked <?php }; ?>>
            </fieldset>
        </container>
    </form>
    <container>
        <button class="input-content" onclick="copiarDevice('<?= $solicitacao['deviceid']?>')">Copiar Device</button>
    </container>
    </div>
    <?php include_once "../padroes/footer.php"; ?>
</body>
</html>