import {$, browser} from "protractor";

/**
 *
 * класс страницы аутентификации Google
 */
export class GoogleAuthentication {

    private accountIdField = $('#identifierId');
    private identifierNextButton = $('#identifierNext');
    private passwordField = $("[name='password']");
    private passwordNextButton = $('#passwordNext');

    /**
     *
     * аутентификация в Google
     * @param login - Google account identifier
     * @param password - Google password
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