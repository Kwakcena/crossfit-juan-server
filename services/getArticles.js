import browserSetiing from "./browser.js";

const getItems = async () => {
  const { page, browser } = await browserSetiing();

  try {
    await page.goto(
      "https://m.cafe.naver.com/ca-fe/web/cafes/28152386/menus/99"
    );
    await page.waitForSelector(".board_box");

    const articles = await page.evaluate(() => {
      const boardBox = Array.from(
        document.querySelectorAll(".board_box")
      ).slice(0, 5);

      return boardBox.map((article) => {
        const url = article.querySelector(".txt_area").href;
        const articleNumber = new URLSearchParams(url).get("articleid");
        const title = article.querySelector(".txt_area .tit").textContent;

        return { articleNumber, title };
      });
    });

    return articles;
  } catch (error) {
    // TODO: 에러 처리
    console.error(error);
  } finally {
    await page.close();
    await browser.close();
  }
};

export const getArticles = async () => {
  return await getItems();
};
