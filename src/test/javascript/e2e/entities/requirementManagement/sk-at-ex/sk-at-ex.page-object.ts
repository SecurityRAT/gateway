import { element, by, ElementFinder } from 'protractor';

export class SkAtExComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sk-at-ex div table .btn-danger'));
  title = element.all(by.css('jhi-sk-at-ex div h2#page-heading span')).first();
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

export class SkAtExUpdatePage {
  pageTitle = element(by.id('jhi-sk-at-ex-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  skeletonSelect = element(by.id('field_skeleton'));
  attributeSelect = element(by.id('field_attribute'));
  extensionSelect = element(by.id('field_extension'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async skeletonSelectLastOption(): Promise<void> {
    await this.skeletonSelect.all(by.tagName('option')).last().click();
  }

  async skeletonSelectOption(option: string): Promise<void> {
    await this.skeletonSelect.sendKeys(option);
  }

  getSkeletonSelect(): ElementFinder {
    return this.skeletonSelect;
  }

  async getSkeletonSelectedOption(): Promise<string> {
    return await this.skeletonSelect.element(by.css('option:checked')).getText();
  }

  async attributeSelectLastOption(): Promise<void> {
    await this.attributeSelect.all(by.tagName('option')).last().click();
  }

  async attributeSelectOption(option: string): Promise<void> {
    await this.attributeSelect.sendKeys(option);
  }

  getAttributeSelect(): ElementFinder {
    return this.attributeSelect;
  }

  async getAttributeSelectedOption(): Promise<string> {
    return await this.attributeSelect.element(by.css('option:checked')).getText();
  }

  async extensionSelectLastOption(): Promise<void> {
    await this.extensionSelect.all(by.tagName('option')).last().click();
  }

  async extensionSelectOption(option: string): Promise<void> {
    await this.extensionSelect.sendKeys(option);
  }

  getExtensionSelect(): ElementFinder {
    return this.extensionSelect;
  }

  async getExtensionSelectedOption(): Promise<string> {
    return await this.extensionSelect.element(by.css('option:checked')).getText();
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

export class SkAtExDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-skAtEx-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-skAtEx'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
