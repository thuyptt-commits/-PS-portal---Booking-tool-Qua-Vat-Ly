import { LoginPage } from '../../pages/login.page';
import { test } from '../fixtures/AdditionalFeeOnOff.fixture';

test(
  'Edit Category - Toggle Additional Fee',
  async ({
    page,
    editCategoryPage,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );

    const categoryData = {
      categoryId: '172',
      subCategories: [0, 1, 2], // bật SubCate 1 và 2
    };

    await editCategoryPage.openCategoryManagement();

    await editCategoryPage.openEditCategory(
      categoryData.categoryId
    );

    for (const index of categoryData.subCategories) {
      await editCategoryPage.toggleAdditionalFee(index);
    }

    await editCategoryPage.saveCategory();

    await editCategoryPage.verifyUpdateSuccess();
  }
);