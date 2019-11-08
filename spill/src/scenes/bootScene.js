import 'phaser';
import LogoImg from '../../assets/img/loading/logo.png';

//This is the bootscene just before the loadingbar appears
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    //Loads the logo image that is going to be used in the preloader.
    this.load.image('logo', LogoImg);
  }

  create() {
    this.scene.start('Preloader');
  }
}
