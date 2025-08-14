<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interactive Car Journey</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- Coloca tu audio en assets/audio/music.mp3 o cambia el src a una URL directa MP3 -->
  <audio id="bgm" src="assets/audio/music.mp3" loop></audio>

  <div id="app" class="app">
    <img id="screen" alt="screen" />

    <div id="buttons" class="buttons"></div>

    <button id="soundToggle" class="sound" title="Mute/Unmute">🔈</button>
  </div>

  <script>
  const IMAGES = {
    start: "assets/images/start.png",
    which_way: "assets/images/which_way.png",
    avoid_or_scenic: "assets/images/avoid_or_scenic.png",
    shortcut_or_safe: "assets/images/shortcut_or_safe.png",
    finish_message: "assets/images/finish_message.png",
    contact: "assets/images/contact.png"
  };

  const SCREENS = {
    start: {
      img: IMAGES.start,
      buttons: [
        { label: "TESLA", go: "which_way" },
        { label: "HYUNDAI", go: "which_way" }
      ]
    },
    which_way: {
      img: IMAGES.which_way,
      buttons: [
        { label: "LEFT / IZQUIERDA", go: "avoid_or_scenic" },
        { label: "RIGHT / DERECHA", go: "avoid_or_scenic" }
      ]
    },
    avoid_or_scenic: {
      img: IMAGES.avoid_or_scenic,
      buttons: [
        { label: "AVOID TRAFFIC / EVADIR TRÁFICO", go: "shortcut_or_safe" },
        { label: "SCENIC ROUTE / RUTA PANORÁMICA", go: "shortcut_or_safe" }
      ]
    },
    shortcut_or_safe: {
      img: IMAGES.shortcut_or_safe,
      buttons: [
        { label: "SHORTCUT / ATAJO", go: "finish_message" },
        { label: "SAFE ROAD / CAMINO SEGURO", go: "finish_message" }
      ]
    },
    finish_message: {
      img: IMAGES.finish_message,
      buttons: [
        { label: "CONTACT US / CONTÁCTANOS", go: "contact" },
        { label: "PLAY AGAIN / JUGAR OTRA VEZ", go: "start" }
      ]
    },
    contact: {
      img: IMAGES.contact,
      buttons: [
        { label: "CALL +1 (689) 867-2176", link: "tel:+16898672176" },
        { label: "CALL +1 (689) 867-2975", link: "tel:+16898672975" },
        { label: "PLAY AGAIN / JUGAR OTRA VEZ", go: "start" }
      ]
    }
  };
  </script>
  <script src="app.js"></script>
</body>
</html>