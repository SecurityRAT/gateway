import { element, by, ElementFinder } from 'protractor';

export class RequirementSetComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-requirement-set div table .btn-danger'));
  title = element.all(by.css('jhi-requirement-set div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setShowOrderInput(showOrder: string): Promise<void> {
    await this.showOrderInput.sendKeys(showOrder);
  }

  async getShowOrderInput(): Promise<string> {
    return await this.showOrderInput.getAttribute('value');
  }

  getActiveInput(): ElementFinder {
    return this.activeInput;
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RequirementSetDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-requirementSet-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-requirementSet'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
