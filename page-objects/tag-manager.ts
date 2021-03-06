import {$, by} from 'protractor';

/**
 *
 * класс страницы Google Tag Manager
 */
export class TagManager {

    private rootElement = $('.gtm-stepper');

    accountNameField = this.rootElement.$("[name='form.account.data.name']");
    shareDataCheckBox = this.rootElement.$("[name='form.account.data.shareData']");
    nextButton = this.rootElement.element(by.cssContainingText('button', 'Далее'));
    createButton = this.rootElement.element(by.cssContainingText('button', 'Создать'));
    containerNameField = this.rootElement.$("[name='form.container.data.name']");
    cancelButton = this.rootElement.element(by.cssContainingText('button', 'Отменаs'));

    /**
     *
     * Проверяет выбран ли чекбокс "Передавать анонимные данные"
     * return Promise<boolean>
     */
    isSharedDataCheckboxSelected() {
        return this.shareDataCheckBox.getAttribute('class')
            .then(result => {
                return result.split(' ').indexOf('ng-not-empty') !== -1;
            });
    }

}