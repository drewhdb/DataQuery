<?php
    include_once "./verifica_sessao.php";
    include_once "./dao/alexaDao.php";

    if ($_SESSION['logado'] == false) {
        session_destroy();
        header("Location: index.php");
    }

    $totalClientes = getDashboardClientes();
    $totalChamados = getDashboardChamados();
    $totalFalhas = getDashboardErros();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>DataQuery</title>
    <?php include_once "./padroes/head.html"; ?>
    <link rel="stylesheet" href="./css/clientes.css">
    <link rel="stylesheet" href="./css/home.css">
</head>
<body>
    <?php include_once "./padroes/menu.html"; ?>

    <div class="content-wrap">
        <header>
            <ion-icon class="expand" name="menu" id="open-button"></ion-icon>
        </header>
        <container>
            <dashboard>Total de clientes: <?= $totalClientes ?> </dashboard>
            <dashboard>chamados: <?= $totalChamados ?> </dashboard>
            <dashboard>chamados falhos: <?= $totalFalhas ?> </dashboard>
        </container>
    </div>

    <?php include_once "./padroes/footer.html"; ?>
</body>
</html>