import { test as base } from '@playwright/test';
import { CreateSystemGiftPage } from '../../pages/createSystemGift.page';

type Fixtures = {
  createSystemGiftPage: CreateSystemGiftPage;
};

export const createSystemGiftTest =
  base.extend<Fixtures>({
    createSystemGiftPage: async (
      { page },
      use
    ) => {
      await use(
        new CreateSystemGiftPage(page)
      );
    },
  });

export const expect =
  createSystemGiftTest.expect;