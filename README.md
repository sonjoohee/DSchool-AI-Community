# 🏫 DSchool: AI-based Community Platform

> **⚠️ Archive Notice**
> 본 프로젝트는 **2023.08 ~ 2024.05** 기간 동안 개발된 프로젝트입니다.
> 포트폴리오 아카이빙을 위해 로컬에 보관된 소스 코드를 **2025년 12월에 재업로드(Restoration)** 하였습니다.

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

## 📝 Self-Feedback & Improvements (Refactoring Points)

현재 시점에서 본 과거 코드를 회고하며, 향후 개선이 필요한 지점들을 분석하고 이미 적용한 개선사항들을 반영했습니다. API 서비스 계층 도입, 환경 변수 관리 개선, 데이터 의존성 분리, Skeleton UI 구현, 코드 유지보수성 향상 등의 개선을 완료했습니다.
