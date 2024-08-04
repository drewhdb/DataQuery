<?php
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] == false) {
    session_destroy();
    header("Location: index.php");
}

?>