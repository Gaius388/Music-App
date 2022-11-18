const tomorrowClick = document.querySelector(".tomorrow__text-click");
const displaySection = document.querySelector(".display__section");
const tomorrowTunesSection = document.querySelector(".tomorrow-tunes__section");
const collectionSection = document.querySelector(".collections__section");
const homeButtonClick = document.querySelector(".icon-home");
const previewButtonClick = document.querySelector(".icon-preview");
const activeBtn = document.querySelector(".icon__1");
const newSongRelease = document.querySelector(".new__song");
const popularSongRelease = document.querySelector(".popular__song");
const collectionsTab = document.querySelector(".collections__tab");
const playlistTab = document.querySelector(".playlist__music");
const tunesCount = document.querySelector(".tunes__count");
const homeIcon = document.querySelector(".icon-home");
const searchResult = document.querySelector(".search__result");
const search = document.querySelector(".input");
const playPause = document.querySelector(".play__pause");
const playShuffle = document.querySelector(".play__shuffle");
const playForward = document.querySelector(".play__forward");
const playPrevious = document.querySelector(".play__previous");
const playRepeat = document.querySelector(".play__repeat");
const audio = document.querySelector("#audio");
const activeLike = document.querySelector('.top__song');


activeLike.addEventListener('click', (e) => {
  const btn = e.target.closest('.icon__love');
  btn.classList.toggle('yellow__active')
})

tomorrowClick.addEventListener("click", () => {
  displaySection.style.display = "none";
  tomorrowTunesSection.style.display = "grid";
  collectionSection.style.display = "none";
});
homeButtonClick.addEventListener("click", () => {
  tomorrowTunesSection.style.display = "none";
  displaySection.style.display = "grid";
  collectionSection.style.display = "none";

  if (!homeButtonClick.classList.contains("yellow__active")) {
    homeButtonClick.classList.add("yellow__active");
    previewButtonClick.classList.toggle("yellow__active");
  }
});
previewButtonClick.addEventListener("click", () => {
  tomorrowTunesSection.style.display = "none";
  displaySection.style.display = "none";
  collectionSection.style.display = "grid";

  if (!previewButtonClick.classList.contains("yellow__active")) {
    previewButtonClick.classList.add("yellow__active");
    homeButtonClick.classList.toggle("yellow__active");
  }
});


const renderNewSongs = function (className, section, position, data) {
  const html = `
        <div class="${className}">
        <div>
        <img src=${data.images?.coverart} alt="life_in_a_bubble" class="play__test"/>
                </div>
              <p class="song__title">${data.title}</p>
              <p class="singer">${data.subtitle}</p>
        </div>
            `;
  section.insertAdjacentHTML(`${position}`, html);
};

const renderNewSongs2 = function (data) {
  const html = `
  <div class="collection__main">
      <img
          src="${data.images.coverart}"
          alt="collection"
          class="collection-pic"/>
      <div class="collection__text">
      <div class="text">
          <h2>${data.title}</h2>
          <p>${data.subtitle}</p>
          <h4>2.4m likes</h4>
          </div>
          <img src="./images/love-icon.svg" alt="love-icon" class="love-icon" />
      </div>
    </div>
`;
  collectionsTab.insertAdjacentHTML("afterbegin", html);
};

const renderNewSongs3 = function (data) {
  const html = `
  <div class="playlist__music-tab">
  <div class="playlist__1">
              <img
                src="${data.images.coverart}"
                alt=""
                class="playlist__img"
              />
              <img
                src="./images/like__button-transparent.svg"
                alt="like__button-transparent"
                class="playlist__like"
              />
            </div>
            <p class="playlist__2">${data.title} ~ ${data.subtitle}</p>
            <div class="playlist__3">Single</div>
            <div class="playlist__4">3:17</div>
            <div class="playlist__5">
              <img src="./images/more_vert.svg" alt="more_vert" />
              </div>
              </div>
    `;
  playlistTab.insertAdjacentHTML("afterbegin", html);
};

const renderNewSongs4 = function (data) {
  const html = `
    <div class="search__result1">
      <p class="search__title-name">${data.title}</p>
      <p class="search__title-album">${data.album.name}</p>
    </div>
  `;
  searchResult.insertAdjacentHTML("afterbegin", html);
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a3116891dbmsh584255551275d82p15bc0djsn1044da010b62",
    "X-RapidAPI-Host": "shazam-song-recognizer.p.rapidapi.com",
  },
};

fetch(
  "https://shazam-song-recognizer.p.rapidapi.com/top_country_tracks?country_code=NG&limit=15&start_from=0",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const { result } = response;
    const tracks = result.tracks;
    const filtered = tracks.filter((arr) => arr.images !== undefined);
    filtered.forEach((data) => {
      renderNewSongs("new__song1", newSongRelease, "afterbegin", data);
      renderNewSongs("popular__song1", popularSongRelease, "beforeend", data);
      renderNewSongs3(data);
    });
    const collection = filtered.slice(0, 5);
    collection.forEach((data) => {
      renderNewSongs2(data);
    });
  })
  .catch((err) => console.error(err));


// let songIndex = 0;

// let isPlaying = false;

// function playSong() {
//   audio.play();
// }
// function pauseSong() {
//   audio.pause();
// }
// function loadSongs(data) {
//   audio.src = data;
// }

// popularSongRelease.addEventListener('click', (e) => {
//   const playTest = e.target.closest('.popular__song1');
//   const audio = document.getElementsByClassName("audio");
  
//   audio[5].play();
//   playTest.classList.toggle('play');

// })

