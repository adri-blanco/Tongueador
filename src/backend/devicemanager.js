import HID from 'node-hid';
import GameConfiguration from '../config';

const { teams, usbEncoder } = GameConfiguration;

function Devicemanager(gameController) {
  const device = new HID.HID(usbEncoder.VID, usbEncoder.PID);
  device.on('data', rawData => {
    const data = rawData.toString('hex');

    Object.keys(teams).forEach(teamKey => {
      if (data === teams[teamKey].dataCode) {
        gameController.teamPressedButton(teams[teamKey].teamKey);
      }
    });
  });
  // eslint-disable-next-line no-console
  device.on('error', console.error);
}

module.exports = Devicemanager;
