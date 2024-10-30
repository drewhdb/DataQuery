<?php 
    include_once "./verifica_sessao.php";
    include_once "./dao/alexaDao.php";

    if ($_SESSION['logado'] == false) {
        session_destroy();
        header("Location: index.php");
    }

    $solicitacoes = getSolicitacoes();
    //print_r($solicitacoes); die();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Solicitações</title>
    <?php include_once "./padroes/head.php"; ?>
    <link rel="stylesheet" href="./css/cliente.css">
</head>
<body>
    <?php include_once "./padroes/menu.php"; ?>

    <div class="content-wrap">
        <header>
            <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
        </header>
        <container>
            <?php foreach ($solicitacoes as $solicitacao) {?>
            <a href="./solicitacoes/edit.php?deviceid=<?=$solicitacao['deviceid']?>" title="DEVICE" <?php if($solicitacao['bloqueado'] == 1) {?> style="background-color: tomato;" <?php }; ?>>
                <?= substr($solicitacao['deviceid'], 0, 30); ?>
                <br>
                <?= $solicitacao['nome']; ?> <br>
                <?= $solicitacao['data_solicitacao']; ?> - 
                <?= $solicitacao['tentativas']; ?> tentativas
            </a>
            <?php }; ?>
        </container>
    </div>

    <?php include_once "./padroes/footer.php"; ?>
</body>
</html>