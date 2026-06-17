import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

type Fixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const authFixture = {
  username: 'qc-super-admin@urbox.vn',
  password: 'UrBox@123',
};

export { expect };