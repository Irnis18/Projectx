import 'phaser';

var player;
var consolls;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

export default class GameMapTwoScene extends Phaser.Scene {
  constructor() {
    super('GameMapTwo');
  }

  preload() {
    this.load.image('forest', 'assets/img/maps/mapSlem.png');
    this.load.image('ground', 'assets/img/platform/slemPlatform.png');
    this.load.image('groundSmall1', 'assets/img/platform/slemPlatform_liten1.png');
    this.load.image('groundSmall2', 'assets/img/platform/slemPlatform_liten2.png');
    this.load.image('groundSmall3', 'assets/img/platform/slemPlatform_liten3.png');
    this.load.image('consoll', 'assets/img/consolle-small.png');
    this.load.image('bomb', 'assets/img/bomb.png');
    this.load.spritesheet('dude', 'assets/img/dude2.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
  }

  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      consolls.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
        child.setBounce(1)
        child.setCollideWorldBounds(true);
        child.allowGravity = false;
        child.setVelocity(Phaser.Math.Between(-50, 50), 10)
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  create() {
    this.add.image(400, 300, 'forest');
    console.log(this);
    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    platforms.create(600, 440, 'groundSmall1');
    platforms.create(50, 250, 'groundSmall1');
    platforms.create(230, 170, 'groundSmall3');
    platforms.create(750, 200, 'groundSmall2');
    platforms.create(180, 460, 'groundSmall1');
    platforms.create(330, 340, 'groundSmall3');
    platforms.create(480, 200, 'groundSmall2');

    player = this.physics.add.sprite(50, 100, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });


    cursors = this.input.keyboard.createCursorKeys();

    consolls = this.physics.add.group({
      key: 'consoll',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    consolls.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, consolls, this.collectConsoll, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-290);
    } else if (cursors.down.isDown) {
      player.setVelocityY(200);
    }
  }
}
