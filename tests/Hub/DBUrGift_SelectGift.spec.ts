import { test, expect } from '@playwright/test';
import { GiftRepository } from '../utils/DBUrGift/repositories/gift.repository';

test('Verify gift 8170', async () => {

  const gift = await GiftRepository.getById(8170);

  console.log(gift);

  expect(gift).toBeTruthy();
  expect(gift?.id).toBe(8170);
});