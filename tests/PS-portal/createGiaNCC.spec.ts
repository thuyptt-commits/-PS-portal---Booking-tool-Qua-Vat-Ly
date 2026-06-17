import { LoginPage } from '../../pages/login.page';
import { test } from '../fixtures/createGiaNCC.fixture';

test(
  'Create Supplier Price',
  async ({
    page,
    supplierPricePage,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );

    const supplierPriceData = {
      legalEntity: 'LG90357 - HELLO',

      merchants: [
        '- Royal Long An Golf & Villas',
        '- Movenpick Resort Phan Thiet',
        '- BRG Golden Sands (Huế)',
        '- Mad Cow Wine & Grill',
      ],

      vat: '10',

      merchantPrice: '10,0000',

      minSellingPrice: '100,0000',

      tncVi: 'điều kiện tiếng việt',

      tncEn: 'điều kiện tiếng anh',

      note: 'note',
    };

    await supplierPricePage.openContractGiftDetail('1555');

    await supplierPricePage.openSupplierPriceTab();

    await supplierPricePage.clickAddSupplierPrice();

    await supplierPricePage.selectLegalEntity(
      supplierPriceData.legalEntity
    );

    await supplierPricePage.checkNoContract();

    await supplierPricePage.selectMerchants(
      supplierPriceData.merchants
    );

    await supplierPricePage.fillVat(
      supplierPriceData.vat
    );

    await supplierPricePage.fillMerchantPrice(
      supplierPriceData.merchantPrice
    );

    await supplierPricePage.fillMinSellingPrice(
      supplierPriceData.minSellingPrice
    );

    await supplierPricePage.fillTncVi(
      supplierPriceData.tncVi
    );

    await supplierPricePage.fillTncEn(
      supplierPriceData.tncEn
    );

    await supplierPricePage.fillNote(
      supplierPriceData.note
    );

    await supplierPricePage.save();

    await supplierPricePage.verifySuccess();
  }
);