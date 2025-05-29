<?php
// punti.php
ob_start(); // Buffer output per evitare output indesiderati

header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disattiva l'output visivo degli errori

require_once '/home/u908685741/domains/rometimerror.it/public_html/sanze/api/db.php';

// Connessione al database
$conn = new mysqli($host, $user, $pass, $db);

// Controlla la connessione
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]);
    ob_end_flush();
    exit;
}

// Ottieni l'azione dalla richiesta
$action = $_GET['action'] ?? ($_POST['action'] ?? '');

switch ($action) {
    case 'load':
        // Carica score dal database
        $sql = "SELECT id_score, id_team, value FROM score";
        $result = $conn->query($sql);

        $score = [];
        if ($result && $result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $score[] = $row;
            }
        }
        echo json_encode(['success' => true, 'score' => $score]);
        break;

    case 'add':
        if (!isset($_GET['id_team'])) {
            echo json_encode(['success' => false, 'error' => 'ID squadra mancante']);
            break;
        }

        $id_team = (int) $_GET['id_team'];
        $sql = "UPDATE score SET value = value + 1 WHERE id_team = $id_team";

        if ($conn->query($sql)) {
            echo json_encode([
                'success' => true,
                'query' => $sql,
                'affected_rows' => $conn->affected_rows
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Errore DB: ' . $conn->error,
                'query' => $sql
            ]);
        }
        break;


    case 'min':
        if (!isset($_GET['id_team'])) {
            echo json_encode(['success' => false, 'error' => 'ID squadra mancante']);
            break;
        }

        $id_team = (int) $_GET['id_team'];
        $sql = "UPDATE score SET value = value - 1 WHERE id_team = $id_team AND value > 0";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore DB: ' . $conn->error]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non riconosciuta']);
        break;
}

ob_end_flush(); // Chiudi e invia tutto il buffer
exit;
