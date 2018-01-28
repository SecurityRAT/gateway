import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('RequirementSet e2e test', () => {

    let navBarPage: NavBarPage;
    let requirementSetDialogPage: RequirementSetDialogPage;
    let requirementSetComponentsPage: RequirementSetComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RequirementSets', () => {
        navBarPage.goToEntity('requirement-set');
        requirementSetComponentsPage = new RequirementSetComponentsPage();
        expect(requirementSetComponentsPage.getTitle())
            .toMatch(/Requirement Sets/);

    });

    it('should load create RequirementSet dialog', () => {
        requirementSetComponentsPage.clickOnCreateButton();
        requirementSetDialogPage = new RequirementSetDialogPage();
        expect(requirementSetDialogPage.getModalTitle())
            .toMatch(/Create or edit a Requirement Set/);
        requirementSetDialogPage.close();
    });

    it('should create and save RequirementSets', () => {
        requirementSetComponentsPage.clickOnCreateButton();
        requirementSetDialogPage.setNameInput('name');
        expect(requirementSetDialogPage.getNameInput()).toMatch('name');
        requirementSetDialogPage.setDescriptionInput('description');
        expect(requirementSetDialogPage.getDescriptionInput()).toMatch('description');
        requirementSetDialogPage.setShowOrderInput('5');
        expect(requirementSetDialogPage.getShowOrderInput()).toMatch('5');
        requirementSetDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                requirementSetDialogPage.getActiveInput().click();
                expect(requirementSetDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                requirementSetDialogPage.getActiveInput().click();
                expect(requirementSetDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        requirementSetDialogPage.save();
        expect(requirementSetDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RequirementSetComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-requirement-set div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RequirementSetDialogPage {
    modalTitle = element(by.css('h4#myRequirementSetLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('textarea#field_description'));
    showOrderInput = element(by.css('input#field_showOrder'));
    activeInput = element(by.css('input#field_active'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
