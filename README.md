# webgame

## Steps for setting up:

1. Go to [the git website](http://git-scm.com/) and install git.

2. Use the following command to clone the webgame project.

    git clone https://github.com/csusbdt/webgame.git

## To see a running instance of webgame:

- [Webgame](http://csusbdt594.appspot.com/webgame/)

## System design

- Each map is defined in its own HTML file.
- There is a single module (map.js) that contains functionality common to all maps.
- Functionality that is particular to a given map will be stored in the map's HTML file.
- Each NPC is defined in its own module.
- The game state will be stored using HTML5 local storage.
- Every user input event is followed by a call to the update methods of all NPCs

By "module," we mean AMD module. See https://github.com/amdjs/amdjs-api/wiki/AMD

Because AMD is just an API specification, we need a library that implements AMD in order to define and load modules. We are currently using the curl loader.  See https://github.com/cujojs/curl

## TO DO:

- Add local storage and a polyfill for it.
- Figure out how to incorporate animations.
- Figure out how to incorporate sound effects in browsers that support it.
- Figure out how to incorporate music.
