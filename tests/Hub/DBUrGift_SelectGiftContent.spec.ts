import { test, expect } from '@playwright/test';
import { GiftContentRepository } from '../utils/DBUrGift/repositories/gift_content.repository';

test('Verify Gift Content', async () => {

  const contents =
    await GiftContentRepository.getByGiftId(8170);

  console.log(
    JSON.stringify(contents, null, 2)
  );

  expect(contents.length).toBeGreaterThan(0);

  expect(contents[0].gift_id).toBe(8170);
});