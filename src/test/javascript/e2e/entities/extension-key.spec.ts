import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ExtensionKey e2e test', () => {

    let navBarPage: NavBarPage;
    let extensionKeyDialogPage: ExtensionKeyDialogPage;
    let extensionKeyComponentsPage: ExtensionKeyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ExtensionKeys', () => {
        navBarPage.goToEntity('extension-key');
        extensionKeyComponentsPage = new ExtensionKeyComponentsPage();
        expect(extensionKeyComponentsPage.getTitle()).toMatch(/OWASP SecurityRAT/);
    });

    it('should load create ExtensionKey dialog', () => {
        extensionKeyComponentsPage.clickOnCreateButton();
        extensionKeyDialogPage = new ExtensionKeyDialogPage();
        expect(extensionKeyDialogPage.getModalTitle())
            .toMatch(/Create or edit a Extension Key/);
        extensionKeyDialogPage.close();
    });

    it('should create and save ExtensionKeys', () => {
        extensionKeyComponentsPage.clickOnCreateButton();
        extensionKeyDialogPage.setNameInput('name');
        expect(extensionKeyDialogPage.getNameInput()).toMatch('name');
        extensionKeyDialogPage.setDescriptionInput('description');
        expect(extensionKeyDialogPage.getDescriptionInput()).toMatch('description');
        extensionKeyDialogPage.sectionSelectLastOption();
        extensionKeyDialogPage.typeSelectLastOption();
        extensionKeyDialogPage.setShowOrderInput('5');
        expect(extensionKeyDialogPage.getShowOrderInput()).toMatch('5');
        extensionKeyDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                extensionKeyDialogPage.getActiveInput().click();
                expect(extensionKeyDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                extensionKeyDialogPage.getActiveInput().click();
                expect(extensionKeyDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        extensionKeyDialogPage.requirementSetSelectLastOption();
        extensionKeyDialogPage.save();
        expect(extensionKeyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ExtensionKeyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-extension-key div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ExtensionKeyDialogPage {
    modalTitle = element(by.css('h4#myExtensionKeyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('textarea#field_description'));
    sectionSelect = element(by.css('select#field_section'));
    typeSelect = element(by.css('select#field_type'));
    showOrderInput = element(by.css('input#field_showOrder'));
    activeInput = element(by.css('input#field_active'));
    requirementSetSelect = element(by.css('select#field_requirementSet'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setSectionSelect = function(section) {
        this.sectionSelect.sendKeys(section);
    };

    getSectionSelect = function() {
        return this.sectionSelect.element(by.css('option:checked')).getText();
    };

    sectionSelectLastOption = function() {
        this.sectionSelect.all(by.tagName('option')).last().click();
    };
    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    setShowOrderInput = function(showOrder) {
        this.showOrderInput.sendKeys(showOrder);
    };

    getShowOrderInput = function() {
        return this.showOrderInput.getAttribute('value');
    };

    getActiveInput = function() {
        return this.activeInput;
    };
    requirementSetSelectLastOption = function() {
        this.requirementSetSelect.all(by.tagName('option')).last().click();
    };

    requirementSetSelectOption = function(option) {
        this.requirementSetSelect.sendKeys(option);
    };

    getRequirementSetSelect = function() {
        return this.requirementSetSelect;
    };

    getRequirementSetSelectedOption = function() {
        return this.requirementSetSelect.element(by.css('option:checked')).getText();
    };

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
