import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.optionsScreneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 9
    });

    this.add.image(400, 300, 'menuBackground');

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(270, 300, 'checkedBox');
    this.musicText = this.add.text(320, 290, 'Music Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();

    this.musicButton.on(
      'pointerdown',
      function() {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    this.menuButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Menu',
      'Title'
    );
    this.optionsScreneGrid.placeAtIndex(67, this.menuButton);

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
}
