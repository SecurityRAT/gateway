import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ExtensionKeyComponentsPage, ExtensionKeyDeleteDialog, ExtensionKeyUpdatePage } from './extension-key.page-object';

const expect = chai.expect;

describe('ExtensionKey e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extensionKeyComponentsPage: ExtensionKeyComponentsPage;
  let extensionKeyUpdatePage: ExtensionKeyUpdatePage;
  let extensionKeyDeleteDialog: ExtensionKeyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ExtensionKeys', async () => {
    await navBarPage.goToEntity('extension-key');
    extensionKeyComponentsPage = new ExtensionKeyComponentsPage();
    await browser.wait(ec.visibilityOf(extensionKeyComponentsPage.title), 5000);
    expect(await extensionKeyComponentsPage.getTitle()).to.eq('Extension Keys');
    await browser.wait(
      ec.or(ec.visibilityOf(extensionKeyComponentsPage.entities), ec.visibilityOf(extensionKeyComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ExtensionKey page', async () => {
    await extensionKeyComponentsPage.clickOnCreateButton();
    extensionKeyUpdatePage = new ExtensionKeyUpdatePage();
    expect(await extensionKeyUpdatePage.getPageTitle()).to.eq('Create or edit a Extension Key');
    await extensionKeyUpdatePage.cancel();
  });

  it('should create and save ExtensionKeys', async () => {
    const nbButtonsBeforeCreate = await extensionKeyComponentsPage.countDeleteButtons();

    await extensionKeyComponentsPage.clickOnCreateButton();

    await promise.all([
      extensionKeyUpdatePage.setNameInput('name'),
      extensionKeyUpdatePage.setDescriptionInput('description'),
      extensionKeyUpdatePage.sectionSelectLastOption(),
      extensionKeyUpdatePage.typeSelectLastOption(),
      extensionKeyUpdatePage.setShowOrderInput('5'),
      extensionKeyUpdatePage.requirementSetSelectLastOption(),
    ]);

    expect(await extensionKeyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await extensionKeyUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await extensionKeyUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = extensionKeyUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await extensionKeyUpdatePage.getActiveInput().click();
      expect(await extensionKeyUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await extensionKeyUpdatePage.getActiveInput().click();
      expect(await extensionKeyUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await extensionKeyUpdatePage.save();
    expect(await extensionKeyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await extensionKeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ExtensionKey', async () => {
    const nbButtonsBeforeDelete = await extensionKeyComponentsPage.countDeleteButtons();
    await extensionKeyComponentsPage.clickOnLastDeleteButton();

    extensionKeyDeleteDialog = new ExtensionKeyDeleteDialog();
    expect(await extensionKeyDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Extension Key?');
    await extensionKeyDeleteDialog.clickOnConfirmButton();

    expect(await extensionKeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
