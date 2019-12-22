import { element, by, ElementFinder } from 'protractor';

export class ExtensionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extension div table .btn-danger'));
  title = element.all(by.css('jhi-extension div h2#page-heading span')).first();

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

export class ExtensionUpdatePage {
  pageTitle = element(by.id('jhi-extension-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('field_content'));
  descriptionInput = element(by.id('field_description'));
  showOrderInput = element(by.id('field_showOrder'));
  activeInput = element(by.id('field_active'));
  extensionKeySelect = element(by.id('field_extensionKey'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
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

  async extensionKeySelectLastOption(): Promise<void> {
    await this.extensionKeySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async extensionKeySelectOption(option: string): Promise<void> {
    await this.extensionKeySelect.sendKeys(option);
  }

  getExtensionKeySelect(): ElementFinder {
    return this.extensionKeySelect;
  }

  async getExtensionKeySelectedOption(): Promise<string> {
    return await this.extensionKeySelect.element(by.css('option:checked')).getText();
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

export class ExtensionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extension-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extension'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
