/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ExtensionComponentsPage, ExtensionDeleteDialog, ExtensionUpdatePage } from './extension.page-object';

const expect = chai.expect;

describe('Extension e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extensionUpdatePage: ExtensionUpdatePage;
  let extensionComponentsPage: ExtensionComponentsPage;
  let extensionDeleteDialog: ExtensionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Extensions', async () => {
    await navBarPage.goToEntity('extension');
    extensionComponentsPage = new ExtensionComponentsPage();
    await browser.wait(ec.visibilityOf(extensionComponentsPage.title), 5000);
    expect(await extensionComponentsPage.getTitle()).to.eq('Extensions');
  });

  it('should load create Extension page', async () => {
    await extensionComponentsPage.clickOnCreateButton();
    extensionUpdatePage = new ExtensionUpdatePage();
    expect(await extensionUpdatePage.getPageTitle()).to.eq('Create or edit a Extension');
    await extensionUpdatePage.cancel();
  });

  it('should create and save Extensions', async () => {
    const nbButtonsBeforeCreate = await extensionComponentsPage.countDeleteButtons();

    await extensionComponentsPage.clickOnCreateButton();
    await promise.all([
      extensionUpdatePage.setContentInput('content'),
      extensionUpdatePage.setDescriptionInput('description'),
      extensionUpdatePage.setShowOrderInput('5'),
      extensionUpdatePage.extensionKeySelectLastOption()
    ]);
    expect(await extensionUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await extensionUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await extensionUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = extensionUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await extensionUpdatePage.getActiveInput().click();
      expect(await extensionUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await extensionUpdatePage.getActiveInput().click();
      expect(await extensionUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await extensionUpdatePage.save();
    expect(await extensionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await extensionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Extension', async () => {
    const nbButtonsBeforeDelete = await extensionComponentsPage.countDeleteButtons();
    await extensionComponentsPage.clickOnLastDeleteButton();

    extensionDeleteDialog = new ExtensionDeleteDialog();
    expect(await extensionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Extension?');
    await extensionDeleteDialog.clickOnConfirmButton();

    expect(await extensionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
