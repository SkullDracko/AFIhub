<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$matricula = trim($_POST['matricula'] ?? '');
$apellidop = trim($_POST['apellidop'] ?? '');
$apellidom = trim($_POST['apellidom'] ?? '');
$nombre = trim($_POST['nombre'] ?? '');
$instEmail = trim($_POST['inst_email'] ?? '');
$personalEmail = trim($_POST['personal_email'] ?? '');
$cell = trim($_POST['cell'] ?? '');
$semestre = trim($_POST['semestre'] ?? '');

$errors = [];

if ($matricula === '') {
    $errors['matricula'] = 'La matrícula es obligatoria';
} elseif (!preg_match('/^\d{7,}$/', $matricula)) {
    $errors['matricula'] = 'La matrícula debe tener al menos 7 dígitos';
}

if ($apellidop === '') {
    $errors['apellidop'] = 'El apellido paterno es obligatorio';
} elseif (preg_match('/\d/', $apellidop)) {
    $errors['apellidop'] = 'El apellido no debe contener números';
}

if ($apellidom !== '' && preg_match('/\d/', $apellidom)) {
    $errors['apellidom'] = 'El apellido no debe contener números';
}

if ($nombre === '') {
    $errors['nombre'] = 'El nombre es obligatorio';
} elseif (preg_match('/\d/', $nombre)) {
    $errors['nombre'] = 'El nombre no debe contener números';
}

if ($instEmail === '') {
    $errors['inst_email'] = 'El correo institucional es obligatorio';
} elseif (!filter_var($instEmail, FILTER_VALIDATE_EMAIL)) {
    $errors['inst_email'] = 'Ingresa un correo válido';
}

if ($personalEmail !== '' && !filter_var($personalEmail, FILTER_VALIDATE_EMAIL)) {
    $errors['personal_email'] = 'Ingresa un correo válido';
}

if ($cell === '') {
    $errors['cell'] = 'El celular es obligatorio';
} elseif (!preg_match('/^\d{10}$/', $cell)) {
    $errors['cell'] = 'El celular debe tener exactamente 10 dígitos';
}

if ($semestre === '') {
    $errors['semestre'] = 'Selecciona un semestre';
} elseif (!in_array($semestre, range(1, 12))) {
    $errors['semestre'] = 'Semestre inválido';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE matricula = :matricula LIMIT 1");
    $stmt->execute([':matricula' => $matricula]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'errors' => ['matricula' => 'Esta matrícula ya está registrada']]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE institutional_email = :email LIMIT 1");
    $stmt->execute([':email' => $instEmail]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'errors' => ['inst_email' => 'Este correo institucional ya está registrado']]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO usuarios (matricula, apellidop, apellidom, nombre, institutional_email, personal_email, cell, semestre) VALUES (:matricula, :apellidop, :apellidom, :nombre, :inst_email, :personal_email, :cell, :semestre)");
    $stmt->execute([
        ':matricula' => $matricula,
        ':apellidop' => $apellidop,
        ':apellidom' => $apellidom ?: null,
        ':nombre' => $nombre,
        ':inst_email' => $instEmail,
        ':personal_email' => $personalEmail ?: null,
        ':cell' => $cell,
        ':semestre' => $semestre,
    ]);

    echo json_encode(['success' => true, 'redirect' => '../../index.php']);
} catch (PDOException $e) {
    error_log("AFIHub Register Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor. Intenta de nuevo.']);
}
