import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//This is the assets used on this specific map and not reused any other place
import SnowPlatformImg from '../../assets/img/platform/snowMapFive/snowGround.png';
import SmallGroundImg from '../../assets/img/platform/snowMapFive/snowSmallGround.png';
import MiniGroundImg from '../../assets/img/platform/snowMapFive/snowMiniGround.png';
import WinterCabinImg from '../../assets/img/platform/snowMapFive/hytteMap5.png';
import SnoballObsticalImg from '../../assets/img/gameItems/snoball.png';

export default class GameMapFiveScene extends Phaser.Scene {
  constructor() {
    super('GameMapFive');
    //Creating an overview over all the elements we are going to create, we could use varaibles, but in this case we are just using this.{element}
    // This is done just to know what elements are custom made. It might have been a better solution to just use variables as phaser uses "this" to add functions ect
    this.player;

    this.score;

    this.consolls;
    this.snowballs;
    this.goal;
    this.goalSpawn;

    this.platforms;
    this.cursors;

    this.scoreText;
    this.gameOverText;
    this.goToNextLevelText;

    this.retryButton;
    this.quitButton;
    this.goToNextLevelButton;
  }

  preload() {
    //We load different assets that are used on this specific map
    this.load.image('snowPlatform', SnowPlatformImg);
    this.load.image('smallGround', SmallGroundImg);
    this.load.image('miniGround', MiniGroundImg);
    this.load.image('winterCabin', WinterCabinImg);
    this.load.image('snoball', SnoballObsticalImg);

    //In case the score has not been resetted we do it here
    this.score = 0;
  }

  //This is a function for what is going to happen if player collide with the obsitacl
  hitSnowball(player) {
    this.physics.pause();

    player.setTint(0xff0000);

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

  //This is a function for what is going to happen when the user reaches the portal after getting 500 in score
  goalReached(player) {
    this.physics.pause();

    this.goToNextLevelButton = new Button(
      this,
      'nextLevelButton',
      'nextLevelButtonHover',
      'Next Level',
      'GameMapSix'
    );

    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you finished the level',
      {
        fontSize: '24px',
        fill: '#000'
      }
    );

    this.gameMapFiveSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapFiveSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
  }

  //Logic for collecting the consoles
  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    //The portal appears when the score is 500
    if (this.score >= 500) {
      this.goal.create(500, 150, 'goal');
    }

    if (this.consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      if (this.score < 500) {
        this.consolls.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }
      //Having the position of the player so the obstical don't spawn right at him
      let positionX =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      //Creating the obsticals and adding some features for them
      let snowball = this.snowballs.create(positionX, 16, 'snoball');
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

    //creating a group of platform that are static
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 600, 'snowPlatform')
      .setScale(3)
      .refreshBody();

    this.platforms.create(600, 400, 'smallGround');
    this.platforms.create(50, 250, 'smallGround');
    this.platforms.create(170, 70, 'miniGround');
    this.platforms.create(450, 270, 'miniGround');
    this.platforms.create(95, 447.5, 'winterCabin');

    //Adding the player and adding some feature to him
    this.player = this.physics.add.sprite(100, 450, 'player');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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
    this.snowballs = this.physics.add.group();
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
    this.gameMapFiveSceneGrid.placeAtIndex(10, this.quitButton);

    //Adding animations when moving the user
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

    //adding the keyboard cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //adding the logic for coliding between items and wich items are going to overlap each other
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.consolls, this.platforms);
    this.physics.add.collider(this.snowballs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.snowballs,
      this.hitSnowball,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.consolls,
      this.collectConsoll,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.goal,
      this.goalReached,
      null,
      this
    );
  }

  update() {
    //logic for the keyboard cursors
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }
  }
}
