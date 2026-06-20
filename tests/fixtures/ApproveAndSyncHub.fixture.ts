import { test as base } from '@playwright/test';
import { SystemGiftApprovalPage } from '../../pages/ApproveAndSyncHub.page';

type Fixtures = {
  systemGiftApprovalPage: SystemGiftApprovalPage;
};

export const systemGiftApprovalTest =
  base.extend<Fixtures>({
    systemGiftApprovalPage: async (
      { page },
      use
    ) => {
      await use(
        new SystemGiftApprovalPage(page)
      );
    },
  });