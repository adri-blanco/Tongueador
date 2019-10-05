import DeviceManager from './backend/devicemanager';
import WServer from './backend/wserver';
import GameController from './backend/gameController';

const server = new WServer();
const gameController = GameController(server);
DeviceManager(gameController);

server.listen(3500);
