*Ever wondered the duration of a course content you follow, your media library, or your cool random videos?
I have a solution for you!!*
<br>
<br>
install duration CLI using npm:

```sh
npm i -g dur-cli
```

<br>

then, `cd` into any directory you want and run `dur`


![Demo](https://i.imgur.com/LuTtqJH.gif)

<br>

### 🚀 **NEW** 🚀 Get duration for YouTube playlist:



1- first, have your Google API key, follow [this tutorial](https://youtu.be/Jl9Nitf8PJs) to show you how to get your own API key

2- run the following command `dur init` then paste the API key you got from the previous step

3- run the following command to get YouTube playlist duration, put the playlist ID or URL after the --pl flag

```bash
dur --pl PUT_PLAYLIST_ID_OR_URL_HERE
```

#### How does it work?

The CLI by default checks the current folder and it's sub-folders (recursively) for any media files, then it will show the total duration of the media files after it's finished calculating it.

#### See a live demo of the app:
Check out [this video](https://youtu.be/JKXq7reTbAM) to see what the app can do!!

#### Disclaimer

> ffprobe (the tool used by the CLI) sometimes fails to read certain media files metadata for some reason; that's why sometimes certain files might not show duration. You can view the log to have more info using `dur -l`

<br>

#### For the full list of commands type:
```sh
dur -h
```

#### to view the log info, type the following command:


```sh
dur -l
```
<br>

**What's new in version 2?**

* Added ability to get YouTube playlists duration
* Improved the UI
* Fixed bugs

<br>

***Known issues***:

* A little bit of lagging might happen when calculating a large number of media files

* Slightly large download size

<br>

> **Any contribution to the CLI is highly appreciated, so don't hesitate to show your magic 🎩**

### contact me:
twitter: [@roktmy](https://www.twitter.com/roktmy)
insta: [@roktmy](https://www.instagram.com/inrokt)
