import 'phaser';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//This is the options/settins scene of the game. Here you can set more options if needed.
export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    //Make a grid using the AlignGrid object that's under the object/alignGrid.js file
    this.optionsScreneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 9
    });

    //Adding an background for this scene, wich is the options menu
    this.add.image(400, 300, 'menuBackground');

    //Getting the global variables for the options
    this.model = this.sys.game.globals.model;

    //Adding the different buttons/texts. We could use the optionsSceneGrid to place the different items
    //But in this case we don't do it since it can be a bit challenging to placing stuff relativ to others
    //As thy variey in sizes.
    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(270, 300, 'checkedBox');
    this.musicText = this.add.text(320, 290, 'Music Enabled', { fontSize: 24 });

    //Setting the musicButton to be interactive
    this.musicButton.setInteractive();

    //When the music button is clicked we change the state of music.
    this.musicButton.on(
      'pointerdown',
      function() {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    //Adding a button to get back to the menu
    this.menuButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Menu',
      'Title'
    );
    //Placing the button using the oprionsSceneGrid
    this.optionsScreneGrid.placeAtIndex(67, this.menuButton);

    //Using the function to set on or of the music based on the state of the global value
    this.updateAudio();
  }

  //Update audi updates the audio based on the value of the global values.
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
