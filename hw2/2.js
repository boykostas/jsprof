"use strict";

// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Начальные данные с продуктами и отзывами

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      { id: "1", text: "Отличный телефон! Батарея держится долго." },
      { id: "2", text: "Камера супер, фото выглядят просто потрясающе." },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [{ id: "3", text: "Интересный дизайн, но дорогой." }],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [{ id: "4", text: "Люблю играть на PS5, графика на высоте." }],
  },
];

// Функция для отображения отзывов
function renderReviews(product) {
  const reviewContainer = document.getElementById("reviews-container");
  reviewContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых отзывов

  const productData = initialData.find((item) => item.product === product);
  if (productData) {
    const reviews = productData.reviews;
    reviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.textContent = review.text;
      reviewContainer.appendChild(reviewItem);
    });
  }
}

// Функция для добавления отзыва
function addReview(product, text) {
  // Проверяем длину отзыва
  if (text.length < 50 || text.length > 500) {
    throw new Error("Отзыв должен содержать от 50 до 500 символов.");
  }

  // Ищем продукт в initialData
  const productData = initialData.find((item) => item.product === product);
  if (productData) {
    // Генерируем ID для нового отзыва
    const newId = (productData.reviews.length + 1).toString();
    productData.reviews.push({ id: newId, text: text });

    // Обновляем отображение отзывов
    renderReviews(product);
  }
}

// Инициализация отзывов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("product-select");
  const reviewText = document.getElementById("review-text");
  const submitButton = document.getElementById("submit-review");
  const errorMessage = document.getElementById("error-message");

  // Отображаем отзывы для выбранного продукта при загрузке страницы
  renderReviews(productSelect.value);

  // Изменяем отзывы при изменении выбора продукта
  productSelect.addEventListener("change", () => {
    renderReviews(productSelect.value);
  });

  // Добавляем отзыв по нажатию на кнопку
  submitButton.addEventListener("click", () => {
    const selectedProduct = productSelect.value;
    const reviewContent = reviewText.value.trim();

    // Очищаем сообщение об ошибке
    errorMessage.textContent = "";

    try {
      addReview(selectedProduct, reviewContent);
      reviewText.value = ""; // Очищаем текстовое поле после успешного добавления
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
});
