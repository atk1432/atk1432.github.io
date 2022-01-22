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

var currentTime, audioDuration, indexRandom;
var isRandom = false, isRepeat = false
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
        this.randomSong()  // Random song function
        this.repeatSong()  // Repeat song function
        this.musicVolume()  // Change volume of music
    },
    convertMMSS: function(seconds) {
        if (seconds < 3600) {
            var minutes = Math.round((Math.round(seconds) / 60) * 100) / 100
            var minuteNumber = Math.floor(minutes)
            var secNum = Math.round((minutes - minuteNumber) * 100) / 100; 
            secNum = Math.round(secNum * 60)
            var clock = [minuteNumber, secNum]
            clock.forEach((e, i) => {
                if (e < 10) {
                    clock[i] = '0' + clock[i]
                }
            })
            var result = clock[0] + ':' + clock[1]

            return result
        } else {
            var hours = Math.floor(seconds / 3600) 
            var minutes = Math.floor(seconds / 60) - hours * 60
            var sec_num = seconds - (hours * 3600 + minutes * 60) 
            var clock = [hours, minutes, sec_num]
            clock.forEach((e, i) => {
                if (e < 10) {
                    clock[i] = '0' + clock[i]
                }
            })
            return clock.join(':')
        }
    },
    // get a song
    getSong: function(song) {
        var songHeader = $('.music-player__header-text')
        var songImg = $('.music-player__body-cd')
        var dTime = $('.music-player-t__duration')
        var songList = $$('.song')

        // Load source of music
        audio.children[0].src = song.songUrl
        audio.load();

        songList.forEach((e) => {
            e.classList.remove('song-active')
        })
        songList[song.id - 1].classList.add('song-active')
        // songList[song.id -1].scrollIntoView({block: 'center'})

        audio.onloadedmetadata = function() {
            dTime.textContent = app.convertMMSS(audio.duration)
            // dTime.textContent = app.convertMMSS(4000)
        }

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
                // window.scrollTo(0, 0)
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
            if (isRandom) {
                app.changeRandomSong()
            } else {
                app.nextSong()
            }
            cdPlay.cancel()
        }
        backButton.onclick = function() {
            if (isRandom) {
                app.changeRandomSong()
            } else {
                app.backSong()
            }
            cdPlay.cancel()
        }
    },
    playSong: function() {
        var cTime = $('.music-player-t__current')

        pause.onclick = pause2.onclick = function() {
            processMusic()
        }

        audio.onended = function() {
            if (isRandom) {
                app.changeRandomSong()
            } else if (isRepeat) {
                app.getSong(app.songs[currentSong])
            } else {
                stop()
                app.nextSong()
            }
            cdPlay.cancel()
        }

        audio.ontimeupdate = function() {
            currentTime = Math.floor(this.currentTime / this.duration * 100)
            if (Number.isNaN(currentTime)) {
                currentTime = 0
            }
            cTime.textContent = app.convertMMSS(this.currentTime) || app.convertMMSS(0)
            musicTab.value = currentTime
            musicTab.style.backgroundSize = currentTime + '%'
        }    

        audio.onplay = function() {
            app.processChangeIcon(pause, 'fa-play', 'fa-pause')
            app.processChangeIcon(pause2, 'fa-play', 'fa-pause')
            nowPlaying.style.display = 'flex'
            cdPlay.play()
        }

        audio.onpause = function() {
            app.processChangeIcon(pause, 'fa-pause', 'fa-play')
            app.processChangeIcon(pause2, 'fa-pause', 'fa-play')
            nowPlaying.style.display = 'none'
            cdPlay.pause()
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
            audio.play()
        }

        function stop() {
            audio.pause()
        }
    },
    randomSong: function() {
        const randomButton = $$('.music-player__footer-icon')[3]

        randomButton.onclick = function() {
            if (this.classList.contains('red-color-text')) {
                this.classList.remove('red-color-text')
                isRandom = false
            } else {
                this.classList.add('red-color-text')
                isRandom = true
            }
        }
    },
    changeRandomSong: function() {
        do {    
            indexRandom = Math.round(Math.random() * (playlist.length - 1))
        } while (indexRandom == currentSong)
        
        this.getSong(this.songs[indexRandom])
        currentSong = indexRandom
    },
    repeatSong: function() {
        const repeatButton = $$('.music-player__footer-icon')[0]

        repeatButton.onclick = function() {
            if (this.classList.contains('red-color-text')) {
                this.classList.remove('red-color-text')
                isRepeat = false
            } else {
                this.classList.add('red-color-text')
                isRepeat = true
            }
        }
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
    musicVolume: function() {
        const volume = $('.music-volume')
        const volumeWrap = $('.music-volume-wrap')

        volumeWrap.oninput = function(e) {
            volume.style.backgroundSize = volume.value + '%'
            // console.log(audio.volume)
            audio.volume = volume.value / 100
        }

        volumeWrap.ontouchmmove = function(e) {
            e.preventDefault()
        }
    },
    start: function() {
        this.render()  // Render html playlist
        this.handleEvents() // Handle events: play song, scroll, ... and lot of event listener 

        // Get song started
        this.getSong(this.songs[0])

    }
}


app.start() 

