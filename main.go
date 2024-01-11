package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
)

type Game struct {
	Title  string
	Theme  string
	Teams  []Team
	Rounds []Round
}

type Team struct {
	Name    string
	Class   string
	Members []Member
}

type Member struct {
	Name  string
	Image string
}

type Round struct {
	Number    int
	Title     string
	Question  string
	Responses []Response
}

type Response struct {
	Rank   int
	Answer string
	Points int
	Score  string
}

type Page struct {
	Game  Game
	Round Round
	Next  int
}

func index(w http.ResponseWriter, r *http.Request, game Game) {
	// extract the round number from the path
	pString := strings.Split(r.URL.Path, "/")[1]

	// default to the 1st round if there isn't one specified
	if pString == "" {
		pString = "1"
	}

	pInt, err := strconv.Atoi(pString)

	if err != nil {
		fmt.Println("error:", err)
	}

	next := pInt + 1

	// 0 terminates the 'Next Round' button
	if next > len(game.Rounds) {
		next = 0
	}

	tmpl := template.Must(template.ParseFiles("layout.html"))

	page := Page{
		Game:  game,
		Round: game.Rounds[pInt-1],
		Next:  next}

	tmpl.Execute(w, page)
}

func loadGame(podcast string, episode string) Game {
	dataPath := fmt.Sprintf("./games/%s-%s.json", podcast, episode)
	data, err := ioutil.ReadFile(dataPath)

	if err != nil {
		fmt.Print(err)
	}

	var game Game

	err = json.Unmarshal(data, &game)

	if err != nil {
		fmt.Println("error:", err)
	}

	game.Theme = podcast

	return game
}

func main() {
	podcast := os.Args[1]
	episode := os.Args[2]

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		game := loadGame(podcast, episode)
		index(w, r, game)
	})

	fmt.Println("Listening on http://localhost:8000")

	http.ListenAndServe(":8000", nil)
}
