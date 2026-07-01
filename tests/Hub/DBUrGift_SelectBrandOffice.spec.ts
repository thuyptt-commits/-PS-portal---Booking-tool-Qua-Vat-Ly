import { test, expect } from '@playwright/test';
import { BrandOfficeRepository } from '../utils/DBUrGift/repositories/brand_office.repository';

test('Verify Brand Office of Gift', async () => {

  const offices =
    await BrandOfficeRepository.getByGiftId(
      8170
    );

  console.log(offices);

  expect(offices.length).toBeGreaterThan(0);

  expect(offices[0].id).toBeTruthy();
});