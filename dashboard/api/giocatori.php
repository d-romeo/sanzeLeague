<?php
header('Content-Type: application/json');
require_once '/home/u908685741/domains/rometimerror.it/public_html/sanze/api/db.php';

// Connessione al database
$conn = new mysqli($host, $user, $pass, $db);

// Controlla la connessione
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]));
}

// Ottieni l'azione dalla richiesta
$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

// Gestione delle azioni
switch ($action) {
    case 'update':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'], $data['name'], $data['surname'], $data['cod_team'], $data['type'])) {
            echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
            break;
        }

        $id = intval($data['id']);
        $name = $conn->real_escape_string($data['name']);
        $surname = $conn->real_escape_string($data['surname']);
        $cod_team = intval($data['cod_team']);
        $type = intval($data['type']);

        $stmt = $conn->prepare("UPDATE user SET name = ?, surname = ?, cod_team = ?, type = ? WHERE id_user = ?");
        if ($stmt && $stmt->bind_param("ssiii", $name, $surname, $cod_team, $type, $id) && $stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'aggiornamento']);
        }
        break;

    case 'load':
        // Carica i giocatori dal database
        $sql = "SELECT id_user, name, surname, cod_team, type FROM user";
        $result = $conn->query($sql);

        $giocatori = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $giocatori[] = $row;
            }
        }

        echo json_encode(['success' => true, 'giocatori' => $giocatori]);
        break;

    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'error' => 'ID giocatore mancante']);
            break;
        }

        $id = intval($data['id']); // protezione da injection
        $stmt = $conn->prepare("DELETE FROM user WHERE id_user = ?");

        if ($stmt && $stmt->bind_param("i", $id) && $stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione']);
        }

        $stmt->close();
        break;

   case 'save':
    // Salva un singolo giocatore nel database
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['giocatore'])) {
        echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
        break;
    }

    $giocatore = $data['giocatore'];
    $name = $conn->real_escape_string($giocatore['name']);
    $surname = $conn->real_escape_string($giocatore['surname']);
    $cod_team = intval($giocatore['cod_team']);
    $type = intval($giocatore['type']);

    $sql = "INSERT INTO user (name, surname, cod_team, type) VALUES ('$name', '$surname', $cod_team, $type)";
    if (!$conn->query($sql)) {
        echo json_encode(['success' => false, 'error' => 'Errore durante il salvataggio del giocatore: ' . $conn->error]);
        exit;
    }

    echo json_encode(['success' => true]);
    break;


    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}
?>
