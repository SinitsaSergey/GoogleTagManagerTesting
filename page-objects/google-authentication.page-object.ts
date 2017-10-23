import {$, browser} from "protractor";

/*
* класс страницы аутентификации Google
 */
export class GoogleAuthenticationPageObject {

    private accountIdField = $('#identifierId');
    private identifierNextButton = $('#identifierNext');
    private passwordField = $("[name='password']");
    private passwordNextButton = $('#passwordNext');

    /*
    * аутентификация в Google
    * login и password - логин и пароль пользователя Google
    */
    authenticate(login, password) {
        this.accountIdField.sendKeys(login);
        this.identifierNextButton.click();
        browser.sleep(2000);
        this.passwordField.sendKeys(password);
        this.passwordNextButton.click();
        browser.sleep(2000);
    }
}