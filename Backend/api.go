package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func serveItemsByBox(w http.ResponseWriter, req *http.Request) {
	boxId, _ := strconv.Atoi(req.PathValue("boxId"))
	items, err := loadItemsByBox(int64(boxId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Println("Failed to load Items for box 1: %v", err)
		w.Write([]byte("Failed to load Items for box 1"))
		return
	}
	json, err := json.Marshal(items)
	w.Write(json)
}

func serveRoom(w http.ResponseWriter, req *http.Request) {
	roomId, _ := strconv.Atoi(req.PathValue("roomId"))
	items, err := loadRoom(int64(roomId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Items for room %d: %v\n", roomId, err)
		w.Write([]byte("Failed to load Items for room" + strconv.Itoa(roomId)))
		return
	}
	json, err := json.Marshal(items)
	w.Write(json)
}

func initHttpApi() {
	http.HandleFunc("/items/{boxId}", serveItemsByBox)
	http.HandleFunc("/rooms/{roomId}", serveRoom)

	fmt.Println("Listening on port 8080")

	http.ListenAndServe(":8080", nil)
}
