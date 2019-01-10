import webbrowser, subprocess, time, requests

"""
SCOPES:

user-read-currently-playing
user-read-recently-played
user-read-playback-state

"""

with open("API_Settings.txt", "r") as f:
    Settings = f.read()

Settings = Settings.split("\n")

while "" in Settings:
    Settings.remove("")

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

Client_ID = Settings[2]

RedirectURI = Settings[6]

nested_data64 = Settings[4]

Basic = "Basic " + nested_data64

auth_url = f"https://accounts.spotify.com/authorize?client_id={Client_ID}&redirect_uri={RedirectURI}&response_type=code&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state"

webbrowser.open(auth_url)
print("Please login and accept use of application.", "Insert redirect URL:")
redirect_data = input()

if redirect_data != "":
    redirect_data = redirect_data.split("?")[1]

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

    API_Res = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data).text

    API_Res = "var API_Key = " + str(API_Res) + '\nvar API_Basic = "[NESTED_DATA64]"'.replace("[NESTED_DATA64]", Basic)

    with open("key.js", "w") as f:
        f.write(API_Res)
    print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    print("Sucess, SpotifyStats.html ready for use! Press enter/return to exit.")

else:
    print("Failed to authenticate, please try again later. Press enter/return to exit.")

input()