var pauseButton = document.querySelector('.music-player__footer-pause')
var music = document.querySelector('audio')

var musicPlaying = false

pauseButton.onclick = () => {
    if (!musicPlaying) {
        music.play()
        musicPlaying = true
        pauseButton.classList.replace('fa-play', 'fa-pause')
    } else {
        music.pause()
        musicPlaying = false
        pauseButton.classList[1] = 'fa-play'
        pauseButton.classList.replace('fa-pause', 'fa-play')
    }
}

function rotateCD() {
    var cd = document.querySelector('.music-player__body-cd')

    
}

