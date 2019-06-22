/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { SkeletonComponentsPage, SkeletonDeleteDialog, SkeletonUpdatePage } from './skeleton.page-object';

const expect = chai.expect;

describe('Skeleton e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let skeletonUpdatePage: SkeletonUpdatePage;
  let skeletonComponentsPage: SkeletonComponentsPage;
  let skeletonDeleteDialog: SkeletonDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Skeletons', async () => {
    await navBarPage.goToEntity('skeleton');
    skeletonComponentsPage = new SkeletonComponentsPage();
    await browser.wait(ec.visibilityOf(skeletonComponentsPage.title), 5000);
    expect(await skeletonComponentsPage.getTitle()).to.eq('Skeletons');
  });

  it('should load create Skeleton page', async () => {
    await skeletonComponentsPage.clickOnCreateButton();
    skeletonUpdatePage = new SkeletonUpdatePage();
    expect(await skeletonUpdatePage.getPageTitle()).to.eq('Create or edit a Skeleton');
    await skeletonUpdatePage.cancel();
  });

  it('should create and save Skeletons', async () => {
    const nbButtonsBeforeCreate = await skeletonComponentsPage.countDeleteButtons();

    await skeletonComponentsPage.clickOnCreateButton();
    await promise.all([
      skeletonUpdatePage.setNameInput('name'),
      skeletonUpdatePage.setDescriptionInput('description'),
      skeletonUpdatePage.setShowOrderInput('5'),
      skeletonUpdatePage.requirementSetSelectLastOption()
    ]);
    expect(await skeletonUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await skeletonUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await skeletonUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = skeletonUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await skeletonUpdatePage.getActiveInput().click();
      expect(await skeletonUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await skeletonUpdatePage.getActiveInput().click();
      expect(await skeletonUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await skeletonUpdatePage.save();
    expect(await skeletonUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await skeletonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Skeleton', async () => {
    const nbButtonsBeforeDelete = await skeletonComponentsPage.countDeleteButtons();
    await skeletonComponentsPage.clickOnLastDeleteButton();

    skeletonDeleteDialog = new SkeletonDeleteDialog();
    expect(await skeletonDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Skeleton?');
    await skeletonDeleteDialog.clickOnConfirmButton();

    expect(await skeletonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
