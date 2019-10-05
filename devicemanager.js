const HID = require("node-hid");

PID = 57345;
VID = 2064;

function Devicemanager(gameController) {
  const p_device = new HID.HID(VID, PID);

  t = Date.now();
  p_device.on("data", data => {
    data = parseInt(data.toString("hex"), 16);

    // If both buttons are pulsed
    if (data == 0x0280807f7f8f0100) {
      gameController.onDraw()
      return;
    }
    // If button A is pulsed
    if (data & 0x0000000000000f00) {
      gameController.onEventPulsed("A")
    }

    if (data & 0x0000000000f00000) {
      gameController.onEventPulsed("B")
    }

  });
  p_device.on("error", console.error);
}

module.exports = Devicemanager;
