# 💚 모임이 끝나고 후기를 전할 수 있는 롤링페이퍼 프로젝트

리액트 심화주차 프로젝트로 NEXTJS를 통해 구현했어요.<br>

어떤 모임을 마치고 소감은 듣고 싶은데, 막상 부탁하기 어려울 때! "어땠어?"를 사용해보는건 어떨까요?<br>

## 0. 팀원 소개

<table>
   <tr>
    <td align="center"><b>남현재</b></td>
    <td align="center"><b>정민석</b></td>
    <td align="center"><b>조은영</b></td>
    <td align="center"><b>임현석</b></td>
    <td align="center"><b>안종현</b></td>
    <td align="center"><b>한종섭</b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/NHJeans"><img src="https://avatars.githubusercontent.com/u/110883544?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/phantom2115"><img src="https://avatars.githubusercontent.com/u/48466548?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Eunyoung-Jo"><img src="https://avatars.githubusercontent.com/u/82076033?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/hyeonseok98"><img src="https://avatars.githubusercontent.com/u/157561573?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Ahnjonghyun87"><img src="https://avatars.githubusercontent.com/u/167166874?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/hanjongseop"><img src="https://avatars.githubusercontent.com/u/165746887?v=4" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center">모임 전체 목록,<br/>닉네임 수정 & 로그아웃 기능,<br/>프로젝트 환경 셋팅</td>
    <td align="center">모임생성,<br/>이미지 drag&drop 방식 추가 기능,<br/></td>
    <td align="center">회원가입 & 로그인 <br/>소셜로그인(google, kakao)</td>
    <td align="center">모임 목록 페이지 리스트(기본순, 모아보기) <br/>모임 재배치 기능 </td>
    <td align="center">모임 후기 글쓰기 및 편지지 색상 변경 기능<br/>후기 상세페이지</td>
    <td align="center">디테일 페이지 헤더<br/>카카오톡 공유하기</td>
  </tr>
</table>

<br/><br/>

## 0-1. 프로젝트 진행 기간

- 2024.07.08 ~ 2024.07.12<br/><br/>

## 0-2. 프로젝트를 진행하며..

- 서로의 진행 상황을 공유하기 위해 zep과 slack을 통해 소통했어요.
- 서로의 코드를 리뷰하는 문화를 지향했어요.

## 0-3. 프로젝트 Github 전략

git-flow 전략을 간소화 하여 메인 브랜치인 main, dev와 보조 브랜치 feature 사용했어요.<br>

<strong>main branch</strong><br>

- 최종 프로젝트 버전을 배포하는 브랜치<br>

<strong>dev branch</strong><br>

- feature 브랜치의 분기가 되는 곳, 개발 브랜치<br>

<strong>feature branch</strong><br>

- 각자의 기능을 개발하는 브랜치 dev branch로부터 각자의 feature branch를 만들어 작업한 이후 PR을 통해 코드리뷰를 진행하고 merge를 했서요. 또한 2명 이상 approve가 있어야 dev에 merge 할 수 있도록 조건을 설정하였어요.
  <br/><br/>

## 1. 사용한 라이브러리

### tanstack-query

서버 상태 관리를 관리 하기 위해 사용하였으며, 비동기 로직을 간편하게 작성하기 위해 사용했어요

### supabase

Supabase를 백엔드로 사용하여 실시간 데이터베이스를 사용했어요

### tailwind css

재사용성이 높고, 코드의 가독성과 유지보수성을 향상시킬 수 있기에 사용했어요

### Kakao Share API

카카오 API를 이용하여 사용자가 콘텐츠를 쉽게 공유할 수 있도록 하였어요.

<br/>

## 2. 대표기능

- 회원가입 로그인을 통해 인증된 사용자만 모임을 생성할 수 있어요.<br />
- 모임을 생성하고 모임 공유 기능을 통해 다른 사람들이 나에게 글을 쓸 수 있어요.<br />
- 모임 재배치 기능을 통해 포스트잇 처럼 마우스로 글을 옮길 수 있어요.<br />
- 글작성 페이지에서 배경색을 바꿀 수 있어요<br />
  <br />

## 3. 상세설명

### 1. Supabase Auth를 사용하여 로그인 회원가입 페이지를 구현

<img width="640" src=""/><br/>

- Supabase Auth를 사용하여 로그인 및 회원가입 페이지를 구현했어요.
- 이메일 회원가입 및 소셜 로그인(구글, 카카오) 기능을 구현하여 편리하게 인증할 수 있어요<br/><br/>

### 2. 내가 생성한 모임과 닉네임 변경 기능

<img width="640" src=""/><br/>

- 나의 모임을 통해 내가 생성한 모임을 빠르게 찾아볼 수 있어요.
- 닉네임 변경을 통해 나만의 닉네임을 가질 수 있어요.<br/><br/>

### 3. 모임 리스트 페이지 구현

<img width="640" align="top" src=""/><br /><br />

- 유저들이 생성한 모임들을 볼 수 있어요.
- 무한 스크롤을 구현하였어요. 무한 스크롤시 로딩은 로딩 스피너를 통해 로딩중임을 알 수 있어요.

### 4. 모임 상세페이지

<img width="640" src=""/><br/>

- 내가 생성한 모임에 다른 사람들이 써준 글을 볼 수 있어요.
- 버튼을 통해 보기 방식을 변경 할 수 있어요.
- 다른 사람이 쓴 글을 마우스를 통해 배치할 수 있어요.

<img width="640" src=""/><br/>

- URL 공유하기와 카카오톡 공유하기 기능으로 비회원도 링크를 통해 글을 남길 수 있어요

<img width="640" src=""/><br/>

- 작성할때 입력했던 비밀번호를 입력해야 볼 수 있어요
- 수정과 삭제는 본인만 할 수 있어요

<img width="640" src=""/><br/>

- 아이콘을 클릭해 글의 내용을 볼 수 있어요

<img width="640" src=""/><br/>
<img width="640" src=""/><br/>

- 잘못된 경로로 접근한 경우 Not-Found UI를 보여줬어요<br/>
- 에러 발생시 Error UI를 보여줬어요<br/><br/>

<img width="640" align="top" src=""/><br /><br />

- 공유 받은 URL이나 카카오톡 공유를 통해 글을 작성할 수 있어요.
- 카테고리별 선택과 배경색을 바꿀 수 있어요.<br/><br/>
