import { Page, expect } from '@playwright/test';
import { test } from '../tests/fixtures/auth.fixture';

export class AdditionalFeePage {
  constructor(private page: Page) { }

  async openContractGiftManagement() {
    await this.page.getByText('Vận hành PS').click();

    await this.page
      .getByRole('link', {
        name: 'PS Quản lý Quà hợp đồng',
      })
      .click();
  }

  async openGiftDetail(giftId: string) {
    const row = this.page
      .locator('tbody tr')
      .filter({ hasText: giftId });

    await expect(row).toBeVisible();

    await row
      .locator('.anticon-info-circle')
      .click();
  }

  async openAdditionalFeeTab() {
    await this.page
      .getByRole('tab', {
        name: 'Chi phí bổ sung',
      })
      .click();
  }

  async clickAddFee() {
    await this.page
      .getByRole('button', {
        name: /Thêm giá quà/,
      })
      .click();
  }

  async selectLegalEntity(
    legalEntity: string
  ) {
    await this.page
      .getByRole('combobox', {
        name: '* Pháp nhân',
      })
      .click();

    await this.page
      .getByText(legalEntity, {
        exact: true,
      })
      .click();
  }

  async checkNoContract() {
    await this.page
      .getByRole('checkbox', {
        name: 'Chưa ký hợp đồng',
      })
      .check();
  }

  // Loại dịch vụ
  async selectFeeType(
    serviceType: string
  ) {
    await this.page
      .getByTitle(serviceType)
      .click();

    await this.page
      .getByText(serviceType, {
        exact: true,
      })
      .nth(2)
      .click();
  }
  // Đối tượng cung cấp dịch vụ
  async selectProviderType(
    providerType: string
  ) {
    await this.page
      .getByText(providerType)
      .click();

    await this.page
    await this.page
      .getByText(providerType, {
        exact: true,
      })
      .nth(1)
      .click();
  }

  // Loại tính phí
  async selectFeeCalculationType(
    feeType: string
  ) {
    // Click mở dropdown
    await this.page
      .locator('.ant-select-selection-item')
      .filter({
        hasText: 'Phí cố định',
      })
      .click();

    // Chọn option
    await this.page
      .getByText(feeType, {
        exact: true,
      })
      .last()
      .click();
  }

  async addFeeLocation(
    index: number,
    location: string,
    fee: string,
    note: string
  ) {
    // if (index > 0) {
    await this.page
      .getByRole('button', {
        name: /Thêm dòng/,
      })
      .click();
    console.log('✅ Đã click button Thêm dòng');
    //  }

    await this.page
      .locator(
        `#feeLocations_${index}_location`
      )
      .fill(location);

    await this.page
      .locator(
        `#feeLocations_${index}_fee`
      )
      .fill(fee);

    await this.page
      .locator(
        `#feeLocations_${index}_note`
      )
      .fill(note);
  }

  async selectLocations(
    locations: string[]
  ) {
    await this.page
      .locator(
        '.ant-select.ant-select-in-form-item.ant-select-multiple.ant-select-allow-clear > .ant-select-selector > .ant-select-selection-overflow'
      )
      .first()
      .click();

    for (const location of locations) {
      await this.page
        .getByText(location, {
          exact: true,
        })
        .click();

      console.log(
        `✅ Đã chọn địa điểm: ${location}`
      );
    }
  }
  async fillVat(vat: string) {
    await this.page
      .getByRole('spinbutton', {
        name: 'VAT (%)',
      })
      .fill(vat);
  }

  async selectApplyDateRange(startDay: string, endDay: string) {
    await this.page
      .getByRole('textbox', {
        name: '* Thời gian áp dụng',
      })
      .click();

    const visibleCells = this.page.locator('.ant-picker-cell-in-view');

    await visibleCells.filter({ hasText: startDay }).first().click();

    await this.page
      .locator('.ant-picker-dropdown:visible .ant-picker-header-super-next-btn')
      .last()
      .click();

    await visibleCells.filter({ hasText: endDay }).last().click();
  }

  async fillNote(note: string) {
    await this.page
      .getByRole('textbox', {
        name: 'Ghi chú Ghi chú',
      })
      .fill(note);
  }

  // Chọn ngày làm việc
  async selectWorkingDays(days: string[]) {
    const allDays = [
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
      'Chủ nhật',
    ];

    // click để mở dropdown (nếu cần)
    await this.page
      .locator('.ant-select-selection-item')
      .filter({ hasText: 'Thứ Hai' })
      .click();

    const daysToUncheck = allDays.filter(d => !days.includes(d));

    for (const day of daysToUncheck) {
      await this.page
        .locator('.ant-select-item-option')
        .filter({ hasText: day })
        .click();
    }
  }


  // Thêm khung giờ áp dụng
  async addTimeFrames(
    frames: Array<{
      from: { date: string; hour: string; minute: string };
      to: { date: string; hour: string; minute: string };
    }>
  ) {
    if (!frames?.length) return;

    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];

      // Thêm dòng mới
      await this.page
        .getByRole('button', { name: 'plus Thêm khung giờ' })
        .click();

      // =====================
      // FROM
      // =====================
      await this.page
        .locator(`#applicableTimeFrame_${i}_from`)
        .click();

      // Chọn ngày
      const panel = this.page.locator('.ant-picker-dropdown:visible');

      await panel
        .locator('.ant-picker-date-panel .ant-picker-cell-inner')
        .getByText(frame.from.date, { exact: true })
        .click();

      const fromPanel = this.page.locator('.ant-picker-dropdown:visible');

      // Chọn giờ
      await fromPanel
        .locator('.ant-picker-time-panel-column')
        .nth(0)
        .getByText(frame.from.hour, { exact: true })
        .click();

      // Chọn phút
      await fromPanel
        .locator('.ant-picker-time-panel-column')
        .nth(1)
        .getByText(frame.from.minute, { exact: true })
        .click();

      await fromPanel
        .getByRole('button', { name: 'OK' })
        .click();


      // =====================
      // TO
      // =====================
      await this.page
        .locator(`#applicableTimeFrame_${i}_to`)
        .click();

      const toPanel = this.page.locator('.ant-picker-dropdown:visible');

      // Chọn ngày
        await toPanel
        .locator('.ant-picker-date-panel .ant-picker-cell-inner')
        .getByText(frame.from.date, { exact: true })
        .click();

      /// Chọn giờ
        console.log('Hour:', frame.to.hour);
      console.log('Minute:', frame.to.minute);

      await toPanel
        .locator('.ant-picker-time-panel-column')
        .nth(0)
        .getByText(frame.from.hour, { exact: true })
        .click();


      // Chọn phút
      await toPanel
        .locator('.ant-picker-time-panel-column')
        .nth(1)
        .locator('.ant-picker-time-panel-cell-inner', {
          hasText: frame.to.minute,
        })
        .first()
        .click();

      console.log(
        await toPanel
          .locator('.ant-picker-time-panel-column')
          .nth(0)
          .locator('.ant-picker-time-panel-cell-inner')
          .allTextContents()
      );
      

      // OK
      await toPanel
        .getByRole('button', { name: 'OK' })
        .click();

      console.log(
        `✅ Đã thêm khung giờ: ${frame.from.date} ${frame.from.hour}:${frame.from.minute} - ${frame.to.date} ${frame.to.hour}:${frame.to.minute}`
      );


    }
  }

  // Lưu Chi phí bổ sung
  async save() {
    await this.page
      .getByRole('button', {
        name: 'Lưu',
      })
      .click();
  }

  async verifySuccessToast() {
    await expect(
      this.page.locator(
        '.ant-notification-notice'
      )
    ).toContainText(
      'Tạo thành công'
    );
  }
}