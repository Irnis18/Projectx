import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

let playerSwimming;
let consolls;
let stars;
let platforms;
let cursors;
let scoreText;

export default class GameMapSixScene extends Phaser.Scene {
  constructor() {
    super('GameMapSix');

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
    this.load.image('backgroundSix', 'assets/img/maps/map6.png');
    this.load.image(
      'platformSix',
      'assets/img/platform/mapSix/seaPlatform.png'
    );
    this.load.image(
      'platformSixTwo',
      'assets/img/platform/mapSix/seaPlatformTwo.png'
    );
    this.load.image('consoll', 'assets/img/gameItems/consollSmall.png');
    this.load.image('star', 'assets/img/gameItems/star.png');
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
    this.load.spritesheet(
      'playerSwimming',
      'assets/img/gameItems/playerSwimming.png',
      {
        frameWidth: 48,
        frameHeight: 32
      }
    );
    this.score = 0;
  }

  hitStar(playerSwimming) {
    this.physics.pause();

    playerSwimming.setTint(0xff0000);

    playerSwimming.anims.play('swimTurn');

    this.gameOver = true;

    this.retryButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Retry',
      'GameMapSix'
    );
    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.gameMapSixSceneGrid.placeAtIndex(36.8, this.gameOverText);
    this.gameMapSixSceneGrid.placeAtIndex(60, this.retryButton);
    this.score = 0;
  }

  goalReached(playerSwimming) {
    this.physics.pause();

    playerSwimming.anims.play('swimTurn');

    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you managed the level Last level',
      {
        fontSize: '28px',
        fill: '#000'
      }
    );

    this.gameMapSixSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapSixSceneGrid.placeAtIndex(60, this.quitButton);
  }

  collectConsoll(playerSwimming, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    scoreText.setText('Score: ' + this.score);

    if (this.score == 500) {
      this.goal.create(100, 70, 'goal');
    }

    if (consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      if (this.score < 500) {
        consolls.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }

      var x =
        playerSwimming.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var star = stars.create(x, 16, 'star');
      star.setBounce(1);
      star.setCollideWorldBounds(true);
      star.setVelocity(Phaser.Math.Between(-200, 200), 20);
      star.allowGravity = false;
    }
  }

  create() {
    this.gameMapSixSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'backgroundSix');

    platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'platformSix')
      .setScale(2)
      .refreshBody();

    platforms.create(600, 400, 'platformSixTwo');
    platforms.create(50, 250, 'platformSixTwo');
    platforms.create(750, 220, 'platformSixTwo');
    platforms.create(60, 420, 'platformSixTwo');
    platforms.create(100, 420, 'platformSixTwo');
    platforms.create(60, 420, 'platformSixTwo');
    platforms.create(300, 120, 'platformSixTwo');

    playerSwimming = this.physics.add.sprite(100, 450, 'playerSwimming');

    playerSwimming.setBounce(0.5);
    playerSwimming.setCollideWorldBounds(true);

    playerSwimming.setBounce(0.2);
    playerSwimming.setCollideWorldBounds(true);

    this.anims.create({
      key: 'swimLeft',
      frames: this.anims.generateFrameNumbers('playerSwimming', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'swimTurn',
      frames: [{ key: 'playerSwimming', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'swimRight',
      frames: this.anims.generateFrameNumbers('playerSwimming', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    consolls = this.physics.add.group({
      key: 'consoll',
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 86 }
    });

    consolls.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    stars = this.physics.add.group();
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

    this.gameMapSixSceneGrid.placeAtIndex(10, this.quitButton);

    this.physics.add.collider(playerSwimming, platforms);
    this.physics.add.collider(consolls, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(
      playerSwimming,
      consolls,
      this.collectConsoll,
      null,
      this
    );
    this.physics.add.collider(playerSwimming, stars, this.hitStar, null, this);
    this.physics.add.overlap(
      playerSwimming,
      this.goal,
      this.goalReached,
      null,
      this
    );
  }

  update() {
    if (cursors.left.isDown) {
      playerSwimming.setVelocityX(-160);

      playerSwimming.anims.play('swimLeft', true);
    } else if (cursors.right.isDown) {
      playerSwimming.setVelocityX(160);

      playerSwimming.anims.play('swimRight', true);
    } else {
      playerSwimming.setVelocityX(0);

      playerSwimming.anims.play('swimTurn');
    }

    if (cursors.up.isDown) {
      playerSwimming.setVelocityY(-150);
    } else if (cursors.down.isDown) {
      playerSwimming.setVelocityY(100);
    }
  }
}
