const songs = [
  {
    title: "Scared",
    artist: "Fred Again...",
    src: "resource/songs/scared.mp3",
    img: "resource/images/first.png",
  },
  {
    title: "Quit Playing Games",
    artist: "Backstreet Boys",
    src: "resource/songs/Quit Playing Games (With My Heart).mp3",
    img: "resource/images/second.jpg",
  },
  {
    title: "It's You",
    artist: "Zayn Mallik",
    src: "resource/songs/iT's YoU.mp3",
    img: "resource/images/third.jpg",
  },
];

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

let currentSongIndex = 0;

const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist");
const coverImage = document.querySelector(".img-sec img");
const audio = new Audio(songs[currentSongIndex].src);
const endTime = document.querySelector(".end-time");
const startTime = document.querySelector(".start-time");

function loadsong(index) {
  const song = songs[index];

  songName.textContent = song.title;
  artistName.textContent = song.artist;
  coverImage.src = song.img;
  audio.src = song.src;
  startTime.textContent = "0:00"; // reset instantly
}

const PlayPauseBtn = document.getElementById("playPause");

PlayPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    PlayPauseBtn.classList.add("playing");
  } else {
    audio.pause();
    PlayPauseBtn.classList.remove("playing");
  }
});

const progressBar = document.querySelector(".bar");

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progressPercent + "%";
  startTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  if (!isNaN(audio.duration)) {
    endTime.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

const barContainer = document.querySelector(".bar-cont");

barContainer.addEventListener("click", (e) => {
  const rect = barContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  const clickPercent = clickX / width;

  audio.currentTime = clickPercent * audio.duration;
});

const nextBtn = document.getElementById("next");

nextBtn.addEventListener("click", () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadsong(currentSongIndex);
  audio.play();
  PlayPauseBtn.classList.add("playing");
});

const prevBtn = document.getElementById("prev");

prevBtn.addEventListener("click", () => {
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  loadsong(currentSongIndex);
  audio.play();
  PlayPauseBtn.classList.add("playing");
});
