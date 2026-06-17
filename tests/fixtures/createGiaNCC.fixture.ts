import { test as base } from '@playwright/test';
import { ContractGiftPage } from '../../pages/createGiaNCC.page';

type Fixtures = {
  contractGiftPage: ContractGiftPage;
};

export const test = base.extend<Fixtures>({
  contractGiftPage: async (
    { page },
    use
  ) => {
    await use(
      new ContractGiftPage(page)
    );
  },
});

export { expect } from '@playwright/test';