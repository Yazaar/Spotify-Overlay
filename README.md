# Spotify-Overlay
<h2><a href="https://www.youtube.com/watch?v=jV7i-dB8Quc">This project is covered on YouTube, check it out (changed in configuration since then though)!</a></h2>
<img src="https://raw.githubusercontent.com/Yazaar/Project-Assets/master/SpotifyAPI/preview.png"/>

Choose the width and height of the browser source to your liking.<br>
Higher = Slower moving text<br>
Wider = more text displayed at once

<h2>Setup</h2>
<ol>
  <li>Head over to <a href="txtform.yazaar.xyz"></a> and login with a Twitch account (does not matter which)</li>
  <li>When you are signed in, head to the dashboard and click "connect account", connect your Spotify account</li>
  <li>When your account is connected click "edit" on the connected Spotify account</li>
  <li>Click "Copy account secret"</li>
  <li>In OBS, use the link <a href="https://yazaar.github.io/Spotify-Overlay?token=your_copied_token">https://yazaar.github.io/Spotify-Overlay?token=your_copied_token</a> in your browser source</li>
  <li>Remove all default CSS styling settings in the OBS browser source to prevent changes to the overlay. Then done!</li>
</ol>

<h2>Optional configurations</h2>
<a href="https://yazaar.github.io/Spotify-Overlay?token=your_copied_token&textScale=0.75&imgSize=75&roundBox=10&roundImg=10">https://yazaar.github.io/Spotify-Overlay?token=your_copied_token&textScale=0.75&imgSize=75&roundBox=10&roundImg=10</a>

<h3>Scale down the text - textScale</h3>
<p>Make the text smaller by &textScale=0.75 (makes the text 0.75x the original size)</p>

<h3>Change the size of the image - imgSize</h3>
<p>Make the text smaller by &imgSize=50 (makes the image take 50% of the full height)</p>

<h3>Change the border radius of the box - roundBox</h3>
<p>Make the background box have round corners by &roundBox=10 (gives it a 10 pixel radius)</p>

<h3>Change the border radius of the image - roundImg</h3>
<p>Make the image have round corners by &round>Img=10 (gives it a 10 pixel radius)</p>
