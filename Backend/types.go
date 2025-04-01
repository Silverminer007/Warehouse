package main

type Item struct {
	id   int64
	Name string
	Box  Box
}

type Box struct {
	id    int64
	Name  string
	Shelf Shelf
}

type Shelf struct {
	id   int64
	Name string
	Room Room
}

type Room struct {
	id   int64
	Name string
}
