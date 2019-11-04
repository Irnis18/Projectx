import 'phaser';
import config from '../config/config';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.titleSceneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 11
    });
    this.add.image(400, 300, 'menuBackground');

    // Game

    this.gameButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Play',
      'GameMapOne'
    );

    this.titleSceneGrid.placeAtIndex(22, this.gameButton);

    //Levels
    this.levelSelectButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Levels',
      'LevelSelect'
    );
    this.titleSceneGrid.placeAtIndex(40, this.levelSelectButton);

    // Options
    this.optionsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Options',
      'Options'
    );
    this.titleSceneGrid.placeAtIndex(58, this.optionsButton);

    // Credits
    this.creditsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Credits',
      'Credits'
    );
    this.titleSceneGrid.placeAtIndex(76, this.creditsButton);

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
