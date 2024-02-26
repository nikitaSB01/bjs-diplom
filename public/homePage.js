const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

//                  Выход из личного кабинета
logoutButton.action = function () {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

//                  Получение информации о пользователе

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

//                  Получение текущих курсов валюты

function getStocks() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable(/* response.data */);
      ratesBoard.fillTable(response.data);
    }
  });
}
getStocks();
setInterval(getStocks, 60000);

//                  Операции с деньгами
//  Реализуйте пополнение баланса:
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response, "Баланс пополнен");
    } else {
      moneyManager.setMessage(false, "Ошибка. Баланс не может быть пополнен");
    }
  });
};
//  Реализуйте конвертирование валюты:
moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response, "Конвертация прошла успешно");
    } else {
      moneyManager.setMessage(
        false,
        "Ошибка. Конвертация не может быть выполнена"
      );
    }
  });
};
//  Реализуйте перевод валюты:
moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response, "Перевод осуществлен успешно");
    } else {
      moneyManager.setMessage(
        false,
        "Ошибка. Перевод не может быть осуществлен"
      );
    }
  });
};

//                      Работа с избранным

//  Запросите начальный список избранного:
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable(/* response.data */);
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});
//  Реализуйте добавления пользователя в список избранных:
favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable(/* response.data */);
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response,
        "Пользователь успешно добавлен в избранное"
      );
    } else {
      favoritesWidget.setMessage(
        false,
        "Ошибка. Перевод не может быть осуществлен"
      );
    }
  });
};
//  Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable(/* response.data */);
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response,
        "Пользователь успешно удален из избранного"
      );
    } else {
      favoritesWidget.setMessage(
        false,
        "Ошибка. Пользователь не может быть удален"
      );
    }
  });
};
