import 'phaser';
import config from './config/config';
import GameMapOneScene from './scenes/gameMapOneScene';
import GameMapTwoScene from './scenes/gameMapTwoScene';
import GameMapThreeScene from './scenes/gameMapThreeScene';
import GameMapFourScene from './scenes/gameMapFourScene';
import GameMapFiveScene from './scenes/gameMapFiveScene';
import GameMapSixScene from './scenes/gameMapSixScene';
import GameMapHighScoreScene from './scenes/gameMapHighScoreScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import LevelSelectScene from './scenes/levelSelectScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import Model from './model';
import '../assets/css/spill.css';

//This is where we add all thogheter so they know of each other
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('LevelSelect', LevelSelectScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('GameMapOne', GameMapOneScene);
    this.scene.add('GameMapTwo', GameMapTwoScene);
    this.scene.add('GameMapThree', GameMapThreeScene);
    this.scene.add('GameMapFour', GameMapFourScene);
    this.scene.add('GameMapFive', GameMapFiveScene);
    this.scene.add('GameMapSix', GameMapSixScene);
    this.scene.add('GameMapHighScore', GameMapHighScoreScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
