import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AttributeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-attribute div table .btn-danger'));
  title = element.all(by.css('jhi-attribute div h2#page-heading span')).first();

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

export class AttributeUpdatePage {
  pageTitle = element(by.id('jhi-attribute-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));
  parentSelect = element(by.id('field_parent'));
  attributeKeySelect = element(by.id('field_attributeKey'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
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

  async parentSelectLastOption(timeout?: number) {
    await this.parentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parentSelectOption(option) {
    await this.parentSelect.sendKeys(option);
  }

  getParentSelect(): ElementFinder {
    return this.parentSelect;
  }

  async getParentSelectedOption() {
    return await this.parentSelect.element(by.css('option:checked')).getText();
  }

  async attributeKeySelectLastOption(timeout?: number) {
    await this.attributeKeySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async attributeKeySelectOption(option) {
    await this.attributeKeySelect.sendKeys(option);
  }

  getAttributeKeySelect(): ElementFinder {
    return this.attributeKeySelect;
  }

  async getAttributeKeySelectedOption() {
    return await this.attributeKeySelect.element(by.css('option:checked')).getText();
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

export class AttributeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-attribute-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-attribute'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
