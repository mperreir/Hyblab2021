class SoundManager {

  constructor() {
    this.sound = document.querySelector('#vagues_sound');
    this.sound.volume = 0.3;
    this.sound.loop = true;
    this.audio = document.querySelector('#audio_control');
    this.audio.addEventListener('click', this.stopSound);
    this.label = ' le son';
  }

  stopSound() {
    this.sound.pause();
    this.audio.classList = ['inactive'];
    this.audio.innerHTML = `Activer${this.label}`;
    this.audio.addEventListener('click', this.playsound);
  }

  playSound() {
    this.sound.play();
    this.audio.classList = ['active'];
    this.audio.innerHTML = `Couper${this.label}`;
    this.audio.addEventListener('click', this.stopSound);
  }
}
