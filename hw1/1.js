"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

// Создаем объект "Музыкальная коллекция"
const musicCollection = {
  albums: [
    {
      title: "Abbey Road",
      artist: "The Beatles",
      year: "1969"
    },
    {
      title: "Dark Side of the Moon",
      artist: "Pink Floyd",
      year: "1973"
    },
    {
      title: "Thriller",
      artist: "Michael Jackson",
      year: "1982"
    }
  ],

  // Реализуем итератор с помощью метода Symbol.iterator
  [Symbol.iterator]() {
    let index = 0;
    const albums = this.albums;

    return {
      next() {
        if (index < albums.length) {
          return { value: albums[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// Используем цикл for...of для перебора альбомов в коллекции и вывода их в консоль
for (const album of musicCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
}
