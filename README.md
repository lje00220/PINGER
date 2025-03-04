![PINGER_logo](https://github.com/user-attachments/assets/77d27c36-40c5-4a64-8e84-ee3a3708d517)

# PING(work)ER

## 📢 프로젝트 소개

PINGER(핑거)는 **카카오맵 API**를 활용한 새로운 구직 플랫폼입니다. 원하는 지역을 탐색하고, 손가락 터치 한 번으로 채용 정보를 빠르게 확인하세요. 핑(ping)으로 찍고, 새로운 기회를 잡는 가장 직관적인 구직 경험을 제공합니다. 

[📌 PINGER](https://pinger-one.vercel.app/)

## 📅 프로젝트 기간

**2025.02.26 ~ 2025.03.05**

## 🔥 프로젝트 계기

- 다양한 구인구직 사이트에서 영감을 받아 시작하였습니다.
- 평소 채용공고 사이트를 보며 불편했던 점을 개선해보고자 기획되었습니다.
- 실무에서 많이 활용되는 API 기술을 직접 적용해보고 경험을 쌓고자 개발되었습니다..

## 💏 멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/ImJaeOne">
        <img src="https://avatars.githubusercontent.com/u/84777796?v=4" width="80" alt="woozizi"/>
        <br />
        <sub><b>최종욱</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/woohyuckk">
        <img src="https://avatars.githubusercontent.com/u/191959541?v=4" width="80" alt="MiiingGaeng"/>
        <br />
        <sub><b>김민경</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/K-jisu">
        <img src="https://avatars.githubusercontent.com/u/176811389?v=4" width="80" alt="Hyojin-Moon"/>
        <br />
        <sub><b>문효진</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>팀장</b> <br/>
        <b>자소서 페이지</b> <br/>
      </td>
      <td align="center">
        <b>회원가입, 로그인</b> <br/>
        <b>헤더, 로고 디자인</b> <br/>
      </td>
      <td align="center">
        <b>홈 페이지</b> <br/>
        <b>카카오 지도 api 담당</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/PureunKang">
        <img src="https://avatars.githubusercontent.com/u/73922462?v=4" width="80" alt="parkminjo"/>
        <br />
        <sub><b>박민조</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/lje00220">
        <img src="https://avatars.githubusercontent.com/u/155710708?v=4" width="80" alt="Jieun Lee"/>
        <br />
        <sub><b>이지은</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>마이 페이지</b> <br/>
        <b>북마크 담당</b> <br/>
      </td>
      <td align="center">
        <b>채용 공고 페이지</b> <br/>
        <b>댓글 담당</b> <br/>
      </td>
      <td align="center">
    </tr>
  </tbody>
</table>

## 🛠 **기술스택**

### 📌 **프로그래밍 언어 및 프레임워크**

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### 🎨 **UI 프레임워크 및 스타일링**

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### ✅ **코드 품질 및 포맷팅**

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

### 🗄️ **백엔드 및 데이터베이스**

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 🗃️ **버전, 상태관리**

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%2320232a?style=for-the-badge&logo=zustand&logoColor=white)

## 📁 프로젝트 구조

```
pinger
├─ 📁 src
│  ├─ App.jsx
│  ├─ 📁 api - api 통신 관련 폴더
│  ├─ 📁 components
│  │  ├─ MapContainer.jsx
│  │  ├─ 📁 auth
│  │  ├─ 📁 common - 공통 컴포넌트
│  │  ├─ 📁 features - 기능 관련 컴포넌트
│  │  ├─ 📁 layout
│  │  └─ 📁 maps
│  ├─ 📁 constants - 상수 파일 관리
│  ├─ 📁 hooks - 훅 관리 폴더
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Home.jsx
│  │  ├─ JobDetail.jsx
│  │  ├─ JobListPage.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyPage.jsx
│  │  ├─ ResumeCreate.jsx
│  │  ├─ ResumeDetail.jsx
│  │  ├─ ResumeListPage.jsx
│  │  └─ Signup.jsx
│  ├─ shared
│  │  └─ Router.jsx
│  ├─ 📁 supabase
│  ├─ 📁 utils
│  └─ 📁 zustand
```

## 🚀 주요 기능

알아서 쓰세요~~~

## 🎨 와이어 프레임

[📌 와이어 프레임 보러가기](https://www.figma.com/design/OtOvzB8L7qfuNvCp3lkPg6/CHILL?node-id=562-11&t=UQIsRfA1dDR2O2yY-1)

## ERD

<img width="994" alt="image" src="https://github.com/user-attachments/assets/51bba27b-5d79-4652-a548-a6b33098b5ef" />


## ⚒️ 트러블 슈팅

