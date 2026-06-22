import { test as base } from '@playwright/test';
import { HubGiftPage } from '../../pages/Hub_AddProductID.page';

type Fixtures = {
    hubGiftPage: HubGiftPage;
};

export const hubGiftTest =
    base.extend<Fixtures>({
        hubGiftPage: async (
            { page },
            use
        ) => {
            await use(
                new HubGiftPage(page)
            );
        },
    });

export { expect } from '@playwright/test';