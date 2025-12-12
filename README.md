# 🏫 DSchool: AI-based Community Platform

> **⚠️ Archive Notice**
> 본 프로젝트는 **2023.08 ~ 2024.05** 기간 동안 개발된 프로젝트입니다.
> 포트폴리오 아카이빙을 위해 로컬에 보관된 소스 코드를 **2025년 12월에 재업로드(Restoration)** 하였습니다.
> *This repository is an archive of a past project uploaded for portfolio purposes.*

<br/>

## 📖 Project Overview
**DSchool**은 학부모들이 입시 및 교육 정보를 공유하는 커뮤니티 플랫폼입니다.
단순한 게시판 기능을 넘어, **사용자의 클릭 행동 패턴을 분석하여 관심사와 유사한 게시글을 AI가 추천**해주는 맞춤형 서비스를 구현했습니다.

* **Role:** Frontend Developer (Key Contributor) & AI Model Modeling
* **Team Size:** 4명 (Frontend 1, Backend 2, AI 2)

<br/>

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| **Frontend** | React, React Router, Axios, Tailwind CSS |
| **AI / Data** | Python, Pandas, KoNLPy, Gensim (Doc2Vec) |
| **Search Engine** | Elasticsearch |
| **Collaboration** | Git, Notion |

<br/>

## 🚀 Key Features & Technical Challenges

### 1. AI 기반 게시글 추천 시스템 (Recommendation System)
사용자가 특정 게시글을 읽으면, 문맥상 유사한 다른 게시글을 추천하는 기능을 구현했습니다.
* **Doc2Vec 모델링:** Python `Gensim` 라이브러리를 활용하여 게시글 본문을 벡터화하고, 문서 간 유사도를 계산했습니다.
* **데이터 시각화:** AI 분석 결과를 프론트엔드 화면에 직관적으로 노출하여 사용자 체류 시간을 증대시켰습니다.

### 2. 프론트엔드와 AI 모델 연동
* Python 환경에서 처리된 추천 데이터를 React 프론트엔드에서 소비할 수 있도록 데이터 파이프라인을 구축했습니다.
* 백엔드 API와의 비동기 통신(`Axios`)을 통해 추천 리스트를 실시간으로 렌더링했습니다.

<br/>

## 📝 Self-Feedback (Refactoring Points)

현재 시점에서 본 과거 코드를 회고하며, 향후 개선이 필요한 지점들을 분석했습니다.

**1. API 호출 최적화 (Server-side Pagination)**
* **AS-IS:** 전체 데이터를 호출(`getAll`)한 후 클라이언트 사이드에서 필터링(`find`)하여 렌더링 속도 저하 우려.
* **TO-BE:** API 요청 시 `Item ID` 혹은 `Page Query`를 전달하여 필요한 데이터만 부분적으로 로딩하도록 개선 필요.

**2. 환경 변수 관리 (Environment Variables)**
* **AS-IS:** API Base URL이 로컬 환경(`localhost`)으로 하드코딩 되어 있음.
* **TO-BE:** `.env` 파일을 도입하여 개발(Dev) 및 배포(Prod) 환경에 따라 동적으로 주소를 관리하도록 수정 필요.

**3. 데이터 의존성 분리 (DTO Pattern)**
* **AS-IS:** Elasticsearch의 Raw Data 구조(`_source`, `hits`)가 프론트엔드 컴포넌트에 직접 노출됨.
* **TO-BE:** 데이터 변환 레이어(Mapper)를 두어, 백엔드 DB 구조가 변경되더라도 UI 컴포넌트에는 영향이 없도록 설계 개선 필요.



