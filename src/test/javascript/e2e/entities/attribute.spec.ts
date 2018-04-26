import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Attribute e2e test', () => {

    let navBarPage: NavBarPage;
    let attributeDialogPage: AttributeDialogPage;
    let attributeComponentsPage: AttributeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Attributes', () => {
        navBarPage.goToEntity('attribute');
        attributeComponentsPage = new AttributeComponentsPage();
        expect(attributeComponentsPage.getTitle()).toMatch(/OWASP SecurityRAT/);
    });

    it('should load create Attribute dialog', () => {
        attributeComponentsPage.clickOnCreateButton();
        attributeDialogPage = new AttributeDialogPage();
        expect(attributeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Attribute/);
        attributeDialogPage.close();
    });

    it('should create and save Attributes', () => {
        attributeComponentsPage.clickOnCreateButton();
        attributeDialogPage.setNameInput('name');
        expect(attributeDialogPage.getNameInput()).toMatch('name');
        attributeDialogPage.setDescriptionInput('description');
        expect(attributeDialogPage.getDescriptionInput()).toMatch('description');
        attributeDialogPage.setShowOrderInput('5');
        expect(attributeDialogPage.getShowOrderInput()).toMatch('5');
        attributeDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                attributeDialogPage.getActiveInput().click();
                expect(attributeDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                attributeDialogPage.getActiveInput().click();
                expect(attributeDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        attributeDialogPage.parentSelectLastOption();
        attributeDialogPage.attributeKeySelectLastOption();
        attributeDialogPage.save();
        expect(attributeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AttributeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-attribute div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AttributeDialogPage {
    modalTitle = element(by.css('h4#myAttributeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('textarea#field_description'));
    showOrderInput = element(by.css('input#field_showOrder'));
    activeInput = element(by.css('input#field_active'));
    parentSelect = element(by.css('select#field_parent'));
    attributeKeySelect = element(by.css('select#field_attributeKey'));

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

    setShowOrderInput = function(showOrder) {
        this.showOrderInput.sendKeys(showOrder);
    };

    getShowOrderInput = function() {
        return this.showOrderInput.getAttribute('value');
    };

    getActiveInput = function() {
        return this.activeInput;
    };
    parentSelectLastOption = function() {
        this.parentSelect.all(by.tagName('option')).last().click();
    };

    parentSelectOption = function(option) {
        this.parentSelect.sendKeys(option);
    };

    getParentSelect = function() {
        return this.parentSelect;
    };

    getParentSelectedOption = function() {
        return this.parentSelect.element(by.css('option:checked')).getText();
    };

    attributeKeySelectLastOption = function() {
        this.attributeKeySelect.all(by.tagName('option')).last().click();
    };

    attributeKeySelectOption = function(option) {
        this.attributeKeySelect.sendKeys(option);
    };

    getAttributeKeySelect = function() {
        return this.attributeKeySelect;
    };

    getAttributeKeySelectedOption = function() {
        return this.attributeKeySelect.element(by.css('option:checked')).getText();
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
