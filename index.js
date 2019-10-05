import DeviceManager from './devicemanager';
import WServer from './wserver';
import GameController from './gameController';

const server = new WServer();
const gameController = GameController(server);
DeviceManager(gameController);

server.listen(3500);
