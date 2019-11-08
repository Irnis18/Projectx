import 'phaser';
import config from '../config/config';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';
export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelect');
  }

  create() {
    //Make a grid using the AlignGrid object that's under the object/alignGrid.js file
    this.levelSelectSceneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 17
    });

    //Adding an background for this scene, wich is the level select on the menu
    this.add.image(400, 300, 'menuBackground');

    // Button to Map one
    this.gameMapOneButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 1',
      'GameMapOne'
    );
    //Placing the button to map one in the grid
    this.levelSelectSceneGrid.placeAtIndex(22, this.gameMapOneButton);

    // Button to Map Two
    this.gameMapTwoButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 2',
      'GameMapTwo'
    );
    //Placing the button to map two in the grid
    this.levelSelectSceneGrid.placeAtIndex(40, this.gameMapTwoButton);

    // Button to Map Three
    this.gameMapThreeButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 3',
      'GameMapThree'
    );
    //Placing the button to map Three in the grid
    this.levelSelectSceneGrid.placeAtIndex(58, this.gameMapThreeButton);

    // Button to Map Four
    this.gameMapFourButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 4',
      'GameMapFour'
    );
    //Placing the button to map Four in the grid
    this.levelSelectSceneGrid.placeAtIndex(76, this.gameMapFourButton);

    // Button to Map Five
    this.gameMapFiveButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 5',
      'GameMapFive'
    );
    //Placing the button to map Five in the grid
    this.levelSelectSceneGrid.placeAtIndex(94, this.gameMapFiveButton);

    // Button to Map Six
    this.gameMapSixButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Map 6',
      'GameMapSix'
    );
    //Placing the button to map Six in the grid
    this.levelSelectSceneGrid.placeAtIndex(112, this.gameMapSixButton);

    // Button to Map High Score
    this.gameMapHighScoreButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'High Score Map',
      'GameMapHighScore'
    );
    //Placing the button to map High score in the grid
    this.levelSelectSceneGrid.placeAtIndex(130, this.gameMapHighScoreButton);

    // Button to return to home
    this.returnHomeButton = new Button(
      this,
      'backButton',
      'backButtonHover',
      'Back',
      'Title'
    );
    //Placing the button to return to home in the grid
    this.levelSelectSceneGrid.placeAtIndex(10, this.returnHomeButton);

    // This is to determin if the music should be on or off based on the settings that is set in the optionsScene. Basically using a global variable to determin if the music is playing or not playing
    // Then it plays the music or don't based on the condition
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
