<?php
// live.php
header('Content-Type: application/json; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';
// Connessione al database
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Connessione fallita: ' . $conn->connect_error]));
}

// Ottieni l'azione
$action = $_GET['action'] ?? (isset($_POST['action']) ? $_POST['action'] : '');

try {
    // Carica dati json se POST
    $data = [];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $data = $_GET;
    }

    switch ($action) {
        case 'loadMatchesLive':
            $stmt = $pdo->prepare("
                SELECT 
                    m.id_match, 
                    t1.name AS team1_name, 
                    t2.name AS team2_name, 
                    m.date,
                    m.stato
                FROM matches m
                JOIN team t1 ON m.cod_team1 = t1.id_team
                JOIN team t2 ON m.cod_team2 = t2.id_team
                WHERE m.ended = 0
                ORDER BY m.date ASC
            ");
            $stmt->execute();
            $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'matches' => $matches]);
            break;
        case 'getMatchInfo':
            $stmt = $pdo->prepare("
                SELECT 
                    m.id_match, 
                    t1.name AS team1_name, 
                    t2.name AS team2_name, 
                    m.date,
                    m.stato
                FROM live_match lm
                JOIN matches m ON lm.id_match = m.id_match
                JOIN team t1 ON m.cod_team1 = t1.id_team
                JOIN team t2 ON m.cod_team2 = t2.id_team
                WHERE m.ended = 0
                ORDER BY m.date ASC;
            ");
            $stmt->execute();
            $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'matches' => $matches]);
            break;


        case 'setLiveMatch':
            if (!isset($data['id_match'])) {
                echo json_encode(['success' => false, 'error' => 'ID partita mancante']);
                exit;
            }

            $id_match = $data['id_match'];
            $pdo->prepare("DELETE FROM live_match")->execute();

            $stmt = $pdo->prepare("INSERT INTO live_match (id_match) VALUES (:id_match)");
            $stmt->execute([':id_match' => $id_match]);

            echo json_encode(['success' => true]);
            break;

       case 'getLiveMatchData':
        // Recupera partita live
        $stmt = $pdo->prepare("
            SELECT lm.id_match, m.cod_team1, m.cod_team2, 
                t1.name AS team1_name, t1.logo_path AS team1_logo,
                t2.name AS team2_name, t2.logo_path AS team2_logo
            FROM live_match lm
            JOIN matches m ON lm.id_match = m.id_match
            JOIN team t1 ON m.cod_team1 = t1.id_team
            JOIN team t2 ON m.cod_team2 = t2.id_team
            LIMIT 1;
        ");
        $stmt->execute();
        $liveMatch = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$liveMatch) {
            echo json_encode(['success' => false, 'error' => 'Nessuna partita live']);
            exit;
        }

        // Conta gol team1
        $stmt = $pdo->prepare("
            SELECT SUM(CASE WHEN doubleScore = 1 THEN 2 ELSE 1 END)
            FROM goal
            WHERE cod_team = :team1 AND cod_match = :match
        ");
        $stmt->execute([':team1' => $liveMatch['cod_team1'], ':match' => $liveMatch['id_match']]);
        $team1_goals = (int)$stmt->fetchColumn();

        // Conta gol team2
        $stmt = $pdo->prepare("
            SELECT SUM(CASE WHEN doubleScore = 1 THEN 2 ELSE 1 END)
            FROM goal
            WHERE cod_team = :team2 AND cod_match = :match
        ");
        $stmt->execute([':team2' => $liveMatch['cod_team2'], ':match' => $liveMatch['id_match']]);
        $team2_goals = (int)$stmt->fetchColumn();

        // Ultimo marcatore team1
        $stmt = $pdo->prepare("
            SELECT u.surname, g.doubleScore 
            FROM goal g 
            JOIN user u ON g.cod_user = u.id_user 
            WHERE g.cod_team = :team1 AND g.cod_match = :match 
            ORDER BY g.id_goal DESC 
            LIMIT 1
        ");
        $stmt->execute([':team1' => $liveMatch['cod_team1'], ':match' => $liveMatch['id_match']]);
        $team1_last_goal = $stmt->fetch(PDO::FETCH_ASSOC);
        $team1_scorer = $team1_last_goal ? $team1_last_goal['surname'] . ((int)$team1_last_goal['doubleScore'] === 1 ? ' x2' : '') : '-';

        // Ultimo marcatore team2
        $stmt = $pdo->prepare("
            SELECT u.surname, g.doubleScore 
            FROM goal g 
            JOIN user u ON g.cod_user = u.id_user 
            WHERE g.cod_team = :team2 AND g.cod_match = :match 
            ORDER BY g.id_goal DESC 
            LIMIT 1
        ");
        $stmt->execute([':team2' => $liveMatch['cod_team2'], ':match' => $liveMatch['id_match']]);
        $team2_last_goal = $stmt->fetch(PDO::FETCH_ASSOC);
        $team2_scorer = $team2_last_goal ? $team2_last_goal['surname'] . ((int)$team2_last_goal['doubleScore'] === 1 ? ' x2' : '') : '-';

        // Lista completa marcatori per team1
        $stmt = $pdo->prepare("
            SELECT u.surname, g.doubleScore 
            FROM goal g 
            JOIN user u ON g.cod_user = u.id_user 
            WHERE g.cod_team = :team1 AND g.cod_match = :match 
            ORDER BY g.id_goal ASC
        ");
        $stmt->execute([':team1' => $liveMatch['cod_team1'], ':match' => $liveMatch['id_match']]);
        $team1_scorers_list = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $scorer = $row['surname'];
            if ((int)$row['doubleScore'] === 1) {
                $scorer .= ' x2';
            }
            $team1_scorers_list[] = $scorer;
        }

        // Lista completa marcatori per team2
        $stmt = $pdo->prepare("
            SELECT u.surname, g.doubleScore 
            FROM goal g 
            JOIN user u ON g.cod_user = u.id_user 
            WHERE g.cod_team = :team2 AND g.cod_match = :match 
            ORDER BY g.id_goal ASC
        ");
        $stmt->execute([':team2' => $liveMatch['cod_team2'], ':match' => $liveMatch['id_match']]);
        $team2_scorers_list = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $scorer = $row['surname'];
            if ((int)$row['doubleScore'] === 1) {
                $scorer .= ' x2';
            }
            $team2_scorers_list[] = $scorer;
        }

        // Risposta JSON finale
        echo json_encode([
            'success' => true,
            'liveMatch' => [
                'id_match' => $liveMatch['id_match'],
                'team1' => [
                    'id_team' => $liveMatch['cod_team1'],
                    'name' => $liveMatch['team1_name'],
                    'logo' => $liveMatch['team1_logo']
                ],
                'team2' => [
                    'id_team' => $liveMatch['cod_team2'],
                    'name' => $liveMatch['team2_name'],
                    'logo' => $liveMatch['team2_logo']
                ],
                'score' => [
                    'team1_goals' => $team1_goals,
                    'team2_goals' => $team2_goals
                ],
                'lastGoalScorers' => [
                    'team1' => $team1_scorer,
                    'team2' => $team2_scorer
                ],
                'scorersList' => [
                    'team1' => $team1_scorers_list,
                    'team2' => $team2_scorers_list
                ]
            ]
        ]);
        break;


        default:
            echo json_encode(['success' => false, 'error' => 'Azione non riconosciuta']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
