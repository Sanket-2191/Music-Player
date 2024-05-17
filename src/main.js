// import { updateSongDisplay } from './music_player'

var allSongs = [
  {
    id: 0,
    name: "Satranga",
    genre: "Love",
    artists: [],
    singer: ['Arijit Singh'],
    duration: 0,
    imageURL: "./images/Arijit-Singh.png",
    liked: false
  }, {
    id: 0,
    name: "Dhan ta nan",
    genre: "Rock",
    artists: [],
    singer: ['Vishal Dadlani'],
    duration: 0,
    imageURL: "./images/Vishal-Dadlani.webp",
    liked: false
  }, {
    id: 0,
    name: "Aayat",
    genre: "Love",
    artists: [],
    singer: ['Arijit Singh'],
    duration: 0,
    imageURL: "./images/Arijit-Singh2.jpg",
    liked: false
  }, {
    id: 0,
    name: "Ek tukda Dhoop",
    genre: "Sad",
    artists: [],
    singer: ['Raghav Chaitanya'],
    duration: 0,
    imageURL: "./images/raghav chaitanya.jpg",
    liked: false
  }, {
    id: 0,
    name: "Safar ka hi tha mai",
    genre: "Travel",
    artists: [],
    singer: ['Arijit Singh'],
    duration: 0,
    imageURL: "./images/Arijit-Singh2.jpg",
    liked: false
  },
]


// Options for genre............ 
const genreList = [];

allSongs.forEach(song => {
  console.log(song.genre)
  if (!genreList.includes(song.genre)) {
    genreList.push(song.genre);
  }
})
console.log(genreList)

genreList.forEach(genre => {
  const option = document.createElement('option');

  option.textContent = genre;

  $('#genre-Selection').append(option);
})

// window.localStorage.removeItem('PlayList')

/*.............Switch Dark to light to dark................ */
// const toggleTheme =
document.getElementById('theme-icon').addEventListener('click', () => {
  // console.log('theme was tried being toggled')
  document.body.classList.toggle("light-theme")
  if (document.body.classList.contains('light-theme')) {
    document.getElementById('theme-icon').innerHTML = `<i class="fa-solid fa-moon"></i>`
  }
  else {
    document.getElementById('theme-icon').innerHTML = `<i class="fa-solid fa-sun" style="color: #e7eaee;"></i> `
  }

});


// Collapse or Open current playing music............

$("#up-down-btn").on('click', () => {
  $("#playing-now").toggleClass("collapse-playing");
  $("#up-down-btn").toggleClass("rotate-180");
})


$("#drop-down-menu").on('click', () => {
  $("#menu-list").toggleClass('hidden');
  $("#menu-list").toggleClass('flex');
})

// onclick for logo to dropdown playlist options when screen size small..................

document.querySelector('#logo').addEventListener('click', () => {
  document.querySelector("#aside-playlist").classList.toggle('hidden');
  document.querySelector("#aside-playlist").classList.toggle('z-20');

  if (!document.querySelector("#aside-playlist").classList.contains('hidden')) {
    $('#footer').addClass('w-[70%] ml-[30%]');
    $('#footer').removeClass('w-[100%] ml-[0%]')
  }
  else {
    $('#footer').addClass('w-[100%] ml-[0%]');
    $('#footer').removeClass('w-[70%] ml-[30%]')
  }
})

// Add song to playlist onClick of "add to playlist" button.......
const playlists = [];

if (window.localStorage.getItem('PlayList') && JSON.parse(window.localStorage.getItem('PlayList')).length > 0) {
  const PL = JSON.parse(window.localStorage.getItem('PlayList')) || [];
  playlists.push(...PL); // put existing playlist items into localStorage
  console.log("was not empty: ", playlists);

} else {
  playlists.push({
    name: 'All Songs',
    songs: allSongs
  });
  playlists.push(
    {  // Push playlist default in localstorage if there is not playlists in localstorage.
      name: "Liked Songs",
      songs: []
    });

  window.localStorage.setItem('PlayList', JSON.stringify(playlists));
  console.log("was empty: ", playlists);
}

// Add NEW Playlist to Library..............................
const addPToLibrary = (name) => {
  $("#start-PL-creation").removeClass('hidden');
  $("#name-PL-input").addClass('hidden');
  $("#save-PL-name").addClass('hidden');
  if (name) {
    playlists.push({
      name: name,
      songs: []
    });

    window.localStorage.setItem('PlayList', JSON.stringify(playlists));
    // const PLAYLISTS = JSON.parse(window.localStorage.getItem('PlayList')) || []
  }
  document.querySelector('#show-playlists').textContent = ""
  playlists.forEach(playlist => {
    displayPlaylist(playlist)
  })

}

// save the created playlist to Library ....................
$('#save-PL-name').on('click', () => {
  let name = $('#name-PL-input input').val();
  addPToLibrary(name);
});
// Strt the creation of playlist by clicking on icon.............
$("#start-PL-creation").on('click', () => {
  $("#start-PL-creation").addClass('hidden');
  $("#name-PL-input").removeClass('hidden');
  $("#save-PL-name").removeClass('hidden');
});

// swithch to next song on click of previous or next button....
// create proper arrengement for it like storing "id" of next song in current one......


// create shuffule mode.............


// play song on clicking the song in list............. 



//display playlist with name and delete button.................
// add onclick function on individual playlist in libray to display songs in it 

const displayPlaylist = (playlist) => {
  // individual playlist div outer most to constain name and delete button.... 
  const playListBox = document.createElement('li');
  playListBox.classList.add("flex", 'transform', 'justify-between', 'items-center', 'rounded-lg', 'px-3', 'py-2',
    'transition-colors', 'duration-300', 'hover:bg-[var(--text-color)]', "hover:text-gray-400");

  const playListName = document.createElement('span');

  playListName.textContent = playlist.name;

  playListBox.appendChild(playListName);

  // Delete button for removing playlist from library....
  if (playlist.name !== 'Liked Songs' && playlist.name !== 'All Songs') {
    const playlistDeleteBtn = document.createElement('button');

    playlistDeleteBtn.innerHTML = `<i id='delete-icon' class="fa-solid fa-trash"><i>`;
    playlistDeleteBtn.addEventListener('click', () => {
      playListBox.remove();
      const newPlaylist = playlists.filter(pl => pl.name !== playlist.name);
      playlists.length = 0;
      playlists.push(...newPlaylist)
      window.localStorage.setItem('PlayList', JSON.stringify(playlists))
    });
    playListBox.appendChild(playlistDeleteBtn)
  }

  document.querySelector('#show-playlists').appendChild(playListBox)
  playListBox.addEventListener('click', () => {
    console.log(playlist)
    renderSongs(playlist);
  })
}

console.log('this is PL: ', playlists)

// Show the all the available playlists...........
playlists.forEach(playlist => {
  displayPlaylist(playlist)
})


// Render Songs in selected playlist with options 
// to add it to Liked Songs or available playlist plylist 
const renderSongs = (playList) => {
  $('#playlist-name').text(playList.name)
  const songsTable = document.getElementById('songs-table');
  songsTable.innerHTML = ''; // Clear existing table content
  playList.songs.forEach(song => {
    // create new row for song
    const songRow = document.createElement('tr');
    songRow.classList.add("hover:bg-gray-700");

    //create data cell for song image and name
    const songImage = document.createElement('td');
    songImage.classList.add("whitespace-nowrap", 'px-4', 'py-4');
    const songImageContent = `
      <div class="flex items-center">
        <div class="h-[55px] w-[55px] flex-shrink-0">
          <img
            class="h-[100%] w-[100%] rounded-full object-cover"
            src="${song.imageURL}"
            alt=""
          />
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium">
            ${song.name}
          </div>
          <div class="text-sm text-gray-400">
            ${song.genre}
          </div>
        </div>
      </div>`;
    songImage.innerHTML = songImageContent;
    songRow.appendChild(songImage);

    // create data cell for Singer names
    const singerData = document.createElement('td');
    singerData.classList.add("whitespace-nowrap", 'px-12', 'py-4');
    const singerDiv = document.createElement('div');
    singerDiv.classList.add('text-sm');
    song.singer.forEach(singer => {
      const span = document.createElement('span');
      span.textContent = singer;
      singerDiv.appendChild(span);
    });
    singerData.appendChild(singerDiv);
    songRow.appendChild(singerData);

    // add buttons
    const btnCell = document.createElement('td');
    btnCell.classList.add("whitespace-nowrap", 'px-4', 'py-4', 'text-right', 'text-sm', 'font-medium');

    // Like button
    const likeSpan = document.createElement('span');
    const likeBtn = document.createElement('button');
    likeBtn.classList.add('fa-regular', 'fa-heart', 'm-5', 'cursor-pointer');

    likeBtn.addEventListener('click', () => {
      // Toggle the liked status of the song
      song.liked = !song.liked;

      // Toggle the classes for the like button to change its appearance
      $(likeBtn).toggleClass('fa-regular');
      $(likeBtn).toggleClass('fa-solid text-red-500');

      const updatedPlaylist = JSON.parse(window.localStorage.getItem('PlayList') || []);
      const likedSongsPlaylist = updatedPlaylist.find(playlist => playlist.name === "Liked Songs");
      // For updated Liked songs in All Songs PlayList.... 
      updatedPlaylist.forEach(playlist => {
        playlist.songs.forEach(song1 => {
          if (song1.name == song.name) {
            song1.liked = song.liked;
          }
        })
      });

      if (song.liked) {
        // Add the song to the Liked Songs playlist if it's not already there
        if (!likedSongsPlaylist.songs.some(currSong => currSong.name === song.name)) {
          likedSongsPlaylist.songs.push(song);
        }
      } else {
        // Remove the song from the Liked Songs playlist
        likedSongsPlaylist.songs = likedSongsPlaylist.songs.filter(currSong => currSong.name !== song.name);
        if (playList.name === "Liked Songs") songRow.remove();
      }
      // Update the local storage with the modified playlist
      window.localStorage.setItem('PlayList', JSON.stringify(updatedPlaylist));
      // playList = updatedPlaylist;
      // If the current playlist is the Liked Songs playlist, rerender the songs
      console.log(updatedPlaylist)
    });

    if (song.liked) {
      likeBtn.classList.remove('fa-regular');
      likeBtn.classList.add('fa-solid', 'text-red-500')
    }
    likeSpan.appendChild(likeBtn);
    btnCell.appendChild(likeSpan)

    // Add options to add songs to other playlists only for liked songs and All songs playlist 
    if (playList.name === "Liked Songs" || playList.name === "All Songs") {// Add to PLaylist Options
      const optionSpan = document.createElement('span');
      const playListSelector = document.createElement('select');
      playListSelector.classList.add('bg-[var(--primary-color)]',
        'select-info', 'w-fit', 'max-w-xs', 'text-sm', 'font-semibold', 'hover:text-gray-500',
        'bg-[--primary-color]', 'text-[--text-color]');
      const currPlaylists = JSON.parse(window.localStorage.getItem('PlayList') || []);
      const defaultOption = document.createElement('option');

      defaultOption.classList.add('bg-[var(--ternary-color)]');
      defaultOption.textContent = "Select to add"
      playListSelector.appendChild(defaultOption);

      currPlaylists.forEach(playlist => {
        const option = document.createElement('option');
        option.classList.add('bg-[var(--ternary-color)]');
        if (playlist.name !== "Liked Songs" && playlist.name !== "All Songs") {
          option.textContent = playlist.name;
          playListSelector.appendChild(option);
        }
      });
      playListSelector.addEventListener('change', (e) => {
        const selectedPlayList = e.target.value;
        const toUpdatePL = JSON.parse(window.localStorage.getItem('PlayList') || [])
        const PL_to_Change = toUpdatePL.find(PL => PL.name === selectedPlayList);
        PL_to_Change.songs.push(song);
        window.localStorage.setItem('PlayList', JSON.stringify(toUpdatePL));
        console.log()
      })

      optionSpan.appendChild(playListSelector);
      btnCell.appendChild(optionSpan);
    }

    // Remove option............
    if (playList.name !== "Liked Songs" && playList.name !== "All Songs") {
      const removeSpan = document.createElement('span');
      const removebtn = document.createElement('button');
      removebtn.innerHTML = `<i id='delete-icon' class="fa-solid fa-trash"><i>`;
      removebtn.addEventListener('click', () => {
        songRow.remove();
        // Remove from local storage...........
        const updatedPlaylist = JSON.parse(window.localStorage.getItem('PlayList') || []);
        const currPlaylist = updatedPlaylist.find(playlist => playlist.name === playList.name);
        // Remove the song from the Liked Songs playlist
        currPlaylist.songs = currPlaylist.songs.filter(currSong => currSong.name !== song.name);
        // Update the local storage with the modified playlist
        window.localStorage.setItem('PlayList', JSON.stringify(updatedPlaylist));
      })
      removeSpan.appendChild(removebtn)
      btnCell.appendChild(removeSpan);
    }

    songRow.appendChild(btnCell);


    // songRow.addEventListener('click', () => {
    //   updateSongDisplay(song.name, song.singer)
    // })
    songsTable.appendChild(songRow); // Append the row to the table


  });
};


const ALLPlaylists = JSON.parse(window.localStorage.getItem('PlayList')) || [];
const allSongsPlaylist = ALLPlaylists.find(playList => playList.name == "All Songs")
allSongsPlaylist.songs.forEach(song => {
  const currSong = allSongs.find(SONG => SONG.name === song.name);
  currSong.liked = song.liked;
})
window.localStorage.setItem('PlayList', JSON.stringify(ALLPlaylists));
renderSongs(allSongsPlaylist);

$('#home').on('click', () => {
  renderSongs(allSongsPlaylist);
});

