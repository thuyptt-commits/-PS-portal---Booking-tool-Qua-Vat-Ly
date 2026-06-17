import { expect } from '@playwright/test';
import { testCreateCMP } from '../fixtures/createCampaign.fixture';
import { LoginPage } from '../../pages/login.page';


testCreateCMP('create campaign - full flow with explicit login', async ({ page,createCampaignPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );


    await createCampaignPage.openCreateCampaign();
    await createCampaignPage.chooseTemplate('UrCard Manual Operation');

    const visibleName = '[eKYC] UC Manual - Thẻ DD2';
    const internalName = '[[eKYC] UC Manual - Thẻ DD2';
    await createCampaignPage.fillNames(visibleName, internalName);

    await createCampaignPage.selectIssuer('PL0001 - UrBox');
    await createCampaignPage.addGroupAndProduct('Voucher UrBox (Link & App)');
    await createCampaignPage.chooseLegalEntity('LG00096 - CÔNG TY CỔ PHẦN KỸ THUẬT & KHOA HỌC VĨNH KHANG');
    await createCampaignPage.setAppId('500000629');
    await createCampaignPage.setTypeCard('Thẻ định danh - OTP');



    await createCampaignPage.setThresholds({
        balanceThreshold: '500000',
        redeemOnce: '200000',
        redeemDaily: '500000',
        topupOnce: '400000',
        topupDaily: '1000000',
    });

    await createCampaignPage.saveAndConfirm();

    await expect(createCampaignPage.page.getByText('Danh sách chiến dịch').first()).toBeVisible({ timeout: 15_000 });
});
// ...existing code...