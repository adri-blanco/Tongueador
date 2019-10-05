const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function MockupDevice(gameController) {
  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
      process.exit();
    }

    if (key.name === "a") {
      gameController.onEventPulsed("A");
    }

    if (key.name === "b") {
      gameController.onEventPulsed("B");
    }

    if (key.name === "d") {
      gameController.onDraw();
    }
  });
}

module.exports = MockupDevice;
