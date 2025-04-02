package main

type Item struct {
	id   int64
	Name string
	Box  int64
}

type Box struct {
	id    int64
	Name  string
	Shelf int64
}

type Shelf struct {
	id   int64
	Name string
	Room int64
}

type Room struct {
	id   int64
	Name string
}
