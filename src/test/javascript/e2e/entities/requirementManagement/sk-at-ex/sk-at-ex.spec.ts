import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SkAtExComponentsPage, SkAtExDeleteDialog, SkAtExUpdatePage } from './sk-at-ex.page-object';

const expect = chai.expect;

describe('SkAtEx e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let skAtExComponentsPage: SkAtExComponentsPage;
  let skAtExUpdatePage: SkAtExUpdatePage;
  let skAtExDeleteDialog: SkAtExDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SkAtExes', async () => {
    await navBarPage.goToEntity('sk-at-ex');
    skAtExComponentsPage = new SkAtExComponentsPage();
    await browser.wait(ec.visibilityOf(skAtExComponentsPage.title), 5000);
    expect(await skAtExComponentsPage.getTitle()).to.eq('Sk At Exes');
  });

  it('should load create SkAtEx page', async () => {
    await skAtExComponentsPage.clickOnCreateButton();
    skAtExUpdatePage = new SkAtExUpdatePage();
    expect(await skAtExUpdatePage.getPageTitle()).to.eq('Create or edit a Sk At Ex');
    await skAtExUpdatePage.cancel();
  });

  it('should create and save SkAtExes', async () => {
    const nbButtonsBeforeCreate = await skAtExComponentsPage.countDeleteButtons();

    await skAtExComponentsPage.clickOnCreateButton();
    await promise.all([
      skAtExUpdatePage.skeletonSelectLastOption(),
      skAtExUpdatePage.attributeSelectLastOption(),
      skAtExUpdatePage.extensionSelectLastOption()
    ]);
    await skAtExUpdatePage.save();
    expect(await skAtExUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await skAtExComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SkAtEx', async () => {
    const nbButtonsBeforeDelete = await skAtExComponentsPage.countDeleteButtons();
    await skAtExComponentsPage.clickOnLastDeleteButton();

    skAtExDeleteDialog = new SkAtExDeleteDialog();
    expect(await skAtExDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sk At Ex?');
    await skAtExDeleteDialog.clickOnConfirmButton();

    expect(await skAtExComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
