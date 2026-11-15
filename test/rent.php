<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // для GitHub Pages или любого клиента

$file = __DIR__ . '/rents.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));
$rents = json_decode(file_get_contents($file), true);
if ($rents === null) $rents = [];

$id = $_GET['id'] ?? null;
$action = $_GET['action'] ?? null;

// ВАЖНО: Очищаем устаревшие аренды перед обработкой
foreach ($rents as $rentId => $rent) {
    if (isset($rent['stop_time']) && $rent['stop_time'] < time()) {
        // Время аренды истекло - очищаем
        $rents[$rentId]['start_time'] = null;
        $rents[$rentId]['stop_time'] = null;
    }
}

// Старт аренды
if ($id && $action === 'start') {
    $duration = isset($_GET['duration']) ? intval($_GET['duration']) : 24*60*60;
    $endTime = time() + $duration;
    if (!isset($rents[$id])) $rents[$id] = [];
    $rents[$id]['start_time'] = time();
    $rents[$id]['stop_time'] = $endTime;
    file_put_contents($file, json_encode($rents, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES));
    echo json_encode(['status'=>'ok','id'=>$id,'server_time'=>time()]);
    exit;
}

// Остановить аренду
if ($id && $action === 'stop') {
    if (!isset($rents[$id])) $rents[$id] = [];
    $rents[$id]['start_time'] = null;
    $rents[$id]['stop_time'] = null;
    file_put_contents($file, json_encode($rents, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES));
    echo json_encode(['status'=>'ok','id'=>$id,'server_time'=>time()]);
    exit;
}

// Вернуть все аренды (уже очищенные от устаревших)
file_put_contents($file, json_encode($rents, JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES)); // Сохраняем очищенные данные
echo json_encode(['rents'=>$rents,'server_time'=>time()]);