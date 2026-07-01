import { LoginPage } from '../../pages/login.page';
import { test } from '../fixtures/createGiaNCC.fixture';

test(
  'Add Supplier Price',
  async ({ page, contractGiftPage }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );

    const supplierPriceData = {
      giftId: '1570',
      legalEntity: 'LG90357 - HELLO',

      locations: [
        '798 - Royal Long An Golf & Villas',
        '246 - Movenpick Resort Phan Thiet',
      ],

      startDay: '17',
      endDay: '31',

      merchantPrice: '10,0000',
      clientPrice: '20,0000',
      vat: '10',

      tncVi: 'điều kiện sử dụng tiếng việt',
      tncEn: 'điều kiện sử dụng tiếng anh',

      note: 'note',
    };

    await contractGiftPage.openContractGiftManagement();

    await contractGiftPage.openGiftDetail(
      supplierPriceData.giftId
    );

    await contractGiftPage.openSupplierPriceTab();

    await contractGiftPage.clickAddSupplierPrice();

    await contractGiftPage.selectLegalEntity(
      supplierPriceData.legalEntity
    );

    await contractGiftPage.checkNoContract();

    await contractGiftPage.selectLocations(
      supplierPriceData.locations
    );

    await contractGiftPage.selectApplyDateRange(
      supplierPriceData.startDay,
      supplierPriceData.endDay
    );

    await contractGiftPage.fillPriceInfo({
      merchantPrice:
        supplierPriceData.merchantPrice,
      clientPrice:
        supplierPriceData.clientPrice,
      vat: supplierPriceData.vat,
    });

    await contractGiftPage.fillTerms(
      supplierPriceData.tncVi,
      supplierPriceData.tncEn,
      supplierPriceData.note
    );

    await contractGiftPage.saveSupplierPrice();

    await contractGiftPage.verifyResult([
      {
        fieldName: 'Pháp nhân',
        message: 'Vui lòng chọn pháp nhân',
      },
      {
        fieldName: 'Thời gian áp dụng',
        message: 'Vui lòng chọn thời gian áp dụng',
      },
      {
        fieldName: 'Địa điểm áp dụng',
        message: 'Vui lòng chọn địa điểm áp dụng',
      },
      {
        fieldName: 'Giá nhập thanh toán Merchant',
        message: 'Vui lòng điền giá nhập thanh toán Merchant',
      },
      {
        fieldName: 'Giá bán tối thiểu cho Client',
        message: 'Vui lòng điền giá bán tối thiểu cho Client',
      },
      {
        fieldName: 'TnC (Vi)',
        message: 'Vui lòng điền TnC (Vi)',
      },
      {
        fieldName: 'TnC (En)',
        message: 'Vui lòng điền TnC (En)',
      }

    ]);
  }
);