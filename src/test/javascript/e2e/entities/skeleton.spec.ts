import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Skeleton e2e test', () => {

    let navBarPage: NavBarPage;
    let skeletonDialogPage: SkeletonDialogPage;
    let skeletonComponentsPage: SkeletonComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Skeletons', () => {
        navBarPage.goToEntity('skeleton');
        skeletonComponentsPage = new SkeletonComponentsPage();
        expect(skeletonComponentsPage.getTitle())
            .toMatch(/Skeletons/);

    });

    it('should load create Skeleton dialog', () => {
        skeletonComponentsPage.clickOnCreateButton();
        skeletonDialogPage = new SkeletonDialogPage();
        expect(skeletonDialogPage.getModalTitle())
            .toMatch(/Create or edit a Skeleton/);
        skeletonDialogPage.close();
    });

    it('should create and save Skeletons', () => {
        skeletonComponentsPage.clickOnCreateButton();
        skeletonDialogPage.setNameInput('name');
        expect(skeletonDialogPage.getNameInput()).toMatch('name');
        skeletonDialogPage.setDescriptionInput('description');
        expect(skeletonDialogPage.getDescriptionInput()).toMatch('description');
        skeletonDialogPage.setShowOrderInput('5');
        expect(skeletonDialogPage.getShowOrderInput()).toMatch('5');
        skeletonDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                skeletonDialogPage.getActiveInput().click();
                expect(skeletonDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                skeletonDialogPage.getActiveInput().click();
                expect(skeletonDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        skeletonDialogPage.requirementSetSelectLastOption();
        skeletonDialogPage.save();
        expect(skeletonDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkeletonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-skeleton div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SkeletonDialogPage {
    modalTitle = element(by.css('h4#mySkeletonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('textarea#field_description'));
    showOrderInput = element(by.css('input#field_showOrder'));
    activeInput = element(by.css('input#field_active'));
    requirementSetSelect = element(by.css('select#field_requirementSet'));

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
    requirementSetSelectLastOption = function() {
        this.requirementSetSelect.all(by.tagName('option')).last().click();
    }

    requirementSetSelectOption = function(option) {
        this.requirementSetSelect.sendKeys(option);
    }

    getRequirementSetSelect = function() {
        return this.requirementSetSelect;
    }

    getRequirementSetSelectedOption = function() {
        return this.requirementSetSelect.element(by.css('option:checked')).getText();
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
