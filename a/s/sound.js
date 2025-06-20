function sound(path, vol = 1, loop = false) {
    var audio = new Audio(path);
    audio.loop = loop;
    audio.volume = vol;
    audio.play();
}

var volume = document.querySelectorAll("[data-volume]");
volume.forEach(function (el) {
    el.volume = el.getAttribute("data-volume");
});

// for every hover over link or button play a sound
var hover = document.querySelectorAll("[href], button");
hover.forEach(function (el) {
    var cooldown = false;
    el.addEventListener("mouseover", function () {
        if (!cooldown) {
            sound("/a/a/hover.ogg", 0.5);
            cooldown = true;
            setTimeout(function () {
                cooldown = false;
            }, 1000); // 1 second cooldown
        }
    });
});