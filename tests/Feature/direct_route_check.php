<?php
require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\ServiceProvider;

$app = require __DIR__ . '/bootstrap/app.php';

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$routes = $app->make('router')->getRoutes();
foreach ($routes as $route) {
    if (str_contains($route->uri(), 'classes') && in_array('POST', $route->methods())) {
        $controller = $route->getController();
        echo "Controller type: " . gettype($controller) . "\n";
        echo "Controller value: " . var_export($controller, true) . "\n";
        echo "Controller string length: " . strlen($controller) . "\n";
        echo "Controller: " . $controller . "\n";
    }
}
