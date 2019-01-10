import webbrowser, subprocess, time, requests, json

SpotifyClosed = False
ArtistFile = ""
SongFile = ""

with open("API_Settings.txt") as f:
    Settings = f.read()

with open("to_text_settings.txt") as f:
    ToTextSettings = f.read()

Settings = Settings.split("\n")
ToTextSettings = ToTextSettings.split("\n")

while "" in Settings:
    Settings.remove("")

while "" in ToTextSettings:
    ToTextSettings.remove("")

if len(ToTextSettings) != 4:
    print('\n\n\n\n\n\n\n\n\n\nto_text_settings.txt file invalid. Insert "y" to exit with a file reset. Insert "n" to exit without a file reset.\n')
    while True:
        checkpoint = input().lower()
        if checkpoint == "y":
            with open("to_text_settings.txt", "w") as f:
                f.write('Update with spotify interval (seconds):\n2\n\nAdd at the end of each text document (For example spaces which leads to free space when scroll filter is turned on) Type whatever you want inside of the quotes:\n""')
            exit()
        elif checkpoint == "n":
            exit()
else:
    try:
        interval = float(ToTextSettings[1])
    except Exception:
        print('\n\n\n\n\n\n\n\n\n\nto_text_settings.txt file invalid. Insert "y" to use default (2 seconds) + to reset file. Insert "r" to close software + reset file. Insert "n" to close software without a file reset.\n')
        while True:
            checkpoint = input().lower()
            if checkpoint == "y":
                with open("to_text_settings.txt", "w") as f:
                    f.write("Update with spotify interval (seconds):\n2")
                interval = 2
                break

            elif checkpoint == "n":
                exit()

            elif checkpoint == "r":
                with open("to_text_settings.txt", "w") as f:
                    f.write("Update with spotify interval (seconds):\n2")
                exit()

if len(Settings) != 7:
    print('\n\n\n\n\n\n\n\n\n\nAPI_Settings.txt file invalid, have to be reset. Insert "y" to continue, insert "n" to cancel.\nI would recommend that you save important data before inserting "y" to save yourself some time.\n\nFeel free to try and fix it by yourself, you can always come back. (should be 7 lines in the document + optional empty rows)\n')
    while True:
        checkpoint = input()
        if checkpoint == "y":
            with open("API_Settings.txt", "w") as f:
                f.write("Please do not remove or add lines to this document, that would harm the software.\n\nClient ID:\nPaste your client ID here.\n\nClient Secret:\nPaste your Client Secret here.\n\nRedirect URI:\nPaste your Redirect URI here.")
            exit()
        if checkpoint == "n":
            exit()
        

EndWith = ToTextSettings[3].replace('"', "")

Client_ID = Settings[2]

nested_data64 = Settings[4]

RedirectURI = Settings[6]

if len(Settings) != 7:
    print('\n\n\n\n\n\n\n\n\n\nAPI_Settings.txt file invalid, have to be reset. Insert "y" to continue, insert "n" to cancel.\nI would recommend that you save important data before inserting "y" to save yourself some time.\n\nFeel free to try and fix it by yourself, you can always come back. (should be 7 lines in the document + optional empty rows)\n')
    while True:
        checkpoint = input().lower()
        if checkpoint == "y":
            with open("API_Settings.txt", "w") as f:
                f.write("Please do not remove or add lines to this document, that would harm the software.\n\nClient ID:\nPaste your client ID here.\n\nClient Secret:\nPaste your Client Secret here.\n\nRedirect URI:\nPaste your Redirect URI here.")
            exit()
        if checkpoint == "n":
            exit()

auth_url = f"https://accounts.spotify.com/authorize?client_id={Client_ID}&redirect_uri={RedirectURI}&response_type=code&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state"

webbrowser.open(auth_url)

print("Please login and accept use of application.", "Insert redirect URL:")
redirect_data = input()
print("\n\n\n\n\n")

if redirect_data != "" and "?" in redirect_data:
    redirect_data = redirect_data.split("?")[1]
else:
    print("Invalid redirect URL. Press return/enter to exit...")
    input()
    exit()

if redirect_data[0:][:4] == "code":
    code = redirect_data[5:]

    headers = {
        'Authorization': 'Basic '+nested_data64,
        }

    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': RedirectURI
        }

    API_Key = json.loads(requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data).text)

    access_token = API_Key["access_token"]
    refresh_token = API_Key["refresh_token"]

    print("SpotifyAPI_To_Text = active\n\n")

    refresh_time = time.time() + 1200

    while True:
        time.sleep(interval)
        if time.time() > refresh_time:
            refresh_time = time.time() + 1200
            res = json.loads(requests.post("https://accounts.spotify.com/api/token", data={"grant_type":"refresh_token", "refresh_token":refresh_token}, headers={"Authorization": 'Basic '+nested_data64}).text)
            access_token = res["access_token"]
        
        RawData = requests.get("https://api.spotify.com/v1/me/player/currently-playing", headers={"Authorization":"Bearer "+access_token}).text
        if len(RawData) == 0:
            if not SpotifyClosed:
                print("Spotify is closed! Not closed? Play any song for a short moment of time to register activity.")
                SpotifyClosed = True
        else:
            SpotifyData = json.loads(RawData)
            if SpotifyData["is_playing"] and SpotifyData["currently_playing_type"] == "track":

                if SpotifyData["item"]["name"] != SongFile:
                    with open("to_text_data\\song.txt", "w") as f:
                        f.write(SpotifyData["item"]["name"] + EndWith)
                    SongFile = SpotifyData["item"]["name"]

                artists = ""

                for i in SpotifyData["item"]["artists"]:
                    if artists == "":
                        artists = artists + i["name"]
                    else:
                        artists = artists + ", " + i["name"]
                
                if artists != ArtistFile:
                    with open("to_text_data\\artist.txt", "w") as f:
                        f.write(artists + EndWith)
                    ArtistFile = artists
else:
    print("Invalid redirect URL. Press return/enter to exit...")
    input()
    exit()