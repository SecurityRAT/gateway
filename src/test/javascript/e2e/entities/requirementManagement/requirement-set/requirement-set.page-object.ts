import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class RequirementSetComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-requirement-set div table .btn-danger'));
  title = element.all(by.css('jhi-requirement-set div h2#page-heading span')).first();

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

export class RequirementSetUpdatePage {
  pageTitle = element(by.id('jhi-requirement-set-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));

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

export class RequirementSetDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-requirementSet-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-requirementSet'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
