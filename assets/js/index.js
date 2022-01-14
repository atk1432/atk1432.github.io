// Main
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('audio')
const pause = $('.music-player__footer-pause')
const pause2 = $('.music-footer__icon-pause')
const cd = $('.music-player__body-cd')
const playlist = $('.all-songs').children   
const nowPlaying = $('.now-playing')
const musicTab = $('.music-player__tab')

var currentTime, audioDuration;
var cdPlay, currentSong = 0



cdPlay = cd.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 20000,
    iterations: Infinity
})
cdPlay.pause()


const app = {
    songs: [
        {
            songUrl: './assets/music/Faded-AlanWalker-5919763.mp3',
            imgUrl: './assets/img/faded.jpeg',
            artist: 'Alan Walker',
            song: 'Faded',
            id: 1
        },
        {
            songUrl: './assets/music/Alone - Alan Walker_ Noonie Bao.mp3',
            imgUrl: './assets/img/alone.jpg',
            artist: 'Alan Walker',
            song: 'Alone',
            id: 2
        },
        {
            songUrl: './assets/music/Alone - Marshmello.mp3',
            imgUrl: './assets/img/aloneM.jpg',
            artist: 'Marshmello',
            song: 'Alone',
            id: 3
        },
        {
            songUrl: './assets/music/Silence-MarshmelloKhalid-5170091.mp3',
            imgUrl: './assets/img/slience.jpg',
            artist: 'Marshmello',
            song: 'Silence',
            id: 4
        }
    ],
    render: function() {
        var htmls = this.songs.map((song) => {
            return `
                <div class="song space-between align-item">
                    <img src="${song.imgUrl}" alt="" class="song__img">
                    <div class="song__body">
                        <h5 class="song__body-header">${song.song}</h5>
                        <span class="song__body-artist">${song.artist}</span>
                    </div>
                    <i class="fas fa-ellipsis-h icon-hover song__info"></i>
                </div>
            `
        })   
        $('.all-songs').innerHTML = htmls.join('')
    },
    handleEvents: function() {
        var cd = $('.music-player__body-cd')
        var cdSize = cd.offsetWidth   
        var scroll, cdScroll

        // When user scroll down ...
        document.onscroll = function(e) {
            scroll = document.documentElement.scrollTop
            if (cdSize - scroll <= 0) {
                cdScroll = 0
            } else {
                cdScroll = cdSize - scroll
            }
            cd.style.width = cdScroll + 'px'
            cd.style.height = cdScroll + 'px'
            cd.style.opacity = cdScroll / cdSize
        }

        // There are different event listeners:
        this.getCurrentSong() // Get song when user click a song
        this.playSong() // Play song when user click button
        this.changeNextSong() // Change a song when user touch button next or back
        // this.rewindSong()
    },
    // get a song
    getSong: function(song) {
        var songHeader = $('.music-player__header-text')
        var songImg = $('.music-player__body-cd')

        // Load source of music
        audio.children[0].src = song.songUrl
        audio.load();

        // Change the name and image of $('.music-player')
        songHeader.textContent = song.song + ' - ' + song.artist
        songImg.src = song.imgUrl

        this.processChangeIcon(pause, 'fa-pause', 'fa-play')
        this.processChangeIcon(pause2, 'fa-pause', 'fa-play')
        
        
    },
    // getCurrentSong will listen onclick a song, then get song
    getCurrentSong: function() {
        for (var i = 0; i < playlist.length; i++) {
            playlist[i].onclick = function(e) {
                currentSong = Array.from(playlist).indexOf(this)
                app.getSong(app.songs[currentSong])
                window.scrollTo(0, 0)
                cdPlay.cancel()
            }
        }

    },
    nextSong: function() {
        if (currentSong + 1 >= playlist.length) {
            currentSong = 0
        } else {
            currentSong += 1
        }
        this.getSong(this.songs[currentSong])
    
    },
    backSong: function() {
        if (currentSong - 1 < 0) {
            currentSong = playlist.length - 1
        } else {
            currentSong -= 1
        }
        this.getSong(this.songs[currentSong])
    },
    changeNextSong: function() {
        const backButton = $$('.music-player__footer-icon')[1]
        const nextButton = $$('.music-player__footer-icon')[2]

        nextButton.onclick = function() {
            app.nextSong()
            cdPlay.cancel()
        }
        backButton.onclick = function() {
            app.backSong()
            cdPlay.cancel()
        }
    },
    playSong: function() {
        // cd.pause()

        pause.onclick = pause2.onclick = function() {
            processMusic()
        }

        audio.onended = function() {
            stop()
            app.nextSong()
            cdPlay.cancel()
        }

        audio.ontimeupdate = function() {
            currentTime = Math.floor(this.currentTime / this.duration * 100)
            if (Number.isNaN(currentTime)) {
                currentTime = 0
            }
            musicTab.value = currentTime
            musicTab.style.backgroundSize = currentTime + '%'
        }    

        musicTab.oninput = function() {
            audioDuration = audio.duration
            if (!audioDuration) {
                musicTab.value = 0
                return
            }
            audio.currentTime = this.value / 100 * audioDuration
        }

        // Process button on keyboard
        document.onkeydown = function(e) {
            if (e.code == 'Space') {
                e.preventDefault()
                processMusic()
            } else {
                app.keyboardControl(e.code)
            }
        }

        function processMusic() {
            if (audio.paused) {
                play()
                cdPlay.play()
            } else {
                stop()
                cdPlay.pause()
            }
        }

        function play() {
            app.processChangeIcon(pause, 'fa-play', 'fa-pause')
            app.processChangeIcon(pause2, 'fa-play', 'fa-pause')
            nowPlaying.style.display = 'flex'
            audio.play()
        }

        function stop() {
            app.processChangeIcon(pause, 'fa-pause', 'fa-play')
            app.processChangeIcon(pause2, 'fa-pause', 'fa-play')
            nowPlaying.style.display = 'none'
            audio.pause()
        }
    },
    randomSong: function() {
        const randomButton = $$('.music-player__footer-icon')[3]

        console.log(randomButton)
    },
    keyboardControl: function(key) {
        if (key == 'ArrowLeft') {
            // console.log(key)
            audio.currentTime -= 5
        } else if (key == 'ArrowRight') {
            audio.currentTime += 5
            // console.log(currentTime)
        }
    },
    processChangeIcon: function(element, remove, add) {
        element.classList.remove(remove)
        element.classList.add(add)
    },
    start: function() {
        this.render()  // Render html playlist
        this.handleEvents() // Handle events: play song, scroll, ... and lot of event listener 

        // Get song started
        this.getSong(this.songs[0])
    }
}

// audio.onloadedmetadata = function() {
//     console.log('sdfdsf')
// }
app.start() 

