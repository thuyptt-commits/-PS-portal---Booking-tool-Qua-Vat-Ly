import { hubGiftTest } from '../fixtures/Hub_AddProductID.fixture';

hubGiftTest(
    'Update Hub Gift Product',
    async ({
        hubGiftPage,
    }) => {
        const data = {
            email:
                'thuy.ptt@urbox.vn',

            password:
                '123456',

            hubGiftId:
                '11087',

            giftName:
                '11087- qua tuoi 7 - (Hiện)',

            productKeyword:
                '10542',

            productName:
                '10542 - tư sinh code 21',
        };

        await hubGiftPage.login(
            data.email,
            data.password
        );

        await hubGiftPage.openGiftList();

        // STEP 1: chọn gift
        await hubGiftPage.selectGiftDetail(
            data.hubGiftId,
            data.giftName
        );


        // STEP 2: mở popup edit
        const popup = await hubGiftPage.openEdit();
        console.log('✅ Open Edit qùa thành công');

        // STEP 3: update product
        await hubGiftPage.updateProductInPopup(
            popup,
            data.productKeyword,
            data.productName
        );


        await hubGiftPage.save(popup);
    }
    );
