import {$} from "protractor";

export class GoogleAccountPageObject {

    fieldAccountId = $('#identifierId');
    buttonIdentifierNext = $('#identifierNext');
    fieldPassword = $("[name='password']");
    buttonPasswordNext = $('#passwordNext');

    inputIdentifier (identifier: string) {
        return this.fieldAccountId.sendKeys(identifier);
    }

    clickIdentifierNext () {
        return this.buttonIdentifierNext.click();
    }

    inputPassword (password: string) {
        return this.fieldPassword.sendKeys(password);
    }

    clickPasswordNext () {
        return this.buttonPasswordNext.click();
    }

}