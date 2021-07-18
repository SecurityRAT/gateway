import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AttributeKeyComponentsPage, AttributeKeyDeleteDialog, AttributeKeyUpdatePage } from './attribute-key.page-object';

const expect = chai.expect;

describe('AttributeKey e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let attributeKeyComponentsPage: AttributeKeyComponentsPage;
  let attributeKeyUpdatePage: AttributeKeyUpdatePage;
  let attributeKeyDeleteDialog: AttributeKeyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AttributeKeys', async () => {
    await navBarPage.goToEntity('attribute-key');
    attributeKeyComponentsPage = new AttributeKeyComponentsPage();
    await browser.wait(ec.visibilityOf(attributeKeyComponentsPage.title), 5000);
    expect(await attributeKeyComponentsPage.getTitle()).to.eq('Attribute Keys');
    await browser.wait(
      ec.or(ec.visibilityOf(attributeKeyComponentsPage.entities), ec.visibilityOf(attributeKeyComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AttributeKey page', async () => {
    await attributeKeyComponentsPage.clickOnCreateButton();
    attributeKeyUpdatePage = new AttributeKeyUpdatePage();
    expect(await attributeKeyUpdatePage.getPageTitle()).to.eq('Create or edit a Attribute Key');
    await attributeKeyUpdatePage.cancel();
  });

  it('should create and save AttributeKeys', async () => {
    const nbButtonsBeforeCreate = await attributeKeyComponentsPage.countDeleteButtons();

    await attributeKeyComponentsPage.clickOnCreateButton();

    await promise.all([
      attributeKeyUpdatePage.setNameInput('name'),
      attributeKeyUpdatePage.setDescriptionInput('description'),
      attributeKeyUpdatePage.typeSelectLastOption(),
      attributeKeyUpdatePage.setShowOrderInput('5'),
      attributeKeyUpdatePage.requirementSetSelectLastOption(),
    ]);

    expect(await attributeKeyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await attributeKeyUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await attributeKeyUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = attributeKeyUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await attributeKeyUpdatePage.getActiveInput().click();
      expect(await attributeKeyUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await attributeKeyUpdatePage.getActiveInput().click();
      expect(await attributeKeyUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await attributeKeyUpdatePage.save();
    expect(await attributeKeyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await attributeKeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AttributeKey', async () => {
    const nbButtonsBeforeDelete = await attributeKeyComponentsPage.countDeleteButtons();
    await attributeKeyComponentsPage.clickOnLastDeleteButton();

    attributeKeyDeleteDialog = new AttributeKeyDeleteDialog();
    expect(await attributeKeyDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Attribute Key?');
    await attributeKeyDeleteDialog.clickOnConfirmButton();

    expect(await attributeKeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
