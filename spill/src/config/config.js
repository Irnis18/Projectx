//Importing phaser module to use the phaser functions --> this is also done on the all the other files.
import 'phaser';

//Simple configuration for setup of phaser 3 --> read more about the different configurations here: https://photonstorm.github.io/phaser3-docs/Phaser.Core.Config.html
export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 800,
    height: 600,
    min: {
      widt: 270,
      height: 370
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
