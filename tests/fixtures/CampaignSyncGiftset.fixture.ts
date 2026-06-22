import { test as base } from '@playwright/test';
import { CampaignPage } from '../../pages/CampaignSyncGiftset.page'; // đúng file page

type Fixtures = {
  campaignPage: CampaignPage;
};

export const test = base.extend<Fixtures>({
  campaignPage: async ({ page }, use) => {
    await use(new CampaignPage(page));
  },
});

export { expect } from '@playwright/test';