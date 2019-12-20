import { element, by, ElementFinder } from 'protractor';

export class SkAtExComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sk-at-ex div table .btn-danger'));
  title = element.all(by.css('jhi-sk-at-ex div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class SkAtExUpdatePage {
  pageTitle = element(by.id('jhi-sk-at-ex-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  skeletonSelect = element(by.id('field_skeleton'));
  attributeSelect = element(by.id('field_attribute'));
  extensionSelect = element(by.id('field_extension'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async skeletonSelectLastOption() {
    await this.skeletonSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async skeletonSelectOption(option) {
    await this.skeletonSelect.sendKeys(option);
  }

  getSkeletonSelect(): ElementFinder {
    return this.skeletonSelect;
  }

  async getSkeletonSelectedOption() {
    return await this.skeletonSelect.element(by.css('option:checked')).getText();
  }

  async attributeSelectLastOption() {
    await this.attributeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async attributeSelectOption(option) {
    await this.attributeSelect.sendKeys(option);
  }

  getAttributeSelect(): ElementFinder {
    return this.attributeSelect;
  }

  async getAttributeSelectedOption() {
    return await this.attributeSelect.element(by.css('option:checked')).getText();
  }

  async extensionSelectLastOption() {
    await this.extensionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async extensionSelectOption(option) {
    await this.extensionSelect.sendKeys(option);
  }

  getExtensionSelect(): ElementFinder {
    return this.extensionSelect;
  }

  async getExtensionSelectedOption() {
    return await this.extensionSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class SkAtExDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-skAtEx-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-skAtEx'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
