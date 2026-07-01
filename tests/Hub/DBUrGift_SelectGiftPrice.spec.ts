import { test, expect } from '@playwright/test';
import { GiftPriceRepository } from '../utils/DBUrGift/repositories/gift_price.repository';

test('Verify gift price', async () => {

  const prices = await GiftPriceRepository.getByGiftDetailId(11094);

  console.log(prices);

  expect(prices.length).toBeGreaterThan(0);

  expect(prices[0].gift_detail_id).toBe(11094);
});