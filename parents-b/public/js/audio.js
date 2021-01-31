var isSonOn = Boolean(true);

function muteAll(){
    document.getElementById('adresse_audio').pause();
    document.getElementById('adresse_audio').currentTime = 0;
    document.getElementById('hour_audio').pause();
    document.getElementById('hour_audio').currentTime = 0;
    document.getElementById('age_audio').pause();
    document.getElementById('age_audio').currentTime = 0;
    document.getElementById('access_audio').pause();
    document.getElementById('access_audio').currentTime = 0;
    document.getElementById('fauna_audio').pause();
    document.getElementById('fauna_audio').currentTime = 0;
    document.getElementById('activities_audio').pause();
    document.getElementById('activities_audio').currentTime = 0;
    document.getElementById('result1_audio').pause();
    document.getElementById('result1_audio').currentTime = 0;
    document.getElementById('result2_audio').pause();
    document.getElementById('result2_audio').currentTime = 0;
}