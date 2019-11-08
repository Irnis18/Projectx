import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//This is the assets used on this specific map and not reused any other place
import BackgroundSixImg from '../../assets/img/maps/map6.png';
import PlatformSixImg from '../../assets/img/platform/mapSix/seaPlatform.png';
import PlatformSixTwoImg from '../../assets/img/platform/mapSix/seaPlatformTwo.png';
import StarObsticalImg from '../../assets/img/gameItems/star.png';
import PlayerSwimmingSpriteSheet from '../../assets/img/gameItems/playerSwimming.png';

export default class GameMapSixScene extends Phaser.Scene {
  constructor() {
    super('GameMapSix');
    //Creating an overview over all the elements we are going to create, we could use varaibles, but in this case we are just using this.{element}
    // This is done just to know what elements are custom made. It might have been a better solution to just use variables as phaser uses "this" to add functions ect
    this.playerSwimming;

    this.score;

    this.consolls;
    this.stars;
    this.goal;
    this.goalSpawn;

    this.platforms;
    this.cursors;

    this.scoreText;
    this.gameOverText;

    this.retryButton;
    this.quitButton;
  }

  preload() {
    //We load different assets that are used on this specific map
    this.load.image('backgroundSix', BackgroundSixImg);
    this.load.image('platformSix', PlatformSixImg);
    this.load.image('platformSixTwo', PlatformSixTwoImg);
    this.load.image('star', StarObsticalImg);
    this.load.spritesheet('playerSwimming', PlayerSwimmingSpriteSheet, {
      frameWidth: 48,
      frameHeight: 32
    });

    //In case the score has not been resetted we do it here
    this.score = 0;
  }

  //This is a function for what is going to happen if player collide with the obsitacl
  hitStar(playerSwimming) {
    this.physics.pause();

    playerSwimming.setTint(0xff0000);

    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.retryButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Retry',
      'GameMapSix'
    );

    this.gameMapSixSceneGrid.placeAtIndex(60, this.retryButton);
    this.gameMapSixSceneGrid.placeAtIndex(36.8, this.gameOverText);

    this.score = 0;
  }

  //This is a function for what is going to happen when the user reaches the portal after getting 500 in score
  goalReached(playerSwimming) {
    this.physics.pause();

    this.finishGameText = this.add.text(
      -1,
      -1,
      'Congrats you managed the last level',
      {
        fontSize: '28px',
        fill: '#000'
      }
    );

    this.finishGameButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Quit Game',
      'Title'
    );

    this.gameMapSixSceneGrid.placeAtIndex(33.5, this.finishGameText);
    this.gameMapSixSceneGrid.placeAtIndex(60, this.finishGameButton);
  }

  //Logic for collecting the consoles
  collectConsoll(playerSwimming, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    //The portal appears when the score is 500
    if (this.score == 500) {
      this.goal.create(100, 70, 'goal');
    }

    if (this.consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      if (this.score < 500) {
        consolls.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }

      //Having the position of the player so the obstical don't spawn right at him
      let positionX =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      //Creating the obsticals and adding some features for them
      let star = this.stars.create(positionX, 16, 'star');
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

    //creating a group of platform that are static
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, 'platformSix')
      .setScale(2)
      .refreshBody();

    this.platforms.create(600, 400, 'platformSixTwo');
    this.platforms.create(50, 250, 'platformSixTwo');
    this.platforms.create(750, 220, 'platformSixTwo');
    this.platforms.create(100, 420, 'platformSixTwo');
    this.platforms.create(300, 120, 'platformSixTwo');

    //Adding the player and adding some feature to him
    this.playerSwimming = this.physics.add.sprite(100, 450, 'playerSwimming');

    this.playerSwimming.setBounce(0.1);
    this.playerSwimming.setCollideWorldBounds(true);

    //Adding the consolls
    this.consolls = this.physics.add.group({
      key: 'consoll',
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 86 }
    });

    this.consolls.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //adding obsiticals and the goal, but not showing them
    this.starts = this.physics.add.group();
    this.goal = this.physics.add.staticGroup();

    //Adding the score text
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '24px',
      fill: '#000'
    });

    //Adding a button wich quits the game
    this.quitButton = new Button(
      this,
      'quitButton',
      'quitButtonHover',
      'Quit',
      'Title'
    );
    this.gameMapSixSceneGrid.placeAtIndex(10, this.quitButton);

    //Adding animations when moving the user
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

    //adding the keyboard cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //adding the logic for coliding between items and wich items are going to overlap each other
    this.physics.add.collider(this.playerSwimming, this.platforms);
    this.physics.add.collider(this.consolls, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.playerSwimming,
      this.consolls,
      this.collectConsoll,
      null,
      this
    );
    this.physics.add.collider(
      this.playerSwimming,
      this.stars,
      this.hitStar,
      null,
      this
    );
    this.physics.add.overlap(
      this.playerSwimming,
      this.goal,
      this.goalReached,
      null,
      this
    );
  }

  update() {
    //logic for the keyboard cursors
    if (this.cursors.left.isDown) {
      this.playerSwimming.setVelocityX(-160);

      this.playerSwimming.anims.play('swimLeft', true);
    } else if (this.cursors.right.isDown) {
      this.playerSwimming.setVelocityX(160);

      this.playerSwimming.anims.play('swimRight', true);
    } else {
      this.playerSwimming.setVelocityX(0);

      this.playerSwimming.anims.play('swimTurn');
    }

    if (this.cursors.up.isDown) {
      this.playerSwimming.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
      this.playerSwimming.setVelocityY(100);
    }
  }
}
