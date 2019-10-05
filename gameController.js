function GameController(wsServer) {
  this.wsServer = wsServer;
  this.scores = {};
  this.resetting = false;
  this.globalTimeout = null;
  this.winner = null;
  this.timeHit = null;
}

GameController.prototype.onEventPulsed = function onEventPulsed(eventCode) {
  if (this.winner === null) {
    this.winner = eventCode;
    this.timeHit = new Date();
    this.onReset();
    setTimeout(() => {
      this.winner = null;
      this.logged = false;
      // eslint-disable-next-line no-console
      console.log('Ready, Sir!\n');
    }, 10000);
  }
  if (!this.logged && this.winner !== eventCode) {
    const difference = new Date() - this.timeHit;
    this.wsServer.send({ difference });
    // eslint-disable-next-line no-console
    console.log(eventCode, ' hitted ', new Date() - this.timeHit, 'ms late');
    this.logged = true;
  }
};

GameController.prototype.onDraw = function onDraw() {
  if (this.winner === null) {
    this.winner = Math.random() > 0.5 ? 'A' : 'B';
    // eslint-disable-next-line no-console
    console.log('Draw, and won: ', this.winner);
    this.timeHit = new Date();
    this.onReset();
    setTimeout(() => {
      this.winner = null;
    }, 10000);
  }
};

GameController.prototype.onReset = function onReset() {
  const { winner } = this;
  this.wsServer.send({ winner, status: 'winner' });
  this.scores = {};
};

module.exports = GameController;
