<?php
header('Content-Type: application/json');

session_start();
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$matricula = trim($_POST['matricula'] ?? '');
$correo = trim($_POST['correo'] ?? '');

$errors = [];

if ($matricula === '') {
    $errors['matricula'] = 'La matrícula es obligatoria';
} elseif (!preg_match('/^\d{7,}$/', $matricula)) {
    $errors['matricula'] = 'La matrícula debe tener al menos 7 dígitos';
}

if ($correo === '') {
    $errors['correo'] = 'El correo es obligatorio';
} elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errors['correo'] = 'Ingresa un correo válido';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, matricula, nombre, apellidop, apellidom, institutional_email, personal_email, cell, semestre FROM usuarios WHERE matricula = :matricula AND institutional_email = :correo LIMIT 1");
    $stmt->execute([':matricula' => $matricula, ':correo' => $correo]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Matrícula o correo incorrectos']);
        exit;
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['matricula'] = $user['matricula'];
    $_SESSION['nombre'] = $user['nombre'];
    $_SESSION['apellidop'] = $user['apellidop'];
    $_SESSION['apellidom'] = $user['apellidom'];
    $_SESSION['institutional_email'] = $user['institutional_email'];
    $_SESSION['personal_email'] = $user['personal_email'];
    $_SESSION['cell'] = $user['cell'];
    $_SESSION['semestre'] = $user['semestre'];

    echo json_encode(['success' => true, 'redirect' => 'dashboard.php']);
} catch (PDOException $e) {
    error_log("AFIHub Login Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor. Intenta de nuevo.']);
}
