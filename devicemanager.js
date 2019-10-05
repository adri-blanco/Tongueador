import HID from 'node-hid';

const PID = 57345;
const VID = 2064;

function Devicemanager(gameController) {
  const device = new HID.HID(VID, PID);
  device.on('data', rawData => {
    const data = rawData.toString('hex');

    if (data === '0280807f7f0f1000') {
      gameController.teamPressedButton('A');
    }

    if (data === '018080007f0f0000') {
      gameController.teamPressedButton('B');
    }

    if (data === '0280807f000f0000') {
      gameController.teamPressedButton('C');
    }

    if (data === '0180807f7f8f0000') {
      gameController.teamPressedButton('D');
    }
  });
  // disable-next-line no-console
  device.on('error', console.error);
}

module.exports = Devicemanager;
