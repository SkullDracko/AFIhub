<?php
header('Content-Type: application/json');

session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$campo = $input['campo'] ?? '';
$valor = $input['valor'] ?? '';

$campos_permitidos = ['personal_email', 'cell', 'semestre'];

if (!in_array($campo, $campos_permitidos)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campo inválido']);
    exit;
}

if ($campo === 'personal_email' && !filter_var($valor, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Correo inválido']);
    exit;
}

if ($campo === 'cell' && !preg_match('/^\d{10}$/', $valor)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El celular debe tener 10 dígitos']);
    exit;
}

if ($campo === 'semestre') {
    $valor = (int)$valor;
    if ($valor < 1 || $valor > 12) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Semestre inválido']);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("UPDATE usuarios SET $campo = :valor WHERE id = :id");
    $stmt->execute([':valor' => $valor, ':id' => $_SESSION['user_id']]);
    $_SESSION[$campo] = $valor;
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    error_log("AFIHub Update Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor']);
}