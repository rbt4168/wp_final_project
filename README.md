# WP Final Project

## 源起 Origin
此專案為以「標籤」為底的創作者社群，為提供圖像創作者及藝文愛好者而誕生。因觀察現有創作者部落格之不足而發想，並決定製作此主題的專案作為本次期末發表。

此專案以標籤和圖片的強關聯性為核心概念，希望實現更易於使用的搜索功能，並輔以金流系統，使支持者得以給予喜愛的創作者贊助，並結合兩者的特性，透過標籤，以更直觀的方式管理作品販售功能。

此外，創作社群旨在交流，因而決定併入訊息系統，提供創作者們一個友善的空間，並在聊天室中融入了點數打賞功能，讓支持者們能夠共參文藝創作與發想。

期望成為新型態的創作交流平台，為藝術家和用戶打造一個自由遊覽的交流空間。

## 專案功能 Project Detail

### 首頁 (/)
在首頁中，使用者可以瀏覽目前已跟隨之創作者的最新作品，在所有使用者中的最新作品以及當下最多人喜歡的作品，並可透過點選上方的導覽列，PROFILE、SERACH、SUPPORT來前往不同的頁面。

### 使用者頁面 (/profile)
此頁面有11個附屬功能，以下詳細介紹：

* **帳號資料 Account**
點擊導覽列的PROFILE後，我們會進到使用者界面，此頁面能夠檢視與更改帳號的資料，並提供左方的選單來進行操作。

* **作品管理 Artworks**
在作品管理中，可以檢視自己所有以上傳的作品，並透過點選作品進入下方的修改作品頁面。

* **上傳作品 Creation**
在這個頁面中，可以上傳自己的作品，填寫作品名稱，創作緣由，自己對作品的推薦度以及方便他人搜尋的標籤。

* **修改作品 Modify Creation**
在這個頁面中，可以編輯除了圖像本身以外的所有部份以及刪除作品。

* **交易紀錄 Transactions**
在這個頁面中，可以看到自己對持有的點數的運用紀錄。

* **轉帳 Transfer**
此頁面中，可以透過輸入指定的 Account 來轉移點數給指定的使用者。

* **標籤管理 Private Tags**
在這個頁面中，可以管理、編輯所有使用者持有的付費標籤的名稱以及價格，付費標籤的添加可以使得作品變為不可見，並且此標籤是會於另一個頁面出售的，因此添加了此標籤的作品相當於公開販售。
若要使用此標籤，必須先進入這個頁面完成第一次設定才能開始添加付費標籤。

* **持有標籤 Owned Private**
在這個頁面中，可以查看使用者所購買的所有付費標籤。

* **私訊 Message**
在這個頁面中，可以與指定的使用者傳訊息，並同時提供於聊天室轉帳給聊天對象的功能。

* **喜歡的作品 Liked**
在這個頁面中，可以看到自己點喜歡的所有作品。

* **喜歡的作者 Creators**
在這個頁面中，可以看到使用者追隨的作者。


### 搜尋頁面 (/search)
能夠在搜尋欄中輸入文字，去抓取想要搜索的作品名稱，且提供了正向與反向的標籤搜尋功能，搜尋出的圖片的標籤會符合所有用於搜尋的正向標籤，並保證不包含使用者所選擇的反向標籤。

### 登入與註冊功能 (/login, /register)
在這部份中我們允許使用者可以透過email和google帳號以及Github帳號來進行註冊與登入，我們允許使用者利用相同的gmail帳號透過google github以及email 的方式註冊不同的帳號 讓使用者建立帳號更加的方便 我們唯一做出的限制只有不允許使用者有相同的使用者名

### 購買支持點數 (/buy_coin)
在這個頁面中，可以透過點擊按鈕獲取指定點數（由於串真實金流太危險，同時也不方便助教操作，所以我們並沒有串，但它本身的設計使用來購買點數的）

### 圖片展示頁面 (/picture/[picture_id])
在點擊縮圖後，便可以看到圖片的詳細資料，可以看到原本大小的圖片，圖片敘述、標籤、使用者可能也會喜歡的圖片、同時也可以對圖片點擊愛心，以及分享圖片連結，此外，也可以透過點擊作者的資訊欄進入作者的個人頁面。

### 作者頁面 (/author/[author_id])
在作者頁面中，我們可以看到作者所提供的資訊，例如自我介紹，其他社群帳號的連結等等，相當於是作者的小型部落格。
於上方，我們可以跟隨作者或是選擇與他發起聊天對話（由於伺服器及網路因素，讀取可能稍慢）。
可以透過點擊SPONSOR CREATOR前往購買作者Private標籤的頁面。
頁面下方顯示的圖片有三個大部分 第一個部份為private works 如果使用者有購買該作者的標籤的話可以在這一個部份中看到作者透過對應的付費標籤標記的作品，第二個部份則為作者最推薦的三個作品，第三個部份則是可以透過選單來操作選取不同的排序方式。

### 贊助創作者頁面 (/donate/[author_id])
在這個頁面中，可以透過點數購買作者現正出售的付費標籤，在購買付費標籤後，便能夠在作者頁面看到對應該付費標籤的作品。

## 工作分工
### 葉咸礽 B10902052
1. 多數前端工作與 UI
2. 訊息系統前後端
3. 交易系統前後端
4. 修改林文博在 Auth 沒有 Handle 的部份
5. Deploy

### 林文博 B10902115
1. 負責處理前半部份的 Next/Auth 操作
2. 處理 postgre 資料庫的操作，把資料給前端
3. 小部份修改前端的code 並提供給前端做測試
4. 所有其他後端
5. 資料庫管理人員

## 技術使用
* Next.js + Typescript : 作為我們程式的主要架構
* Material-UI : 用以增進前端操作美觀
* Next/Auth : 登入及在網頁中的使用者身份確認
* Pusher : 負責訊息系統的實時溝通
* MongoDB : 訊息系統 DataBase
* Postgresql : 其他所有 DataBase
* express + node.js ： 圖床 Server
* neon     :  用來做除了訊息系統以外的資料庫
* drizzle-orm ： 用來幫助 Query 資料庫

## 專案架構 Project Structure
```
// 後端的 code 都在 /src/api
// 其餘都是前端

/src
├─api
│  ├─auth
│  │  └─[...nextauth]
│  ├─authorHighToLow
│  ├─authorLowToHigh
│  ├─authorPopular
│  ├─authorRecommand
│  ├─authorTag
│  ├─buyTag
│  ├─buy_coin
.
.
.
├─author
│  └─[author_id]
├─buy_coin
├─donate
│  └─[author_id]
├─login
├─picture
│  └─[picture_id]
├─profile
│  └─_components
│      └─_messagecom
├─register
└─search
```

## 安裝 Installation
Follow these steps to set up and run the project:

1. **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd [project_folder]
    ```

2. **Copy the environment file and configure:**
    ```bash
    cp .env.example .env.local
    ```

    Open the `.env.local` file and configure the environment variables accordingly.

3. **Picture Server Installation**
    ```bash
    cd express_server
    npm i
    node index.js
    ```

4. **Main Installation**
    ```bash
    yarn
    yarn migrate
    yarn dev
    ```
    
## Deploy 的流量限制 及 開啟時間限制
* 請上傳的圖片不要超過 10 MB
* 請不要上傳過多的圖片，以及創立太多的帳號，在線上 Deploy 的部份我們選擇使用的是免費的 Mongodb 以及 Neon 所以運算資源不太足夠 
* 網頁可能會很慢，請耐心等待
* 總上傳的圖片請不要超過 1000 張，總創立的使用者請不要超過 30 個，超過不能保證流暢性
* 我們負責處理圖片的 express server 是架在宿舍電腦上，還過了一層 certbot + Nginx ，因此可能會受到宿舍網路斷掉或很慢等不可抗力因素影響，也有可能被外部攻擊，如果在批改的時候遇到圖片讀不出的情況，可以聯繫電腦管理者的 Discord 用戶名為 rbt4168.


## Reference

1. Material-UI. (2023). Material-UI: React components that implement Google's Material Design. *Material-UI*. 取自：[https://mui.com/](https://mui.com/)
2. OpenAI. (2022). ChatGPT 3.5: Language model powered by OpenAI's GPT-3.5 architecture. *OpenAI*. 取自：[https://www.openai.com/gpt](https://www.openai.com/gpt)
3. OpenAI. (2022). ChatGPT 4.0: Language model powered by OpenAI's GPT-4.0 architecture. *OpenAI*. 取自：[https://www.openai.com/gpt](https://www.openai.com/gpt)
4. 助教的 Notion Clone (學習 Auth):
   - 來源: [助教的 Notion Clone GitHub 連結](https://github.com/ntuee-web-programming/112-1-unit2-notion-clone)


* 林文博的hw4 (稍微看一下drizzle怎麼用)