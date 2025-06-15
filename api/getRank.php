<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';
// Connessione al database
$conn = new mysqli($host, $user, $pass, $db);

// Controlla la connessione
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]);
    exit;
}

// Ottieni l'azione dalla richiesta
$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

// Gestione delle azioni
switch ($action) {
    case 'load':
    $sql = "
        SELECT 
            r.id_rank,
            r.id_team,
            t.name,
            r.punti,
            r.gol_fatti,
            r.gol_subiti,
            r.df_reti,
            t.logo_path
        FROM rankings r
        INNER JOIN team t ON r.id_team = t.id_team
        ORDER BY r.id_rank ASC
    ";

    $result = $conn->query($sql);

    $classifica = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $classifica[] = $row;
        }
    }

    echo json_encode(['success' => true, 'classifica' => $classifica]);
    break;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}

// Chiudi la connessione
$conn->close();
?>
