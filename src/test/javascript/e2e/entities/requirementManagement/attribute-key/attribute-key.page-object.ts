import { element, by, ElementFinder } from 'protractor';

export class AttributeKeyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-attribute-key div table .btn-danger'));
  title = element.all(by.css('jhi-attribute-key div h2#page-heading span')).first();

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

export class AttributeKeyUpdatePage {
  pageTitle = element(by.id('jhi-attribute-key-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  typeSelect = element(by.id('field_type'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));
  requirementSetSelect = element(by.id('field_requirementSet'));

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

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setShowOrderInput(showOrder) {
    await this.showOrderInput.sendKeys(showOrder);
  }

  async getShowOrderInput() {
    return await this.showOrderInput.getAttribute('value');
  }

  getActiveInput() {
    return this.activeInput;
  }

  async requirementSetSelectLastOption() {
    await this.requirementSetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async requirementSetSelectOption(option) {
    await this.requirementSetSelect.sendKeys(option);
  }

  getRequirementSetSelect(): ElementFinder {
    return this.requirementSetSelect;
  }

  async getRequirementSetSelectedOption() {
    return await this.requirementSetSelect.element(by.css('option:checked')).getText();
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

export class AttributeKeyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-attributeKey-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-attributeKey'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
