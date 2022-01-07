var music = document.querySelector('audio')
var musicDuration

function processPlayButtonAndEndMusic() {
    var pauseButton = document.querySelector('.music-player__footer-pause')
    var music = document.querySelector('audio')
    var musicPlayerTabHead = document.querySelector('.music-player__tab-head')
    var musicPlayerTabHeadAfter = document.querySelector('.music-player__tab-head-after')

    var musicPlayerTabHeadWidth
    var musicPlayerTabHeadAfterPosition
    musicPlayerTabHeadWidth = musicPlayerTabHeadAfterPosition = musicPlayerTabHead.offsetWidth 
   
    var widthOf1s = document.querySelector('.music-player__tab').offsetWidth / Math.round(musicDuration)
 
    // When user put space, music will stop
    document.onkeydown = (e) => {
        if (e.code == 'Space') {
            e.preventDefault()
            playMusic(music, pauseButton)
        }
    }

    // When user touch music button, music will stop
    pauseButton.onclick = () => {
        playMusic(music, pauseButton)
        // var tabRunning = setInterval(() => {
        //     musicPlayerTabHeadWidth += widthOf1s
        //     musicPlayerTabHeadAfterPosition += widthOf1s
            
        //     musicPlayerTabHead.style.width = musicPlayerTabHeadWidth + 'px'
        //     musicPlayerTabHeadAfter.style.left = musicPlayerTabHeadAfterPosition + 'px'
            
        // }, 2000)
    }

    // Process when music ended
    music.onended = () => {
        music.pause()
        pauseButton.classList.replace('fa-pause', 'fa-play')
    }

    

    // processTabRunning(music)

}

// function processTabRunning(music, widthOf1s) {
    
// }


function playMusic(music, pauseButton) {
    if (music.paused) {
        music.play()
        pauseButton.classList.replace('fa-play', 'fa-pause')
    } else {
        music.pause()
        pauseButton.classList.replace('fa-pause', 'fa-play')
    }

}

music.addEventListener('loadedmetadata', function() {
    musicDuration = this.duration
    processPlayButtonAndEndMusic()
})

