<?php //print_r($_GET); die();
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $querye = getQueryById($_GET['id'],$_GET['cliente'], $_GET['grupo']);
    $querye = $querye[0];
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
            <a title="Excluir" href="./daoDelete.php?id=<?= $querye['id']; ?>&cliente=<?= $querye['cliente']; ?>&grupo=<?= $querye['grupo']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
            <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
            <fieldset><legend>ID:</legend>
                <input type="text" class="input-content disabled" id="id" name="id" title="ID" value="<?= $querye['id']?>" readonly>
            </fieldset>
            <fieldset><legend>Cliente:</legend>
                <input type="text" class="input-content disabled" id="cliente" name="cliente" title="CLIENTE" value="<?= $querye['cliente']?>" readonly>
            </fieldset>
            <fieldset><legend>Grupo:</legend>
                <input type="text" class="input-content disabled" id="grupo" name="grupo" title="GRUPO" value="<?= $querye['grupo']?>" readonly>
            </fieldset>
            <fieldset><legend>Descrição:</legend>
                <input type="text" class="input-content" id="descricao" name="descricao" title="DESCRICAO" value="<?= $querye['descricao']?>">
            </fieldset>
            <fieldset><legend>Ativo:</legend>
                <input type="checkbox" id="ativo" name="ativo" title="ATIVO" <?php if($querye['ativo'] == 1){ ?>checked <?php }; ?>>
            </fieldset>
        </container>
            
        <container style="width: 95%;">
            <fieldset style="width: 100%;"><legend>Querye:</legend>
            <textarea class="input-content" style="width: 100%; height: 10em;" id="query" name="query" title="QUERY"><?= $querye['query']?></textarea>
            </fieldset>
        </container>
    </form>
    </div>
    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>