import { LoginPage } from '../../pages/login.page';
import { createSystemGiftTest } from '../fixtures/createSystemGift.fixture';

createSystemGiftTest(
    'Create System Gift',
    async ({
        page,
        createSystemGiftPage,
    }) => {
        const loginPage = new LoginPage(page);

        const data = {
            brand: {
                id: '28',
                name: '- Daruma',
            },

            contractGifts: [
                {
                    id: '1563',
                    name: '1563 - Hoa Khô - Duplicate',
                },
                {
                    id: '1564',
                    name: '1564 - Qùa test QVL',
                },
            ],

            giftNameVi: 'qua tuoi 7',
            giftNameEn: 'qua tuoi 7',

            reconciliationMethod:
                '1-Thanh toán theo thực tế sử dụng',

            codeType:
                '1-Code UrBox và ghi nhận đối',

            giftType: '15-Premium Service',

            displayCodeType:
                'Hiển thị đồng thời text code',

            codeGenerationMethod:
                '1-Sinh tự động',

            category:
                '2 - Quà Tặng Evoucher',

            descriptionVi:
                'thương hiệu trên Hub tiếng việt',

            descriptionEn:
                'Thương hiệu trên hub tiếng anh',

            conditionVi:
                'Điều kiện sử dụng tiếng việt',

            conditionEn:
                'Điều kiện sử dụng tiếng anh',

            expiryDay: '100',

            costPrice: '10,0000',

            giftValue: '50,0000',

            sellingPrice: '50,0000',

            quantityLimit: '1000',

            campaignId: '50000603',

            campaignPrice: '100,0000',

            campaignQuantity: '1000',
        };

        await loginPage.login(
            'qc-super-admin@urbox.vn',
            'UrBox@123'
        );

        await createSystemGiftPage.openCreateGift();

        await createSystemGiftPage.selectBrand(
            data.brand.id,
            data.brand.name
        );
        await createSystemGiftPage.addContractGifts(
            data.contractGifts
        );

        await createSystemGiftPage.fillGiftName(
            data.giftNameVi,
            data.giftNameEn
        );

        await createSystemGiftPage.selectReconciliationMethod(
            data.reconciliationMethod
        );

        await createSystemGiftPage.selectCodeType(
            data.codeType
        );

        await createSystemGiftPage.selectGiftType(
            data.giftType
        );

        await createSystemGiftPage.selectDisplayCodeType(
            data.displayCodeType
        );

        await createSystemGiftPage.selectCodeGenerationMethod(
            data.codeGenerationMethod
        );

        await createSystemGiftPage.selectCategory(
            data.category
        );

        await createSystemGiftPage.fillDescription(
            data.descriptionVi,
            data.descriptionEn
        );

        await createSystemGiftPage.fillConditions(
            data.conditionVi,
            data.conditionEn
        );

        await createSystemGiftPage.fillPricingInfo({
            expiryDay: '50',
            costPrice: '1,0000',
            giftValue: '200,0000',
            sellingPrice: '300,0000',
            quantityLimit: '10',
        });

        await createSystemGiftPage.selectStatus(
            'Hoạt động'
        );

        await createSystemGiftPage.addCampaign(
            'ps',
            '- Test qùa PS',
            '100,0000',
            '1000'
        );



        await createSystemGiftPage.save();
        
        await createSystemGiftPage.verifyResult([
      {
        fieldName: 'Thương hiệu onsite',
        message: 'Vui lòng chọn thương hiệu!',
      },
      {
        fieldName: 'Tên quà (VI)',
        message: 'Bạn phải nhập tên quà!',
      },
      {
        fieldName: 'Tên quà (EN)',
        message: 'Bạn phải nhập tên quà!',
      },
      {
        fieldName: 'Hình thức đối soát',
        message: 'Chọn hình thức đối soát',
      },
      {
        fieldName: 'Loại quà',
        message: 'Vui lòng chọn loại quà',
      },
      {
        fieldName: 'Loại code hiển thị',
        message: 'Chọn loại code hiển thị',
      },
      {
        fieldName: 'Phương thức sinh code',
        message: 'Chọn loại phương thúc sinh code',
      },
      {
        fieldName: 'ID/Tên danh mục quà',
        message: 'Vui lòng chọn cate!',
      },
      {
        fieldName: 'Hạn sử dụng',
        message: 'Cần chọn ngày hết hạn!',
      },
      {
        fieldName: 'Giá trị',
        message: 'Cần nhập giá trị!',
      }
      ,
      {
        fieldName: 'Giá bán',
        message: 'Cần nhập giá bán!',
      }
      ,
      {
        fieldName: 'Trạng thái',
        message: 'Vui lòng chọn trạng thái!',
      },
      {
        fieldName: 'Giới hạn số lượng bán ra',
        message: 'Cần nhập giới hạn số lượng bán ra!',
      }


        ])
    }

);