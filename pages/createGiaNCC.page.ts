import { Page, expect, TestInfo } from '@playwright/test';

export class ContractGiftPage {
    constructor(private page: Page) { }

    async openContractGiftManagement() {
        await this.page.getByText('Vận hành PS').click();

        await this.page.getByRole('link', {
            name: 'PS Quản lý Quà hợp đồng',
        }).click();
    }

    async openGiftDetail(giftId: string) {
        const row = this.page.locator('tbody tr').filter({ hasText: giftId });
        await row.locator('.anticon-info-circle').click();
    }

    async openSupplierPriceTab() {
        await this.page.getByRole('tab', {
            name: 'Giá nhà cung cấp',
            exact: true,
        }).click();
    }

    async clickAddSupplierPrice() {
        await this.page.getByRole('button', {
            name: /Thêm giá quà/
        }).click();
    }

    async selectLegalEntity(legalEntity: string) {
        await this.page.getByRole('combobox', {
            name: '* Pháp nhân',
        }).click();

        await this.page
            .locator('.ant-select-item-option-content')
            .filter({ hasText: legalEntity })
            .click();
    }

    async checkNoContract() {
        await this.page.getByRole('checkbox', {
            name: 'Chưa ký hợp đồng',
        }).check();
    }

    async selectLocations(locations: string[]) {
        await this.page
            .locator('.ant-select.ant-select-in-form-item.ant-select-multiple.ant-select-allow-clear > .ant-select-selector > .ant-select-selection-overflow')
            .first()
            .click();

        for (const location of locations) {
            await this.page.getByText(location, { exact: true }).click();
        }
    }

    async selectApplyDateRange(startDay: string, endDay: string) {
        await this.page.getByRole('textbox', {
            name: '* Thời gian áp dụng',
        }).click();

        const visibleCells = this.page.locator('.ant-picker-cell-in-view');

        await visibleCells.filter({ hasText: startDay }).first().click();

        await this.page
            .locator('.ant-picker-dropdown:visible .ant-picker-header-super-next-btn')
            .last()
            .click();

        await visibleCells.filter({ hasText: endDay }).last().click();
    }

    async fillPriceInfo(data: {
        merchantPrice: string;
        clientPrice: string;
        vat: string;
    }) {
        await this.page.getByRole('spinbutton', {
            name: '* Giá nhập thanh toán Merchant',
        }).fill(data.merchantPrice);

        await this.page.getByRole('spinbutton', {
            name: '* Giá bán tối thiểu cho Client',
        }).fill(data.clientPrice);

        await this.page.getByRole('spinbutton', {
            name: 'VAT',
        }).fill(data.vat);
    }

    async fillTerms(tncVi: string, tncEn: string, note: string) {
        await this.page.getByRole('textbox', {
            name: '* TnC (Vi)',
        }).fill(tncVi);

        await this.page.getByRole('textbox', {
            name: '* TnC (En)',
        }).fill(tncEn);

        await this.page.getByRole('textbox', {
            name: 'Ghi chú',
        }).fill(note);
    }

    async saveSupplierPrice() {
        await this.page.getByRole('button', {
            name: 'Lưu',
        }).click();
    }

    async verifyCreateSuccess(testInfo: TestInfo) {
        await expect(this.page.getByText('Tạo thành công')).toBeVisible({
            timeout: 10000,
        });

       // await this.takeScreenshot('create-success', testInfo);
    }

    async verifyResult(
        requiredFieldErrors?: {
            fieldName: string;
            message: string;
        }[],
        testInfo?: TestInfo
    ) {
        const timeout = 3000;
        const start = Date.now();

        const attach = async (name: string) => {
            if (!testInfo) return;

            await testInfo.attach(name, {
                body: await this.page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            });
        };

        while (Date.now() - start < timeout) {

            // ======================
            // Case 1: Success Toast
            // ======================
            const successToast = this.page
                .locator('.ant-message-notice, .ant-notification-notice')
                .filter({ hasText: 'Tạo thành công' });

            if (await successToast.count()) {
                await attach('success');
                console.log('✅ Tạo thành công');
                return;
            }

            // ======================
            // Case 2: Validation
            // ======================
            if (requiredFieldErrors?.length) {
                for (const error of requiredFieldErrors) {
                    const fieldError = this.page
                        .locator('.ant-form-item')
                        .filter({ hasText: error.fieldName })
                        .locator('.ant-form-item-explain, .ant-form-item-explain-error');

                    if (await fieldError.getByText(error.message).count()) {
                        await attach('validation');
                        console.log(
                            `⚠️ Validation: [${error.fieldName}] - ${error.message}`
                        );
                        return;
                    }
                }
            }

            // ======================
            // Case 3: Error Toast
            // ======================
            const errorToast = this.page.locator(
                '.ant-message-notice, .ant-notification-notice'
            );

            if (await errorToast.count()) {
                const message = await errorToast.first().textContent();

                await attach('error-toast');

                console.error(`❌ Error Toast: ${message?.trim()}`);
                return;
            }

            await this.page.waitForTimeout(200);
        }

        // ======================
        // Case 4: Fallback
        // ======================
        await attach('unknown-error');

        throw new Error(
            '❌ Không tìm thấy Success/Validation/Error trong 3s'
        );
    }
}