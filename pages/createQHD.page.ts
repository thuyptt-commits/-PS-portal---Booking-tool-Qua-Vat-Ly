import { Page, expect } from '@playwright/test';

export class CreateContractGiftPage {
  constructor(private page: Page) {}

  async openCreateContractGift() {
    await this.page.getByText('Vận hành PS').click();

    await this.page
      .getByRole('link', {
        name: 'PS Quản lý Quà hợp đồng',
      })
      .click();

    await this.page
      .getByRole('link', {
        name: 'Tạo quà hợp đồng',
      })
      .click();
  }

  async fillGiftName(giftName: string) {
    await this.page
      .getByRole('textbox', {
        name: '* Tên quà hợp đồng',
      })
      .fill(giftName);
  }

  async fillDisplayName(displayName: string) {
    await this.page
      .getByRole('textbox', {
        name: 'Tên hiển thị cho khách hàng',
      })
      .fill(displayName);
  }

  async selectBrand(brand: string) {
    await this.page
      .getByRole('combobox', {
        name: '* Thương hiệu',
      })
      .click();

    await this.page.getByText(brand).click();
  }

  async selectCategory(category: string) {
    await this.page
      .getByRole('combobox', {
        name: '* Cate',
      })
      .click();

    await this.page.getByText(category).click();
  }

  async selectSubCategory(subCategory: string) {
    await this.page
      .getByRole('combobox', {
        name: '* Sub Cate',
      })
      .click();

    await this.page
      .getByTitle(subCategory)
      .click();
  }

  async selectStatus() {
    await this.page
      .getByText('Đang hoạt động')
      .first()
      .click();

    await this.page
      .getByText('Đang hoạt động')
      .nth(1)
      .click();
  }

  async fillNumberOfUsers(numberOfUsers: string) {
    await this.page
      .getByRole('spinbutton', {
        name: '* Số người sử dụng',
      })
      .fill(numberOfUsers);
  }

  async selectStyle(style: string) {
    await this.page
      .locator('.ant-select-selection-overflow')
      .click();

    await this.page
      .getByRole('combobox', {
        name: 'Phong cách',
      })
      .fill(style);

    await this.page
      .getByText('Style')
      .nth(3)
      .click();
  }

  async fillFeatureVI(content: string) {
    await this.page
      .locator('.se-wrapper-inner.se-wrapper-wysiwyg')
      .first()
      .fill(content);
  }

  async fillFeatureEN(content: string) {
    await this.page
      .locator(
        'div:nth-child(11) > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .sun-editor > .se-container > .se-wrapper > .se-wrapper-inner.se-wrapper-wysiwyg'
      )
      .fill(content);
  }

  async fillNote(note: string) {
    await this.page
      .locator(
        '.ant-col.ant-col-24 > .ant-row > .ant-col.ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .sun-editor > .se-container > .se-wrapper > .se-wrapper-inner.se-wrapper-wysiwyg'
      )
      .fill(note);
  }

  async saveContractGift() {
    await this.page
      .getByRole('button', {
        name: 'Lưu quà hợp đồng',
      })
      .click();

    await this.page
      .getByRole('button', {
        name: 'Xác nhận',
      })
      .click();
  }

  async verifyCreateSuccess() {
    await expect(
      this.page.getByText(
        'Tạo quà hợp đồng thành công'
      )
    ).toBeVisible({
      timeout: 10000,
    });
  }
}