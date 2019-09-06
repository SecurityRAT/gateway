/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AttributeComponentsPage, AttributeDeleteDialog, AttributeUpdatePage } from './attribute.page-object';

const expect = chai.expect;

describe('Attribute e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let attributeUpdatePage: AttributeUpdatePage;
  let attributeComponentsPage: AttributeComponentsPage;
  let attributeDeleteDialog: AttributeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Attributes', async () => {
    await navBarPage.goToEntity('attribute');
    attributeComponentsPage = new AttributeComponentsPage();
    await browser.wait(ec.visibilityOf(attributeComponentsPage.title), 5000);
    expect(await attributeComponentsPage.getTitle()).to.eq('Attributes');
  });

  it('should load create Attribute page', async () => {
    await attributeComponentsPage.clickOnCreateButton();
    attributeUpdatePage = new AttributeUpdatePage();
    expect(await attributeUpdatePage.getPageTitle()).to.eq('Create or edit a Attribute');
    await attributeUpdatePage.cancel();
  });

  it('should create and save Attributes', async () => {
    const nbButtonsBeforeCreate = await attributeComponentsPage.countDeleteButtons();

    await attributeComponentsPage.clickOnCreateButton();
    await promise.all([
      attributeUpdatePage.setNameInput('name'),
      attributeUpdatePage.setDescriptionInput('description'),
      attributeUpdatePage.setShowOrderInput('5'),
      attributeUpdatePage.parentSelectLastOption(),
      attributeUpdatePage.attributeKeySelectLastOption()
    ]);
    expect(await attributeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await attributeUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await attributeUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = attributeUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await attributeUpdatePage.getActiveInput().click();
      expect(await attributeUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await attributeUpdatePage.getActiveInput().click();
      expect(await attributeUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await attributeUpdatePage.save();
    expect(await attributeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await attributeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Attribute', async () => {
    const nbButtonsBeforeDelete = await attributeComponentsPage.countDeleteButtons();
    await attributeComponentsPage.clickOnLastDeleteButton();

    attributeDeleteDialog = new AttributeDeleteDialog();
    expect(await attributeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Attribute?');
    await attributeDeleteDialog.clickOnConfirmButton();

    expect(await attributeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
