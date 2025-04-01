package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func serveItemsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItems(w, req)
		return
	} else if req.Method == "POST" {
		postItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveItems(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveBoxesIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItems(w, req)
		return
	} else if req.Method == "POST" {
		postItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveBoxes(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveItemsByBox(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItemsByBox(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveShelfsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItems(w, req)
		return
	} else if req.Method == "POST" {
		postItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveShelfs(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveBoxesByShelf(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItemsByBox(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveRoomsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItems(w, req)
		return
	} else if req.Method == "POST" {
		postItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveRooms(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getRoom(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func serveShelfsByRoom(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItemsByBox(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getItemsByBox(w http.ResponseWriter, req *http.Request) {
	boxId, _ := strconv.Atoi(req.PathValue("boxId"))
	items, err := loadItemsByBox(int64(boxId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Items for box with ID %d: %v\n", boxId, err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
}

func getItems(w http.ResponseWriter, req *http.Request) {
	items, err := loadItems()
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Items: %v\n", err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
}

func getItem(w http.ResponseWriter, req *http.Request) {
	itemId, _ := strconv.Atoi(req.PathValue("itemId"))
	items, err := loadItem(int64(itemId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Item with ID %d: %v\n", itemId, err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
}

func postItem(w http.ResponseWriter, req *http.Request) {
	var item Item

	err := json.NewDecoder(req.Body).Decode(&item)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Item: %v\n", err)
		return
	}

	item.id = -1

	err = createItem(item)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Item: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

func getRoom(w http.ResponseWriter, req *http.Request) {
	roomId, _ := strconv.Atoi(req.PathValue("roomId"))
	items, err := loadRoom(int64(roomId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load room with ID %d: %v\n", roomId, err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
}

func initHttpApi() {
	http.HandleFunc("/items/", serveItemsIndex)
	http.HandleFunc("/items/{itemId}", serveItems)
	http.HandleFunc("/boxes/", serveBoxesIndex)
	http.HandleFunc("/boxes/{boxId}", serveBoxes)
	http.HandleFunc("/boxes/{boxId}/items", serveItemsByBox)
	http.HandleFunc("/shelfs/", serveShelfsIndex)
	http.HandleFunc("/shelfs/{shelfId}", serveShelfs)
	http.HandleFunc("/shelf/{shelfId}/boxes", serveBoxesByShelf)
	http.HandleFunc("/rooms/", serveRoomsIndex)
	http.HandleFunc("/rooms/{roomId}", serveRooms)
	http.HandleFunc("/rooms/{roomId}/shelfs", serveShelfsByRoom)

	fmt.Println("Listening on port 8080")

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
