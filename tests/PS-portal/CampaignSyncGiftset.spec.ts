import { test } from '../fixtures/CampaignSyncGiftset.fixture';
import { LoginPage } from '../../pages/login.page'

test('Approve gift and create Hub gift', async ({ page, campaignPage }) => {

  const loginPage =
    new LoginPage(page);

  await loginPage.login(
    'qc-super-admin@urbox.vn',
    'UrBox@123'
  );

  const data = {
    campaignCode: 'EV693763',
    day: '7',
    spin1: '9999',
    spin2: '1',
  };

  await campaignPage.openCampaignList();
  await campaignPage.searchCampaign(data.campaignCode);

  await campaignPage.openEditCampaign();
  await campaignPage.syncCampaign();

  await campaignPage.selectDay(data.day);

  await campaignPage.updateSpinValues(4, data.spin1, 5, data.spin2);

  await campaignPage.saveCampaign();
});