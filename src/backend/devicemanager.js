import HID from 'node-hid';
import GameConfiguration from '../config';

const PID = 57345;
const VID = 2064;

const { teams } = GameConfiguration;

function Devicemanager(gameController) {
  const device = new HID.HID(VID, PID);
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
