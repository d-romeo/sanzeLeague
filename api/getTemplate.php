<?php
// Imposta l'intestazione per la risposta JSON
header('Content-Type: application/json');

// Include il file per la connessione al database
include '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';

try {
    // Crea una connessione PDO
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Esegui la query per ottenere i dati
    $stmt = $pdo->query("SELECT actual_state FROM instant WHERE id = 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Controlla se c'è un risultato e invia la risposta JSON
    if ($result) {
        echo json_encode([
            'success' => true,
            'template' => $result
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Nessun risultato trovato'
        ]);
    }
} catch (PDOException $e) {
    // Gestione degli errori
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
