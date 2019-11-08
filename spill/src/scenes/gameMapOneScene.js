import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//This is the assets used on this specific map and not reused any other place
import BackgroundOneImg from '../../assets/img/maps/map1.png';
import MainPlatformAutumnImg from '../../assets/img/platform/mapOne/mainPlatformAutumn.png';
import PlatformAutumnOneImg from '../../assets/img/platform/mapOne/platformAutumnOne.png';
import PlatformAutumnTwoImg from '../../assets/img/platform/mapOne/platformAutumnTwo.png';
import FortImg from '../../assets/img/platform/mapOne/fort.png';
import GumballObsticalImg from '../../assets/img/gameItems/gumball.png';

export default class GameMapOneScene extends Phaser.Scene {
  constructor() {
    super('GameMapOne');
    //Creating an overview over all the elements we are going to create, we could use varaibles, but in this case we are just using this.{element}
    // This is done just to know what elements are custom made. It might have been a better solution to just use variables as phaser uses "this" to add functions ect
    this.player;

    this.score;

    this.consolls;
    this.gumballs;
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
    this.load.image('backgroundOne', BackgroundOneImg);
    this.load.image('mainPlatformAutumn', MainPlatformAutumnImg);
    this.load.image('platformAutumnOne', PlatformAutumnOneImg);
    this.load.image('platformAutumnTwo', PlatformAutumnTwoImg);
    this.load.image('fort', FortImg);
    this.load.image('gumball', GumballObsticalImg);

    //In case the score has not been resetted we do it here
    this.score = 0;
  }

  //This is a function for what is going to happen if player collide with the obsitacl
  hitGumball(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    this.gameOverText = this.add.text(-1, -1, 'Game Over', {
      fontSize: '32px',
      fill: '#000'
    });

    this.retryButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Retry',
      'GameMapOne'
    );

    this.gameMapOneSceneGrid.placeAtIndex(36.8, this.gameOverText);
    this.gameMapOneSceneGrid.placeAtIndex(60, this.retryButton);

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
      'GameMapTwo'
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

    this.gameMapOneSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapOneSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
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
      let gumball = this.gumballs.create(positionX, 16, 'gumball');
      gumball.setBounce(1);
      gumball.setCollideWorldBounds(true);
      gumball.setVelocity(Phaser.Math.Between(-200, 200), 20);
      gumball.allowGravity = false;
    }
  }

  create() {
    this.gameMapOneSceneGrid = new AlignGrid({
      scene: this,
      cols: 11,
      rows: 11
    });

    this.add.image(400, 300, 'backgroundOne');

    //creating a group of platform that are static
    this.platforms = this.physics.add.staticGroup();

    this.platforms
      .create(400, 568, 'mainPlatformAutumn')
      .setScale(1)
      .refreshBody();

    this.platforms.create(200, 205, 'platformAutumnOne');
    this.platforms.create(50, 250, 'platformAutumnOne');
    this.platforms.create(670, 220, 'platformAutumnTwo');
    this.platforms.create(610, 525, 'platformAutumnTwo');
    this.platforms.create(630, 500, 'platformAutumnOne');
    this.platforms.create(600, 500, 'platformAutumnOne');
    this.platforms.create(630, 490, 'platformAutumnOne');
    this.platforms.create(330, 310, 'platformAutumnOne');
    this.platforms.create(800, 430, 'fort');

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
    this.gumballs = this.physics.add.group();
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
    this.gameMapOneSceneGrid.placeAtIndex(10, this.quitButton);

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
    this.physics.add.collider(this.gumballs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.gumballs,
      this.hitGumball,
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
