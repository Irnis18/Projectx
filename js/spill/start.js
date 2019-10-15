var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

let game = new Phaser.Game(config);

function preload() {
  this.load.image('forest', '../../assets/img/spill/maps/map4.png');
  this.load.image(
    'ground',
    '../../assets/img/spill/platform/platform-iland.png'
  );
  this.load.image('consoll', '../../assets/img/spill/consolle-small.png');
  this.load.image('bomb', '../../assets/img/spill/bomb.png');
  this.load.spritesheet('dude', '../../assets/img/spill/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  this.add.image(400, 300, 'forest');

  let platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, 'ground')
    .setScale(3)
    .refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function update() {}
