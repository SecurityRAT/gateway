import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class SkeletonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-skeleton div table .btn-danger'));
  title = element.all(by.css('jhi-skeleton div h2#page-heading span')).first();

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

export class SkeletonUpdatePage {
  pageTitle = element(by.id('jhi-skeleton-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
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

  async setShowOrderInput(showOrder) {
    await this.showOrderInput.sendKeys(showOrder);
  }

  async getShowOrderInput() {
    return await this.showOrderInput.getAttribute('value');
  }

  getActiveInput(timeout?: number) {
    return this.activeInput;
  }

  async requirementSetSelectLastOption(timeout?: number) {
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

export class SkeletonDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-skeleton-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-skeleton'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
