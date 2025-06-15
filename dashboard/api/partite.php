<?php
header('Content-Type: application/json; charset=utf-8');
require_once '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]));
}
$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

switch ($action) {
    // Carica le partite dal database
    case 'load':
        // Carica le partite dal database
        $sql = "SELECT id_match, cod_team1, cod_team2, date, ended , stato FROM matches";
        $result = $conn->query($sql);

        $partite = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $partite[] = $row;
            }
        }

        echo json_encode(['success' => true, 'partite' => $partite]);
        break;

        // ELimina una partita
    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id'])) {
            echo json_encode(['success' => false, 'error' => 'ID partita mancante']);
            break;
        }

        $id = intval($data['id']); // protezione da injection

        $stmt_goals = $conn->prepare("DELETE FROM goal WHERE cod_match = ?");
        if (!$stmt_goals) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query goal: ' . $conn->error]);
            return;
        }
        $stmt_goals->bind_param("i", $id);
        if (!$stmt_goals->execute()) {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione dei goal: ' . $stmt_goals->error]);
            $stmt_goals->close();
            return;
        }
        $stmt_goals->close();

        // Ora elimina il match
        $stmt_match = $conn->prepare("DELETE FROM matches WHERE id_match = ?");
        if (!$stmt_match) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query match: ' . $conn->error]);
            return;
        }
        $stmt_match->bind_param("i", $id);
        if ($stmt_match->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione del match: ' . $stmt_match->error]);
        }
        $stmt_match->close();   
        break;

        // Elimina tutti i goal e le partite
    case 'deleteAll':
        $conn->begin_transaction();

        try {
            $stmt_goals = $conn->prepare("DELETE FROM goal");
            if (!$stmt_goals) {
                throw new Exception('Errore nella preparazione della query goal: ' . $conn->error);
            }
            if (!$stmt_goals->execute()) {
                throw new Exception('Errore durante l\'eliminazione dei goal: ' . $stmt_goals->error);
            }
            $stmt_goals->close();

            $stmt_matches = $conn->prepare("DELETE FROM matches");
            if (!$stmt_matches) {
                throw new Exception('Errore nella preparazione della query matches: ' . $conn->error);
            }
            if (!$stmt_matches->execute()) {
                throw new Exception('Errore durante l\'eliminazione dei match: ' . $stmt_matches->error);
            }
            $stmt_matches->close();

            $conn->commit();
            echo json_encode(['success' => true]);

        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

        // Salva una partita nel database
    case 'save':
      $data = json_decode(file_get_contents('php://input'), true);
      if (!isset($data['cod_team1'], $data['cod_team2'], $data['date'], $data['stato'])) {
          echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
          break;
      }

      $cod_team1 = intval($data['cod_team1']);
      $cod_team2 = intval($data['cod_team2']);
      $date = $conn->real_escape_string($data['date']);
      $stato = $conn->real_escape_string($data['stato']);

      $sql = "INSERT INTO matches (cod_team1, cod_team2, date, stato) VALUES ($cod_team1, $cod_team2, '$date', $stato)";
      if (!$conn->query($sql)) {
          echo json_encode(['success' => false, 'error' => 'Errore durante il salvataggio della partita: ' . $conn->error]);
          exit;
      }
      echo json_encode(['success' => true]);
      break;

     // Crea playoff       
    case 'savePlayoff': 
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['partite']) || !is_array($input['partite'])) {
            echo json_encode(['success' => false, 'error' => 'Dati classifica mancanti o non validi']);
            exit;
        }

        $partite = $input['partite'];

        $deleteSql = "DELETE FROM live_match;";
        if (!$conn->query($deleteSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella matches: ' . $conn->error]);
            exit;
        }
        // Svuota la tabella
        $deleteSql = "DELETE FROM matches WHERE stato = '3';";
        if (!$conn->query($deleteSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella matches: ' . $conn->error]);
            exit;
        }

        $stmt = $conn->prepare("
            INSERT INTO matches (cod_team1, cod_team2, date, ended, stato)
            VALUES (?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query: ' . $conn->error]);
            exit;
        }

        foreach ($partite as $partita) {
            $cod_team1 = $partita['cod_team1'] ?? 0;
            $cod_team2 = $partita['cod_team2'] ?? 0;
            $date = $partita['date'] ?? '';
            $ended = $partita['ended'] ?? 0;
            $stato = $partita['stato'] ?? 3;

            $stmt->bind_param("iisis", $cod_team1, $cod_team2, $date, $ended, $stato);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'error' => 'Errore con squadra ' . $stmt->error]);
                $stmt->close();
                exit;
            }
        }
        $stmt->close();
        echo json_encode(['success' => true]);
        break;

        // Crea quarti di finale
    case 'saveQuarti': 
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['partite']) || !is_array($input['partite'])) {
            echo json_encode(['success' => false, 'error' => 'Dati classifica mancanti o non validi']);
            exit;
        }

        $partite = $input['partite'];
        $deleteSql = "DELETE FROM matches WHERE stato = '4';";
        if (!$conn->query($deleteSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella matches: ' . $conn->error]);
            exit;
        }
        $stmt = $conn->prepare("
            INSERT INTO matches (cod_team1, cod_team2, date, ended, stato)
            VALUES (?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query: ' . $conn->error]);
            exit;
        }
        foreach ($partite as $partita) {
            $cod_team1 = $partita['cod_team1'] ?? 0;
            $cod_team2 = $partita['cod_team2'] ?? 0;
            $date = $partita['date'] ?? '';
            $ended = $partita['ended'] ?? 0;
            $stato = $partita['stato'] ?? 4;
            
            

            $stmt->bind_param("iisis", $cod_team1, $cod_team2, $date, $ended, $stato);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'error' => 'Errore con squadra ' . $stmt->error]);
                $stmt->close();
                exit;
            }
        }
        $stmt->close();
        echo json_encode(['success' => true]);
        break;

        // Crea semifinali
    case 'saveSemifinali': 
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['partite']) || !is_array($input['partite'])) {
            echo json_encode(['success' => false, 'error' => 'Dati classifica mancanti o non validi']);
            exit;
        }
        $partite = $input['partite'];
        $deleteSql = "DELETE FROM matches WHERE stato = '5';";
        if (!$conn->query($deleteSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella matches: ' . $conn->error]);
            exit;
        }
        $stmt = $conn->prepare("
            INSERT INTO matches (cod_team1, cod_team2, date, ended, stato)
            VALUES (?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query: ' . $conn->error]);
            exit;
        }

        foreach ($partite as $partita) {
            $cod_team1 = $partita['cod_team1'] ?? 0;
            $cod_team2 = $partita['cod_team2'] ?? 0;
            $date = $partita['date'] ?? '';
            $ended = $partita['ended'] ?? 0;
            $stato = $partita['stato'] ?? 5;
            
            $stmt->bind_param("iisis", $cod_team1, $cod_team2, $date, $ended, $stato);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'error' => 'Errore con squadra ' . $stmt->error]);
                $stmt->close();
                exit;
            }
        }
        $stmt->close();
        echo json_encode(['success' => true]);
        break;

        // Crea finale
    case 'saveFinale': 
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['partite']) || !is_array($input['partite'])) {
            echo json_encode(['success' => false, 'error' => 'Dati classifica mancanti o non validi']);
            exit;
        }

        $partite = $input['partite'];

        // Svuota la tabella
        $deleteSql = "DELETE FROM matches WHERE stato = '6';";
        if (!$conn->query($deleteSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella matches: ' . $conn->error]);
            exit;
        }

        // Prepara query insert
        $stmt = $conn->prepare("
            INSERT INTO matches (cod_team1, cod_team2, date, ended, stato)
            VALUES (?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query: ' . $conn->error]);
            exit;
        }

        foreach ($partite as $partita) {
            $cod_team1 = $partita['cod_team1'] ?? 0;
            $cod_team2 = $partita['cod_team2'] ?? 0;
            $date = $partita['date'] ?? '';
            $ended = $partita['ended'] ?? 0;
            $stato = $partita['stato'] ?? 6;

            $stmt->bind_param("iisis", $cod_team1, $cod_team2, $date, $ended, $stato);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'error' => 'Errore con squadra ' . $stmt->error]);
                $stmt->close();
                exit;
            }
        }
        $stmt->close();
        echo json_encode(['success' => true]);
        break;

        // Modifica una partita esistente
    case 'update':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id_match'], $data['cod_team1'], $data['cod_team2'], $data['date'], $data['stato'])) {
            echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
            break;
        }

        $id_match = intval($data['id_match']);
        $cod_team1 = intval($data['cod_team1']);
        $cod_team2 = intval($data['cod_team2']);
        $stato = intval($data['stato']);
        $date = $conn->real_escape_string($data['date']);

        $stmt = $conn->prepare("UPDATE matches SET cod_team1 = ?, cod_team2 = ?, date = ?, stato = ? WHERE id_match = ?");
        if ($stmt && $stmt->bind_param("iisii", $cod_team1, $cod_team2, $date, $stato, $id_match) && $stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Errore durante l\'aggiornamento: ' . $conn->error]);
        }
        break;

        // Segna una partita come conclusa
    case 'updateEnded':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id_match'], $data['ended'])) {
            echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
            break;
        }

        if (!is_numeric($data['id_match'])) {
            echo json_encode(['success' => false, 'error' => 'ID partita non valido']);
            break;
        }
        $ended = intval($data['ended']);
        $id_match = intval($data['id_match']);

        if ($ended !== 0 && $ended !== 1) {
            echo json_encode(['success' => false, 'error' => 'Valore di "ended" non valido']);
            break;
        }

        if ($ended === 0) {
            $stmt = $conn->prepare("UPDATE matches SET ended = 0 WHERE id_match = ?");
            if ($stmt && $stmt->bind_param("i", $id_match) && $stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Errore durante la conclusione della partita: ' . $conn->error]);
            }
        } else {
            $stmt = $conn->prepare("UPDATE matches SET ended = 1 WHERE id_match = ?");
            if ($stmt && $stmt->bind_param("i", $id_match) && $stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Errore durante la riapertura della partita: ' . $conn->error]);
            }
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}
?>
