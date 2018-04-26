import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AttributeKey e2e test', () => {

    let navBarPage: NavBarPage;
    let attributeKeyDialogPage: AttributeKeyDialogPage;
    let attributeKeyComponentsPage: AttributeKeyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

   it('should load AttributeKeys with correct Title', () => {
        navBarPage.goToEntity('attribute-key');
        attributeKeyComponentsPage = new AttributeKeyComponentsPage();
        expect(attributeKeyComponentsPage.getTitle()).toMatch(/OWASP SecurityRAT/);
        // .toMatch(/Attribute Keys/);

    });

    it('should load create AttributeKey dialog', () => {
        attributeKeyComponentsPage.clickOnCreateButton();
        attributeKeyDialogPage = new AttributeKeyDialogPage();
        expect(attributeKeyDialogPage.getModalTitle())
            .toMatch(/Create or edit a Attribute Key/);
        attributeKeyDialogPage.close();
    });

    it('should create and save AttributeKeys', () => {
        attributeKeyComponentsPage.clickOnCreateButton();
        attributeKeyDialogPage.setNameInput('name');
        expect(attributeKeyDialogPage.getNameInput()).toMatch('name');
        attributeKeyDialogPage.setDescriptionInput('description');
        expect(attributeKeyDialogPage.getDescriptionInput()).toMatch('description');
        attributeKeyDialogPage.typeSelectLastOption();
        attributeKeyDialogPage.setShowOrderInput('5');
        expect(attributeKeyDialogPage.getShowOrderInput()).toMatch('5');
        attributeKeyDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                attributeKeyDialogPage.getActiveInput().click();
                expect(attributeKeyDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                attributeKeyDialogPage.getActiveInput().click();
                expect(attributeKeyDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        attributeKeyDialogPage.requirementSetSelectLastOption();
        attributeKeyDialogPage.save();
        expect(attributeKeyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    it('should click every column and check the text inside them',  () => {
        attributeKeyComponentsPage.clickIdColumn();
        expect((attributeKeyComponentsPage.getIdColumn().getText())).toContain('ID');
        console.log(attributeKeyComponentsPage.getIdColumn().getCssValue);
        attributeKeyComponentsPage.clickNameColumn();
        expect((attributeKeyComponentsPage.getNameColumn().getText())).toContain('Name');
        attributeKeyComponentsPage.clickDescriptionColumn();
        expect((attributeKeyComponentsPage.getDescriptionColumn().getText())).toContain('Description');
        attributeKeyComponentsPage.clickTypeColumn();
        expect((attributeKeyComponentsPage.getTypeColumn().getText())).toContain('Type');
        attributeKeyComponentsPage.clickShowOrderColumn();
        expect((attributeKeyComponentsPage.getShowOrderColumn().getText())).toContain('Show Order');
        attributeKeyComponentsPage.clickActiveColumn();
        expect((attributeKeyComponentsPage.getActiveColumn().getText())).toContain('Active');
        attributeKeyComponentsPage.clickRequirementSets();
        expect((attributeKeyComponentsPage.getRequirementSetColumn().getText())).toContain('Requirement Set');
    });

    afterAll(() => {
     //   navBarPage.autoSignOut();
    });
});

export class AttributeKeyComponentsPage {
     createButton = element(by.css('.jh-create-entity'));
     title = element.all(by.css('jhi-attribute-key div h2 span')).first();

     IdColumn = element(by.cssContainingText('table thead tr th', 'ID'));
     NameColumn =  element(by.cssContainingText('table thead tr th', 'Name'));
     DescriptionColumn =  element(by.cssContainingText('table thead tr th', 'Description'));
     TypeColumn =  element(by.cssContainingText('table thead tr th', 'Type'));
     ShowOrderColumn = element(by.cssContainingText('table thead tr th', 'Show Order'));
     ActiveColumn = element(by.cssContainingText('table thead tr th', 'Active'));
     RequirementSetColumn = element(by.cssContainingText('table thead tr th', 'Requirement Set'));

    clickOnCreateButton() {
         return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }

    clickIdColumn() {
        return this.IdColumn.click();
    }

    clickNameColumn() {
        return this.NameColumn.click();
    }

    clickDescriptionColumn() {
        return this.DescriptionColumn.click();
    }

    clickTypeColumn() {
        return this.TypeColumn.click();
    }

    clickShowOrderColumn() {
        return this.ShowOrderColumn.click();
    }

    clickActiveColumn() {
        return this.ActiveColumn.click();
    }

    clickRequirementSets() {
        return this.RequirementSetColumn.click();
    }

    getIdColumn() {
        return this.IdColumn;
    }

    getNameColumn() {
        return this.NameColumn;
    }

    getDescriptionColumn() {
        return this.DescriptionColumn;
    }

    getTypeColumn() {
        return this.TypeColumn;
    }

    getShowOrderColumn() {
        return this.ShowOrderColumn;
    }

    getActiveColumn() {
        return this.ActiveColumn;
    }

    getRequirementSetColumn() {
        return this.RequirementSetColumn;
    }

}

export class AttributeKeyDialogPage {
    modalTitle = element(by.css('h4#myAttributeKeyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('textarea#field_description'));
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
