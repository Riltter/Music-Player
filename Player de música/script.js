const player = document.querySelector("#player");
const musicName = document.querySelector("#music_name");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const duration = document.querySelector("#duration");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

import songs from "./songs.js";

const textButtonPlay = "<i class='fa-solid fa-play'></i>";
const textButtonPause = "<i class='fa-solid fa-pause'></i>";

let index = 0;

prevButton.onclick = () => prevNextMusic("prev")
nextButton.onclick = () => prevNextMusic("")

playPauseButton.onclick = () => playPause();

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n<10 ? "0" + n : n);

const prevNextMusic = (type = "next") => {
    if ((type == "next" && index + 2 == songs.length) || type === "init") {
        index = 0; 
    }  else if (type == "prev" && index === 0) {
        index = songs.length - 1;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    console.log("Index:", index);
    console.log("sons length:", songs.length);

    if (index == 3) {
        index = 0;
    }

    player.src = songs[index].src;
    music_name.innerHTML = songs[index].name;
    if (type != "init") playPause();

    updateTime();
};

prevNextMusic("init")