(function () {
  let titleElement = document.getElementById('title');
  let authorElement = document.getElementById('author');
  let timeElement = document.getElementById('time');
  let imageElement = document.querySelector('#left img');
  let rightElement = document.getElementById('right');
  let data;
  let currentId;
  let loading = 0;

  //JavaScript file to communicate with the spotify API
  //JavaScript file to control the spotify overlay

  let newRequest = function () {
    if (loading > 0) {
      loading--;
      return;
    }
    loading = 8;
    let xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
      if (xml.readyState == 4) {
        if (xml.response == '') {
          if (
            titleElement.innerHTML !== 'Connected to spotify' &&
            currentId === undefined
          ) {
            titleElement.innerHTML = 'Connected to spotify';
            authorElement.innerHTML = 'Start playing a song to get started';
            checkTickers();
          }
        } else {
          let xmlJSON = JSON.parse(xml.response);
          if (xmlJSON.error) {
            if (!data.refresh_token && !data.txtform_token) {
              window.location =
                window.location.origin + window.location.pathname;
            } else {
              refreshToken();
            }
          } else {
            updateData(xmlJSON);
            loading = 0;
          }
        }
      }
    };
    xml.open(
      'get',
      'https://api.spotify.com/v1/me/player/currently-playing',
      true
    );
    xml.setRequestHeader('Authorization', 'Bearer ' + data.access_token);
    xml.send();
  };

  let updateData = function (xml) {
    if (xml.currently_playing_type != 'track') {
      return;
    }
    timeElement.style.width =
      (xml.progress_ms / xml.item.duration_ms) * 100 + '%';
    if (xml.item.is_local === true) {
      if (xml.item.id === null) {
        xml.item.id = xml.item.uri;
      }
      for (let i = xml.item.artists.length - 1; i > -1; i--) {
        if (xml.item.artists[i].name.length === 0) {
          xml.item.artists.splice(i, 1);
        }
      }
      if (xml.item.artists.length === 0) {
        xml.item.artists = [{ name: 'no artist found' }];
      }
    }
    if (currentId != xml.item.id) {
      currentId = xml.item.id;
      changeData(xml);
    }
  };

  let changeData = function (xml) {
    titleElement.innerHTML = xml.item.name;

    let artists = '';
    for (let i of xml.item.artists) {
      if (artists == '') {
        artists = i.name;
      } else {
        artists += ', ' + i.name;
      }
    }
    authorElement.innerHTML = artists;
    if (xml.item.album.images.length > 0) {
      imageElement.src =
        xml.item.album.images[xml.item.album.images.length - 2].url;
    } else {
      imageElement.src = './blank.png';
    }
    timeElement.style.background = generateRGB();
    checkTickers();
  };

  let checkTickers = function () {
    let title = titleElement.offsetWidth;
    let author = authorElement.offsetWidth;
    let right = rightElement.offsetWidth;

    // remove old tickers
    if (title_ticker.running === true) {
      clearTimeout(title_ticker.ticker_object);
      title_ticker.running = false;
      titleElement.style.transition = 'margin-left 0s linear';
      titleElement.style.marginLeft = '0';
    }

    // remove old tickers
    if (author_ticker.running === true) {
      clearTimeout(author_ticker.ticker_object);
      author_ticker.running = false;
      authorElement.style.transition = 'margin-left 0s linear';
      authorElement.style.marginLeft = '0';
    }

    // add new tickers
    if (title > right) {
      title_ticker.distance = (title - right) * -1;
      title_ticker.running = true;
      title_ticker.ticker_object = setTimeout(titleTicker, 2000);
    }

    // add new tickers
    if (author > right) {
      author_ticker.distance = (author - right) * -1;
      author_ticker.running = true;
      author_ticker.ticker_object = setTimeout(authorTicker, 2000);
    }
  };

  let titleTicker = function () {
    if (title_ticker.state === 0) {
      title_ticker.state = 1;
      let speed = (title_ticker.distance / ticker_speed) * -1;
      titleElement.style.transition = 'margin-left ' + speed + 's linear';
      titleElement.style.marginLeft = title_ticker.distance + 'px';
      title_ticker.ticker_object = setTimeout(titleTicker, speed * 1000 + 2000);
      return;
    }
    title_ticker.state = 0;
    let speed = (title_ticker.distance / ticker_speed) * -0.1;
    titleElement.style.transition = 'margin-left ' + speed + 's linear';
    titleElement.style.marginLeft = '0px';
    title_ticker.ticker_object = setTimeout(titleTicker, speed * 1000 + 2000);
    return;
  };

  let authorTicker = function () {
    if (author_ticker.state === 0) {
      author_ticker.state = 1;
      let speed = (author_ticker.distance / ticker_speed) * -1;
      authorElement.style.transition = 'margin-left ' + speed + 's linear';
      authorElement.style.marginLeft = author_ticker.distance + 'px';
      author_ticker.ticker_object = setTimeout(
        authorTicker,
        speed * 1000 + 2000
      );
      return;
    }
    author_ticker.state = 0;
    let speed = (author_ticker.distance / ticker_speed) * -0.1;
    authorElement.style.transition = 'margin-left ' + speed + 's linear';
    authorElement.style.marginLeft = '0px';
    author_ticker.ticker_object = setTimeout(authorTicker, speed * 1000 + 2000);
    return;
  };

  let refreshToken = function () {
    if (loading_key.state === true) {
      let current_stamp = new Date();
      current_stamp.setSeconds(current_stamp.getSeconds() - 30);
      if (current_stamp < loading_key.timestamp) {
        return;
      }
    }
    loading_key.state = true;
    loading_key.timestamp = new Date();
    if (data.txtform_token) {
      loadToken();
    } else if (data.refresh_token) {
      loadLegacy();
    } else {
      clearInterval(loop_variable);
    }
  };

  let loadToken = function () {
    fetch('https://txtform.yazaar.xyz/api/spotify/getAccessToken', {
      headers: {
        'account-token': data.txtform_token,
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (!json.success) {
          titleElement.innerText = 'Error';
          authorElement.innerText = 'failed to get spotify token';
        }
        if (typeof json.access_token == 'string') {
          data.access_token = json.access_token;
          loading = 0;
        }
      });
  };

  let loadLegacy = function () {
    let xml = new XMLHttpRequest();
    xml.onreadystatechange = () => {
      if (xml.readyState === 4) {
        loading_key.state = false;
        if (xml.response !== '') {
          xml = JSON.parse(xml.response);
          if (xml.error_description === 'Invalid refresh token') {
            titleElement.innerText = 'no provided token, read more on GitHub';
            authorElement.innerText =
              'https://github.com/Yazaar/Spotify-Overlay';
            return;
          }
          if (typeof xml.access_token == 'string') {
            data.access_token = xml.access_token;
            localStorage.setItem('spotify_access_token', data.access_token);
            loading = 0;
          }
        }
      }
    };
    xml.open(
      'post',
      'https://yazaar.pythonanywhere.com/spotifyAPI/refresh',
      true
    );
    xml.send(data.refresh_token);
  };

  let generateRGB = function () {
    // generate a RGB color with specific ruleset.
    let MyColor = [0, 0, 0];
    MyColor[Math.floor(Math.random() * 3)] = 255;

    let SecondIndex = Math.floor(Math.random() * 4);

    if (MyColor[SecondIndex] == 0) {
      MyColor[SecondIndex] = Math.floor(Math.random() * 256);
    } else {
      MyColor[(SecondIndex + 1) % 2] = Math.floor(Math.random() * 256);
    }
    return 'rgb(' + MyColor[0] + ',' + MyColor[1] + ',' + MyColor[2] + ')';
  };

  let argConfig = function (url_params) {
    let textScale = parseFloat(url_params.get('textScale'));
    if (!Number.isNaN(textScale)) {
      titleElement.style.fontSize = (35 * textScale) + 'vh';
      authorElement.style.fontSize = (25 * textScale) + 'vh';
    }
    let imgSize = parseFloat(url_params.get('imgSize'));
    if (!Number.isNaN(imgSize)) {
      imageElement.style.width = imgSize + 'vh';
      imageElement.style.height = imgSize + 'vh';
    }
    let roundBox = parseFloat(url_params.get('roundBox'));
    if (!Number.isNaN(roundBox)) {
      document.querySelector('#wrapper').style.borderRadius = roundBox + 'px';
    }
    let roundImg = parseFloat(url_params.get('roundImg'));
    if (!Number.isNaN(roundImg)) {
      imageElement.style.borderRadius = roundImg + 'px';
    }
  }

  let launch = function () {
    title_ticker = {
      running: false,
      distance: 0,
      state: 0,
      ticker_object: '',
    }; // data for the title ticker
    author_ticker = {
      running: false,
      distance: 0,
      state: 0,
      ticker_object: '',
    }; // data for the author ticker

    ticker_speed = 40; // changes the speed of the tickers, title and author

    let url_params = new URLSearchParams(window.location.search);

    argConfig(url_params)

    data = {
      access_token: localStorage.getItem('spotify_access_token'),
      refresh_token: localStorage.getItem('spotify_refresh_token'),
      txtform_token: url_params.get('token'),
    };

    setTimeout(checkTickers, 2500);
    window.addEventListener('resize', checkTickers);

    if (!data.refresh_token && !data.txtform_token) {
      titleElement.innerText = 'no provided token, read more on GitHub';
      authorElement.innerText = 'https://github.com/Yazaar/Spotify-Overlay';
      return;
    }

    if (data.txtform_token && data.access_token) {
      localStorage.removeItem('spotify_access_token');
      delete data.access_token;
    }
    if (data.txtform_token && data.refresh_token) {
      localStorage.removeItem('spotify_refresh_token');
      delete data.refresh_token;
    }


    loop_variable = setInterval(newRequest, 2500);
    loading_key = { state: false, timestamp: new Date() };
  };
  let loading_key;
  let loop_variable;
  let ticker_speed;
  launch();
})();
