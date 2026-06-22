import { test, expect } from '../fixtures/EditExpectedUseTime.fixture';
import { LoginPage } from '../../pages/login.page';

test('Edit expected use time booking form', async ({ page, bookingPage }) => {
  const loginPage =
    new LoginPage(page);

  await loginPage.login(
    'qc-super-admin@urbox.vn',
    'UrBox@123'
  );

  // navigate
  await bookingPage.openBookingList();
  await bookingPage.openFirstForm(3);

   // data test (FIX HERE)
  const expectedUseTime = {
    day: '29',
    hour: '12',
    time: '00', // ✅ đổi minute → time
  };

  await bookingPage.editExpectedUseTime(expectedUseTime);

  await bookingPage.selectBrand('LG29762 - CÔNG TY CỔ PHẦN');
  await bookingPage.selectFeeType('- Phí linh hoạt');
});