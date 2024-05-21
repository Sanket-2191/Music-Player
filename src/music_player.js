// 
import { prev, play_pause, next, progress } from './main.js'
const songImage = document.querySelector("#song-img")
const songName = document.querySelector("#song-Name")
const singers = document.querySelector("#info-singers")

const audioControls = document.querySelector('#played-song')

export const songList = [];
// const currPlaylist = playingSongs()
let index = 0;
// time to be visible as min:sec
const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
// got the songList of currplaylist this can be usd to toggle between prev and next song....... 
export const updateSongList = (currSongList) => {
    songList.length = 0;
    songList.push(...currSongList);
    console.log(songList, " from music plyer component");
    index = 0;
}
const updateIndex = (Song) => {
    for (let i = 0; i < songList.length; i++) {
        console.log('In updateIndex at i: ', i);
        if (songList[i].name === Song.name) {
            console.log('found song at i: ', i);
            return i; // Return the index if the song is found
        }
    }
}
export const updateSongDisplay = (song) => {
    index = updateIndex(song);
    console.log(`done updating index to: ${index}`)
    songImage.src = song.imageURL;
    songImage.alt = song.name;
    audioControls.src = song.src;
    songName.textContent = song.name;
    singers.textContent = song.singer.join(',');

}

export const playSong = () => {
    audioControls.play();

    console.log(`playing song ${audioControls.src}`);

    // Set the max value of the progress input to the song duration
    audioControls.addEventListener('loadedmetadata', () => {
        const max = audioControls.duration;
        $('#progress-input').attr('max', max);
    });

    // Update the progress bar and label width every second
    const playing = setInterval(() => {
        const currentTime = audioControls.currentTime;
        const duration = audioControls.duration;

        $('#passed-duration').text(formatTime(currentTime));
        $('#progress-input').val(currentTime); // Update the range input value
        $('#progress-label').css('width', `${(currentTime / duration) * 100}%`);
    }, 500);

    // Clear the interval when the song ends
    audioControls.addEventListener('ended', () => {
        clearInterval(playing);
        console.log('Song ended, interval cleared');
    });

    // Update the audio currentTime when the range input changes
    $('#progress-input').on('input', function () {
        audioControls.currentTime = $(this).val();
    });
};
export const pauseSong = () => {
    audioControls.pause();
    console.log(`paused song ${audioControls.src}`)
}

export const prevSong = () => {
    index--;
    if (index < 0) index = songList.length - 1;
    updateSongDisplay(songList[index])
    playSong()
}
export const nextSong = () => {
    index++;
    if (index >= songList.length) index = 0;
    updateSongDisplay(songList[index])
    playSong()
}