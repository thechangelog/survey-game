# Frontend Feud / Gophers Say

A Family Feud style board game interface used by Changelog for the [JS Party](https://jsparty.fm) and [Go Time](https://gotime.fm) podcasts.

<div align="center">
	<img width="400" src="https://github.com/thechangelog/survey-game/raw/main/static/images/jsparty-example.png" alt="JS Party Example">
	<img width="400" src="https://github.com/thechangelog/survey-game/raw/main/static/images/gotime-example.png" alt="Go Time Example">
</div>

This project was adapted from [a CodePen](https://codepen.io/nicholasjackson827/pen/vLyLqg) with the "backend" written in Go (by a non-gopher).

## How to use

Game data is stored in JSON files in the `games` directory. Start the server by passing in the podcast and episode slug for the appropriate game. For example, to load the server with [Go Time's 200th episode](https://gotime.fm/200), execute:

```
go run main.go gotime 200
```

Then visit `http://localhost:8000` in a Chromium-based browser (other rendering engines will likely work, but are untested) and _go_ from there.

### Keyboard shortcuts

The entire game board can be controlled via the keyboard with the following keys:

- 1-9: Toggle reveal of answer 1-9
- ←: Make team one active
- →: Make team two active
- a: (a)ward points to active team
- y: right answer sound (yes)
- n: wrong answer sound (no)
- p: activate next (p)layer on active team
- r: go to the next (r)ound
- e: go back to previous round
- x: Adds a miss to active team

## Legal

Code is released under the [MIT license](/LICENSE).

Images and sounds are released under the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

This project is in no way affiliated with nor endorsed by the real [Family Feud](https://www.familyfeud.com).
