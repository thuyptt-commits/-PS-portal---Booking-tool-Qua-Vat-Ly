import { expect, Page } from '@playwright/test';

export class SystemGiftApprovalPage {
    constructor(private page: Page) { }

    async openSystemGiftList() {
        await this.page.getByText('Vận hành PS').click();

        await this.page
            .getByRole('link', {
                name: 'PS Quản lý Quà hệ thống',
            })
            .click();
    }

    async openGiftDetail(giftId: string) {
        const row = this.page
            .locator('tr')
            .filter({
                hasText: giftId,
            });

        await row
            .getByRole('button', {
                name: 'info-circle',
            })
            .click();

        console.log(
            `✅ Đã mở chi tiết quà ID: ${giftId}`
        );
    }

    async requestApproval() {
        await this.page
            .getByRole('button', {
                name: 'Yêu cầu duyệt quà',
            })
            .click();

        console.log(
            '✅ Đã gửi yêu cầu duyệt quà'
        );
    }

    async approveGift() {
        await this.page
            .getByRole('button', {
                name: 'Duyệt quà',
            })
            .click();

        await this.page
            .getByRole('button', {
                name: 'Xác nhận',
            })
            .click();

        console.log(
            '✅ Đã duyệt quà'
        );
    }

    async createHubGift() {
        await this.page
            .getByRole('button', {
                name: 'Tạo quà Hub',
            })
            .click();

        console.log(
            '✅ Đã tạo quà Hub'
        );
    }

    async verifyCreateHubSuccess() {
        try {
            await expect(
                this.page.getByText(
                    'Tạo quà trên Hub thành công'
                )
            ).toBeVisible({
                timeout: 5000,
            });

            console.log(
                '✅ Tạo quà trên Hub thành công'
            );

            // chờ trang reload dữ liệu
            await this.page.waitForLoadState('networkidle');

            // const hubGiftId = (
            //     await this.page
            //         .locator('tr')
            //         .filter({
            //             hasText: 'Thông tin mã ID quà trên hub',
            //         })
            //         .locator('td')
            //         .last()
            //         .textContent()
            // )?.trim();

            // if (!hubGiftId) {
            //     throw new Error(
            //         '❌ Không lấy được ID quà trên Hub'
            //     );
            // }

            // console.log(
            //     `✅ Hub Gift ID: ${hubGiftId}`
            // );

            // return hubGiftId;
        } catch {
            const errorToast = this.page.locator(
                '.ant-message-notice, .ant-notification-notice'
            );

            if (await errorToast.count()) {
                const message = (
                    await errorToast.first().textContent()
                )?.trim();

                throw new Error(
                    `❌ Tạo quà Hub thất bại: ${message}`
                );
            }

            throw new Error(
                '❌ Không tìm thấy toast thành công hoặc lỗi'
            );
        }
    }

}