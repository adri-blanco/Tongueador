import DeviceManager from './src/backend/devicemanager';
import WServer from './src/backend/wserver';
import GameController from './src/backend/gameController';

const server = new WServer();
const gameController = GameController(server);
DeviceManager(gameController);

server.listen(3500);
