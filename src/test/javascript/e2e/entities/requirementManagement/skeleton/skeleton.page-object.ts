import { element, by, ElementFinder } from 'protractor';

export class SkeletonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-skeleton div table .btn-danger'));
  title = element.all(by.css('jhi-skeleton div h2#page-heading span')).first();

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

export class SkeletonUpdatePage {
  pageTitle = element(by.id('jhi-skeleton-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));
  requirementSetSelect = element(by.id('field_requirementSet'));

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

  async requirementSetSelectLastOption(): Promise<void> {
    await this.requirementSetSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async requirementSetSelectOption(option: string): Promise<void> {
    await this.requirementSetSelect.sendKeys(option);
  }

  getRequirementSetSelect(): ElementFinder {
    return this.requirementSetSelect;
  }

  async getRequirementSetSelectedOption(): Promise<string> {
    return await this.requirementSetSelect.element(by.css('option:checked')).getText();
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

export class SkeletonDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-skeleton-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-skeleton'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
