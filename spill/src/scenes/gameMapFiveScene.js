import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

let player;
let consolls;
let snowballs;
let platforms;
let cursors;
let scoreText;

export default class GameMapFiveScene extends Phaser.Scene {
  constructor() {
    super('GameMapFive');
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
  //Loading everything for map5 when window is opened:
  preload() {
    this.load.image('snowBackground', 'assets/img/maps/snowMap5.png'); //Winterbackgound
    this.load.image(
      'snowPlatform',
      'assets/img/platform/snowMapFive/snowGround.png'
    ); // Winterstyle platform
    this.load.image(
      'smallGround',
      'assets/img/platform/snowMapFive/snowSmallGround.png'
    ); //Winterstyle platform
    this.load.image(
      'miniGround',
      'assets/img/platform/snowMapFive/snowMiniGround.png'
    ); //Winterstyle platform
    this.load.image('winterCabin', 'assets/img/maps/hytteMap5.png'); //Cabin platform
    this.load.image('consoll', 'assets/img/gameItems/consollSmall.png'); //Controller of value
    this.load.image('snowBall', 'assets/img/gameItems/snoball.png'); // A snowball as obstical instead of a bomb
    this.load.image('goal', 'assets/img/gameItems/goal.png'); // Goal that appears when you have collectet enough points
    this.load.image('quitButton', 'assets/img/buttons/quitButton.png');
    this.load.image(
      'quitButtonHover',
      'assets/img/buttons/quitButtonHover.png'
    ); // Quitbutton when you want to quit
    this.load.spritesheet('player', 'assets/img/gameItems/player.png', {
      frameWidth: 32,
      frameHeight: 48
    }); // The player we use on our levels
  }

  hitSnowball(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
    this.retryButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Retry',
      'GameMapFive'
    );
    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.gameMapFiveSceneGrid.placeAtIndex(36.8, this.gameOverText);
    this.gameMapFiveSceneGrid.placeAtIndex(60, this.retryButton);
    this.score = 0;
  }

  goalReached(player) {
    this.physics.pause();

    player.anims.play('turn');

    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you finished all the levels',
      {
        fontSize: '24px',
        fill: '#000'
      }
    );

    this.gameMapFiveSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapFiveSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
  }

  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    scoreText.setText('Score: ' + this.score);

    if (this.score >= 500) {
      this.goal.create(500, 150, 'goal');
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

      var snowball = snowballs.create(x, 16, 'snowball');
      snowball.setBounce(1);
      snowball.setCollideWorldBounds(true);
      snowball.setVelocity(Phaser.Math.Between(-200, 200), 20);
      snowball.allowGravity = false;
    }
  }

  create() {
    this.gameMapFiveSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'snowBackground');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 600, 'snowPlatform')
      .setScale(3)
      .refreshBody();

    platforms.create(600, 400, 'smallGround');
    platforms.create(50, 250, 'smallGround');
    platforms.create(170, 70, 'miniGround');
    platforms.create(100, 500, 'winterCabin');
    platforms.create(450, 270, 'miniGround');

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

    snowballs = this.physics.add.group();
    this.goal = this.physics.add.staticGroup();

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '26px',
      fill: '#000'
    });

    this.quitButton = new Button(
      this,
      'quitButton',
      'quitButtonHover',
      'Quit',
      'Title'
    );

    this.gameMapFiveSceneGrid.placeAtIndex(10, this.quitButton);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(snowballs, platforms);
    this.physics.add.overlap(player, consolls, this.collectConsoll, null, this);
    this.physics.add.collider(player, snowballs, this.hitSnowball, null, this);
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
      player.setVelocityY(-330);
    } else if (cursors.down.isDown) {
      player.setVelocityY(200);
    }
  }
}
