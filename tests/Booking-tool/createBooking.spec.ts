import { test } from '../fixtures/createBooking.fixture';
import { LoginPage } from '../../pages/login.page';

test('Create Booking', async ({ page, bookingPage }) => {
  const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );
  // DATA
  const data = {
    campaignKeyword: 'tích hợp',
    campaign: 'EV693763 - [Tích hợp PS] Thu',
    serviceCode: '11081',
    serviceName: '- Hoa khô 1',
    hub: '209687 - Mường Thanh Grand H',
    detail: '1562 - Hoa Khô',
    qty: '1',
    day: '21',
    city: '- An Giang',
    district: '- Huyện An Phú, An Giang',
    ward: '6269 - Xã Đa Phước, Huyện An',
    address: 'request 275/77A',
    note: 'speci',
    buyer: {
      gender: 'Nam',
      name: 'Oriana',
      phone: '0987654321',
      email: 'thuy.ptt@urbox.vn',
    },
  };

  // FLOW
  await bookingPage.openBookingMenu();
  await bookingPage.openCreateBooking();

  await bookingPage.selectCampaign(data.campaignKeyword, data.campaign);
  await bookingPage.selectService(data.serviceCode, data.serviceName);

  await bookingPage.selectHub(data.hub);
  await bookingPage.selectServiceDetail(data.detail);

  await bookingPage.setQuantity(data.qty);
  await bookingPage.selectDate(data.day);

  await bookingPage.selectLocation(data.city, data.district, data.ward);
  await bookingPage.fillAddress(data.address);
  await bookingPage.fillNote(data.note);

  await bookingPage.selectLanguage('Tiếng việt');
  await bookingPage.selectPayment('Không yêu cầu thanh toán');

  await bookingPage.fillBuyerInfo(data.buyer);
  await bookingPage.getBuyerInfo();

  await bookingPage.submitBooking();
});