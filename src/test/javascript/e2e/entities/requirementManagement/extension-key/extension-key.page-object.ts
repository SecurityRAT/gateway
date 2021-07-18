import { element, by, ElementFinder } from 'protractor';

export class ExtensionKeyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extension-key div table .btn-danger'));
  title = element.all(by.css('jhi-extension-key div h2#page-heading span')).first();
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

export class ExtensionKeyUpdatePage {
  pageTitle = element(by.id('jhi-extension-key-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  sectionSelect = element(by.id('field_section'));
  typeSelect = element(by.id('field_type'));
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

  async setSectionSelect(section: string): Promise<void> {
    await this.sectionSelect.sendKeys(section);
  }

  async getSectionSelect(): Promise<string> {
    return await this.sectionSelect.element(by.css('option:checked')).getText();
  }

  async sectionSelectLastOption(): Promise<void> {
    await this.sectionSelect.all(by.tagName('option')).last().click();
  }

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
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
    await this.requirementSetSelect.all(by.tagName('option')).last().click();
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

export class ExtensionKeyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extensionKey-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extensionKey'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
