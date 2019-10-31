import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

let player;
let consolls;
let bombs;
let platforms;
let cursors;
let scoreText;

export default class GameMapThreeScene extends Phaser.Scene {
  constructor() {
    super('GameMapThree');

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
    this.load.image('backgroundThree', 'assets/img/maps/map3.png');
    this.load.image(
      'platformThree',
      'assets/img/platform/mapThree/mainPlatform.png'
    );
    this.load.image(
      'platformThreeSmall1',
      'assets/img/platform/mapThree/mainPlatformOne.png'
    );
    this.load.image(
      'platformThreeSmall2',
      'assets/img/platform/mapThree/mainPlatformTwo.png'
    );
    this.load.image('consoll', 'assets/img/gameItems/consollSmall.png');
    this.load.image('bomb', 'assets/img/gameItems/fugl.png');
    this.load.image('goal', 'assets/img/gameItems/goal.png');
    this.load.image('quitButton', 'assets/img/buttons/quitButton.png');
    this.load.image(
      'quitButtonHover',
      'assets/img/buttons/quitButtonHover.png'
    );
    this.load.image(
      'nextLevelButton',
      'assets/img/buttons/nextLevelButton.png'
    );
    this.load.image(
      'nextLevelButtonHover',
      'assets/img/buttons/nextLevelButtonHover.png'
    );
    this.load.spritesheet('player', 'assets/img/gameItems/player.png', {
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
      'backButton',
      'backButtonHover',
      'Retry',
      'GameMapThree'
    );
    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.gameMapThreeSceneGrid.placeAtIndex(36.8, this.gameOverText);
    this.gameMapThreeSceneGrid.placeAtIndex(60, this.retryButton);
    this.score = 0;
  }

  goalReached(player) {
    this.physics.pause();

    player.anims.play('turn');

    this.goToNextLevelButton = new Button(
      this,
      'nextLevelButton',
      'nextLevelButtonHover',
      'Next Level',
      'GameMapFour'
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

    this.gameMapThreeSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapThreeSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
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
      //  A new batch of stars to collect
      consolls.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      var y =
        player.x > 400
          ? Phaser.Math.Between(0, 400)
          : Phaser.Math.Between(400, 800);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

      var bomb2 = bombs.create(y, 16, 'bomb');
      bomb2.setBounce(1);
      bomb2.setCollideWorldBounds(true);
      bomb2.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb2.allowGravity = false;
    }
  }

  create() {
    this.gameMapThreeSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'backgroundThree');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'platformThree')
      .setScale(2)
      .refreshBody();

    platforms.create(400, 150, 'platformThreeSmall1');
    platforms.create(200, 320, 'platformThreeSmall2');
    platforms.create(600, 320, 'platformThreeSmall1');

    player = this.physics.add.sprite(100, 450, 'player');

    player.setBounce(0.5);
    player.setCollideWorldBounds(true);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
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
      fontSize: '28px',
      fill: '#000'
    });

    this.quitButton = new Button(
      this,
      'quitButton',
      'quitButtonHover',
      'Quit',
      'Title'
    );

    this.gameMapThreeSceneGrid.placeAtIndex(10, this.quitButton);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, consolls, this.collectConsoll, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    this.physics.add.overlap(player, this.goal, this.goalReached, null, this);
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-230);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(230);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-400);
    } else if (cursors.down.isDown) {
      player.setVelocityY(400);
    }
  }
}
