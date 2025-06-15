<?php
header('Content-Type: application/json; charset=utf-8');
include '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';


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
    case 'save':
        // Leggi il JSON raw dal body della richiesta
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);

        if (!isset($input['classifica']) || !is_array($input['classifica'])) {
            echo json_encode(['success' => false, 'error' => 'Dati classifica mancanti o non validi']);
            exit;
        }

        $classifica = $input['classifica'];

        // Svuota la tabella
        $truncateSql = "TRUNCATE TABLE rankings";
        if (!$conn->query($truncateSql)) {
            echo json_encode(['success' => false, 'error' => 'Errore nello svuotare la tabella rankings: ' . $conn->error]);
            exit;
        }

        // Prepara query insert
        $stmt = $conn->prepare("
            INSERT INTO rankings (id_rank, id_team, punti, nome, gol_fatti, gol_subiti, df_reti)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Errore nella preparazione della query: ' . $conn->error]);
            exit;
        }

        foreach ($classifica as $squadra) {
            $id_rank = $squadra['id_rank'] ?? 0;
            $id_team = $squadra['id_team'] ?? 0;
            $punti = $squadra['punti'] ?? 0;
            $nome = $squadra['nome'] ?? '';
            $gol_fatti = $squadra['gol_fatti'] ?? 0;
            $gol_subiti = $squadra['gol_subiti'] ?? 0;
            $df_reti = $squadra['df_reti'] ?? 0;

            $stmt->bind_param("iiisiii", $id_rank, $id_team, $punti, $nome, $gol_fatti, $gol_subiti, $df_reti);
            if (!$stmt->execute()) {
                echo json_encode(['success' => false, 'error' => 'Errore con squadra ' . $nome . ': ' . $stmt->error]);
                $stmt->close();
                exit;
            }
        }

        $stmt->close();
        echo json_encode(['success' => true]);
        break;

         case 'load':
            // Carica i classifica dal database
            $sql = "SELECT id_rank, id_team, punti, nome, gol_fatti, gol_subiti, df_reti FROM rankings ORDER BY id_rank ASC";
            $result = $conn->query($sql);

            $classifica = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $classifica[] = $row;
                }
            }

            echo json_encode(['success' => true, 'classifica' => $classifica]);
            break;


    default:
        echo json_encode(['success' => false, 'error' => 'Azione non valida']);
        break;
}
?>
