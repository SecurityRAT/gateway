import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Extension e2e test', () => {

    let navBarPage: NavBarPage;
    let extensionDialogPage: ExtensionDialogPage;
    let extensionComponentsPage: ExtensionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Extensions', () => {
        navBarPage.goToEntity('extension');
        extensionComponentsPage = new ExtensionComponentsPage();
        expect(extensionComponentsPage.getTitle())
            .toMatch(/Extensions/);

    });

    it('should load create Extension dialog', () => {
        extensionComponentsPage.clickOnCreateButton();
        extensionDialogPage = new ExtensionDialogPage();
        expect(extensionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Extension/);
        extensionDialogPage.close();
    });

    it('should create and save Extensions', () => {
        extensionComponentsPage.clickOnCreateButton();
        extensionDialogPage.setContentInput('content');
        expect(extensionDialogPage.getContentInput()).toMatch('content');
        extensionDialogPage.setDescriptionInput('description');
        expect(extensionDialogPage.getDescriptionInput()).toMatch('description');
        extensionDialogPage.setShowOrderInput('5');
        expect(extensionDialogPage.getShowOrderInput()).toMatch('5');
        extensionDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                extensionDialogPage.getActiveInput().click();
                expect(extensionDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                extensionDialogPage.getActiveInput().click();
                expect(extensionDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        extensionDialogPage.extensionKeySelectLastOption();
        extensionDialogPage.save();
        expect(extensionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ExtensionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-extension div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ExtensionDialogPage {
    modalTitle = element(by.css('h4#myExtensionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    contentInput = element(by.css('textarea#field_content'));
    descriptionInput = element(by.css('textarea#field_description'));
    showOrderInput = element(by.css('input#field_showOrder'));
    activeInput = element(by.css('input#field_active'));
    extensionKeySelect = element(by.css('select#field_extensionKey'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setShowOrderInput = function(showOrder) {
        this.showOrderInput.sendKeys(showOrder);
    }

    getShowOrderInput = function() {
        return this.showOrderInput.getAttribute('value');
    }

    getActiveInput = function() {
        return this.activeInput;
    }
    extensionKeySelectLastOption = function() {
        this.extensionKeySelect.all(by.tagName('option')).last().click();
    }

    extensionKeySelectOption = function(option) {
        this.extensionKeySelect.sendKeys(option);
    }

    getExtensionKeySelect = function() {
        return this.extensionKeySelect;
    }

    getExtensionKeySelectedOption = function() {
        return this.extensionKeySelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
