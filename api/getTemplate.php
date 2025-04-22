<?php
// include '/home/u908685741/domains/rometimerror.it/public_html/management-alfa/v1/api/db.php';

//try {
    //$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    //$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query per recuperare il parametro
    //$stmt = $pdo->query("SELECT template_id FROM users WHERE id = 1"); // Adatta la query al tuo caso
    //$result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Restituisci il parametro come JSON
    echo json_encode(['template_id' => 2]);
//} catch (PDOException $e) {
    //echo json_encode(['error' => $e->getMessage()]);
//}
?>