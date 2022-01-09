// Movement of tab
var musicTab = document.querySelector('.music-player__tab')

musicTab.oninput = function() {
    this.style.backgroundSize = this.value + '%'
}

// Main
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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
    },
    start: function() {
        this.render()
        this.handleEvents()
    }
}

app.start()