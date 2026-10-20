# 分享之前｜自拍與隱私互動策展

面向國中一年級學生的數位素養互動展覽。觀眾透過 109 年「安全自拍與分享」案例，練習辨認照片中的個人資訊，並在發文前檢查票券細節、位置資訊與觀看對象。

## 展覽內容

- 案例現場：小雲分享拿著電影票的自拍後，收到陌生訊息。
- 線索掃描：以標示清楚的練習插畫檢查票券 QR code、校服識別與位置標籤。這些線索來自補充教材，並非原案例確認的陌生訊息來源。
- 安全檢查：觀眾完成分享前清單，並填寫不收集姓名、班級或帳號的離場回饋表。

## 技術

Vite、原生 HTML/CSS/JavaScript、GSAP、ScrollTrigger。GitHub Actions 建置並部署到 GitHub Pages。Apps Script 由瀏覽器端手動設定，不使用 Clasp。

## 本機開發

~~~sh
pnpm install
pnpm dev
~~~

建置與預覽：

~~~sh
pnpm build
pnpm preview
~~~

## Apps Script 回饋串接

目前尚未設定 Apps Script Web App URL，因此正式網站中的表單會清楚提示答案尚未送出或保存。建立並部署 Web App 後，將網址設為 VITE_APPS_SCRIPT_URL；本機可放入不提交的 .env.local，GitHub Pages 可在 Repo 的 Actions Variables 設定同名變數，然後重新部署。

表單不詢問姓名、班級、帳號或自由文字。正式串接前，請確認 Apps Script 和試算表也不會額外收集可識別學生身分的資料。

## 來源

- [均一：109 年「安全自拍與分享」](https://www.junyiacademy.org/topics/cs-isl-c)
- [教育部案例摘要](https://itaiwan.moe.gov.tw/elearning/movie_info.php?id=249)
- [中小學數位素養教育資源：安全自拍與分享](https://eliteracy.edu.tw/Tip.aspx?id=4194)
- [聯合國 SDG 16](https://sdgs.un.org/goals/goal16)

## 部署

GitHub Pages 由 .github/workflows/pages.yml 自動部署。正式網址會在首次部署成功後填入。
