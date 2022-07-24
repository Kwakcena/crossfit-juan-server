import browserSetting from './browser.js';
import { getTimeTable, isCurrect, filterText } from '../utils/filter.js';

const haveLogin = async (page, naverId, naverPw) => {
  await page.goto('https://nid.naver.com/nidlogin.login');
  await page.evaluate(
    (id, pw) => {
      document.querySelector('#id').value = id;
      document.querySelector('#pw').value = pw;
    },
    naverId,
    naverPw,
  );

  page.click('.btn_login');
  await page.waitForNavigation();

  // await page.screenshot({
  //   fullPage: true,
  //   path: `naver-login-${new Date().toISOString().substring(0, 10)}.jpeg`
  // })
};

const getReservationData = async (page) => {
  const reservations = await page.evaluate(() => {
    const commentList = Array.from(document.querySelectorAll('.comment_item'));

    return commentList.map((item) => {
      const nickName = item.querySelector('.nick_name')?.textContent;
      const content = item.querySelector('.comment_content .txt')?.innerText;
      const date = item.querySelector('.comment_footer .date')?.textContent;

      return { 
        nickName, 
        content,
        date,
      };
    });
  });

  return reservations.reduce((acc, cur) => {
    if(cur.nickName === '크로스핏주안관리자') {
      return acc;
    }

    return !isCurrect(filterText(cur.content)) 
      ? ({ ...acc, wrongData: [...(acc.wrongData || []), cur]})
      : ({ ...acc, rightData: [...(acc.rightData || []), cur]});
  }, {
    wrongData: [],
    rightData: [],
  });
};

const getItems = async ({ articleNumber, naverId, naverPw }) => {
  const { page, browser } = await browserSetting();

  try {
    console.log('naver login...');
    // 로그인 
    await haveLogin(
      page,
      naverId,
      naverPw,
    );

    // 네이버 카페 수업 예약 게시글의 댓글창으로 이동.
    console.log('go to naver cafe...')
    await page.goto(`https://m.cafe.naver.com/ca-fe/web/cafes/28152386/articles/${articleNumber}/comments?fromList=true`);

    // 해당 페이지에 잘 왔는지 스크린샷을 찍어 본다.
    // await page.screenshot({
    //   fullPage: true,
    //   path: `naver-cafe-${new Date().toISOString().substring(0, 10)}.jpeg`
    // })

    await page.waitForSelector('.comment_list');
    console.log('page url: ', page.url());

    // '다음 댓글 더보기' 버튼 클릭
    if(await page.$('.more_next') !== null) {
      await page.click('.more_next');
    }
    await page.waitForTimeout(500);

    console.log('crawling data...')
    // 예약 정보를 가져온다.
    const users = await getReservationData(page);
    const timeTable = getTimeTable(users.rightData);

    return {
      timeTable,
      wrongData: users.wrongData,
    };
  } catch(err) {
    console.log('\n', err)
  }  finally {
    console.log('\n------------------\nCrawl completed\n')
    await page.close()
    await browser.close()
  }
};

export const modal = async (data) => {
  return await getItems(data);
}