import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ExtensionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extension div table .btn-danger'));
  title = element.all(by.css('jhi-extension div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class ExtensionUpdatePage {
  pageTitle = element(by.id('jhi-extension-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('field_content'));
  descriptionInput = element(by.id('field_description'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));
  extensionKeySelect = element(by.id('field_extensionKey'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setShowOrderInput(showOrder) {
    await this.showOrderInput.sendKeys(showOrder);
  }

  async getShowOrderInput() {
    return await this.showOrderInput.getAttribute('value');
  }

  getActiveInput(timeout?: number) {
    return this.activeInput;
  }

  async extensionKeySelectLastOption(timeout?: number) {
    await this.extensionKeySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async extensionKeySelectOption(option) {
    await this.extensionKeySelect.sendKeys(option);
  }

  getExtensionKeySelect(): ElementFinder {
    return this.extensionKeySelect;
  }

  async getExtensionKeySelectedOption() {
    return await this.extensionKeySelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ExtensionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extension-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extension'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
