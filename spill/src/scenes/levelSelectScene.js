import 'phaser';
import config from '../config/config';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';
export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelect');
  }

  create() {
    this.levelSelectSceneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 15
    });

    this.add.image(400, 300, 'menuBackground');

    // Map one
    this.gameMapOneButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 1',
      'GameMapOne'
    );
    this.levelSelectSceneGrid.placeAtIndex(22, this.gameMapOneButton);

    // Map Two
    this.gameMapTwoButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 2',
      'GameMapTwo'
    );
    this.levelSelectSceneGrid.placeAtIndex(40, this.gameMapTwoButton);

    // Map Three
    this.gameMapThreeButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 3',
      'GameMapThree'
    );
    this.levelSelectSceneGrid.placeAtIndex(58, this.gameMapThreeButton);

    // Map Four
    this.gameMapFourButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 4',
      'GameMapFour'
    );
    this.levelSelectSceneGrid.placeAtIndex(76, this.gameMapFourButton);

    // Map Five
    this.gameMapFiveButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 5',
      'GameMapFive'
    );
    this.levelSelectSceneGrid.placeAtIndex(94, this.gameMapFiveButton);

    this.gameMapHighScoreButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'High Score Map',
      'GameMapHighScore'
    );
    this.levelSelectSceneGrid.placeAtIndex(112, this.gameMapHighScoreButton);

    // this.gameMapHighScoreButton = new Button(
    //   'menuButton',
    //   'menuButtonHover',
    //   'Map High Score',
    //   'GameMapHighScore'
    // );
    // this.levelSelectSceneGrid.placeAtIndex(94, this.gameMapHighScoreButton);
    // Back to menu button
    this.returnHomeButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Back',
      'Title'
    );
    this.levelSelectSceneGrid.placeAtIndex(10, this.returnHomeButton);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
