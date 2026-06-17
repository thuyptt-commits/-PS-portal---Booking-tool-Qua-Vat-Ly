import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByRole('textbox', {
            name: 'Tên đăng nhập',
        });

        this.passwordInput = page.getByRole('textbox', {
            name: 'Mật khẩu',
        });

        this.loginButton = page.getByRole('button', {
            name: 'Đăng nhập',
        });
    }

    async navigate() {
        await this.page.goto(
            'https://urcard-portal-web.urbox.dev/login'
        );
    }

    async enterUsername(username: string) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(
        username: string,
        password: string
    ) {
        await this.navigate();

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(
            'https://urcard-portal-web.urbox.dev/publisher'
        );
    }
}