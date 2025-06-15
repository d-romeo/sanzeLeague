<?php
header('Content-Type: application/json');
include '/home/u908685741/domains/sanzeleague.com/public_html/api/db.php';


// Crea la connessione
$conn = new mysqli($host, $user, $pass, $db);

// Controlla la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Query per ottenere le partite
$sql = "SELECT m.id_match, t1.name AS team1, t2.name AS team2, m.date, m.ended , m.stato, t1.id_team AS cod_team1, t2.id_team AS cod_team2 FROM matches m JOIN team t1 ON m.cod_team1 = t1.id_team JOIN team t2 ON m.cod_team2 = t2.id_team ORDER BY m.date;";
$result = $conn->query($sql);

$matches = array();

if ($result->num_rows > 0) {
    // Output dei dati di ogni riga
    while($row = $result->fetch_assoc()) {
        $matches[] = $row;
    }
} else {
    echo json_encode(["message" => "0 risultati"]);
    exit;
}

echo json_encode($matches);

$conn->close();
?>
