console.log("welcome to spotify");

//initialize
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay =Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName:"Heeriye-Heeriye",filePath:"songs/1.mp3", coverPath: "covers/1.png"},
    {songName:"Labon Ko",filePath:"songs/2.mp3", coverPath: "covers/2.png"},
    {songName:"Oh maahi-oh maahi",filePath:"songs/3.mp3", coverPath: "covers/3.png"},
    {songName:"Safar-Jass",filePath:"songs/4.mp3", coverPath: "covers/4.png"},
    {songName:"Tu Hai Kahan",filePath:"songs/5.mp3", coverPath: "covers/5.png"},
    {songName:"Tujhe sochta Hu",filePath:"songs/6.mp3", coverPath: "covers/6.png"},
    {songName:"Ve Haaniya",filePath:"songs/7.mp3", coverPath: "covers/7.png"},
    {songName:"Ve Kamleya",filePath:"songs/8.mp3", coverPath: "covers/8.png"}
]
songItems.forEach((element,i)=>{
    console.log(element,i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();  
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause'); 
        gif.style.opacity = 1;   
        
    }
    else{
        audioElement.pause();  
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');  
        gif.style.opacity = 0 ;
        makeAllPlays();
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seek bar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myprogressBar.value = progress;
})
myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressBar.value*audioElement.duration/100;

})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if (songIndex !== parseInt(e.target.id) || audioElement.paused || audioElement.currentTime <= 0) {
            // Load and play the new song if it's different or if audio is paused or at the beginning
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            // Toggle play/pause for the current song
            if (audioElement.paused) {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                e.target.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
            }
        }
    });
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>8){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})