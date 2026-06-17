import { LoginPage } from '../../pages/login.page';
import { test } from '../fixtures/createQHD.fixture';

test(
  'Create Contract Gift Successfully',
  async ({
    page,
    createContractGiftPage,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );

    const giftData = {
      giftName: 'quà vật lý',

      displayName: 'quà vật lý',

      brand: '- ACB (PS)',

      category: '181 - quà tươi',

      subCategory: '- Bánh sinh nhật',

      numberOfUsers: '3',

      style: 'style',

      featureVI: 'đặc điểm vi',

      featureEN: 'đặc điểm en',

      note: 'note',
    };

    await createContractGiftPage.openCreateContractGift();

    await createContractGiftPage.fillGiftName(
      giftData.giftName
    );

    await createContractGiftPage.fillDisplayName(
      giftData.displayName
    );

    await createContractGiftPage.selectBrand(
      giftData.brand
    );

    await createContractGiftPage.selectCategory(
      giftData.category
    );

    await createContractGiftPage.selectSubCategory(
      giftData.subCategory
    );

    await createContractGiftPage.selectStatus();

    await createContractGiftPage.fillNumberOfUsers(
      giftData.numberOfUsers
    );

    await createContractGiftPage.selectStyle(
      giftData.style
    );

    await createContractGiftPage.fillFeatureVI(
      giftData.featureVI
    );

    await createContractGiftPage.fillFeatureEN(
      giftData.featureEN
    );

    await createContractGiftPage.fillNote(
      giftData.note
    );

    await createContractGiftPage.saveContractGift();

    // mở nếu hệ thống có toast success
    // await createContractGiftPage.verifyCreateSuccess();
  }
);