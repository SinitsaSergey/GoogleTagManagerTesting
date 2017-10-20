import {$, browser} from "protractor";

/*
* Класс, описывающий объект страницы авторизации Google
 */
export class GoogleAuthorizationPageObject {

    private accountIdField = $('#identifierId');
    private identifierNextButton = $('#identifierNext');
    private passwordField = $("[name='password']");
    private passwordNextButton = $('#passwordNext');

    /*
    * Авторизация аккаунта Google
    * login и password - логин и пароль пользователя Google
    */
    authorization(login, password) {
        this.accountIdField.sendKeys(login);
        this.identifierNextButton.click();
        browser.sleep(2000);
        this.passwordField.sendKeys(password);
        this.passwordNextButton.click();
        browser.sleep(2000);
    }
}