import { test as base } from '@playwright/test';
import { BookingPage } from '../../pages/EditExpectedUseTime.page';

type Fixtures = {
  bookingPage: BookingPage;
};

export const test = base.extend<Fixtures>({
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
});

export { expect } from '@playwright/test';