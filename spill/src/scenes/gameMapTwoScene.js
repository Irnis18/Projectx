import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

let player;
let consolls;
let meteorites;
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
    this.load.image('backgroundTwo', 'assets/img/maps/map2.png');
    this.load.image(
      'platformTwo',
      'assets/img/platform/mapTwo/mainPlatform.png'
    );
    this.load.image(
      'platformTwoGroundOne',
      'assets/img/platform/mapTwo/platformOne.png'
    );
    this.load.image(
      'platformTwoGroundTwo',
      'assets/img/platform/mapTwo/platformTwo.png'
    );
    this.load.image(
      'platformTwoGroundThree',
      'assets/img/platform/mapTwo/platformThree.png'
    );
    this.load.image('consoll', 'assets/img/gameItems/consollSmall.png');
    this.load.image('meteorite', 'assets/img/gameItems/meteorite.png');
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
    this.score = 0;
  }

  hitMeteorite(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
    this.retryButton = new Button(
      this,
      'backButton',
      'backButtonHover',
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
  }

  goalReached(player) {
    this.physics.pause();

    player.anims.play('turn');

    this.goToNextLevelButton = new Button(
      this,
      'nextLevelButton',
      'nextLevelButtonHover',
      'Next Level',
      'GameMapThree'
    );
    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you managed the level',
      {
        fontSize: '24px',
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

      var meteorite = meteorites.create(x, 16, 'meteorite');
      meteorite.setBounce(1);
      meteorite.setCollideWorldBounds(true);
      meteorite.setVelocity(Phaser.Math.Between(-200, 200), 20);
      meteorite.allowGravity = false;
    }
  }

  create() {
    this.gameMapTwoSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'backgroundTwo');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'platformTwo')
      .setScale(2)
      .refreshBody();

    platforms.create(600, 440, 'platformTwoGroundOne');
    platforms.create(50, 250, 'platformTwoGroundOne');
    platforms.create(230, 170, 'platformTwoGroundThree');
    platforms.create(750, 200, 'platformTwoGroundTwo');
    platforms.create(180, 460, 'platformTwoGroundOne');
    platforms.create(330, 340, 'platformTwoGroundThree');
    platforms.create(480, 200, 'platformTwoGroundTwo');

    player = this.physics.add.sprite(50, 100, 'player');

    player.setBounce(0.1);
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

    meteorites = this.physics.add.group();
    this.goal = this.physics.add.staticGroup();

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });

    this.quitButton = new Button(
      this,
      'quitButton',
      'quitButtonHover',
      'Quit',
      'Title'
    );

    this.gameMapTwoSceneGrid.placeAtIndex(10, this.quitButton);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(meteorites, platforms);
    this.physics.add.overlap(player, consolls, this.collectConsoll, null, this);
    this.physics.add.collider(
      player,
      meteorites,
      this.hitMeteorite,
      null,
      this
    );
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
