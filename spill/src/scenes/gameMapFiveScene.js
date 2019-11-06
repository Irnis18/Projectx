import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//Variables for different elements in the game:
let player;
let consolls;
let snowballs;
let platforms;
let cursors;
let scoreText;

//Phaser game standards:
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
    this.load.image(
      'winterCabin',
      'assets/img/platform/snowMapFive/hytteMap5.png'
    ); //Cabin platform
    this.load.image('consoll', 'assets/img/gameItems/consollSmall.png'); //Controller of value
    this.load.image('snoball', 'assets/img/gameItems/snoball.png'); // A snowball as obstical instead of a bomb
    this.load.image('goal', 'assets/img/gameItems/goal.png'); // Goal that appears when you have collectet enough points
    this.load.image('quitButton', 'assets/img/buttons/quitButton.png');
    this.load.image(
      'quitButtonHover',
      'assets/img/buttons/quitButtonHover.png'
    );
    //Button when clearing level and move to the next:
    this.load.image(
      'nextLevelButton',
      'assets/img/buttons/nextLevelButton.png'
    );

    this.load.image(
      'nextLevelButtonHover',
      'assets/img/buttons/nextLevelButtonHover.png'
    );
    //The player (Cassi), we use on our levels:
    this.load.spritesheet('player', 'assets/img/gameItems/player.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  //Function that loads stops game when you get hit by a snowball:
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

  //Function runs when you reach 500 points and can go to next level:
  goalReached(player) {
    this.physics.pause();

    player.anims.play('turn');

    this.goToNextLevelText = this.add.text(
      -1,
      -1,
      'Congrats you finished the level',
      {
        fontSize: '24px',
        fill: '#000'
      }
    );
    this.goToNextLevelButton = new Button(
      this,
      'nextLevelButton',
      'nextLevelButtonHover',
      'Next Level',
      'GameMapSix'
    );

    this.gameMapFiveSceneGrid.placeAtIndex(34.5, this.goToNextLevelText);
    this.gameMapFiveSceneGrid.placeAtIndex(60, this.goToNextLevelButton);
  }

  //Score update for each controller you collect (10pt. each), goal = 500 points:
  collectConsoll(player, consoll) {
    consoll.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    scoreText.setText('Score: ' + this.score);

    if (this.score >= 500) {
      this.goal.create(500, 150, 'goal');
    }

    if (consolls.countActive(true) === 0) {
      //  A new batch of consolls to collect
      if (this.score < 500) {
        consolls.children.iterate(function(child) {
          child.enableBody(true, child.x, 0, true, true);
        });
      }

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var snowball = snowballs.create(x, 16, 'snoball');
      snowball.setBounce(1);
      snowball.setCollideWorldBounds(true);
      snowball.setVelocity(Phaser.Math.Between(-200, 200), 20);
      snowball.allowGravity = false;
    }
  }

  //Grids for placing different elements in the game (x,y-scale)
  //The grid reference to the middle of the figure you are placing
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
    platforms.create(450, 270, 'miniGround');
    platforms.create(95, 447.5, 'winterCabin');

    //The players movement:
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

    //How the goals (the controller) load:
    cursors = this.input.keyboard.createCursorKeys();

    consolls = this.physics.add.group({
      key: 'consoll',
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 86 }
    });

    //The obsticals (snowball) movement:
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

  //More for player (Cassi) movement:
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
