import 'phaser';

//We load allt the assets that are going to be used in the menu.
import MenuButtonImg from '../../assets/img/buttons/menuButton.png';
import MenuButtonHoverImg from '../../assets/img/buttons/menuButtonHover.png';
import BackButtonImg from '../../assets/img/buttons/backButton.png';
import BackButtonHoverImg from '../../assets/img/buttons/backButtonHover.png';
import BoxNotCheckedImg from '../../assets/img/buttons/boxNotChecked.png';
import BoxCheckedImg from '../../assets/img/buttons/boxChecked.png';
import MenuBackgroundImg from '../../assets/img/loading/menuBackground.png';
import BgMusic from '../../assets/music/backgroundMusic.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      'complete',
      function() {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('menuButton', MenuButtonImg);
    this.load.image('menuButtonHover', MenuButtonHoverImg);
    this.load.image('backButton', BackButtonImg);
    this.load.image('backButtonHover', BackButtonHoverImg);
    this.load.image('box', BoxNotCheckedImg);
    this.load.image('checkedBox', BoxCheckedImg);
    this.load.image('menuBackground', MenuBackgroundImg);
    this.load.audio('bgMusic', BgMusic);
  }

  ready() {
    this.scene.start('Title');
  }
}
