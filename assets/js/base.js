var pauseButton = document.querySelector('.music-player__footer-pause')
var music = document.querySelector('audio')

document.onkeydown = (e) => {
    if (e.code == 'Space') {
        e.preventDefault()
        playMusic()
    }
}

pauseButton.onclick = () => {
    playMusic()
}

music.onended = () => {
    music.pause()
    pauseButton.classList.replace('fa-pause', 'fa-play')
}


function playMusic() {
    

    if (music.paused) {
        music.play()
        pauseButton.classList.replace('fa-play', 'fa-pause')
    } else {
        music.pause()
        pauseButton.classList.replace('fa-pause', 'fa-play')
    }

}

