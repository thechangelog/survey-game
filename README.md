# Frontend Feud / Gophers Say

A Family Feud style board game interface used by Changelog for the [JS Party](https://jsparty.fm) and [Go Time](https://gotime.fm) podcasts.

<div align="center">
	<img width="450" src="https://github.com/thechangelog/survey-game/raw/static/images/jsparty-example.png" alt="JS Party Example">
	<img width="450" src="https://github.com/thechangelog/survey-game/raw/static/images/gotime-example.png" alt="Go Time Example">
</div>

This project was adapted from [a CodePen](https://codepen.io/nicholasjackson827/pen/vLyLqg) with the "backend" written in Go (by a non-gopher).

## How to use

Game data is stored in JSON files in the `games` directory. Start the server by passing in the podcast and episode slug for the appropriate game. For example, to load the server with [Go Time's 200th episode](https://gotime.fm/200), execute:

```
go run main.go gotime 200
```

Then visit `http://localhost:8000` in a Chromium-based browser (other rendering engines will likely work, but are untested) and _go_ from there.

## Legal

Code is released under the [MIT license](/LICENSE).

Images and sounds are released under the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).

This project is in no way affiliated with nor endorsed by the real [Family Feud](https://www.familyfeud.com).
