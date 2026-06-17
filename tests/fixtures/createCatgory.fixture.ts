import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { CategoryPage } from '../../pages/createCategory.page';

type MyFixtures = {
  loginPage: LoginPage;
  categoryPage: CategoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
});

export { expect };