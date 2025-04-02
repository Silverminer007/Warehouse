package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDatabase() {
	// Capture connection properties.
	cfg := mysql.Config{
		User:   os.Getenv("MYSQL_USER"),
		Passwd: os.Getenv("MYSQL_PASSWORD"),
		Net:    "tcp",
		Addr:   "localhost:3306",
		DBName: "warehouse",
	}
	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")
}

func loadItems() ([]Item, error) {
	var items []Item

	rows, err := db.Query("SELECT * FROM items")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.id, &item.Name, &item.Box); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("all items: %v", err)
	}

	return items, nil
}

func loadItem(itemId int64) (Item, error) {
	var item Item
	row := db.QueryRow("SELECT * FROM items WHERE id=?", itemId)
	if err := row.Scan(&item.id, &item.Name, &item.Box); err != nil {
		return Item{}, err
	}
	return item, nil
}

func createItem(item Item) error {
	_, err := db.Exec("INSERT INTO items (name, boxId) VALUES (?, ?)", item.Name, item.Box)
	return err
}

func updateItem(item Item) error {
	_, err := db.Exec("UPDATE items SET name=?, boxId=? WHERE id=?", item.Name, item.Box, item.id)
	return err
}

func loadBoxes() ([]Box, error) {
	var boxes []Box

	rows, err := db.Query("SELECT * FROM boxes")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var box Box
		if err := rows.Scan(&box.id, &box.Name, &box.Shelf); err != nil {
			return nil, err
		}
		boxes = append(boxes, box)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("all items: %v", err)
	}

	return boxes, nil
}

func loadBox(boxId int64) (Box, error) {
	var box Box
	row := db.QueryRow("SELECT * FROM boxes WHERE id=?", boxId)
	if err := row.Scan(&box.id, &box.Name, &box.Shelf); err != nil {
		return Box{}, err
	}
	return box, nil
}

func createBox(box Box) error {
	_, err := db.Exec("INSERT INTO boxes (name, shelfId) VALUES (?, ?)", box.Name, box.Shelf)
	return err
}

func updateBox(box Box) error {
	_, err := db.Exec("UPDATE boxes SET name=?, shelfId=? WHERE id=?", box.Name, box.Shelf, box.id)
	return err
}

func loadItemsByBox(boxId int64) ([]Item, error) {
	var items []Item

	rows, err := db.Query("SELECT * FROM items WHERE BoxId=?", boxId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var item Item
		if err := rows.Scan(&item.id, &item.Name, &item.Box); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("itemsByBox %q: %v", boxId, err)
	}

	return items, nil
}

func loadShelfs() ([]Shelf, error) {
	var shelfs []Shelf

	rows, err := db.Query("SELECT * FROM shelfs")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var shelf Shelf
		if err := rows.Scan(&shelf.id, &shelf.Name, &shelf.Room); err != nil {
			return nil, err
		}
		shelfs = append(shelfs, shelf)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("all items: %v", err)
	}

	return shelfs, nil
}

func loadShelf(shelfId int64) (Shelf, error) {
	var shelf Shelf
	row := db.QueryRow("SELECT * FROM shelfs WHERE id=?", shelfId)
	if err := row.Scan(&shelf.id, &shelf.Name, &shelf.Room); err != nil {
		return Shelf{}, err
	}
	return shelf, nil
}

func createShelf(shelf Shelf) error {
	_, err := db.Exec("INSERT INTO shelfs (name, roomId) VALUES (?, ?)", shelf.Name, shelf.Room)
	return err
}

func updateShelf(shelf Shelf) error {
	_, err := db.Exec("UPDATE shelfs SET name=?, roomId=? WHERE id=?", shelf.Name, shelf.Room, shelf.id)
	return err
}

func loadBoxesByShelf(shelfId int64) ([]Box, error) {
	var boxes []Box

	rows, err := db.Query("SELECT * FROM boxes WHERE shelfId=?", shelfId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var box Box
		if err := rows.Scan(&box.id, &box.Name, &box.Shelf); err != nil {
			return nil, err
		}
		boxes = append(boxes, box)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("boxesByShelf %q: %v", shelfId, err)
	}

	return boxes, nil
}

func loadRooms() ([]Room, error) {
	var rooms []Room

	rows, err := db.Query("SELECT * FROM rooms")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var room Room
		if err := rows.Scan(&room.id, &room.Name); err != nil {
			return nil, err
		}
		rooms = append(rooms, room)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("all items: %v", err)
	}

	return rooms, nil
}

func loadRoom(roomId int64) (Room, error) {
	var room Room
	row := db.QueryRow("SELECT * FROM rooms WHERE id=?", roomId)
	if err := row.Scan(&room.id, &room.Name); err != nil {
		return Room{}, err
	}
	return room, nil
}

func createRoom(room Room) error {
	_, err := db.Exec("INSERT INTO rooms (name) VALUES (?)", room.Name)
	return err
}

func updateRoom(room Room) error {
	_, err := db.Exec("UPDATE rooms SET name=? WHERE id=?", room.Name, room.id)
	return err
}

func loadShelfsByRoom(roomId int64) ([]Shelf, error) {
	var shelfs []Shelf

	rows, err := db.Query("SELECT * FROM shelfs WHERE roomId=?", roomId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var shelf Shelf
		if err := rows.Scan(&shelf.id, &shelf.Name, &shelf.Room); err != nil {
			return nil, err
		}
		shelfs = append(shelfs, shelf)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("itemsByRoom %q: %v", roomId, err)
	}

	return shelfs, nil
}
