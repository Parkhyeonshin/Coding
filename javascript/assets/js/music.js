const allMusic = [
    {
        name : "Average - 1",
        artist : "Patrick Patrikios",
        img : "musicCover1",
        audio : "musicAudio1",
    },
    // 01
    {
        name : "Average - 2",
        artist : "Patrick Patrikios",
        img : "musicCover2",
        audio : "musicAudio2",
    },
    // 02
    {
        name : "Average - 3",
        artist : "Patrick Patrikios",
        img : "musicCover3",
        audio : "musicAudio3",
    },
    // 03
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover4",
        audio : "musicAudio4",
    },
    // 04
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover5",
        audio : "musicAudio5",
    },
    // 05
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover6",
        audio : "musicAudio6",
    },
    // 06
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover7",
        audio : "musicAudio7",
    },
    // 07
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover8",
        audio : "musicAudio8",
    },
    // 08
    {
        name : "Average - ",
        artist : "Patrick Patrikios",
        img : "musicCover9",
        audio : "musicAudio9",
    },
    // 09
    {
        name : "Average - 111",
        artist : "Patrick Patrikios",
        img : "musicCover10",
        audio : "musicAudio10",
    }
    // 10
];

const musicWrap = document.querySelector(".music__wrap");
const musicView = document.querySelector(".music__view .img img");
const musicName  = document.querySelector(".music__view .title h3");
const musicArtist = document.querySelector(".music__view .title p");
const musicAudio = document.querySelector("#main-audio");
const musicPlay = document.querySelector("#control-play");
const musicPrevBtn = document.querySelector("#control-prev");
const musicNextBtn = document.querySelector("#control-next");
// const musicAudio

let musicIndex = 1;

// 음악 재생
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;
    musicArtist.innerText = allMusic[num-1].artist;
    musicView.src = `../assets/img/${allMusic[num-1].img}.png`;
    musicView.src = allMusic[num-1].name
    musicAudio.src = `../assets/audio/${allMusic[num-1].audio}.mp3`;
    // console.log(musicView.src)
}

// 재생버튼
function playMusic(){

}

// 정지버튼
function pauseMusic(){

}

// 이전 곡 듣기 버튼
function prevMusic(){

}

// 다음 곡 듣기 버튼
function nextMusic(){

}

window.addEventListener("load", () => {
    loadMusic(musicIndex);
})



// 플레이버튼
musicPlay.addEventListener("click",()=>{
    playMusic();
});