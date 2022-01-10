// Movement of tab
var musicTab = document.querySelector('.music-player__tab')

musicTab.oninput = function() {
    this.style.backgroundSize = this.value + '%'
}

// Main
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('audio')
const pause = $('.music-player__footer-pause')
const pause2 = $('.music-footer__icon-pause')

const app = {
    songs: [
        {
            songUrl: './assets/music/Faded-AlanWalker-5919763.mp3',
            imgUrl: './assets/img/faded.jpeg',
            artist: 'Alan Walker',
            song: 'Faded' 
        },
        {
            songUrl: './assets/music/Alone - Alan Walker_ Noonie Bao.mp3',
            imgUrl: './assets/img/alone.jpg',
            artist: 'Alan Walker',
            song: 'Alone'
        },
        {
            songUrl: './assets/music/Alone - Marshmello.mp3',
            imgUrl: './assets/img/aloneM.jpg',
            artist: 'Marshmello',
            song: 'Alone'
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
    },
    getSong: function(song) {
        var songHeader = $('.music-player__header-text')
        var songImg = $('.music-player__body-cd')

        // Load source of music
        audio.children[0].src = song.songUrl
        audio.load();

        // Change the name and image of $('.music-player')
        songHeader.textContent = song.song
        songImg.src = song.imgUrl

        this.processChangeIcon(pause, 'fa-pause', 'fa-play')
        this.processChangeIcon(pause2, 'fa-pause', 'fa-play')
    },
    getCurrentSong: function() {
        var playlist = $('.all-songs').children
        
        for (var i = 0; i < playlist.length; i++) {
            playlist[i].onclick = function(e) {
                app.getSong(app.songs[Array.from(playlist).indexOf(this)])
                window.scrollTo(0, 0)
            }
        }
    },
    playSong: function() {
        pause.onclick = pause2.onclick = function() {
            // audio.play()
            processMusic()
        }

        audio.onended = function() {
            stop()
        }

        document.onkeydown = function(e) {
            if (e.code == 'Space') {
                e.preventDefault()
                processMusic()
            }
        }

        function processMusic() {
            if (audio.paused) {
                play()
            } else {
                stop()
            }
        }

        function play() {
            app.processChangeIcon(pause, 'fa-play', 'fa-pause')
            app.processChangeIcon(pause2, 'fa-play', 'fa-pause')
            audio.play()
        }

        function stop() {
            app.processChangeIcon(pause, 'fa-pause', 'fa-play')
            app.processChangeIcon(pause2, 'fa-pause', 'fa-play')
            audio.pause()
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

app.start()