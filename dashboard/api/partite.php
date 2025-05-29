<?php
header('Content-Type: application/json; charset=utf-8');
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
    case 'load':
        // Carica le partite dal database
        $sql = "SELECT id_match, cod_team1, cod_team2, date, ended FROM matches";
        $result = $conn->query($sql);

        $partite = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $partite[] = $row;
            }
        }

        echo json_encode(['success' => true, 'partite' => $partite]);
        break;

    case 'delete':
      $data = json_decode(file_get_contents('php://input'), true);

      if (!isset($data['id'])) {
          echo json_encode(['success' => false, 'error' => 'ID partita mancante']);
          break;
      }

      $id = intval($data['id']); // protezione da injection
      $stmt = $conn->prepare("DELETE FROM matches WHERE id_match = ?");

      if ($stmt && $stmt->bind_param("i", $id) && $stmt->execute()) {
          echo json_encode(['success' => true]);
      } else {
          echo json_encode(['success' => false, 'error' => 'Errore durante l\'eliminazione: ' . $conn->error]);
      }

      $stmt->close();
      break;

    case 'save':
      // Salva una partita nel database
      $data = json_decode(file_get_contents('php://input'), true);
      if (!isset($data['cod_team1'], $data['cod_team2'], $data['date'])) {
          echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
          break;
      }

      $cod_team1 = intval($data['cod_team1']);
      $cod_team2 = intval($data['cod_team2']);
      $date = $conn->real_escape_string($data['date']);

      $sql = "INSERT INTO matches (cod_team1, cod_team2, date) VALUES ($cod_team1, $cod_team2, '$date')";
      if (!$conn->query($sql)) {
          echo json_encode(['success' => false, 'error' => 'Errore durante il salvataggio della partita: ' . $conn->error]);
          exit;
      }

      echo json_encode(['success' => true]);
      break;

  case 'update':
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['id_match'], $data['cod_team1'], $data['cod_team2'], $data['date'])) {
        echo json_encode(['success' => false, 'error' => 'Dati mancanti']);
        break;
    }

    $id_match = intval($data['id_match']);
    $cod_team1 = intval($data['cod_team1']);
    $cod_team2 = intval($data['cod_team2']);
    $date = $conn->real_escape_string($data['date']);

    $stmt = $conn->prepare("UPDATE matches SET cod_team1 = ?, cod_team2 = ?, date = ? WHERE id_match = ?");
    if ($stmt && $stmt->bind_param("iisi", $cod_team1, $cod_team2, $date, $id_match) && $stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Errore durante l\'aggiornamento: ' . $conn->error]);
    }
    break;

    case 'updateEnded':
        // Segna una partita come conclusa
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
