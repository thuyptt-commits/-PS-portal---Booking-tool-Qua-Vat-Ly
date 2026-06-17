import { test as base } from '@playwright/test';
import { CreateContractGiftPage } from '../../pages/createQHD.page';

type ContractGiftFixture = {
  createContractGiftPage: CreateContractGiftPage;
};

export const test =
  base.extend<ContractGiftFixture>({
    createContractGiftPage: async (
      { page },
      use
    ) => {
      await use(
        new CreateContractGiftPage(page)
      );
    },
  });