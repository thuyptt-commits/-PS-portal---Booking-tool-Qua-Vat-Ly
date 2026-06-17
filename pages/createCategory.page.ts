import { Page, expect } from '@playwright/test';

export class CategoryPage {
  constructor(private page: Page) {}

  async openCategoryManagement() {
    await this.page.getByText('Vận hành PS').click();
    await this.page.getByRole('link', { name: 'PS Quản lý Category' }).click();
  }

  async clickCreateCategory() {
    await this.page.getByRole('link', { name: 'Tạo Category' }).click();
  }

  async fillCategoryName(categoryName: string) {
    await this.page
      .getByRole('textbox', { name: '* Tên Cate (VI)' })
      .fill(categoryName);
  }

  async addFirstSubCategory(
    subCategoryName: string,
    detail: string,
  ) {
    await this.page.getByRole('button', { name: 'Thêm SubCate' }).click();

    await this.page
      .getByRole('textbox', { name: '* Tên SubCate' })
      .fill(subCategoryName);

    await this.page
      .getByRole('textbox', { name: '* Chi tiết' })
      .fill(detail);
  }

  async selectFirstDateRange() {
    await this.page
      .getByRole('textbox', { name: '* Thời gian áp dụng từ ngày' })
      .click();

    await this.page.getByText('17').click();

    await this.page
      .getByRole('textbox', { name: '* Thời gian áp dụng đến ngày' })
      .click();

    await this.page
      .getByRole('button')
      .filter({ hasText: /^$/ })
      .nth(4)
      .click();

    await this.page
      .getByRole('table')
      .getByText('30')
      .click();
  }

  async enableAdditionalFee() {
    await this.page
      .getByRole('switch', { name: 'Có chi phí bổ sung:' })
      .click();
  }

  async addSecondSubCategory(
    subCategoryName: string,
    detail: string,
  ) {
    await this.page.getByRole('button', { name: 'Thêm SubCate' }).click();

    await this.page
      .locator('#subTitle-1')
      .fill(subCategoryName);

    await this.page
      .locator('#subTitleDetail-1')
      .fill(detail);
  }

  async selectSecondDateRange() {
    await this.page
      .locator('#subTitleVatStartDate-1')
      .click();

    await this.page
      .getByRole('table')
      .getByText('17')
      .click();

    await this.page
      .getByRole('textbox', {
        name: '* Thời gian áp dụng đến ngày',
      })
      .nth(1)
      .click();

    await this.page
      .locator('.ant-picker-header-super-next-btn')
      .last()
      .click();

    await this.page
      .getByRole('cell', { name: '30' })
      .click();
  }

  async enableSecondAdditionalFee() {
    await this.page
      .locator('#subTitleHasAdditionalFee-1')
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

  async verifyCreateSuccess() {
    await expect(
      this.page.getByText('Tạo category thành công')
    ).toBeVisible();
  }
}