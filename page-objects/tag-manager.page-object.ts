import {$, by, element} from 'protractor';

export class TagManagerPageObject {

    accountNameField = $("[name='form.account.data.name']");
    shareDataCheckBox = $("[data-ng-model='ctrl.form.account.data.shareData']");
    nextButton = element(by.cssContainingText('button','Далее'));
    createButton = element(by.cssContainingText('button','Создать'));
    containerNameField = $("[name='form.container.data.name']");
    cancelButton = element(by.cssContainingText('button','Отмена'));


    isSharedDataCheckboxSelected() {
       return this.shareDataCheckBox.getAttribute('class')
            .then(result => {
                return result.split(' ').indexOf('ng-not-empty') !== -1;
            });
    }

}