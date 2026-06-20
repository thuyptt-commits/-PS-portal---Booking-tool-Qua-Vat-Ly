import { LoginPage } from '../../pages/login.page';
import { additionalFeeTest } from '../fixtures/createAdditionalFee.fixture';

additionalFeeTest(
  'Add Additional Fee',
  async ({
    page,
    additionalFeePage,
  }) => {
    const loginPage =
      new LoginPage(page);

    await loginPage.login(
      'qc-super-admin@urbox.vn',
      'UrBox@123'
    );

    const data = {
      giftId: '1555',
      legalEntity:
        'LG90357 - HELLO',

      serviceType:
        'Vận chuyển',

      providerType:
        'Merchant cung cấp',

      feeCalculationType:
        'Phí cố định',

      feeLocations: [
        {
          location: 'Cần Thơ',
          fee: '4,0000',
          note: 'ngoại thành',
        },
        {
          location: 'Bình Dương',
          fee: '5,0000',
          note: 'ngoại thành',
        },
        {
          location: 'Quận 7',
          fee: '0',
          note: 'nội thành',
        },
      ],

      locations: [
        '798 - Royal Long An Golf & Villas',
        '246 - Movenpick Resort Phan Thiet',
        '796 - BRG Golden Sands (Huế)',
        '166 - Mad Cow Wine & Grill',
      ],

      vat: '10',
      note: 'note',
      // 👇 THÊM KHUNG GIỜ Ở ĐÂY
      timeFrames: [
        {
          fromHour: '18',
          fromMinute: '06',
          toHour: '21',
          toMinute: '00',
        },
      ],
    };

    await additionalFeePage.openContractGiftManagement();

    await additionalFeePage.openGiftDetail(
      data.giftId
    );

    await additionalFeePage.openAdditionalFeeTab();

    await additionalFeePage.clickAddFee();

    await additionalFeePage.selectLegalEntity(
      data.legalEntity
    );

    await additionalFeePage.checkNoContract();

    await additionalFeePage.selectFeeType(
      data.serviceType
    );

    await additionalFeePage.selectProviderType(
      data.providerType
    );

    await additionalFeePage.selectFeeCalculationType(
      data.feeCalculationType
    );

    for (let i = 0; i < data.feeLocations.length; i++) {
      await additionalFeePage.addFeeLocation(
        i,
        data.feeLocations[i].location,
        data.feeLocations[i].fee,
        data.feeLocations[i].note
      );
    }

    await additionalFeePage.selectLocations(
      data.locations
    );

    await additionalFeePage.fillVat(
      data.vat
    );

    await additionalFeePage.selectApplyDateRange('18', '31');

    await additionalFeePage.fillNote(
      data.note
    );

    await additionalFeePage.selectWorkingDays([
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
    ]);

  await additionalFeePage.addTimeFrames([
  {
    from: {
      date: '20',
      hour: '12',
      minute: '00',
    },
    to: {
      date: '26',
      hour: '13',
      minute: '00',
    },
  },
]);


    await additionalFeePage.save();

    await additionalFeePage.verifySuccessToast();
  }
);