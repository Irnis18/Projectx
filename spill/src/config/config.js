import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-content',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};
