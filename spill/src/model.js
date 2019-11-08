//gloabl variables that is used to determin if the music is:
//1. is the music on?
//2. is the musing playing?
//So there are two variables to avoid the song to start playing multiple times
export default class Model {
  constructor() {
    this._musicOn = true;
    this._bgMusicPlaying = false;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}
