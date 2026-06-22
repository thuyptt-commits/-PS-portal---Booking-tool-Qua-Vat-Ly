import { Page } from '@playwright/test';

export class HubGiftPage {
    constructor(private page: Page) { }

    async login(
        email: string,
        password: string
    ) {
        await this.page.goto(
            'https://hub.urbox.dev/admin'
        );

        await this.page
            .getByRole('textbox', {
                name: 'Email',
            })
            .fill(email);

        await this.page
            .getByRole('textbox', {
                name: 'password',
            })
            .fill(password);

        await this.page
            .getByRole('button', {
                name: 'Sign in',
            })
            .click({ timeout: 60000 });

        console.log(
            `✅ Đăng nhập Hub thành công: ${email}`
        );
        await this.page.waitForTimeout(2000);
    }

    async openGiftList() {
        await this.page
            .locator('#aside a')
            .filter({
                hasText: 'Quà tặng',
            })
            .click();
        await this.page.waitForTimeout(2000);
        await this.page
            .locator('a')
            .filter({
                hasText: 'Danh sách quà',
            })
            .click();
        await this.page.waitForTimeout(2000);
        // 👉 CHỜ UI thật sự load xong (QUAN TRỌNG)
        console.log('✅ Mở danh sách quà');
    }

    async selectGiftDetail(titleId: string, giftText: string) {
        // 👉 open dropdown
        const dropdown = this.page.locator('[id^="select2-gift_detail_title_id-"][id$="-container"]');
        await dropdown.click();
        await this.page.waitForTimeout(2000);

        const searchInput = this.page.locator('input.select2-search__field').first();
        await this.page.waitForTimeout(2000);
        //await searchInput.waitFor({ state: 'visible', timeout: 2000 });
        await searchInput.fill(titleId);
        await this.page.waitForTimeout(2000);
        // 👉 option đúng context
        const option = this.page
            .locator('.select2-results__option')
            .filter({ hasText: titleId })
            .first();

        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();

        // 👉 search button
        await this.page.getByRole('button', { name: /Tìm kiếm/i }).click();
         console.log('✅ Tìm kiếm thành công');
    }

    async openEdit() {
        const editBtn = this.page.locator('a:has(i.fa.fa-pencil)').first();

        await editBtn.waitFor({ state: 'visible', timeout: 10000 });

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            editBtn.click(),
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        return newPage;

    }

    async updateProductInPopup(popup: Page, productId: string, productText: string) {
        // 1. Click icon Sửa (fa-pencil)
        const editBtn = popup.locator('a:has(i.fa.fa-pencil.f12)').first();
        await editBtn.click();

        // 2. Click combobox Mã sản phẩm
        await popup.getByRole('combobox', { name: 'Mã sản phẩm' }).click();

        // 3. Select2 search input (CHÍNH XÁC)
        const searchInput = popup.locator('input.select2-search__field');

        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.fill(productId);

        // 4. Click option đúng (ổn định hơn filter hasText)
        const option = popup
            .locator('.select2-results__option')
            .filter({ hasText: productText })
            .first();

        await option.waitFor({ state: 'visible', timeout: 1000 });
        await option.click();

        // 5. Click Thực hiện
        await popup.locator('button', { hasText: 'Thực hiện' }).click();
    }

    async save(
        popup: Page
    ) {
        await popup
            .getByRole('button', {
                name: 'Thực hiện',
            })
            .click();

        await popup
            .getByRole('button', {
                name: 'OK',
            })
            .click();

        console.log(
            '✅ Cập nhật sản phẩm thành công'
        );
    }
}