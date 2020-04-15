let url_params = new URLSearchParams(window.location.search)

if (typeof url_params.get("access_token") != "string" && typeof url_params.get("refresh_token") != "string" && window.location.hash == ""){
    window.location = 'http://yazaar.pythonanywhere.com/spotifyAPI/request/' + encodeURIComponent(encodeURIComponent(window.location.origin + window.location.pathname)) + '/user-read-currently-playing'
}

document.getElementById("InputURL").innerHTML = window.location.href.replace("/setup.html", "")