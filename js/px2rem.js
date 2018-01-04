(function() {
    var html = document.documentElement
    var hWidth = html.getBoundingClientRect().width
    html.style.height = html.clientHeight + 'px'
    html.style.fontSize = hWidth / 30 + 'px'
})();
