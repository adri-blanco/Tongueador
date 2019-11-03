import HID from 'node-hid';
import GameConfiguration from '../config';
import { dispatch } from '../models/index';

const { teams, usbEncoder } = GameConfiguration;

function DeviceManager() {
  const device = new HID.HID(usbEncoder.VID, usbEncoder.PID);
  device.on('data', rawData => {
    const data = rawData.toString('hex');
    Object.keys(teams).forEach(teamKey => {
      if (data === teams[teamKey].dataCode) {
        dispatch.GameModel.teamPressedButton(teams[teamKey].teamKey);
      }
    });
  });
  // eslint-disable-next-line no-console
  device.on('error', console.error);
}

export default DeviceManager;
