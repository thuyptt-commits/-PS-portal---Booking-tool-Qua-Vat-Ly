import { LoginPage } from '../../pages/login.page';
import { systemGiftApprovalTest } from '../fixtures/ApproveAndSyncHub.fixture';

systemGiftApprovalTest(
    'Approve gift and create Hub gift',
    async ({
        page,
        systemGiftApprovalPage,
    }) => {
        const loginPage =
            new LoginPage(page);

        await loginPage.login(
            'qc-super-admin@urbox.vn',
            'UrBox@123'
        );

        await systemGiftApprovalPage.openSystemGiftList();

        const data = {
            giftId: '505',
        };

        await systemGiftApprovalPage.openGiftDetail(
            data.giftId
        );

        await systemGiftApprovalPage.requestApproval();

        await systemGiftApprovalPage.approveGift();

        await systemGiftApprovalPage.createHubGift();

        await systemGiftApprovalPage.verifyCreateHubSuccess();
    }
);