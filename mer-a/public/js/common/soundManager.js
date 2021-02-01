class SoundManager {

  constructor() {
    this.sound = document.querySelector('#vagues_sound');
    this.sound.volume = 0.2;
    this.sound.loop = true;
    this.audio = document.querySelector('#audio_control');
    this.audio.addEventListener('click', () => {
      this.gererSound();
    });
  }

  startSound() {
    this.audio.style.display = 'block';
    if(router.soundStop === false) {
      const sound = document.querySelector('#vagues_sound');
      const audio = document.querySelector('#audio_control');
      sound.play();
      audio.classList = ['active'];
      audio.innerHTML = 'Couper le son';
    }
  }

  gererSound() {
    router.soundStop = !router.soundStop;
    router.saveSound();
    const sound = document.querySelector('#vagues_sound');
    const audio = document.querySelector('#audio_control');

    (router.soundStop) ? sound.pause() : sound.play();
    audio.classList = (router.soundStop) ? ['inactive'] : ['active'];
    audio.innerHTML = (router.soundStop) ? 'Activer le son' : 'Couper le son';
  }
}
