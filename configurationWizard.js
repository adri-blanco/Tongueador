/* eslint-disable no-console */
import HID from 'node-hid';

const PID = 57345;
const VID = 2064;

const device = new HID.HID(VID, PID);

function getCode() {
  return new Promise(resolve => {
    const defaultData = [];
    device.on('data', rawData => {
      const data = rawData.toString('hex');
      if (defaultData.length === 1) {
        console.log(
          '\x1b[36m%s\x1b[0m',
          'Press the button you want to configure.'
        );
        console.log();
      }
      if (defaultData.length < 2) {
        defaultData.push(data);
        return;
      }

      if (!defaultData.includes(data)) {
        device.close();
        resolve(data);
      }
    });
  });
}

async function getDataCode() {
  const answer = await getCode();
  console.log('Past the following code in the file config.js:');
  console.log('dataCode: \x1b[36m%s\x1b[0m', answer);
}

getDataCode();
