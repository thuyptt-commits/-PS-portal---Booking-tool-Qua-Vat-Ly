import { Page } from '@playwright/test';

export class BookingPage {
  constructor(private page: Page) {}

  async openBookingMenu() {
    await this.page.getByText('Vận hành PS').click();
    await this.page.getByText('Booking Tool').click();
    await this.page.getByRole('link', { name: 'Danh sách booking' }).click();
  }

  async openCreateBooking() {
    await this.page.getByRole('link', { name: 'Tạo Booking' }).click();
  }

  async selectCampaign(keyword: string, campaign: string) {
    await this.page.getByRole('combobox', { name: '* Tên chiến dịch' }).fill(keyword);
    await this.page.getByTitle(campaign).click();
  }

  async selectService(serviceCode: string, serviceName: string) {
    await this.page.getByRole('combobox', { name: '* Tên dịch vụ' }).fill(serviceCode);
    await this.page.getByText(serviceName).click();
  }

  async selectHub(hubText: string) {
    await this.page.getByRole('combobox', { name: '* Địa điểm sử dụng (hub)' }).click();
    await this.page.getByText(hubText).click();
  }

  async selectServiceDetail(detail: string) {
    await this.page.getByRole('combobox', { name: '* Chi tiết dịch vụ' }).click();
    await this.page.getByText(detail).click();
  }

  async setQuantity(value: string) {
    await this.page.getByRole('spinbutton', { name: '* Số lượng dịch vụ' }).fill(value);
  }

  async selectDate(day: string) {
    await this.page.getByRole('textbox', { name: '* Thời gian sử dụng' }).click();
    await this.page.getByRole('table').getByText(day, { exact: true }).click();
    await this.page.getByRole('button', { name: 'OK', exact: true }).click();
  }

  async selectLocation(city: string, district: string, ward: string) {
    await this.page.getByRole('combobox', { name: '* Thành phố' }).click();
    await this.page.getByText(city).click();

    await this.page.getByRole('combobox', { name: '* Quận' }).click();
    await this.page.getByText(district).click();

    await this.page.getByRole('combobox', { name: '* Phường/xã' }).click();
    await this.page.getByText(ward).click();
  }

  async fillAddress(address: string) {
    await this.page.getByRole('textbox', { name: '* Địa chỉ cụ thể' }).fill(address);
  }

  async fillNote(note: string) {
  const locator = this.page.getByRole('textbox', { name: 'Yêu cầu đặc biệt khác' });

  await locator.fill(note);
}
async selectLanguage(language: string) {
  // Click mở dropdown (giống Ant Select)
  await this.page
    .locator('.ant-select-selection-item')
    .filter({
      hasText: 'Tiếng việt',
    })
    .click();

  // Chọn option
  await this.page
    .getByText(language, { exact: true })
    .last()
    .click();
}

  async selectPayment(type: string) {
    await this.page.getByTitle('Yêu cầu thanh toán').click();
    await this.page.getByText(type).click();
  }

  async fillBuyerInfo(data: {
    gender: string;
    name: string;
    phone: string;
    email: string;
  }) {
    await this.page.locator('#bookingDetail_customerInfo_bookingBuyer_gender').click();
    await this.page.getByText(data.gender, { exact: true }).click();

    await this.page.locator('#bookingDetail_customerInfo_bookingBuyer_fullName').fill(data.name);
    await this.page.getByRole('textbox', { name: '* Số điện thoại' }).fill(data.phone);
    await this.page.locator('#bookingDetail_customerInfo_bookingBuyer_email').fill(data.email);
  }

  async getBuyerInfo() {
    await this.page.getByRole('button', { name: 'Lấy thông tin người mua' }).click();
  }

  async submitBooking() {
    await this.page.getByRole('button', { name: 'Tạo Booking' }).click();
    await this.page.getByRole('button', { name: 'Xác nhận' }).click();
  }
}