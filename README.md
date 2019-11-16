# Spotify-API
<img src="https://raw.githubusercontent.com/Yazaar/Project-Assets/master/SpotifyAPI/preview.png"/>
<h3>Setup guide (cloud edition, new version)</h3>
This is the URL for the overlay, open it up as a browser source if your software includes interact. Use the interact function by rightclicking on your browser source to login to your spotify account which you would like to track. I would recommend to drag the browser source out of the streams view while typing in your cridentials. You may exit the interact function when the login process is completed.
<h2>https://yazaar.github.io/Spotify-API</h2>
<p>---------------------------------------------------------</p>
This URL can be used for the ones who does not have a software which includes interact, open it up in your standard browser. Login to your spotify account which you would like to track and wait to get redirected. A URL should pop up on your browser, copy it and paste it into your browser source. Repeat this process when required, PROBABLY once a day when you startup the stream.
<h2>https://yazaar.github.io/Spotify-API/setup.html</h2>

Choose the width and height of the browser source to your liking.<br>
Higher = Slower moving text<br>
Wider = more text displayed at once

<br><br><br>
<h3>Setup guide (download edition, old version):</h3>
<strong><em>The app is already deleted, no need to try using my Client ID and Client Secret!</em></strong><br>
First of all, <a href="https://github.com/Yazaar/Spotify-API/archive/master.zip">download</a> the files<br><br>

When your files are downloaded, head over to <a href="https://developer.spotify.com/dashboard">this</a> spotify website and login to your account (your normal spotify account)
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step1.jpg?raw=true" alt="Step 1" width="1000">

When you are logged in, click on "CREATE A CLIENT ID".
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step2.jpg?raw=true" alt="Step 2" width="1000">

A form should pop up.<br>
1: Give your app a name (does not matter what at all)<br>
2: Give your app a description (does not matter what either)<br>
3: Check "Desktop App" (that what you will use this to)<br>
4: Click "NEXT"
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step3.jpg?raw=true" alt="Step 3" width="1000">

Click "NO" (Read as well)
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step4.jpg?raw=true" alt="Step 4" width="1000">

1: Check all checkboxes (Read as well)<br>
2: Click "SUBMIT"
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step5.jpg?raw=true" alt="Step 5" width="1000">

You should now see something like this, copy your Client ID
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step6.jpg?raw=true" alt="Step 6" width="1000">

Open up API_Settings.txt and paste your Client ID here.
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step7.jpg?raw=true" alt="Step 7" width="1000">

Head back to the spotify website and click "SHOW CLIENT SECRET", do not copy it yet. <strong>Do not show the Client Secret to anyone, handle it like a password! If leaked, click reset to get a new one and redo the steps!</strong>
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step8.jpg?raw=true" alt="Step 8" width="1000">

1: Open up <a href="https://www.base64encode.org/">this</a> URL<br>
2: Paste your client ID and add ":" after it (nr 1 in image)<br>
3: Copy your Client Secret (next image)
4: Paste your Client Secret after ":" (nr 1 in image)<br>
5: Click "ENCODE" (nr 2 on the image)<br>
6: Copy the result (nr 3 on the image)
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step11.jpg?raw=true" alt="Step 11" width="1000">
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step10.jpg?raw=true" alt="Step 10" width="1000">

Open the text document API_Settings.txt and paste the result under "Client Secret:"
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step12.jpg?raw=true" alt="Step 12" width="1000">

Click on "EDIT SETTINGS" on the spotify website (not marked on image... But green button to the right)
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step10.jpg?raw=true" alt="Step 10" width="1000">

1:A window should have popped up, find "Redirect URIs" and write https://github.com/Yazaar/ 
You are not restricted to use this URL but remember what you have there. (you will need it)<br>
2: Click "ADD"
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step13.jpg?raw=true" alt="Step 13" width="1000">

Scroll all the way down and click "SAVE"
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step14.jpg?raw=true" alt="Step 14" width="1000">

Lastly open up API_Settings.txt and paste your URL. Remember "/" at the end, very important to get it working.
<img src="https://github.com/Yazaar/Project-Assets/blob/master/SpotifyAPI/Step15.jpg?raw=true" alt="Step 15" width="1000">

<h3>All one time setups are now done!</h3>
Read Instructions.txt for a guide over the rest. Thanks<br>
//Yazaar
