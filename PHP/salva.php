<?php
    include("conecta.php");

    $recpontos = $_GET["pontos"];
    $recnome = $_GET["nome"];

    mysqli_query($DBA, "INSERT INTO ranking (nome, pontos)  values ('$recnome', '$recpontos')");

    header("location: ranking.php");
    exit;