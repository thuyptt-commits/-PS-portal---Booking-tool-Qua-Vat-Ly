import { Page } from '@playwright/test';

export class CampaignPage {
  constructor(private page: Page) {}

  async openCampaignList() {
    await this.page.getByText('Quản lý chiến dịch').click();
    await this.page.getByRole('link', { name: 'Danh sách chiến dịch' }).click();
  }

  async searchCampaign(code: string) {
    await this.page
      .getByRole('columnheader', { name: 'Mã chiến dịch search' })
      .getByRole('button')
      .click();

    await this.page.getByRole('textbox', { name: 'Tìm mã chiến dịch' }).fill(code);
    await this.page.getByRole('button', { name: 'Ok' }).click();
  }

  async openEditCampaign() {
    await this.page.getByRole('button', { name: 'edit' }).click();
  }

  async syncCampaign() {
    await this.page.getByRole('button', { name: 'Sync...' }).click();
  }

  async selectDay(day: string) {
    await this.page.getByText(day, { exact: true }).click();
  }

  async updateSpinValues(index1: number, value1: string, index2: number, value2: string) {
    await this.page.getByRole('spinbutton').nth(index1).fill(value1);
    await this.page.getByRole('spinbutton').nth(index2).fill(value2);
  }

  async saveCampaign() {
    await this.page.getByRole('button', { name: 'Lưu chiến dịch' }).click();
    await this.page.getByRole('button', { name: 'Xác nhận' }).click();
  }
}