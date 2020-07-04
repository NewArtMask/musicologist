//https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searching

const musicInfo = [];
const url = 'https://itunes.apple.com/search?term=';
const musicFinalList = [];

function addSongFromField(event) {
  event.preventDefault();

  const info = $('#musicField').eq(0).val();

  if (info) musicInfo.push(info);
  if (musicInfo.length) renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

function clearList () {
  const $list = $('.info').eq(0);

  $list.empty();
}

$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.

  searchMusic(musicInfo);
  console.log('Testing Music Call');
});

function searchMusic(musicInfo) {
  if(musicInfo.length) {
    clearList();
    musicInfo.map(music => {
      let musicTerm = music.split(' ').join('+');
      getMusicFromApple(musicTerm).then(addMusicFromApple);
    });
  }
}

function getMusicFromApple(musicTerm) {
  console.log(musicTerm);
  const promise = $.get(url+musicTerm+'&limit=5');
  return promise.then(musicResult => JSON.parse(musicResult).results).catch(console.error);
}

function addMusicFromApple (musicList) {
  musicList.forEach(musicListItem =>
    musicFinalList.push([
      musicListItem.artistName,
      musicListItem.trackName
    ])
  );
  publicMusicList();
}

function publicMusicList () {
  const $list = $('.info').eq(0);

  // $list.empty();

  for (const info of musicFinalList) {
    console.log(info)
    const $item = $('<li class="list-group-item">').text(`${ info[0] } — ${ info[1] }`);

    $list.append($item);
  }

musicInfo.length = 0;
musicFinalList.length = 0;
}