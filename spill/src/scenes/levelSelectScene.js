import 'phaser';
import config from '../config/config';
import Button from '../objects/button';

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelect');
  }

  create() {
    // Game
    this.gameMapOneButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 110,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 1',
      'GameMapOne'
    );

    //Levels
    this.gameMapTwoButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 40,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 2',
      'GameMapTwo'
    );

    // Options
    this.gameMapThreeButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 40,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 3',
      'GameMapThree'
    );

    // Credits
    this.gameMapFourButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 110,
      'menuButtonOne',
      'menuButtonTwo',
      'Map 4',
      'GameMapFour'
    );

    this.gameMapFourButton = new Button(
      this,
      config.width / 5,
      config.height - 550,
      'menuButtonOne',
      'menuButtonTwo',
      'Menu',
      'Title'
    );

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
