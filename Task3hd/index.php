<?php
session_start();
$STEPS = 40;

function reset_game() {
    global $STEPS;
    $_SESSION['path'] = [];
    $_SESSION['current_step'] = -1;
    for ($i = 0; $i < $STEPS; $i++) $_SESSION['path'][] = random_int(0, 1);
}

if (isset($_GET['act'])) {
    if ($_GET['act'] === 'respawn') {
        reset_game();
        echo 'ok';
        exit;
    }

    if ($_GET['act'] === 'move') {
        $step = intval($_GET['step']);
        $side = intval($_GET['side']);
        
        if (!isset($_SESSION['current_step'])) {
            $_SESSION['current_step'] = -1;
        } 
        
        if ($step !== $_SESSION['current_step'] + 1) die('err_seq'); 
        
        if ($step < 0 || $step >= $STEPS) die('err');
        
        if ($_SESSION['path'][$step] === $side) {
            $_SESSION['current_step'] = $step;
            echo 'ok';
            if ($step === $STEPS - 1) echo '|' . shell_exec('cat /flag-*');
        } else {
            reset_game();
            echo 'dead';
        }
        exit;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Squid Game 3D</title>
    <link rel="stylesheet" href="/style.css">
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
        }
      }
    </script>
    <script>
        window.GAME_STEPS = <?php echo $STEPS; ?>;
    </script>
</head>
<body>

    <div id="overlay">
        <h1>Click to Start</h1>
    </div>
    <div id="death-screen" style="display: none;">
        <h1>You Died!</h1>
        <button onclick="window.respawn()">Respawn</button>
    </div>
    <div id="win-screen" style="display: none;">
        <h1>You Won!</h1>
        <p id="flag-display"></p>
        <button onclick="location.reload()">Play Again</button>
    </div>
    <div id="game-container"></div>
    <div id="ui">
        <p>Step: <span id="step">1</span>/<?php echo $STEPS; ?></p>
        <p id="msg"></p>
    </div>
    <div id="hotbar">
        <?php for($i=0;$i<9;$i++): ?><div class="slot <?php echo $i===0?'active':''; ?>"></div><?php endfor; ?>
    </div>
    <script type="module" src="/game.js"></script>

</body>
</html>
