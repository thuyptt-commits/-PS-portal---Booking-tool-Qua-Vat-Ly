import { Page, expect } from '@playwright/test';

export class SupplierPricePage {
    constructor(private page: Page) { }

    async openContractGiftDetail(giftId: string) {
        await this.page.getByText('Vận hành PS').click();

        await this.page
            .getByRole('link', {
                name: 'PS Quản lý Quà hợp đồng',
            })
            .click();

        const row = this.page.locator('tr').filter({
            has: this.page.getByText(giftId),
        });

        await row
            .getByRole('button')
            .filter({
                has: this.page.locator('.anticon-edit'),
            })
            .click();
    }

    async openSupplierPriceTab() {
        await this.page
            .getByRole('tab', {
                name: 'Giá nhà cung cấp',
                exact: true,
            })
            .click();
    }

    async clickAddSupplierPrice() {
        await this.page
            .getByRole('button', {
                name: 'plus Thêm giá quà',
            })
            .click();
    }

    async selectLegalEntity(entity: string) {
        await this.page
            .getByRole('combobox', {
                name: '* Pháp nhân',
            })
            .click();

        await this.page.getByText(entity).click();
    }

    async checkNoContract() {
        await this.page
            .getByRole('checkbox', {
                name: 'Chưa ký hợp đồng',
            })
            .check();
    }

    async selectMerchants(merchants: string[]) {
        await this.page
            .locator(
                '.ant-select.ant-select-in-form-item.ant-select-multiple.ant-select-allow-clear > .ant-select-selector > .ant-select-selection-overflow'
            )
            .first()
            .click();

        for (const merchant of merchants) {
            await this.page.getByText(merchant).click();
        }
    }

    async fillVat(vat: string) {
        await this.page
            .getByRole('spinbutton', {
                name: 'VAT',
            })
            .fill(vat);
    }

    async fillMerchantPrice(price: string) {
        await this.page
            .getByRole('spinbutton', {
                name: '* Giá nhập thanh toán Merchant',
            })
            .fill(price);
    }

    async fillMinSellingPrice(price: string) {
        await this.page
            .getByRole('spinbutton', {
                name: '* Giá bán tối thiểu cho Client',
            })
            .fill(price);
    }

    async fillTncVi(text: string) {
        await this.page
            .getByRole('textbox', {
                name: '* TnC (Vi)',
            })
            .fill(text);
    }

    async fillTncEn(text: string) {
        await this.page
            .getByRole('textbox', {
                name: '* TnC (En)',
            })
            .fill(text);
    }

    async fillNote(note: string) {
        await this.page
            .getByRole('textbox', {
                name: 'Ghi chú',
            })
            .fill(note);
    }

    async save() {
        await this.page
            .getByRole('button', {
                name: 'Lưu',
            })
            .click();
    }

    async verifySuccess() {
        await expect(
            this.page.getByText('Tạo thành công')
        ).toBeVisible({
            timeout: 10000,
        });
    }
}