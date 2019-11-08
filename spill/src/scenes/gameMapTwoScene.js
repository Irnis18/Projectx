import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//This is the assets used on this specific map and not reused any other place
import BackgroundTwoImg from '../../assets/img/maps/map2.png';
import PlatformTwoImg from '../../assets/img/platform/mapTwo/mainPlatform.png';
import PlatfromTwoGroundOne from '../../assets/img/platform/mapTwo/platformOne.png';
import PlatformTwoGroundTwo from '../../assets/img/platform/mapTwo/platformTwo.png';
import PlatfromTwoGroundThree from '../../assets/img/platform/mapTwo/platformThree.png';
import MeteoriteObsticalImg from '../../assets/img/gameItems/meteorite.png';

export default class GameMapTwoScene extends Phaser.Scene {
  constructor() {
    super('GameMapTwo');
    //Creating an overview over all the elements we are going to create, we could use varaibles, but in this case we are just using this.{element}
    // This is done just to know what elements are custom made. It might have been a better solution to just use variables as phaser uses "this" to add functions ect
    this.player;

    this.score;

    this.consolls;
    this.meteorites;
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
    this.load.image('backgroundTwo', BackgroundTwoImg);
    this.load.image('platformTwo', PlatformTwoImg);
    this.load.image('platformTwoGroundOne', PlatfromTwoGroundOne);
    this.load.image('platformTwoGroundTwo', PlatformTwoGroundTwo);
    this.load.image('platformTwoGroundThree', PlatfromTwoGroundThree);
    this.load.image('meteorite', MeteoriteObsticalImg);

    //In case the score has not been resetted we do it here
    this.score = 0;
  }

  //This is a function for what is going to happen if player collaid with the obsitacl
  hitMeteorite(player) {
    this.physics.pause();

    player.setTint(0xff0000);

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

  //This is a function for what is going to happen when the user reaches the portal after getting 500 in score
  goalReached(player) {
    this.physics.pause();

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

  //Logic for collecting the consoles
  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    //The portal appears when the score is 500
    if (this.score == 500) {
      this.goal.create(100, 70, 'goal');
    }

    if (this.consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect that bounce around
      if (this.score < 500) {
        this.consolls.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.allowGravity = false;
          child.setVelocity(Phaser.Math.Between(-50, 50), 10);
        });
      }

      let positionX =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let meteorite = this.meteorites.create(positionX, 16, 'meteorite');
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

    //creating a group of platform that are static
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, 'platformTwo')
      .setScale(2)
      .refreshBody();

    this.platforms.create(600, 440, 'platformTwoGroundOne');
    this.platforms.create(50, 250, 'platformTwoGroundOne');
    this.platforms.create(230, 170, 'platformTwoGroundThree');
    this.platforms.create(750, 200, 'platformTwoGroundTwo');
    this.platforms.create(180, 460, 'platformTwoGroundOne');
    this.platforms.create(330, 340, 'platformTwoGroundThree');
    this.platforms.create(480, 200, 'platformTwoGroundTwo');

    //Adding the player and adding some feature to him
    this.player = this.physics.add.sprite(50, 100, 'player');

    this.player.setBounce(0.1);
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
    this.meteorites = this.physics.add.group();
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
    this.gameMapTwoSceneGrid.placeAtIndex(10, this.quitButton);

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
    this.physics.add.collider(this.meteorites, this.platforms);
    this.physics.add.collider(
      this.player,
      this.meteorites,
      this.hitMeteorite,
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
      this.player.setVelocityY(-290);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }
  }
}
