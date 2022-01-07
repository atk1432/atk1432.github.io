var musicTab = document.querySelector('.music-player__tab')

musicTab.oninput = function() {
    this.style.backgroundSize = this.value + '%'
}