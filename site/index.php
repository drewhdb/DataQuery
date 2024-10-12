<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="author" content="Andrew Horn de Borba">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 

    <link rel="stylesheet" type="text/css" href="css/login.css">

    <link rel="shortcut icon" href="imagem/icon.png" type="image/x-icon">
    <title>login</title>
</head>
<body>
    <div class="container">
        <div class="login">
        <form action="./login.php" method="post">
            <img src="http://localhost/DataQuery/site/imagem/logo_branco.png">
            
            <label for="user">usuario</label>
            <input type="text" id="user" name="user" required>

            <label for="pass">senha</label>
            <input type="password" id="pass" name="pass" required>

            <input type="submit" class="submit" value="Entrar">
            <?php if($_GET != []){ ?>
                <p class="aviso"><?= $_GET['aviso']?></p>
            <?php }; ?>
        </form>
        </div>
    </div>
</body>
</html>
