import express from "express";
import { get, map, slice } from 'lodash-es';
import axios from "axios";
import { nanoid } from 'nanoid';

/**
 *
 * @param URL url
 * @param URLSearchParams searchParams
 */
const createUrl = (url, searchParams) => `${url.toString()}${searchParams ? `?${searchParams.toString()}` : ''}`;

const router = express.Router();

router.get("/", async (req, res) => {
  const cafeId = 28152386;
  const requestURL = createUrl(
    new URL('https://apis.naver.com/cafe-web/cafe2/ArticleListV2.json'),
    new URLSearchParams({
      'search.clubid': cafeId,
      'search.queryType': 'lastArticle',
      'search.menuid': 99,
      'search.page': 1,
      'search.perPage': 50,
      ad: true,
      uuid: nanoid(36),
      adUnit: 'MW_CAFE_ARTICLE_LIST_RS',
    })
  );
  const { data } = await axios.get(requestURL);
  const articleList = slice(get(data, 'message.result.articleList'), 0, 5);
  const result = map(articleList, (article) => {
    const articleId = get(article, 'item.articleId');
    const subject = get(article, 'item.subject');
    const href = createUrl(
      new URL('https://m.cafe.naver.com/ArticleRead.nhn'),
      new URLSearchParams({
        clubid: cafeId,
        articleid: articleId,
        boardtype: 'L',
        menuid: '99'
      }),
    );
    return {
      url: href,
      articleNumber: articleId,
      title: subject
    };
  });
  res.status(200).json({
    success: true,
    data: result
  });
});

export default router;
