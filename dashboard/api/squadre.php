<?php
header('Content-Type: application/json');
require_once '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';

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
        if (!isset($data['id'], $data['name'], $data['cod_actual_state'])) {
            echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
            break;
        }

        $id = intval($data['id']);
        $name = $conn->real_escape_string($data['name']);
        $state = intval($data['cod_actual_state']);

        $stmt = $conn->prepare("UPDATE team SET name = ?, cod_actual_state = ? WHERE id_team = ?");
        if ($stmt && $stmt->bind_param("sii", $name, $state, $id) && $stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'aggiornamento']);
        }
        break;
        
    case 'load':
        // Carica le squadre dal database
        $sql = "SELECT id_team, name, cod_actual_state FROM team";
        $result = $conn->query($sql);

        $squadre = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $squadre[] = $row;
            }
        }

        echo json_encode(['success' => true, 'squadre' => $squadre]);
        break;

    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'error' => 'ID squadra mancante']);
            break;
        }

        $id = intval($data['id']); // protezione da injection
        $stmt = $conn->prepare("DELETE FROM team WHERE id_team = ?");
        
        if ($stmt && $stmt->bind_param("i", $id) && $stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione']);
        }

        $stmt->close();
        break;

    case 'save':
        // Salva le squadre nel database
        $data = json_decode(file_get_contents('php://input'), true);
        $squadre = $data['squadre'];

        
        // Inserisci le nuove squadre
        foreach ($squadre as $squadra) {
            $nome = $conn->real_escape_string($squadra['name']);
            $cod_actual_state = $conn->real_escape_string($squadra['cod_actual_state']);

            $sql = "INSERT INTO team (name, cod_actual_state) VALUES ('$nome', '$cod_actual_state')";
            if (!$conn->query($sql)) {
                echo json_encode(['success' => false, 'error' => 'Errore durante il salvataggio delle squadre: ' . $conn->error]);
                exit;
            }
        }

        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}
?>
