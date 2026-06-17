import { test as base, expect } from '@playwright/test';
import { EditCategoryPage } from '../../pages/AdditionalFeeOnOff.page';

type EditCategoryFixture = {
  editCategoryPage: EditCategoryPage;
};

export const test = base.extend<EditCategoryFixture>({
  editCategoryPage: async ({ page }, use) => {
    await use(new EditCategoryPage(page));
  },
});

export { expect };