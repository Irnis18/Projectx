import 'phaser';
import config from '../config/config';

//This is the credits scene for the people who developed the game.
export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    //Add the text Credit
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff'
    });
    //Add the text who it's created by
    this.madeByText = this.add.text(
      0,
      0,
      'Created By: Andrea, Christian, Irnis, Silje, Sivert',
      {
        fontSize: '26px',
        fill: '#fff'
      }
    );

    this.zone = this.add.zone(
      config.scale.width / 2,
      config.scale.height / 2,
      config.scale.width,
      config.scale.height
    );

    //aligning the text in the center
    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    //making the text roll upwards
    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2000,
      delay: 1000,
      onComplete: function() {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
      onComplete: function() {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
}
