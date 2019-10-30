import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

let player;
let consolls;
let bombs;
let platforms;
let cursors;
let scoreText;

export default class GameMapTwoScene extends Phaser.Scene {
  constructor() {
    super('GameMapTwo');

    this.score = 0;
    this.gameOver = false;
    this.gameOverText;
    this.retryButton = null;
    this.quitButton = null;
    this.goal;
    this.goToNextLevelButton;
    this.goToNextLevelText;
    this.goalSpawn;
  }

  preload() {
    this.load.image('mountain', 'assets/img/maps/mapSlem.png');
    this.load.image('mainGround', 'assets/img/platform/slemPlatform.png');
    this.load.image(
      'groundSmall1',
      'assets/img/platform/slemPlatform_liten1.png'
    );
    this.load.image(
      'groundSmall2',
      'assets/img/platform/slemPlatform_liten2.png'
    );
    this.load.image(
      'groundSmall3',
      'assets/img/platform/slemPlatform_liten3.png'
    );
    this.load.image('consoll', 'assets/img/consolle-small-v2.png');
    this.load.image('bomb', 'assets/img/bomb.png');
    this.load.image('goal', 'assets/img/goal.png');
    this.load.image('quitButton', 'assets/img/quitButton.png');
    this.load.image('quitButtonHover', 'assets/img/quitButtonHover.png');
    this.load.spritesheet('dude', 'assets/img/dude2.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  hitBomb(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
    this.retryButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Retry',
      'GameMapTwo'
    );
    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.gameMapTwoSceneGrid.placeAtIndex(36.8, this.gameOverText);
    this.gameMapTwoSceneGrid.placeAtIndex(60, this.retryButton);
    this.score = 0;
    // this.input.on('pointerdown', () => this.scene.start('GameMapOne'));
  }

  goalReached(player) {
    this.physics.pause();

    player.anims.play('turn');

    this.goToNextLevelButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Next Level',
      'GameMapThree'
    );
    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you managed the level',
      {
        fontSize: '28px',
        fill: '#000'
      }
    );

    this.gameMapTwoSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapTwoSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
  }

  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    scoreText.setText('Score: ' + this.score);

    if (this.score >= 500) {
      this.goal.create(100, 70, 'goal');
    }

    if (consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      consolls.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
        child.setBounce(1);
        child.setCollideWorldBounds(true);
        child.allowGravity = false;
        child.setVelocity(Phaser.Math.Between(-50, 50), 10);
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
    this.gameMapTwoSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'mountain');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'mainGround')
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
    this.goal = this.physics.add.staticGroup();

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    this.quitButton = new Button(
      this,
      'quitButton',
      'quitButtonHover',
      '',
      'Title'
    );

    this.gameMapTwoSceneGrid.placeAtIndex(10, this.quitButton);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, consolls, this.collectConsoll, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    this.physics.add.overlap(player, this.goal, this.goalReached, null, this);
  }

  update() {
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
