//Importing phaser module to use the phasert functions
import 'phaser';

//Simple configuration for setup of phaser
export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 800,
    height: 600,
    min: {
      widt: 300,
      height: 400
    },
    max: {
      width: 800,
      height: 600
    }
  },
  autoRound: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};
