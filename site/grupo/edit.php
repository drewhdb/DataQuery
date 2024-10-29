<?php //print_r($_GET); die();
    include_once "../verifica_sessao.php";
    include_once "../dao/alexaDao.php";

    $grupo = getGrupoById($_GET['id'],$_GET['cliente']);
    $grupo = $grupo[0];

    $queryes = getQueryes($_GET['id'],$_GET['cliente']);
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
            <a title="Excluir" href="./daoDelete.php?id=<?= $grupo['id']; ?>&cliente=<?= $grupo['cliente']; ?>" style="margin-right: 1em;"><ion-icon class="icon50" name="close"></ion-icon></a>
            <button title="Salvar" type="submit"><ion-icon class="icon50" name="checkmark"></ion-icon></button>
            </div>
        </header>
        <container>
        <fieldset><legend>ID:</legend>
            <input type="text" class="input-content disabled" id="id" name="id" title="ID" value="<?= $grupo['id']?>" readonly>
        </fieldset>
        <fieldset><legend>Cliente:</legend>
            <input type="text" class="input-content disabled" id="cliente" name="cliente" title="CLIENTE" value="<?= $grupo['cliente']?>" readonly>
        </fieldset>
        <fieldset><legend>Grupo:</legend>
            <input type="text" class="input-content" id="grupo" name="grupo" title="GRUPO" required value="<?= $grupo['grupo']?>">
        </fieldset>
        <fieldset><legend>Ativo:</legend>
            <input type="checkbox" id="ativo" name="ativo" title="ATIVO" <?php if($grupo['ativo'] == 1){ ?>checked <?php }; ?>>
        </fieldset>
    </container>

    <div class="block">
        <div class="block-head">
            <p style="text-align: center;">QUERYES</p>
            <div class="add">
                <a href="../querye/insert.php?cliente=<?= $grupo['cliente']?>&grupo=<?= $grupo['id']?>" title="ADICIONAR QUERY" ><ion-icon class="icon50" name="add"></ion-icon></a>
            </div>
        </div>
        <?php if($queryes == []){?> <div style="margin-bottom: 1em;">Nenhum query encontrado.</div>
        <?php } else { 
        foreach ($queryes as $querye) { ?>
            <a href="../querye/edit.php?grupo=<?= $grupo['id']; ?>&cliente=<?= $grupo['cliente']; ?>&id=<?= $querye['id']; ?>" title="EDITAR QUERYE">
                <div type="text" class="input-content" <?php if($querye['ativo'] == 1) {?> style="background-color: rgba(39, 206, 47, 0.829);" <?php }; ?>><?= $querye['descricao']; ?></div>
            </a>
        <?php }};?>
    </div>

    <?php include_once "../padroes/footer.html"; ?>
</body>
</html>