import { Page } from '@playwright/test';

export type ExpectedUseTime = {
  day: string;
  month: string;
  time: string; // ví dụ "00", "30"
};

export class BookingPage {
  constructor(private page: Page) { }

  async openBookingList() {
    await this.page.getByText('Vận hành PS').click();
    await this.page.getByText('Booking Tool').click();
    await this.page.getByRole('link', { name: 'Danh sách booking' }).click();
  }

  async openFirstForm(index = 3) {
    await this.page.getByRole('link', { name: 'form' }).nth(index).click();
  }

  async editExpectedUseTime(data: ExpectedUseTime) {
    const timeInput = this.page.getByRole('textbox', {
      name: '* Thời gian sử dụng',
    });

    await timeInput.click();

    const popup = this.page.locator('.ant-picker-dropdown, .datepicker, .ant-picker-panel');

    await popup.getByText(data.day, { exact: true }).click();
    await popup.getByText(data.month, { exact: true }).click();
    await popup.getByText(data.time, { exact: true }).click();

    await this.page.getByRole('button', { name: 'OK', exact: true }).click();
  }

  async selectBrand(brandText: string) {
    await this.page.locator('#bookingCodes_0_cmsBrand').click();
    await this.page.getByText(brandText).click();
  }

  async selectFeeType(type: string) {
    await this.page
      .getByRole('columnheader', { name: 'Hình thức tính phí VC' })
      .click();
    await this.page.getByText(type).click();
  }
}