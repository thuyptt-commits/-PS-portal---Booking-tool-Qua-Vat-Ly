import { Page, expect } from '@playwright/test';

export class CreateSystemGiftPage {
    constructor(private page: Page) { }

    // =========================
    // SCREENSHOT HELPER
    // =========================
    private async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `test-results/${name}-${Date.now()}.png`,
            fullPage: true,
        });
    }


    async openCreateGift() {
        await this.page.getByText('Vận hành PS').click();

        await this.page
            .getByRole('link', {
                name: 'PS Quản lý quà hệ thống',
            })
            .click();

        await this.page
            .getByRole('link', {
                name: 'Tạo Quà hệ thống',
            })
            .click();

    }

    async selectBrand(
        brandId: string,
        brandName: string
    ) {
        const brandCombobox = this.page.getByRole('combobox', { name: '* Thương hiệu onsite', });

        await brandCombobox.click();
        await brandCombobox.fill(brandId);

        await this.page
            .getByText(brandName)
            .click();

        console.log(`✅ Select Brand Success | ID: ${brandId} | Name: ${brandName}`
        );
    }

    async addContractGifts(
        gifts: Array<{
            id: string;
            name: string;
        }>
    ) {
        await this.page
            .locator('.ant-select-selection-overflow')
            .first()
            .click();

        const input = this.page.getByRole('combobox', {
            name: 'Thêm quà hợp đồng',
        });

        for (const gift of gifts) {
            await input.fill(gift.id);

            await this.page
                .getByText(gift.name, { exact: false })
                .click();
            console.log(`✅ Added Contract Gift | ID: ${gift.id} | Name: ${gift.name}`
            );
        }
        // đóng dropdown
        await this.page.getByRole('button', { name: 'plus' }).first().click();
    }

    async clickAddGift() {
        await this.page
            .getByRole('button', {
                name: 'plus',
            })
            .first()
            .click();
    }

    async fillGiftName(
        giftNameVi: string,
        giftNameEn: string
    ) {
        await this.page
            .getByRole('textbox', {
                name: '* Tên quà (VI)',
            })
            .fill(giftNameVi);
        console.log(`✅ Gift Name VI filled successfully: ${giftNameVi}`);

        await this.page
            .getByRole('textbox', {
                name: '* Tên quà (EN)',
            })
            .fill(giftNameEn);
        console.log(`✅ Gift Name EN filled successfully: ${giftNameEn}`);
    }

    async selectReconciliationMethod(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* Hình thức đối soát',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ Hình thức đối soát: ${value}`)
    }

    async selectCodeType(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* Phân loại code',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ Phân loại code: ${value}`)
    }

    async selectGiftType(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* Loại quà',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ Loại quà: ${value}`)
    }

    async selectDisplayCodeType(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* Loại code hiển thị',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ Loại code hiển thị: ${value}`)
    }

    async selectCodeGenerationMethod(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* Phương thức sinh code',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ Phương thức sinh code: ${value}`)
    }

    async selectCategory(
        value: string
    ) {
        await this.page
            .getByRole('combobox', {
                name: '* ID/Tên danh mục quà',
            })
            .click();

        await this.page.getByText(value).click();
        console.log(`✅ ID/Tên danh mục quà: ${value}`)
    }

    async fillDescription(
        descriptionVi: string,
        descriptionEn: string
    ) {
        const editors =
            this.page.locator('.ql-editor');

        await editors.nth(0).fill(descriptionVi);
        console.log(
            `✅ Description VI filled successfully: ${descriptionVi}`
        );

        await editors.nth(1).fill(descriptionEn);
        console.log(
            `✅ Description EN filled successfully: ${descriptionEn}`
        );
    }

    async fillConditions(
        conditionVi: string,
        conditionEn: string
    ) {
        const editors =
            this.page.locator('.ql-editor');

        await editors.nth(2).fill(conditionVi);
        console.log(
            `✅ Condition VI filled successfully: ${conditionVi}`
        );

        await editors.nth(3).fill(conditionEn);
        console.log(
            `✅ Condition EN filled successfully: ${conditionEn}`
        );
    }

    async fillPricingInfo(data: {
        expiryDay: string;
        costPrice: string;
        giftValue: string;
        sellingPrice: string;
        quantityLimit: string;
    }) {
        await this.page.getByText('Hạn cố định').click();
        console.log('✅ Đã chọn loại hạn sử dụng: Hạn cố định');

        await this.page
            .getByText('Cộng vào ngày mua')
            .click();
        console.log('✅ Đã chọn kiểu tính hạn: Cộng vào ngày mua');

        await this.page
            .getByRole('spinbutton', {
                name: '* Hạn sử dụng',
            })
            .fill(data.expiryDay);
        console.log(`✅ Đã nhập hạn sử dụng: ${data.expiryDay} ngày`);

        await this.page
            .getByRole('spinbutton', {
                name: 'Giá nhập cho Urbox',
            })
            .fill(data.costPrice);
        console.log(`✅ Đã nhập giá nhập: ${data.costPrice}`);

        await this.page
            .getByRole('spinbutton', {
                name: '* Giá trị',
            })
            .fill(data.giftValue);
        console.log(`✅ Đã nhập giá trị quà: ${data.giftValue}`);

        await this.page
            .getByRole('spinbutton', {
                name: '* Giá bán question-circle',
            })
            .fill(data.sellingPrice);
        console.log(`✅ Đã nhập giá bán: ${data.sellingPrice}`);

        await this.page
            .getByRole('spinbutton', {
                name: '* Giới hạn số lượng bán ra',
            })
            .fill(data.quantityLimit);
        console.log(
            `✅ Đã nhập giới hạn số lượng bán ra: ${data.quantityLimit}`
        );
    }

    async selectStatus(status: string) {
        await this.page
            .getByRole('combobox', {
                name: '* Trạng thái',
            })
            .click();

        await this.page
            .getByText(status, {
                exact: true,
            })
            .click();

        console.log(`✅ Đã chọn trạng thái: ${status}`);
    }
    async addCampaign(
        campaignId: string,
        campaignName: string,
        price: string,
        quantity: string
    ) {
        const campaignInput =
            this.page.getByRole('combobox', {
                name: 'Thêm chương trình',
            });

        await campaignInput.click();
        await campaignInput.fill(campaignId);

        console.log(
            `✅ Đã nhập mã chương trình: ${campaignId}`
        );

        await this.page
            .getByText(campaignName)
            .click();

        console.log(
            `✅ Đã chọn chương trình: ${campaignName}`
        );

        await this.page
            .getByRole('button', {
                name: 'plus',
                exact: true,
            })
            .nth(3)
            .click();

        console.log(
            '✅ Đã thêm dòng cấu hình chương trình'
        );

        await this.page
            .getByRole('spinbutton')
            .nth(5)
            .fill(price);

        console.log(
            `✅ Đã nhập giá bán chương trình: ${price}`
        );

        await this.page
            .locator(
                'td:nth-child(4) .ant-input-number-input'
            )
            .fill(quantity);

        console.log(
            `✅ Đã nhập số lượng chương trình: ${quantity}`
        );
    }
    async save() {
        await this.page
            .getByRole('button', {
                name: 'Lưu',
            })
            .click();

        await this.page
            .getByRole('button', {
                name: 'Xác nhận',
            })
            .click();
    }



    // async verifySuccessToast() {
    //     await expect(
    //         this.page.getByText(
    //             'Tạo quà hệ thống thành công'
    //         )
    //     ).toBeVisible();
    // }

    // =========================
    // VERIFY RESULT (FIXED)
    // =========================
    async verifyResult(
        requiredFieldErrors?: {
            fieldName: string;
            message: string;
        }[]
    ) {
        const timeout = 3000;
        const start = Date.now();

        while (Date.now() - start < timeout) {
            // ======================
            // Case 1: Success Toast
            // ======================
            const successToast = this.page
                .locator('.ant-message-notice, .ant-notification-notice')
                .filter({ hasText: 'Tạo thành công' });

            if (await successToast.count()) {
                await this.takeScreenshot('success');
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
                        .locator(
                            '.ant-form-item-explain, .ant-form-item-explain-error'
                        );

                    if (await fieldError.getByText(error.message).count()) {
                        await this.takeScreenshot('validation');
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
                await this.takeScreenshot('error-toast');
                console.error(`❌ Error Toast: ${message?.trim()}`);
                return;
            }

            await this.page.waitForTimeout(200);
        }

        // ======================
        // Case 4: Fallback
        // ======================
        await this.takeScreenshot('unknown-error');

        throw new Error(
            '❌ Không tìm thấy Success/Validation/Error trong 3s'
        );
    }




}