"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Класс, который управляет заказами и поварами.
class Manager {
  constructor() {
    // Карта поваров и их специализаций
    this.chefs = new Map([
      ["Пицца", "Олег"],
      ["Суши", "Андрей"],
      ["Десерт", "Анна"]
    ]);

    // Карта клиентов и их заказов
    this.orders = new Map();

    // Доступные блюда и их категории
    this.menu = new Set([
      { name: "Маргарита", type: "Пицца" },
      { name: "Пепперони", type: "Пицца" },
      { name: "Три сыра", type: "Пицца" },
      { name: "Филадельфия", type: "Суши" },
      { name: "Калифорния", type: "Суши" },
      { name: "Чизмаки", type: "Суши" },
      { name: "Сеякемаки", type: "Суши" },
      { name: "Тирамису", type: "Десерт" },
      { name: "Чизкейк", type: "Десерт" }
    ]);
  }

  // Метод для создания нового заказа
  newOrder(client, ...dishes) {
    // Проверяем, есть ли клиент уже в списке заказов
    if (!this.orders.has(client)) {
      this.orders.set(client, new Map());
    }

    const clientOrders = this.orders.get(client);

    // Проход по каждому блюду в заказе
    for (const dish of dishes) {
      // Проверка наличия блюда в меню
      const dishExists = [...this.menu].some(
        menuItem => menuItem.name === dish.name && menuItem.type === dish.type
      );

      if (!dishExists) {
        throw new Error(`${dish.type} "${dish.name}" - такого блюда не существует.`);
      }

      // Если блюдо уже заказано клиентом, обновляем количество
      if (clientOrders.has(dish.name)) {
        const existingOrder = clientOrders.get(dish.name);
        clientOrders.set(dish.name, {
          ...existingOrder,
          quantity: existingOrder.quantity + dish.quantity
        });
      } else {
        clientOrders.set(dish.name, dish);
      }
    }

    // Вывод заказа
    console.log(`Клиент ${client.firstname} заказал:`);

    clientOrders.forEach(dish => {
      const chef = this.chefs.get(dish.type);
      console.log(`${dish.type} "${dish.name}" - ${dish.quantity}; готовит повар ${chef}`);
    });
  }
}

// Создаем менеджера
const manager = new Manager();

// Примеры использования
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

try {
  manager.newOrder(
    clientPavel, 
    { name: "Филадельфия", quantity: 1, type: "Суши" },
    { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
  );
} catch (error) {
  console.error(error.message);
}
// Вывод ошибки:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.