import { expect, Locator, Page } from '@playwright/test';

export class SystemGiftEditPage {
  readonly page: Page;

  readonly contractGiftDropdown: Locator;
  readonly contractGiftSearch: Locator;
  readonly addButton: Locator;
  readonly saveButton: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.contractGiftDropdown =
      page.locator('.ant-select-selection-overflow').first();

    this.contractGiftSearch =
      page.getByRole('combobox', {
        name: 'Thêm quà hợp đồng',
      });

    this.addButton =
      page.getByRole('button', { name: 'plus' }).first();

    this.saveButton =
      page.getByRole('button', { name: 'Lưu' });

    this.confirmButton =
      page.getByRole('button', { name: 'Xác nhận' });
  }

  async open(giftId: number) {
    await this.page.goto(
      `https://urcard-portal-web.urbox.dev/system-gifts/${giftId}/edit`
    );

    await expect(this.saveButton).toBeVisible();
  }

  async addContractGift(
    contractGiftId: string,
    giftName: string
  ) {
    await this.contractGiftDropdown.click();

    await this.contractGiftSearch.fill(contractGiftId);

    await this.page
      .getByText(giftName, { exact: false })
      .click();

    await this.addButton.click();
  }

  async save() {
    await this.saveButton.click();

    await this.confirmButton.click();
  }
}