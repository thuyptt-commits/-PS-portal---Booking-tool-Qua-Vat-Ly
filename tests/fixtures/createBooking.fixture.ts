import { test as base, expect } from '@playwright/test';
import { BookingPage } from '../../pages/createBooking.page';

type Fixtures = {
  bookingPage: BookingPage;
};

export const test = base.extend<Fixtures>({
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
});

export { expect };