const { test, expect } = require('@playwright/test');

test('handle auth popup', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'devipsen',
      password: 'ipsen-team'
    }
  });

  const page = await context.newPage();

  await page.goto('https://staging.ipsencares.com/bylvay-patient-support/BYl-us-000050-enrollment-form');
  await page.getByRole('button', { name: /accept/i }).click();

  await page.locator('#prescriber-name').scrollIntoViewIfNeeded();
  await page.locator('#prescriber-name').fill('thomas');
  await page.locator('#prescriber-last-name').fill('Shelby');
  await page.locator('#tax-id-number').fill('6778737284');
  await page.locator('#npi-number').fill('9087637284');
  await page.locator('#medicare-office-institution').scrollIntoViewIfNeeded();
  await page.locator('#medicare-office-institution').fill('Ts Hospital');
  await page.locator('#hcp-address').fill('1068 Alexander Drive Farmers Branch');
  await page.locator('#hcp-city').fill('Farmers Branch');
  await page.selectOption('#hcp-state', 'Florida');
  await page.locator("#hcp-zip").fill('75244');
  await page.locator('#medicare-office-institution-title').scrollIntoViewIfNeeded();
  await page.locator('#medicare-office-institution-title').fill('ipsenauth');
  await page.locator('#hcp-phone').fill('89038129821');
  await page.locator('#hcp-fax').fill('8932129821');
  await page.locator('#hcp-email').fill('thomas@gmail.com');
  await page.locator("a[class$='button button--primary btn btn-md somatuline-step5-btn soma-next-btn-enroll']").click();
  // await page.locator('input[name="edit-preferredspecialtypharmacy0-c"][value="optum-frontier-therapies"]').check();
  // 2 step
  await page.locator('input[type="radio"][value="Optum Frontier Therapies"]').check();
  await page.locator('input[name="RxSent0__c"][value="true"]').check();
  await page.locator('#hcp-city-four').fill('rxspeciality Pharmacy');
  await page.locator("(//a[@class='button button--primary btn btn-md somatuline-step6-btn soma-next-btn-enroll'])[1]").click();
  //3 step
  await page.locator("#icd-10-code").fill("IED-310");
  await page.locator('input[type="radio"][id="pruritus-idc"]').nth(0).check();
  await page.locator('#secondary-icd-code').check();
  await page.evaluate(() => {
    document
      .querySelector("a.soma-next-btn-enroll")
      ?.click();
  });
  //4 stp
  await page.locator("#ppa_patient_name").fill('Jim');
  await page.locator("#ppa_patient_last_name").fill('cortten');
  await page.locator("#datepicker4").fill('12121990');
  await page.locator('.row_2').click();
  await page.locator('#edit-prescsex-c-male').check();
  await page.locator("#current-weight").fill('69');
  //
  await page.waitForTimeout(2000);
  await page.locator("#edit-600-dosage-c").click();
  await page.mouse.wheel(0, 300);
  await page.locator("#prescriber_attestation_name").fill('nimmy');
  await page.locator("#prescriber_title").fill('cortten');
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  // await page.evaluate(() => {
  //   document
  //     .querySelector("a.soma-next-b7tn-enroll")
  //     ?.click();
  // });
  await page.locator('a.button.button--primary.btn.btn-md.bylvay-step8-btn.soma-next-btn-enroll').click();
  //5 stp
  await page.locator('#patient-name').fill("Sim");
  await page.locator('#patient-last-name').fill("yot");
  await page.locator('#patient-address').fill("down town city");
  await page.locator('#patient-city').fill("Park city");
  await page.selectOption('#patient-state', 'Florida');
  await page.locator("#patient-zip").fill('75244');
  await page.locator("#datepicker1").fill('10112000');
  await page.locator("#patient-city").click();
  await page.mouse.wheel(0, 300);
  await page.locator('label[for="edit-sex-c-male"]').click();
  await page.locator("#patient-email").fill('sim@gmail.com');
  await page.locator('#patient-home-phone-checkbox').click();
  await page.locator("#patient-home-phone").fill('9086754321');
  await page.mouse.wheel(0, 700);
  await page.evaluate(() => {
    const yesRadio = document.querySelector(
      'input[type="radio"][data-drupal-selector="edit-consenttosmstextmessage0-c-0"]'
    );
    yesRadio.click();
  });

  await page.locator('label[for="edit-give-permission-0"]').click({ force: true });


  await page.evaluate(() => {
    const checkbox = document.querySelector(
      'input[data-drupal-selector*="iconfirminformation"]'
    );

    if (!checkbox) throw new Error('Checkbox not found in DOM');

    checkbox.click();
  });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    document
      .querySelector("a.soma-next-btn-enroll")
      ?.click();
  });
  //6 stp
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    const radio = document.querySelector(
      'input[data-drupal-selector*="ispatientinsured"]'
    );
    if (!radio) throw new Error('Radio not found in DOM');
    radio.click();
  });

  await page.locator("#policy-holder").fill('don');
  await page.locator("#policy-holder-last").fill('martin');
  await page.locator("#patient-primary-insurance-co").fill('Humana');
  await page.locator("#patient-primary-insurance-co-phone").fill('8908467532');
  await page.locator("#primary-subscriber-policy-id").fill('8904389321');
  await page.locator("#patient-primary-insurance-group").fill('67543897234');
  await page.mouse.wheel(0, 100);
  // Yes option
  await page.waitForTimeout(2000);
  await page.locator(
    'label[for*="ispatientinsured"][for*="false"]'
  ).click({ force: true });


  await page.mouse.wheel(0, 500);

  await page.evaluate(() => {
    document
      .querySelector("a.soma-next-btn-enroll")
      ?.click();
  });
  //7 Stp
  await page.waitForSelector('input[id="attest-that-i-am-not-enrolled"]', {
    state: 'attached',
    timeout: 15000
  });

  await page.evaluate(() => {
    const radio = document.querySelector(
      'input[id="attest-that-i-am-not-enrolled"]'
    );
    if (!radio) throw new Error('Attestation radio not found');
    radio.click();
  });

  await page.waitForSelector(
    'input[id="ic-copay-program-opt-in"]',
    { state: 'attached', timeout: 15000 }
  );

  await page.evaluate(() => {
    const checkbox = document.querySelector(
      'input#ic-copay-program-opt-in'
    );
    if (!checkbox) throw new Error('Copay checkbox not found');
    checkbox.click();
  });


  await page.evaluate(() => {
    document
      .querySelector("a.soma-next-btn-enroll")
      ?.click();

  })

  // 8 stp

  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await page.locator("#soma_enroll_reviewsign").click();
  await page.waitForLoadState('networkidle');



  await page.pause();
});