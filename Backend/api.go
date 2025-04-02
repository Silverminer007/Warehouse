package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// Serves /items
func serveItemsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItems(w)
		return
	} else if req.Method == "POST" {
		postItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getItems(w http.ResponseWriter) {
	items, err := loadItems()
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Items: %v\n", err)
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

	if item.id != 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("fixing item id when creating item is not allowed"))
		return
	}

	err = createItem(item)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Item: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /items/{itemId}
func serveItems(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getItem(w, req)
		return
	} else if req.Method == "PUT" {
		putItem(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getItem(w http.ResponseWriter, req *http.Request) {
	itemId, _ := strconv.Atoi(req.PathValue("itemId"))
	items, err := loadItem(int64(itemId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Item with id %d: %v\n", itemId, err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
	w.WriteHeader(200)
}

func putItem(w http.ResponseWriter, req *http.Request) {
	var item Item

	err := json.NewDecoder(req.Body).Decode(&item)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Item: %v\n", err)
		return
	}

	itemId, _ := strconv.Atoi(req.PathValue("itemId"))
	item.id = int64(itemId)

	fmt.Printf("Updating Item with id %d to Name \"%s\" and Box %d\n", item.id, item.Name, item.Box)
	err = updateItem(item)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to update Item: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /boxes
func serveBoxesIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getBoxes(w)
		return
	} else if req.Method == "POST" {
		postBox(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getBoxes(w http.ResponseWriter) {
	boxes, err := loadBoxes()
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Boxes: %v\n", err)
		return
	}
	jsonResponse, err := json.Marshal(boxes)
	w.Write(jsonResponse)
}

func postBox(w http.ResponseWriter, req *http.Request) {
	var box Box

	err := json.NewDecoder(req.Body).Decode(&box)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Box: %v\n", err)
		return
	}

	if box.id != 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("fixing box id when creating box is not allowed"))
		return
	}

	err = createBox(box)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Box: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /boxes/{boxId}
func serveBoxes(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getBox(w, req)
		return
	} else if req.Method == "PUT" {
		putBox(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getBox(w http.ResponseWriter, req *http.Request) {
	boxId, _ := strconv.Atoi(req.PathValue("boxId"))
	boxes, err := loadBox(int64(boxId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Box with id %d: %v\n", boxId, err)
		return
	}
	jsonResponse, err := json.Marshal(boxes)
	w.Write(jsonResponse)
	w.WriteHeader(200)
}

func putBox(w http.ResponseWriter, req *http.Request) {
	var box Box

	err := json.NewDecoder(req.Body).Decode(&box)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Box: %v\n", err)
		return
	}

	boxId, _ := strconv.Atoi(req.PathValue("boxId"))
	box.id = int64(boxId)

	err = updateBox(box)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to update Box: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /boxes/{boxId}/items
func serveItemsByBox(w http.ResponseWriter, req *http.Request) {
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
		fmt.Printf("Failed to load Items for box with id %d: %v\n", boxId, err)
		return
	}
	jsonResponse, err := json.Marshal(items)
	w.Write(jsonResponse)
}

// Serves /shelfs
func serveShelfsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getShelfs(w)
		return
	} else if req.Method == "POST" {
		postShelf(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getShelfs(w http.ResponseWriter) {
	shelfs, err := loadShelfs()
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Shelfs: %v\n", err)
		return
	}
	jsonResponse, err := json.Marshal(shelfs)
	w.Write(jsonResponse)
}

func postShelf(w http.ResponseWriter, req *http.Request) {
	var shelf Shelf

	err := json.NewDecoder(req.Body).Decode(&shelf)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Shelf: %v\n", err)
		return
	}

	if shelf.id != 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("fixing shelf id when creating shelf is not allowed"))
		return
	}

	err = createShelf(shelf)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Shelf: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /shelfs/{shelfId}
func serveShelfs(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getShelf(w, req)
		return
	} else if req.Method == "PUT" {
		putShelf(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getShelf(w http.ResponseWriter, req *http.Request) {
	shelfId, _ := strconv.Atoi(req.PathValue("shelfId"))
	shelfs, err := loadShelf(int64(shelfId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Shelf with id %d: %v\n", shelfId, err)
		return
	}
	jsonResponse, err := json.Marshal(shelfs)
	w.Write(jsonResponse)
	w.WriteHeader(200)
}

func putShelf(w http.ResponseWriter, req *http.Request) {
	var shelf Shelf

	err := json.NewDecoder(req.Body).Decode(&shelf)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Shelf: %v\n", err)
		return
	}

	shelfId, _ := strconv.Atoi(req.PathValue("shelfId"))
	shelf.id = int64(shelfId)

	err = updateShelf(shelf)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to update Shelf: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /shelfes/{shelfId}/boxes
func serveBoxesByShelf(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getBoxesByShelf(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getBoxesByShelf(w http.ResponseWriter, req *http.Request) {
	shelfId, _ := strconv.Atoi(req.PathValue("shelfId"))
	boxes, err := loadBoxesByShelf(int64(shelfId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Boxes for shelf with id %d: %v\n", shelfId, err)
		return
	}
	jsonResponse, err := json.Marshal(boxes)
	w.Write(jsonResponse)
}

// Serves /rooms
func serveRoomsIndex(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getRooms(w)
		return
	} else if req.Method == "POST" {
		postRoom(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getRooms(w http.ResponseWriter) {
	rooms, err := loadRooms()
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Rooms: %v\n", err)
		return
	}
	jsonResponse, err := json.Marshal(rooms)
	w.Write(jsonResponse)
}

func postRoom(w http.ResponseWriter, req *http.Request) {
	var room Room

	err := json.NewDecoder(req.Body).Decode(&room)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Room: %v\n", err)
		return
	}

	if room.id != 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("fixing room id when creating room is not allowed"))
		return
	}

	err = createRoom(room)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Room: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /rooms/{roomId}
func serveRooms(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getRoom(w, req)
		return
	} else if req.Method == "PUT" {
		putRoom(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getRoom(w http.ResponseWriter, req *http.Request) {
	roomId, _ := strconv.Atoi(req.PathValue("roomId"))
	rooms, err := loadRoom(int64(roomId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Room with id %d: %v\n", roomId, err)
		return
	}
	jsonResponse, err := json.Marshal(rooms)
	w.Write(jsonResponse)
	w.WriteHeader(200)
}

func putRoom(w http.ResponseWriter, req *http.Request) {
	var room Room

	err := json.NewDecoder(req.Body).Decode(&room)

	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to create Room: %v\n", err)
		return
	}

	roomId, _ := strconv.Atoi(req.PathValue("roomId"))
	room.id = int64(roomId)

	err = updateRoom(room)
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to update Room: %v\n", err)
		return
	}

	w.WriteHeader(200)
}

// Serves /roomes/{roomId}/shelfs
func serveShelfsByRoom(w http.ResponseWriter, req *http.Request) {
	if req.Method == "GET" {
		getShelfsByRoom(w, req)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}

func getShelfsByRoom(w http.ResponseWriter, req *http.Request) {
	roomId, _ := strconv.Atoi(req.PathValue("roomId"))
	shelfs, err := loadShelfsByRoom(int64(roomId))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("Failed to load Shelfs for room with id %d: %v\n", roomId, err)
		return
	}
	jsonResponse, err := json.Marshal(shelfs)
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
	http.HandleFunc("/shelfs/{shelfId}/boxes", serveBoxesByShelf)
	http.HandleFunc("/rooms/", serveRoomsIndex)
	http.HandleFunc("/rooms/{roomId}", serveRooms)
	http.HandleFunc("/rooms/{roomId}/shelfs", serveShelfsByRoom)

	fmt.Println("Listening on port 8080")

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
