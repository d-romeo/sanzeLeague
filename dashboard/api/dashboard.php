<?php
// dashboard.php

error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';

try {
    $data = [];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $data = $_GET;
    }

    $action = $data['action'] ?? '';

    switch ($action) {
        case 'save':
            if (!isset($data['momento'])) {
                throw new Exception('Parametro "momento" mancante.');
            }
            $momento = $data['momento'];

            // Cerchiamo l'id corrispondente nella tabella actual_state
            $stmt = $pdo->prepare("SELECT id_state FROM actual_state WHERE state = :momento");
            $stmt->execute(['momento' => $momento]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result) {
                throw new Exception('Momento non trovato nel database.');
            }

            $id_state = $result['id_state'];

            // Aggiorniamo la tabella instant
            $stmtUpdate = $pdo->prepare("UPDATE instant SET actual_state = :id_state WHERE id = 1");
            $stmtUpdate->execute(['id_state' => $id_state]);

            echo json_encode(['success' => true, 'message' => 'Stato aggiornato con successo']);
            break;

        case 'load':
            // Leggiamo l'id corrente
            $stmt = $pdo->query("SELECT i.actual_state, a.state 
                                 FROM instant i
                                 JOIN actual_state a ON i.actual_state = a.id_state
                                 WHERE i.id = 1");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$result) {
                throw new Exception('Nessun stato trovato.');
            }

            echo json_encode([
                'success' => true,
                'momento' => $result['state']
            ]);
            break;

        default:
            throw new Exception('Azione non valida o non specificata.');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
