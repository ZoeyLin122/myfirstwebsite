# 專案目標與協作指引

## 專案目標

打造一個以聯合國永續發展目標（SDGs）為主題的互動式數位策展靜態網站，並以 Awwwards 等級的視覺完成度與觀展體驗為目標。網站需採響應式設計，兼顧桌機、平板與手機，並以 GSAP 和 ScrollTrigger 呈現具展場感的捲動敘事、轉場與互動。

觀展者可留下回饋；前端透過 Google Apps Script Web App 與 Google 試算表串接並記錄回饋。程式碼以 GitHub CLI 管理，完成後部署到 GitHub Pages；部署成功後將正式 Pages 網址寫入 README.md，再推送到 GitHub Repo。

## 技術與工作流程

- 靜態網站以 Vite、原生 HTML/CSS/JavaScript 建置，使用 GSAP 與 ScrollTrigger 製作動畫。
- 使用 pnpm 管理套件，常用指令為 `pnpm dev`、`pnpm build`、`pnpm preview`。
- 透過 GitHub CLI（`gh`）管理 GitHub Repo、推送程式碼與設定 Pages；GitHub Actions 工作流程負責建置及部署。
- Google Apps Script 僅在瀏覽器中的 Apps Script 編輯器操作與部署。**不要安裝或使用 Clasp。**
- 回饋資料寫入 Google 試算表。若需公開 Web App 網址或設定值，先評估資料安全與濫用風險；不得把憑證、私密金鑰或其他秘密放進前端或 Git。
- 開發時先確認現有檔案與設定，再採用與本專案一致的技術和視覺方向。保留語意化 HTML、鍵盤操作、可讀對比、行動裝置體驗及減少動態效果偏好（prefers-reduced-motion）的支援。
- 對圖片、字型與動畫控制載入量；避免讓動畫妨礙閱讀或回饋表單操作。

## 目前部署狀態

- 展覽 MVP 已建置，採 Vite、GSAP 與 ScrollTrigger，並支援響應式版面、鍵盤操作及減少動態效果偏好。
- GitHub Pages：https://zoeylin122.github.io/myfirstwebsite/
- Apps Script 回饋表單前端已預留 VITE_APPS_SCRIPT_URL；尚未設定 Web App URL，所以回饋目前不會送出或保存。
- Apps Script 僅由瀏覽器中的 Apps Script 編輯器操作；不要安裝或使用 Clasp。
