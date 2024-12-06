import * as data from "../helpers/default_data.json";
import * as main from "../locators/main_page.json";
import * as recovery from "../locators/recovery_password_page.json";
import * as result from "../locators/result_page.json";

describe("Проверка авторизации", function () {
  beforeEach("Открытие сайта", function () {
    cy.visit("https://login.qa.studio"); // Зайти на сайт
    cy.get(main.fogot_pass_btn).should("have.css", "color", "rgb(0, 85, 152)"); // Проверить цвет кнопки "Забыли логин"
  });

  afterEach("Проверка наличия модалки", function () {
    cy.get(result.title).should("be.visible"); // Модалка с успешной авторизацией видна пользователю
    cy.get(result.close).should("be.visible"); // Элемент закрытия модалки виден пользователю
  });

  it("Верный логин и верный пароль", function () {
    cy.get(main.email).type(data.login); // Ввод верного логина
    cy.get(main.password).type(data.password); // Ввод верного пароля
    cy.get(main.login_button).click(); // Нажатие на кнопку "Войти"
    cy.get(result.title).contains(result.result_title); // После авторизации вижу нужный текст
  });

  it("Восстановление пароля", function () {
    cy.get(main.fogot_pass_btn).click(); // Нажать на "Забыли пароль"
    cy.get(recovery.email).type("testmail@testmail.com"); // Ввести любой email
    cy.get(recovery.send_button).click(); // Отправить форму
    cy.get(result.title).contains(result.recovery_title); // После восстановления пароля вижу нужный текст
  });

  it("Верный логин и неверный пароль", function () {
    cy.get(main.email).type(data.login); // Ввод верного логина
    cy.get(main.password).type("auifneia23@"); // Ввод неверного пароля
    cy.get(main.login_button).click(); // Нажатие на кнопку "Войти"
    cy.get(result.title).contains(result.wrong_data_title); // После авторизации вижу нужный текст
  });

  it("Неверный логин и верный пароль", function () {
    cy.get(main.email).type("data123@login.com"); // Ввод неверного логина
    cy.get(main.password).type(data.password); // Ввод верного пароля
    cy.get(main.login_button).click(); // Нажатие на кнопку "Войти"
    cy.get(result.title).contains(result.wrong_data_title); // После авторизации вижу нужный текст
  });

  it("Логин без @ и верный пароль", function () {
    cy.get(main.email).type("data123login.com"); // Ввод логина без @
    cy.get(main.password).type(data.password); // Ввод верного пароля
    cy.get(main.login_button).click(); // Нажатие на кнопку "Войти"
    cy.get(result.title).contains(result.wrong_validation_title); // После авторизации вижу нужный текст
  });

  it("Приведение к строчным буквам", function () {
    cy.get(main.email).type(data.diff_login); // Ввод логина с разным регистром
    cy.get(main.password).type(data.password); // Ввод верного пароля
    cy.get(main.login_button).click(); // Нажатие на кнопку "Войти"
    cy.get(result.title).contains(result.result_title); // После авторизации вижу нужный текст
  });
});
