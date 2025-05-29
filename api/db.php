<?php
    $host = 'localhost'; 
    $db = 'u908685741_sanze';
    $user = 'u908685741_sanze';
    $pass = 'Sanzeleague25!';

    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>