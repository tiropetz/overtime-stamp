import { COMPANY_ID, EMAIL, PASSWORD, OVERTIME, COMMENT } from "../env.js";
import { PATH, ELEMENTS, BASE_URL } from "./const.js";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    // sign in
    await page.goto(PATH.SIGN_IN);
    await page.type(ELEMENTS.SIGN_IN.FORM_COMPANY_ID, COMPANY_ID);
    await page.type(ELEMENTS.SIGN_IN.FORM_EMAIL, EMAIL);
    await page.type(ELEMENTS.SIGN_IN.FORM_PASSWORD, PASSWORD);
    await Promise.all([
      page.click(ELEMENTS.SIGN_IN.BUTTON_SUBMIT),
      page.waitForNavigation(),
    ]);

    if (page.url() !== PATH.MY_PAGE) {
      throw new Error("ログインに失敗しました。ログイン情報を確認してね。");
    }

    // stamp table
    await page.goto(PATH.STAMP_TABLE);

    const linkList = await page.evaluate(
      ({ ELEMENTS, BASE_URL }) => {
        const rows = [
          ...document.querySelectorAll(ELEMENTS.STAMP_TABLE.TABLE_ROW),
        ];
        const isTargetDate = (tableRow) => {
          const isWorkDay = !tableRow
            .querySelector(ELEMENTS.STAMP_TABLE.TABLE_DATA_HOLIDAY)
            .innerHTML.match(/休日/);
          const unrequested = !tableRow
            .querySelector(ELEMENTS.STAMP_TABLE.TABLE_DATA_OVERTIME)
            .innerHTML.match(/残業/);
          return isWorkDay && unrequested;
        };
        const targetRows = rows.filter(isTargetDate);
        return targetRows.map((row) => {
          const overtimeRequestPagePath = row
            .querySelector(ELEMENTS.STAMP_TABLE.ANCHOR_OVERTIME_REQUEST)
            .getAttribute("href");
          return `${BASE_URL}${overtimeRequestPagePath}`;
        });
      },
      { ELEMENTS, BASE_URL }
    );

    console.log("打刻中...");

    // overtime request
    for (const link of linkList) {
      await page.goto(link);
      await page.evaluate(
        ({ ELEMENTS, OVERTIME }) => {
          const overTimeForm = document.getElementById(
            ELEMENTS.OVERTIME_REQUEST.FORM_OVERTIME
          );
          overTimeForm.value = OVERTIME;
        },
        { ELEMENTS, OVERTIME }
      );
      await page.type(ELEMENTS.OVERTIME_REQUEST.FORM_COMMENT, COMMENT);
      await page.click(ELEMENTS.OVERTIME_REQUEST.BUTTON_SUBMIT);
      await page.waitForNavigation();
    }
    console.log("おそらく正常に打刻されました");
  } catch (e) {
    console.error("何かしらのエラーが起きました");
    throw e;
  } finally {
    await browser.close();
  }
})();
