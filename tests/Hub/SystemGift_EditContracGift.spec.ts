import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { SystemGiftEditPage } from '../../pages/SystemGift_EditContractGift.page';

import { GiftRepository } from '../utils/DBUrGift/repositories/gift.repository';
import { GiftDetailRepository } from '../utils/DBUrGift/repositories/gift_detail.repository';
import { GiftPriceRepository } from '../utils/DBUrGift/repositories/gift_price.repository';
import { GiftContentRepository } from '../utils/DBUrGift/repositories/gift_content.repository';
import { BrandOfficeRepository } from '../utils/DBUrGift/repositories/brand_office.repository';

import { compareObject } from '../utils/compare/compareObject';

test('Verify Hub DB after editing System Gift', async ({ page }) => {

    // PS Portal
    const SYSTEM_GIFT_ID = 509;

    // Hub
    const HUB_GIFT_ID = 8170;
    const DETAIL_ID = 11094;

    //-----------------------------------------
    // Login
    //-----------------------------------------

    const loginPage = new LoginPage(page);

    await loginPage.login(
        'qc-super-admin@urbox.vn',
        'UrBox@123'
    );

    //-----------------------------------------
    // STEP 1
    // Check DB BEFORE
    //-----------------------------------------

    const beforeGift =
        await GiftRepository.getById(HUB_GIFT_ID);

    const beforeDetail =
        await GiftDetailRepository.getById(DETAIL_ID);

    const beforePrice =
        await GiftPriceRepository.getByGiftDetailId(DETAIL_ID);

    const beforeContent =
        await GiftContentRepository.getByGiftId(HUB_GIFT_ID);

    const beforeOffice =
        await BrandOfficeRepository.getByGiftId(HUB_GIFT_ID);

    expect(beforeGift).toBeTruthy();

    //-----------------------------------------
    // STEP 2
    // Edit System Gift
    //-----------------------------------------

    const giftPage = new SystemGiftEditPage(page);

    await giftPage.open(SYSTEM_GIFT_ID);

    await giftPage.addContractGift(
        '1569',
        '1569 - Quà Hoa Hướng Dương - Duplicate - Duplicate'
    );

    //-----------------------------------------
    // STEP 3
    // Save
    //-----------------------------------------

    await giftPage.save();

    //-----------------------------------------
    // STEP 4
    // Wait Sync
    //-----------------------------------------

    await expect
        .poll(
            async () => {
                const content =
                    await GiftContentRepository.getByGiftId(HUB_GIFT_ID);

                return content[0]?.updated_at;
            },
            {
                timeout: 180000,
                intervals: [3000]
            }
        )
        .not.toBe(beforeContent[0].updated_at);

    //-----------------------------------------
    // STEP 5
    // Query DB AFTER
    //-----------------------------------------

    const afterGift =
        await GiftRepository.getById(HUB_GIFT_ID);

    const afterDetail =
        await GiftDetailRepository.getById(DETAIL_ID);

    const afterPrice =
        await GiftPriceRepository.getByGiftDetailId(DETAIL_ID);

    const afterContent =
        await GiftContentRepository.getByGiftId(HUB_GIFT_ID);

    const afterOffice =
        await BrandOfficeRepository.getByGiftId(HUB_GIFT_ID);

    //-----------------------------------------
    // STEP 6
    // Compare
    //-----------------------------------------

    const giftDiff =
        compareObject(beforeGift, afterGift);

    const detailDiff =
        compareObject(beforeDetail, afterDetail);

    const priceDiff =
        beforePrice.length && afterPrice.length
            ? compareObject(beforePrice[0], afterPrice[0])
            : {};

    const contentDiff =
        beforeContent.length && afterContent.length
            ? compareObject(beforeContent[0], afterContent[0])
            : {};

    console.log('Gift Diff');
    console.table(giftDiff);

    console.log('Detail Diff');
    console.table(detailDiff);

    console.log('Price Diff');
    console.table(priceDiff);

    console.log('Content Diff');
    console.table(contentDiff);

    //-----------------------------------------
    // STEP 7
    // Verify
    //-----------------------------------------

    expect(afterGift).toBeTruthy();

    expect(afterDetail).toBeTruthy();

    expect(afterPrice.length)
        .toBeGreaterThan(0);

    expect(afterOffice.length)
        .toBeGreaterThan(0);

    // Verify đúng bảng thay đổi

    expect(beforeContent[0].updated_at).not.toBeNull();
    expect(afterContent[0].updated_at).not.toBeNull();

    expect(afterContent[0].updated_at!)
        .toBeGreaterThan(beforeContent[0].updated_at!);

    expect(contentDiff)
        .toHaveProperty('updated_at');

});