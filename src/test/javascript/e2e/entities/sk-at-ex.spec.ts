import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SkAtEx e2e test', () => {

    let navBarPage: NavBarPage;
    let skAtExDialogPage: SkAtExDialogPage;
    let skAtExComponentsPage: SkAtExComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SkAtExes', () => {
        navBarPage.goToEntity('sk-at-ex');
        skAtExComponentsPage = new SkAtExComponentsPage();
        expect(skAtExComponentsPage.getTitle())
            .toMatch(/Sk At Exes/);

    });

    it('should load create SkAtEx dialog', () => {
        skAtExComponentsPage.clickOnCreateButton();
        skAtExDialogPage = new SkAtExDialogPage();
        expect(skAtExDialogPage.getModalTitle())
            .toMatch(/Create or edit a Sk At Ex/);
        skAtExDialogPage.close();
    });

    it('should create and save SkAtExes', () => {
        skAtExComponentsPage.clickOnCreateButton();
        skAtExDialogPage.skeletonSelectLastOption();
        skAtExDialogPage.attributeSelectLastOption();
        skAtExDialogPage.extensionSelectLastOption();
        skAtExDialogPage.save();
        expect(skAtExDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkAtExComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sk-at-ex div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SkAtExDialogPage {
    modalTitle = element(by.css('h4#mySkAtExLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    skeletonSelect = element(by.css('select#field_skeleton'));
    attributeSelect = element(by.css('select#field_attribute'));
    extensionSelect = element(by.css('select#field_extension'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    skeletonSelectLastOption = function() {
        this.skeletonSelect.all(by.tagName('option')).last().click();
    }

    skeletonSelectOption = function(option) {
        this.skeletonSelect.sendKeys(option);
    }

    getSkeletonSelect = function() {
        return this.skeletonSelect;
    }

    getSkeletonSelectedOption = function() {
        return this.skeletonSelect.element(by.css('option:checked')).getText();
    }

    attributeSelectLastOption = function() {
        this.attributeSelect.all(by.tagName('option')).last().click();
    }

    attributeSelectOption = function(option) {
        this.attributeSelect.sendKeys(option);
    }

    getAttributeSelect = function() {
        return this.attributeSelect;
    }

    getAttributeSelectedOption = function() {
        return this.attributeSelect.element(by.css('option:checked')).getText();
    }

    extensionSelectLastOption = function() {
        this.extensionSelect.all(by.tagName('option')).last().click();
    }

    extensionSelectOption = function(option) {
        this.extensionSelect.sendKeys(option);
    }

    getExtensionSelect = function() {
        return this.extensionSelect;
    }

    getExtensionSelectedOption = function() {
        return this.extensionSelect.element(by.css('option:checked')).getText();
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
