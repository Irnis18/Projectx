import 'phaser';
import config from '../config/config';
import Button from '../objects/button';
import AlignGrid from '../objects/alignGrid';

//Importing assets --> this also helps the bundler and also is a nice way to see what's imported on the different scenes
import BackgroundOneImg from '../../assets/img/maps/map1.png';
import BackgroundTwoImg from '../../assets/img/maps/map2.png';
import BackgroundThreeImg from '../../assets/img/maps/map3.png';
import BackgroundFourImg from '../../assets/img/maps/map4.png';
import SnowBackgroundImg from '../../assets/img/maps/snowMap5.png';
import BackgroundSixImg from '../../assets/img/maps/map6.png';

import ConsollImg from '../../assets/img/gameItems/consollSmall.png';
import GoalImg from '../../assets/img/gameItems/goal.png';
import QuitButtonImg from '../../assets/img/buttons/quitButton.png';
import QuitButtonHoverImg from '../../assets/img/buttons/quitButtonHover.png';
import NextLevelButtonImg from '../../assets/img/buttons/nextLevelButton.png';
import NextLevelButtonHoverImg from '../../assets/img/buttons/nextLevelButtonHover.png';
import PlayerSpriteSheet from '../../assets/img/gameItems/player.png';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    //we load all the backgrounds that are used in the game just for smootly transition
    this.load.image('backgroundOne', BackgroundOneImg);
    this.load.image('backgroundTwo', BackgroundTwoImg);
    this.load.image('backgroundThree', BackgroundThreeImg);
    this.load.image('backgroundFour', BackgroundFourImg);
    this.load.image('snowBackground', SnowBackgroundImg);
    this.load.image('backgroundSix', BackgroundSixImg);
    //We preload commonly used images when we come to the title/options screen
    //in this case we do not need to load the items on the different maps. Simply load it once and never again.
    this.load.image('consoll', ConsollImg);
    this.load.image('goal', GoalImg);
    this.load.image('quitButton', QuitButtonImg);
    this.load.image('quitButtonHover', QuitButtonHoverImg);
    this.load.image('nextLevelButton', NextLevelButtonImg);
    this.load.image('nextLevelButtonHover', NextLevelButtonHoverImg);
    this.load.spritesheet('player', PlayerSpriteSheet, {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    //Make a grid using the AlignGrid object that's under the object/alignGrid.js file
    this.titleSceneGrid = new AlignGrid({
      scene: this,
      cols: 9,
      rows: 13
    });

    //Adding an background for this scene, wich is the menu
    this.add.image(400, 300, 'menuBackground');

    // Title text on the menu
    this.titleText = this.add.text(0, 0, 'The Adventure of Cassi', {
      fontSize: 32,
      color: 'black'
    });
    //placing the the title based on the grid we made.
    this.titleSceneGrid.placeAtIndex(10.55, this.titleText);

    // Game Button
    this.gameButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Play',
      'GameMapOne'
    );
    //placing the the gameButton based on the grid we made.
    this.titleSceneGrid.placeAtIndex(40, this.gameButton);

    //Levels Button
    this.levelSelectButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Levels',
      'LevelSelect'
    );
    //placing the the levelSelectButton based on the grid we made.
    this.titleSceneGrid.placeAtIndex(58, this.levelSelectButton);

    // Options Button
    this.optionsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Options',
      'Options'
    );
    //placing the the optionsButton based on the grid we made.
    this.titleSceneGrid.placeAtIndex(76, this.optionsButton);

    // Credits Button
    this.creditsButton = new Button(
      this,
      'menuButton',
      'menuButtonHover',
      'Credits',
      'Credits'
    );
    //placing the the optionsButton based on the grid we made.
    this.titleSceneGrid.placeAtIndex(94, this.creditsButton);

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
