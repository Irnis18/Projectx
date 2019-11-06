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
      rows: 13
    });
    this.add.image(400, 300, 'menuBackground');

    // // Title text on the menu
    this.titleText = this.add.text(0, 0, 'The Adventure of Cassi', {
      fontSize: 32,
      color: 'black'
    });

    this.titleSceneGrid.placeAtIndex(10.55, this.titleText);

    // Game

    this.gameButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Play',
      'GameMapOne'
    );

    this.titleSceneGrid.placeAtIndex(40, this.gameButton);

    //Levels
    this.levelSelectButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Levels',
      'LevelSelect'
    );
    this.titleSceneGrid.placeAtIndex(58, this.levelSelectButton);

    // Options
    this.optionsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Options',
      'Options'
    );
    this.titleSceneGrid.placeAtIndex(76, this.optionsButton);

    // Credits
    this.creditsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Credits',
      'Credits'
    );
    this.titleSceneGrid.placeAtIndex(94, this.creditsButton);

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
