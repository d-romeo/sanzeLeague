<?php
header('Content-Type: application/json');
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
        // Carica le squadre dal database
        $sql = "SELECT id_team, name, cod_actual_state, logo_path FROM team";
        $result = $conn->query($sql);

        $squadre = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $squadre[] = $row;
            }
        }

        echo json_encode(['success' => true, 'squadre' => $squadre]);
        break;

    case 'details':
        $id_team = isset($_GET['id']) ? intval($_GET['id']) : 0;

        // Prendi solo info base della squadra
        $sql = "SELECT id_team, name, logo_path FROM team WHERE id_team = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_team);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            echo json_encode(['success' => true, 'squadra' => $row]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Squadra non trovata']);
        }
        break;

    case 'players':
        $id_team = isset($_GET['id']) ? intval($_GET['id']) : 0;

        $sql = "SELECT u.id_user, u.name, u.surname, u.type, ut.type AS role_name
        FROM user u
        JOIN user_type ut ON u.type = ut.id_user_type
        WHERE u.cod_team = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_team);
        $stmt->execute();
        $result = $stmt->get_result();

        $players = [];
        while ($row = $result->fetch_assoc()) {
            $players[] = $row;
        }

        echo json_encode(['success' => true, 'players' => $players]);
        break;


    case 'delete':
        // Elimina una squadra dal database
        $data = json_decode(file_get_contents('php://input'), true);
        $squadra = $data['squadra'];

        $sql = "DELETE FROM team WHERE id_team = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $squadra['id_team']);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione della squadra: ' . $conn->error]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}

// Chiudi la connessione
$conn->close();
?>
