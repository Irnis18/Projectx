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
      rows: 11
    });

    // Game
    this.gameMapOneButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 1',
      'GameMapOne'
    );
    this.levelSelectSceneGrid.placeAtIndex(22, this.gameMapOneButton);

    //Levels
    this.gameMapTwoButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 2',
      'GameMapTwo'
    );
    this.levelSelectSceneGrid.placeAtIndex(40, this.gameMapTwoButton);

    // Options
    this.gameMapThreeButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 3',
      'GameMapThree'
    );
    this.levelSelectSceneGrid.placeAtIndex(58, this.gameMapThreeButton);

    // Credits
    this.gameMapFourButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 4',
      'GameMapFour'
    );
    this.levelSelectSceneGrid.placeAtIndex(76, this.gameMapFourButton);

    this.returnHomeButton = new Button(
      this,
      'menuButtonOne',
      'menuButtonTwo',
      'Menu',
      'Title'
    );
    this.levelSelectSceneGrid.placeAtIndex(1, this.returnHomeButton);

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
