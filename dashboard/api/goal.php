<?php
// goal.php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '/home/u908685741/domains/rometimerror.it/public_html/sanze/api/db.php';
// Connessione al database
$conn = new mysqli($host, $user, $pass, $db);

// Controlla la connessione
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]));
}

// Ottieni l'azione dalla richiesta
$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

try {
    $data = [];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $data = $_GET;
    }
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'load':
        // Carica i goal dal database
        $sql = "SELECT id_goal,cod_user,cod_team,cod_match FROM goal";
        $result = $conn->query($sql);

        $goal = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $goal[] = $row;
            }
        }
        echo json_encode(['success' => true, 'goal' => $goal]);
    break;

    case 'save':
        // Legge il body della richiesta POST in JSON
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['cod_user'], $data['cod_team'], $data['cod_match'])) {
            echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
            exit;
        }

        $cod_user = $data['cod_user'];
        $cod_team = $data['cod_team'];
        $cod_match = $data['cod_match'];

        if (!$pdo) {
            echo json_encode(['success' => false, 'error' => 'Errore di connessione al database']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO goal (cod_user, cod_team, cod_match) VALUES (:cod_user, :cod_team, :cod_match)");
        $stmt->execute([
            ':cod_user' => $cod_user,
            ':cod_team' => $cod_team,
            ':cod_match' => $cod_match
        ]);

        echo json_encode(['success' => true]);
        break;
    
    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id_goal'])) {
            ob_clean();
            echo json_encode(['success' => false, 'error' => 'ID goal mancante']);
            exit;
        }

        $id = intval($data['id_goal']); // protezione
        $stmt = $conn->prepare("DELETE FROM goal WHERE id_goal = ?");

        if ($stmt && $stmt->bind_param("i", $id) && $stmt->execute()) {
            ob_clean();
            echo json_encode(['success' => true]);
        } else {
            ob_clean();
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione: ' . $conn->error]);
        }

        $stmt->close();
        exit;
    case 'get_goals_by_match':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id_match'])) {
            ob_clean();
            echo json_encode(['success' => false, 'error' => 'ID match mancante']);
            exit;
        }

        $id_match = intval($data['id_match']); // protezione
        $stmt = $conn->prepare("SELECT id_goal FROM goal WHERE cod_match = ?");

        if ($stmt && $stmt->bind_param("i", $id_match) && $stmt->execute()) {
            $result = $stmt->get_result();
            $goals = [];
            while ($row = $result->fetch_assoc()) {
                $goals[] = $row;
            }
            ob_clean();
            echo json_encode(['success' => true, 'goals' => $goals]);
        } else {
            ob_clean();
            echo json_encode(['success' => false, 'error' => 'Errore durante il recupero dei gol: ' . $conn->error]);
        }

        $stmt->close();
        exit;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non riconosciuta']);
        break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
