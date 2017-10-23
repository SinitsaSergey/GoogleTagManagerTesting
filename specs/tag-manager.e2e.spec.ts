import {describe} from "selenium-webdriver/testing";
import {GoogleAuthenticationPageObject} from "../page-objects/google-authentication.page-object";
import {browser} from 'protractor';
import {TagManagerPageObject} from "../page-objects/tag-manager.page-object";

const TAG_MANAGER_URL = 'https://tagmanager.google.com/#/admin/accounts/create';
const GOOGLE_LOGIN = 'testing999444@gmail.com';
const GOOGLE_PASSWORD = 'test999444';
const ACCOUNT_NAME = 'My Company';
const CONTAINER_NAME = "My Site";

/*
* beforeAll - выполняется вход в аккаунт Google
* Проверка недоступности кнопки Создать проверяется на каждом этапе
 */
describe('Взаимодействие со службой Google Tag Manager', () => {

    let googleAccount = new GoogleAuthenticationPageObject();
    let tagManager = new TagManagerPageObject();

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get(TAG_MANAGER_URL);
        googleAccount.authenticate(GOOGLE_LOGIN, GOOGLE_PASSWORD);
        browser.waitForAngularEnabled(true);
    });

    it('аутентификация прошла успешно, текущий URL-адрес совпадает с целевым', () => {
        expect(browser.getCurrentUrl()).toEqual(TAG_MANAGER_URL);
    });


    it('поле Название аккаунта отображается и доступно', () => {
        expect(tagManager.accountNameField.isDisplayed()).toBe(true, 'поле Название аккаунта не отображается');
        expect(tagManager.accountNameField.isEnabled()).toBe(true, 'поле Название аккаунта недоступно');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    });

    it('введено значение в поле Название аккаунта и оно отображается', () => {
        tagManager.accountNameField.sendKeys(ACCOUNT_NAME);
        expect(tagManager.accountNameField.getAttribute('value')).toEqual(ACCOUNT_NAME, 'значение в поле Название аккаунта не отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    });

    it('выбран чекбокс Передавать анонимные данные', () => {
        tagManager.shareDataCheckBox.click();
        expect(tagManager.isSharedDataCheckboxSelected()).toBe(true, 'чекбокс Передавать анонимные данные не выбран');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    });

    it('нажата кнопка Далее, поле Название контейнера отображается и доступно', () => {
        tagManager.nextButton.click();
        expect(tagManager.containerNameField.isDisplayed()).toBe(true, 'поле Название контейнера не отображается');
        expect(tagManager.containerNameField.isEnabled()).toBe(true, 'поле Название контейнера недоступно');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    });

    it('введено значение в поле Название контейнера и оно отображается', () => {
        tagManager.containerNameField.sendKeys(CONTAINER_NAME);
        expect(tagManager.containerNameField.getAttribute('value')).toEqual(CONTAINER_NAME, 'значение в поле Название контейнера не отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    });

    it('нажата кнопка Отмена, поле Название аккаунта очищено ' +
        'поле Название контейнера не отображается', () => {
        tagManager.cancelButton.click();
        expect(tagManager.accountNameField.getAttribute('value')).toEqual('', 'поле Название аккаунта не очищено');
        expect(tagManager.containerNameField.isDisplayed()).toBe(false, 'поле Название контейнера отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать должная быть недоступна');
    })
});