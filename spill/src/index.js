import 'phaser';
import config from './config/config';
import GameMapOneScene from './scenes/gameMapOneScene';
import GameMapTwoScene from './scenes/gameMapTwoScene';
import GameMapThreeScene from './scenes/gameMapThreeScene';
import GameMapFourScene from './scenes/gameMapFourScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import LevelSelectScene from './scenes/levelSelectScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import Model from './model';

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
    this.scene.start('Boot');
  }
}

window.game = new Game();
