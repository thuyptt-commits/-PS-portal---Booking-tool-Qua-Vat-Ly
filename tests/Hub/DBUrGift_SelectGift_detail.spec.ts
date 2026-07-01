import { test, expect } from '@playwright/test';
import { GiftDetailRepository } from '../utils/DBUrGift/repositories/gift_detail.repository';

test('Verify gift detail', async () => {

  const detail =
    await GiftDetailRepository.getById(
      11094
    );

  console.log(detail);

  expect(detail).toBeTruthy();

  expect(detail?.id)
    .toBe(11094);
});