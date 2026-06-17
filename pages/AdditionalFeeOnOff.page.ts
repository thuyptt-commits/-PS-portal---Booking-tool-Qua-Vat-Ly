import { Page, expect } from '@playwright/test';

export class EditCategoryPage {
  constructor(private page: Page) {}

  async openCategoryManagement() {
    await this.page.getByText('Vận hành PS').click();
    await this.page.getByRole('link', {
      name: 'PS Quản lý Category',
    }).click();
  }

  async openEditCategory(categoryId: string) {
    const row = this.page.locator('tbody tr').filter({
      has: this.page.locator('td').first().getByText(categoryId),
    });

    await row.getByRole('button').first().click();
  }

  async toggleAdditionalFee(subCategoryIndex: number) {
    await this.page
      .locator(`#subTitleHasAdditionalFee-${subCategoryIndex}`)
      .click();
  }

  async saveCategory() {
    await this.page
      .getByRole('button', { name: 'Lưu category' })
      .click();

    await this.page
      .getByRole('button', { name: 'Xác nhận' })
      .click();
  }

  async verifyUpdateSuccess() {
    await expect(
      this.page.getByText('Cập nhật category thành công')
    ).toBeVisible({
      timeout: 10000,
    });
  }
}