import {describe} from "selenium-webdriver/testing";
import {GoogleAuthorizationPageObject} from "../page-objects/google-account.page-object";
import {browser} from 'protractor';
import {TagManagerPageObject} from "../page-objects/tag-manager.page-object";

const TAG_MANAGER_URL = 'https://tagmanager.google.com/#/admin/accounts/create';
const GOOGLE_LOGIN = 'testing999444@gmail.com';
const GOOGLE_PASSWORD = 'test999444';
const ACCOUNT_NAME = 'My Company';
const CONTAINER_NAME = "My Site";

describe('Взаимодействие со службой Google Tag Manager', () => {

    let googleAccount = new GoogleAuthorizationPageObject();
    let tagManager = new TagManagerPageObject();

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get(TAG_MANAGER_URL);
        googleAccount.authorization(GOOGLE_LOGIN, GOOGLE_PASSWORD);
        browser.waitForAngularEnabled(true);
    });

    it('авторизация прошла успешно, текущий URL-адрес совпадает с целевым', () => {
        expect(browser.getCurrentUrl()).toEqual(TAG_MANAGER_URL);
    });


    it('поле Название аккаунта отображается и доступно', () => {
        expect(tagManager.accountNameField.isDisplayed()).toBe(true, 'поле Название аккаунта не отображается');
        expect(tagManager.accountNameField.isEnabled()).toBe(true, 'поле Название аккаунта недоступно');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    });

    it('введено значение в поле Название аккаунта и оно отображается', () => {
        expect(tagManager.accountNameField.sendKeys(ACCOUNT_NAME));
        expect(tagManager.accountNameField.getAttribute('value')).toEqual(ACCOUNT_NAME, 'значение в поле Название аккаунта не отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    });

    it('выбран чекбокс Передавать анонимные данные', () => {
        expect(tagManager.shareDataCheckBox.click());
        expect(tagManager.isSharedDataCheckboxSelected()).toBe(true, 'чекбокс Передавать анонимные данные не выбран');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    });

    it('нажата кнопка Далее, поле Название контейнера отображается и доступно', () => {
        expect(tagManager.nextButton.click());
        expect(tagManager.containerNameField.isDisplayed()).toBe(true, 'поле Название контейнера не отображается');
        expect(tagManager.containerNameField.isEnabled()).toBe(true, 'поле Название контейнера недоступно');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    });

    it('введено значение в поле Название контейнера и оно отображается', () => {
        expect(tagManager.containerNameField.sendKeys(CONTAINER_NAME));
        expect(tagManager.containerNameField.getAttribute('value')).toEqual(CONTAINER_NAME, 'значение в поле Название контейнера не отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    });

    it('нажата кнопка Отмена, поле Название аккаунта очищено' +
        'поле Название контейнера не отображается', () => {
        expect(tagManager.cancelButton.click());
        expect(tagManager.accountNameField.getAttribute('value')).toEqual('', 'поле Название аккаунта не очищено');
        expect(tagManager.containerNameField.isDisplayed()).toBe(false, 'поле Название контейнера отображается');
        expect(tagManager.createButton.isEnabled()).toBe(false, 'кнопка Создать доступна');
    })
});