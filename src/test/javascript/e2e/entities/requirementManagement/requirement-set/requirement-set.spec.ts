import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { RequirementSetComponentsPage, RequirementSetDeleteDialog, RequirementSetUpdatePage } from './requirement-set.page-object';

const expect = chai.expect;

describe('RequirementSet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let requirementSetComponentsPage: RequirementSetComponentsPage;
  let requirementSetUpdatePage: RequirementSetUpdatePage;
  let requirementSetDeleteDialog: RequirementSetDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RequirementSets', async () => {
    await navBarPage.goToEntity('requirement-set');
    requirementSetComponentsPage = new RequirementSetComponentsPage();
    await browser.wait(ec.visibilityOf(requirementSetComponentsPage.title), 5000);
    expect(await requirementSetComponentsPage.getTitle()).to.eq('Requirement Sets');
    await browser.wait(
      ec.or(ec.visibilityOf(requirementSetComponentsPage.entities), ec.visibilityOf(requirementSetComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RequirementSet page', async () => {
    await requirementSetComponentsPage.clickOnCreateButton();
    requirementSetUpdatePage = new RequirementSetUpdatePage();
    expect(await requirementSetUpdatePage.getPageTitle()).to.eq('Create or edit a Requirement Set');
    await requirementSetUpdatePage.cancel();
  });

  it('should create and save RequirementSets', async () => {
    const nbButtonsBeforeCreate = await requirementSetComponentsPage.countDeleteButtons();

    await requirementSetComponentsPage.clickOnCreateButton();

    await promise.all([
      requirementSetUpdatePage.setNameInput('name'),
      requirementSetUpdatePage.setDescriptionInput('description'),
      requirementSetUpdatePage.setShowOrderInput('5'),
    ]);

    expect(await requirementSetUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await requirementSetUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await requirementSetUpdatePage.getShowOrderInput()).to.eq('5', 'Expected showOrder value to be equals to 5');
    const selectedActive = requirementSetUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await requirementSetUpdatePage.getActiveInput().click();
      expect(await requirementSetUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await requirementSetUpdatePage.getActiveInput().click();
      expect(await requirementSetUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await requirementSetUpdatePage.save();
    expect(await requirementSetUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await requirementSetComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RequirementSet', async () => {
    const nbButtonsBeforeDelete = await requirementSetComponentsPage.countDeleteButtons();
    await requirementSetComponentsPage.clickOnLastDeleteButton();

    requirementSetDeleteDialog = new RequirementSetDeleteDialog();
    expect(await requirementSetDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Requirement Set?');
    await requirementSetDeleteDialog.clickOnConfirmButton();

    expect(await requirementSetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
