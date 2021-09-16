*Ever wondered the duration of a course content you follow, your media library, or your cool random videos?
I have a solution for you!!*
<br>
<br>
install duration CLI using npm:

```sh
npm i -g duration-cli
```

<br>

then, `cd` into any directory you want and run the following command:

```sh
dur
```

#### and voila 🚀


![Demo](https://i.imgur.com/LuTtqJH.gif)

<br>

### How does it work?

The CLI by default checks the current folder and it's sub-folders (recursively) for any media files, then it will show the total duration of the media files after it's finished calculating it.


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

**What's new in version 2.1?**

* Added new features like minimal view, debug info and more...
* Improved the UI
* Switched to use ffprobe directly without depending on external wrapper packages
* The CLI now comes with a bundled ffprobe version, so you won't bother installing yourself
* Removed some 3rd party dependencies to make the CLI size smaller

***Known issues***:

* A little bit of lagging might happen when calculating a large number of media files

* Slightly large download size (mainly because of the bundled version of ffprobe binary which is around 70MB)

In case you face any bug, or have improvement in mind, contact me at my email iamrokt@gmail.com, or my Instagram @inrokt

Any contribution to the CLI is highly appreciated, so don't hesitate to show your magic 🎩
