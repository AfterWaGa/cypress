const USER_LOGIN = "";
const USER_PASSWORD = "";

describe("e2e", function () {
    it("Покупка аватара для тренера", function () {
        cy.visit("https://pokemonbattle.ru/login"); // Зайти на сайт Pokemonbattle
        cy.get(":nth-child(1) > .auth__input").type(USER_LOGIN);
        cy.get("#password").type(USER_PASSWORD); // Ввести свой пароль
        cy.get(".auth__button").click(); // Нажать кнопку "Войти"
        cy.wait(1500);

        cy.get(".header__container > .header__id").click(); // Открыть личный каинет
        cy.get('[href="/shop"]').click(); // Открыть страницу покупки аватара
        cy.get(".available > button").first().click(); // Нажать "Купить" у первого доступного к покупке аватара
        cy.wait(1500);

        cy.get(".pay__payform-v2 > :nth-child(2) > .pay_base-input-v2").type(
            "4111111111111111"
        ); // Ввести номер карты
        cy.get(":nth-child(1) > .pay_base-input-v2").type("1225"); // Ввести срок карты
        cy.get(".pay-inputs-box > :nth-child(2) > .pay_base-input-v2").type(
            "125"
        ); // Ввести CVV
        cy.get(".pay__input-box-last-of > .pay_base-input-v2").type(
            "ANTON LOGVINOV"
        ); // Ввести владельца карты
        cy.get(".pay-btn").click(); // Нажать "Оплатить"
        cy.get("#cardnumber").type("56456"); // Ввести код проверки из пуша
        cy.get(".payment__submit-button").click(); // Нажать "Подтвердить"
        cy.get(".payment__success1")
            .should("be.visible")
            .contains("Покупка прошла успешно");
    }); // Проверка на наличие и видимость сообщения "Покупка прошла успешно"
});
