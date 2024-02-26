//                  Выход из личного кабинета
const newLogoutButton = new LogoutButton();

newLogoutButton.action = function () {
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

const newRatesBoard = new RatesBoard();

function getStocks() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      newRatesBoard.clearTable(/* response.data */);
      newRatesBoard.fillTable(response.data);
      //    ApiConnector.getStocks(response);
    }
  });
}
getStocks();
setInterval(getStocks, 60000);

//                  Операции с деньгами

const newMoneyManager = new MoneyManager();
//  Реализуйте пополнение баланса:
newMoneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response, "Баланс пополнен");
    } else {
      newMoneyManager.setMessage(
        !response,
        "Ошибка. Баланс не может быть пополнен"
      );
    }
  });
};
//  Реализуйте конвертирование валюты:
newMoneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response, "Конвертация прошла успешно");
    } else {
      newMoneyManager.setMessage(
        !response,
        "Ошибка. Конвертация не может быть выполнена"
      );
    }
  });
};
//  Реализуйте перевод валюты:
newMoneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      newMoneyManager.setMessage(response, "Перевод осуществлен успешно");
    } else {
      newMoneyManager.setMessage(
        !response,
        "Ошибка. Перевод не может быть осуществлен"
      );
    }
  });
};

//                      Работа с избранным

const newFavoritesWidget = new FavoritesWidget();
//  Запросите начальный список избранного:
ApiConnector.getFavorites((response) => {
  if (response.success) {
    newFavoritesWidget.clearTable(/* response.data */);
    newFavoritesWidget.fillTable(response.data);
    newMoneyManager.updateUsersList(response.data);
  }
});
//  Реализуйте добавления пользователя в список избранных:
newFavoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      newFavoritesWidget.clearTable(/* response.data */);
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response,
        "Пользователь успешно добавлен в избранное"
      );
    } else {
      newFavoritesWidget.setMessage(
        !response,
        "Ошибка. Перевод не может быть осуществлен"
      );
    }
  });
};
//  Реализуйте удаление пользователя из избранного
newFavoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      newFavoritesWidget.clearTable(/* response.data */);
      newFavoritesWidget.fillTable(response.data);
      newMoneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response,
        "Пользователь успешно удален из избранного"
      );
    } else {
      newFavoritesWidget.setMessage(
        !response,
        "Ошибка. Пользователь не может быть удален"
      );
    }
  });
};
