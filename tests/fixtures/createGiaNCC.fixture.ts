import { test as base } from '@playwright/test';
import { SupplierPricePage } from '../../pages/createGiaNCC.page';
type SupplierPriceFixture = {
  supplierPricePage: SupplierPricePage;
};

export const test =
  base.extend<SupplierPriceFixture>({
    supplierPricePage: async (
      { page },
      use
    ) => {
      await use(
        new SupplierPricePage(page)
      );
    },
  });