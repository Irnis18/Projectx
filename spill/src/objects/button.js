import 'phaser';

//Simple button class that can be used in the game to switch between differente scene
export default class Button extends Phaser.GameObjects.Container {
  //It takes 5 parameters,
  //1. scene: wich is the current scene
  //2. button1: wich is what button img to use.
  //3. button1Hover: wich is what button img to use when hovering the button
  //4. text: the text that the button should contain
  //5. targetScene: The scene to go to when clicking the button
  constructor(scene, button1, button1Hover, text, targetScene) {
    super(scene);
    this.scene = scene;

    this.button = this.scene.add.sprite(0, 0, button1).setInteractive();

    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '24px',
      fill: '#fff'
    });

    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on(
      'pointerdown',
      function() {
        this.scene.scene.start(targetScene);
      }.bind(this)
    );

    this.button.on(
      'pointerover',
      function() {
        this.button.setTexture(button1Hover);
      }.bind(this)
    );

    this.button.on(
      'pointerout',
      function() {
        this.button.setTexture(button1);
      }.bind(this)
    );

    this.scene.add.existing(this);
  }
}
