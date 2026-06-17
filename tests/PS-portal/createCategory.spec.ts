import { test } from '../../tests/fixtures/createCatgory.fixture';
import { LoginPage } from '../../pages/login.page';

test('Create Category Successfully', async ({
  page,
  categoryPage,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    'qc-super-admin@urbox.vn',
    'UrBox@123'
  );

  const categoryData = {
    categoryName: 'quà tươi',

    firstSubCategory: {
      name: 'Lẵng hoa tươi',
      detail: 'Lẵng hoa tươi',
    },

    secondSubCategory: {
      name: 'Bánh sinh nhật',
      detail: 'Bánh sinh nhật',
    },
  };

  await categoryPage.openCategoryManagement();

  await categoryPage.clickCreateCategory();

  await categoryPage.fillCategoryName(
    categoryData.categoryName
  );

  await categoryPage.addFirstSubCategory(
    categoryData.firstSubCategory.name,
    categoryData.firstSubCategory.detail
  );

  await categoryPage.selectFirstDateRange();

  await categoryPage.enableAdditionalFee();

  await categoryPage.addSecondSubCategory(
    categoryData.secondSubCategory.name,
    categoryData.secondSubCategory.detail
  );

  await categoryPage.selectSecondDateRange();

  await categoryPage.enableSecondAdditionalFee();

  await categoryPage.saveCategory();

  await categoryPage.verifyCreateSuccess();
});