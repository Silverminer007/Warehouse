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

func loadItemsByBox(boxId int64) ([]Item, error) {
	var items []Item

	rows, err := db.Query("SELECT * FROM items WHERE BoxId=?", boxId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var item Item
		var boxId int64
		if err := rows.Scan(&item.id, &item.Name, &boxId); err != nil {
			return nil, err
		}
		item.Box, _ = loadBox(boxId)
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("itemsByBox %q: %v", boxId, err)
	}

	return items, nil
}

func loadItem(itemId int64) (Item, error) {
	var item Item
	row := db.QueryRow("SELECT * FROM items WHERE id=?", itemId)
	var boxId int64
	if err := row.Scan(&item.id, &item.Name, &boxId); err != nil {
		return Item{}, err
	}
	item.Box, _ = loadBox(boxId)
	return item, nil
}

func loadBox(boxId int64) (Box, error) {
	var box Box
	row := db.QueryRow("SELECT * FROM boxes WHERE id=?", boxId)
	var shelfId int64
	if err := row.Scan(&box.id, &box.Name, &shelfId); err != nil {
		return Box{}, err
	}
	box.Shelf, _ = loadShelf(shelfId)
	return box, nil
}

func loadShelf(shelfId int64) (Shelf, error) {
	var shelf Shelf
	row := db.QueryRow("SELECT * FROM shelfs WHERE id=?", shelfId)
	var roomId int64
	if err := row.Scan(&shelf.id, &shelf.Name, &roomId); err != nil {
		return Shelf{}, err
	}
	shelf.Room, _ = loadRoom(shelfId)
	return shelf, nil
}

func loadRoom(roomId int64) (Room, error) {
	var room Room
	row := db.QueryRow("SELECT * FROM rooms WHERE id=?", roomId)
	if err := row.Scan(&room.id, &room.Name); err != nil {
		return Room{}, err
	}
	return room, nil
}
