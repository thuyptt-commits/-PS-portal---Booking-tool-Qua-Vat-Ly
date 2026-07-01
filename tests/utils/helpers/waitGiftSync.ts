import { expect } from '@playwright/test';
import { GiftRepository } from '../DBUrGift/repositories/gift.repository';

export async function waitGiftSync(
    giftId: number,
    beforeUpdated: number
) {

    await expect
        .poll(async () => {

            const gift =
                await GiftRepository.getById(giftId);

            return gift?.updated;

        }, {

            timeout: 180000,

            intervals: [3000]

        })
        .not
        .toBe(beforeUpdated);

}