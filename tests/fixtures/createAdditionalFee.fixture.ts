import { test as base } from '@playwright/test';
import { AdditionalFeePage } from '../../pages/createAdditionalFee.page';

type Fixtures = {
  additionalFeePage: AdditionalFeePage;
};

export const additionalFeeTest =
  base.extend<Fixtures>({
    additionalFeePage: async (
      { page },
      use
    ) => {
      await use(
        new AdditionalFeePage(page)
      );
    },
  });

export { expect } from '@playwright/test';