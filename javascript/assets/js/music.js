const allMusic = [
    {
        name: "Music Track 01",
        artist: "Various artist",
        img: "music_view01",
        audio: "music_audio01"
    },
    {
        name: "Music Track 02",
        artist: "Various artist",
        img: "music_view02",
        audio: "music_audio02"
    },
    {
        name: "Music Track 03",
        artist: "Various artist",
        img: "music_view03",
        audio: "music_audio03"
    },
    {
        name: "Music Track 04",
        artist: "Various artist",
        img: "music_view04",
        audio: "music_audio04"
    },
    {
        name: "Music Track 05",
        artist: "Various artist",
        img: "music_view05",
        audio: "music_audio05"
    },
    {
        name: "Music Track 06",
        artist: "Various artist",
        img: "music_view06",
        audio: "music_audio06"
    },
    {
        name: "Music Track 07",
        artist: "Various artist",
        img: "music_view07",
        audio: "music_audio07"
    },
    {
        name: "Music Track 08",
        artist: "Various artist",
        img: "music_view08",
        audio: "music_audio08"
    },
    {
        name: "Music Track 09",
        artist: "Various artist",
        img: "music_view09",
        audio: "music_audio09"
    },
]
const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3");
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const soundOnOff = musicWrap.querySelector("#control-mute");
const soundUp = musicWrap.querySelector("#control-volumeUp");
const soundDown = musicWrap.querySelector("#control-volumeDown");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".progress .timer .current");
const musicProgressDuration = musicWrap.querySelector(".progress .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");

let musicIndex = 1;
// 음악 재생
function loadMusic(num) {
    musicName.innerText = allMusic[num - 1].name;
    musicArtist.innerText = allMusic[num - 1].artist;
    musicView.src = `../assets/img/${allMusic[num - 1].img}.png`;
    musicView.alt = allMusic[num - 1].name;
    musicAudio.src = `../assets/audio/${allMusic[num - 1].audio}.mp3`;
}

// 재생 버튼
function playMusic() {
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
}
// 정지 버튼
function pauseMusic() {
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
}
// 이전 곡 듣기 버튼(
function prevMusic() {
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    let getAttr = musicRepeat.getAttribute("class");
    
    switch(getAttr){
        case "repeat" : 
            loadMusic(musicIndex);
            playMusic();
        break;
        case "repeat_one":
            loadMusic(musicIndex);
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random()*allMusic.length + 1);  //랜덤인덱스생성

            do {
                randomIndex = Math.floor(Math.random()*allMusic.length + 1);
            } while ( musicIndex==randomIndex)
            musicIndex = randomIndex;       // 현재 인덱스를 랜덤   인덱스 변경
            loadMusic(musicIndex);          // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드    
            playMusic();                    // 로드한 음악을 재생
        break;
    }
    playlistMusic()     //리스트갱신
}
// 다음 곡 듣기 버튼(
function nextMusic() {
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    // playMusic();
    let getAttr = musicRepeat.getAttribute("class");
    
    switch(getAttr){
        case "repeat" : 
            loadMusic(musicIndex);
            playMusic();
        break;
        case "repeat_one":
            loadMusic(musicIndex);
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random()*allMusic.length + 1);  //랜덤인덱스생성

            do {
                randomIndex = Math.floor(Math.random()*allMusic.length + 1);
            } while ( musicIndex==randomIndex)
            musicIndex = randomIndex;       // 현재 인덱스를 랜덤   인덱스 변경
            loadMusic(musicIndex);          // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드    
            playMusic();                    // 로드한 음악을 재생
        break;
    }
    playlistMusic()     //리스트갱신

}
// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    // console.log(e)
    const currentTime = e.target.currentTime;           //현재 재생되는 시간
    const duration = e.target.duration;                 //오디오의 총 길이
    let progressWidth = (currentTime / duration) * 100;   //전체 길에이서 현재 진행되는 시간을 백분위로 나눔
    musicProgressBar.style.width = `${progressWidth}%`;
    // 전체시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);          //전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);          //남은 초를 저장
        if (totalSec < 10) totalSec = `0${totalSec}`;            //초가 한 자릿수 일때 앞에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;    //완성된 시간 문자열을 출력
    })

    // 진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;        
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
    // console.log(currentSec)


    
});

// 진행바 클릭
    // 진행바 전체길이구한뒤 각 구간의 값(백분율형식)으로 알면 구현가능함.
    musicProgress.addEventListener("click", (e) => {
        let progressWidth = musicProgress.clientWidth;  // 진행바 전체 길이구하기
        let clickedOffsetX = e.offsetX;                 // 처음 시작값(부모기준(진행바))부터 클릭한지점까지의 x값 구하기
        let songDuration = musicAudio.duration;         // 오디오 전체 길이
    
        musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;   // 백분위로 나눈 숫자에 전체길이 곱함 이로인해 현재 재생값으로 바꿈
    })


// 반복 버튼 클릭
musicRepeat.addEventListener("click", ()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;
        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }
})

// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
    const isMusicPauesd = musicWrap.classList.contains("paused");   //음악이 재생중
    isMusicPauesd ? pauseMusic() : playMusic();
})
// 이전곡 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
    prevMusic();
    playlistMusic()     //리스트갱신
})
// 다음곡 버튼 클릭
musicNextBtn.addEventListener("click", () => {
    nextMusic(); 
    playlistMusic()     //리스트갱신               
})


// 뮤직 리스트 버튼
musicListBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
    musicListBtn.classList.toggle("close");
})


// 뮤직 리스트 구현하기
for(let i=0; i<allMusic.length; i++){
    let li = `
    <li data-index="${i+1}">
        <strong>${allMusic[i].name}</strong>
        <em>${allMusic[i].artist}</em>
        <audio class="${allMusic[i].audio}" src="../assets/audio/${allMusic[i].audio}.mp3"></audio>
        <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
    </li>
    `;
    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li);    // 가상요소와 유사함.

    // 리스트에 음악시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   // li에서 시간을 표시할 선택자 지정
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);           // li에서 오디오 지정

    liAudio.addEventListener("loadeddata",() => {
        let audioDuration = liAudio.duration;       // 전체 길이
        let totalMin = Math.floor(audioDuration / 60 ); // 전체 길이 -> 분단위 표현
        let totalSec = Math.floor(audioDuration % 60);  // 전체 길이 -> 초단위 표현
        if(totalSec < 10 ) totalSec = `0${totalSec}`;   // 앞 0추가
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;  //문자열 출력
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);   //속성에 오디오 길이 기록
    })
    
}

// 뮤직 리스트를 클릭하면 재생
function playlistMusic(){
    const musiclistAll = musicListUl.querySelectorAll("li");    //뮤직리스트목록 가져오기
    for(let i=0; i<musiclistAll.length; i++){
        let audioTag = musiclistAll[i].querySelector(".audio-duration");

        if(musiclistAll[i].classList.contains("playing")){
            musiclistAll[i].classList.remove("playing");                //클래스 삭제
            let adDuration = audioTag.getAttribute("data-duration");    // 오디오 길이 값 가져오기
            audioTag.innerText = adDuration;                            // 오디오 길이 값 넣기 (위에 이미 길이값 가져옴)
        }

        if(musiclistAll[i].getAttribute("data-index")==musicIndex){     //현재 인덱스 == 리스트인덱스
            musiclistAll[i].classList.add("playing");                   //클래스 playing 추가
            audioTag.innerText = "재생중";      
        }

        musiclistAll[i].setAttribute("onclick", "clicked(this)");
    }
};


// 뮤직 리스트를 클릭하면
function clicked(el){
    let getliIndex = el.getAttribute("data-index"); // 클릭한 리스트의 인덱스 값 저장
    musicIndex = getliIndex;                        // 클릭한 인덱스 값 -> 뮤직인덱스에 저장
    loadMusic(musicIndex);                          // 해당 인덱스에 해당하는 노래 재생
    playMusic();                                    // 음악 재생
    playlistMusic();                                // 음악 리스트 갱신
}


// 오디오가 끝나면
musicAudio.addEventListener("ended", ()=> {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" : 
            nextMusic();
        break;
        case "repeat_one":
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random()*allMusic.length + 1);  //랜덤인덱스생성

            do {
                randomIndex = Math.floor(Math.random()*allMusic.length + 1);
            } while ( musicIndex==randomIndex)
            musicIndex = randomIndex;       // 현재 인덱스를 랜덤   인덱스 변경
            loadMusic(musicIndex);          // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드    
            playMusic();                    // 로드한 음악을 재생
        break;
    }
    playlistMusic()     //리스트갱신
})


// 음소거 시키기
soundOnOff.addEventListener("click",()=>{ 
    const myAudio = document.getElementById("main-audio");
    if(soundOnOff.classList.contains("mute")){
        soundOnOff.setAttribute("title", "음소거 해제");
        soundOnOff.setAttribute("class", "sound");
        myAudio.muted = true;
    } else {
        soundOnOff.setAttribute("title", "음소거");
        soundOnOff.setAttribute("class", "mute");
        myAudio.muted = false;
    }
})
// 볼륨 컨트롤 바
function soundCotrol(control){
    document.querySelector('#control-volume').value = control * 10;
}

document.querySelector('#control-volume').addEventListener('input',e=>{
    let volume = (e.target.value) * 0.1;
    let volume2 = volume.toFixed(1);

    const myAudio = document.getElementById("main-audio");
    myAudio.volume = volume2;
    soundCotrol(volume2);
});

soundUp.addEventListener("click",()=>{
    let soundUpCurrent = document.querySelector('#control-volume').value ;
    soundUpCurrent++;
    if(soundUpCurrent >= 11) return;
    document.querySelector('#control-volume').value = soundUpCurrent;
    const myAudio = document.getElementById("main-audio");
    myAudio.volume = (soundUpCurrent * 0.1).toFixed(1);

    // const soundUpCurrent = document.querySelector('#control-volume').value * 0.1 + 0.1;
    // const soundUpCurrent2 = soundUpCurrent.toFixed(1);
    // console.log(soundUpCurrent2)
    // if(soundUpCurrent2 >= 1.1){
    //     return;
    // }
    // document.querySelector('#control-volume').value = soundUpCurrent2 * 10;
})
soundDown.addEventListener("click",()=>{
    let soundDownCurrent = document.querySelector('#control-volume').value ;
    soundDownCurrent--;
    if(soundDownCurrent <= -1) return;
    document.querySelector('#control-volume').value = soundDownCurrent;
    const myAudio = document.getElementById("main-audio");
    myAudio.volume = (soundDownCurrent * 0.1).toFixed(1);
    console.log((soundDownCurrent * 0.1).toFixed(1))
    console.log(soundDownCurrent)
})



// 창 로드시 
window.addEventListener("load", () => {
    loadMusic(musicIndex);      //음악재생
    playlistMusic();            //리스트 갱신
});

