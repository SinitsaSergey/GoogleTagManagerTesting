import {describe} from "selenium-webdriver/testing";
import {GoogleAccountPageObject} from "../page-objects/google-account.page-object";
import {browser} from 'protractor';
import {TagManagerPageObject} from "../page-objects/tag-manager.page-object";

const GOOGLE_LOGIN = 'testing999444@gmail.com';
const GOOGLE_PASSWORD = 'test999444';
const ACCOUNT_NAME = 'My Company';
const CONTAINER_NAME = "My Site";

describe('Interaction with service Google Task Manager', () => {

    let accountPage = new GoogleAccountPageObject();
    let tagManagerPage = new TagManagerPageObject();

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get('https://tagmanager.google.com/#/admin/accounts/create');
        accountPage.inputIdentifier(GOOGLE_LOGIN);
        accountPage.clickIdentifierNext();
        browser.sleep(2000);
        accountPage.inputPassword(GOOGLE_PASSWORD);
        accountPage.clickPasswordNext();
        browser.sleep(2000);
        browser.waitForAngularEnabled(true);
    });

    it('check account name field is visible abd available', () => {
        expect(tagManagerPage.accountNameField.isDisplayed());
        expect(tagManagerPage.accountNameField.isEnabled());
        expect(tagManagerPage.createButton.isPresent());
        expect(tagManagerPage.createButton.isEnabled()).toBe(false);
    });

    it('input account identifier and check that it is visible', () => {
        expect(tagManagerPage.accountNameField.sendKeys(ACCOUNT_NAME));
        expect(tagManagerPage.accountNameField.getAttribute('value')).toEqual(ACCOUNT_NAME);
    });

    it('select checkbox and check that it is selected', () => {
        expect(tagManagerPage.shareDataCheckBox.click());
        expect(tagManagerPage.isSharedDataCheckboxSelected()).toBe(true);
    });

    it('click next button and check that container name field is visible and available', () => {
        expect(tagManagerPage.nextButton.click());
        expect(tagManagerPage.containerNameField.isDisplayed());
        expect(tagManagerPage.containerNameField.isEnabled());
    });

    it('input container name and check that it is visible', () => {
        expect(tagManagerPage.containerNameField.sendKeys(CONTAINER_NAME));
        expect(tagManagerPage.containerNameField.getAttribute('value')).toEqual(CONTAINER_NAME);
    });

    it('click cancel button and check that account name field is cleared' +
        'and container name field is  not visible', () => {
        expect(tagManagerPage.cancelButton.click());
        expect(tagManagerPage.accountNameField.getAttribute('value')).toEqual('');
        expect(tagManagerPage.containerNameField.isDisplayed()).toBe(false);
    })
});