# 3D Interactive Aquascape 🐠

디지털 3D 아쿠아스케이프 - 귀여운 물고기들이 헤엄치는 인터랙티브 수중 정원

![Aquascape Preview](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ 주요 기능

### 🐟 귀여운 물고기들 (25마리)
- **클라운피시 (7마리)**: 주황색 몸에 흰색 줄무늬
- **복어 (5마리)**: 둥근 몸에 귀여운 가시들
- **엔젤피시 (5마리)**: 우아하고 긴 지느러미
- **구피 (8마리)**: 작고 화려한 꼬리

각 물고기는:
- 🌊 고유한 경로로 자연스럽게 유영
- 🐠 꼬리를 좌우로 흔들며 헤엄침
- 🎯 진행 방향을 올바르게 바라봄

### 🌿 풍성한 수중 식물 (1,300개)
- **전경 카펫**: 800개의 짧은 잔디
- **중경 덤불**: 300개의 혼합 수초
- **후경**: 200개의 키 큰 수초
- 물결에 자연스럽게 흔들리는 애니메이션

### 🌳 유기적인 하드스케이프
- **복잡하게 얽힌 유목**: 자연스러운 곡선 구조
- **이끼 (450개+)**: 나무와 바위를 덮는 초록 이끼
- **바위**: 크고 작은 돌들

### ☀️ 햇살 효과
- **밝기 조절**: 슬라이더로 낮/밤 전환
- **Exponential 조명**: 슬라이더 끝으로 갈수록 급격히 밝아짐
- **다각도 햇살**: 메인 햇살 + 보조 조명 + 수면 반사

## 🚀 빠른 시작

### 설치
\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행
\`\`\`bash
npm run dev
\`\`\`

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드
\`\`\`bash
npm run build
\`\`\`

## 🛠️ 기술 스택

- **React 18** - UI 프레임워크
- **Three.js** - 3D 렌더링
- **@react-three/fiber** - React용 Three.js
- **@react-three/drei** - Three.js 헬퍼 컴포넌트
- **@react-three/postprocessing** - 포스트 프로세싱 효과
- **Zustand** - 상태 관리
- **Vite** - 빌드 도구
- **TailwindCSS** - UI 스타일링

## 📁 프로젝트 구조

\`\`\`
aquascape/
├── src/
│   ├── components/
│   │   ├── Scene.jsx          # 메인 3D 씬 & 조명
│   │   ├── Fish.jsx            # 물고기 모델 & 애니메이션
│   │   ├── Plants.jsx          # 수초 & 흔들림 효과
│   │   ├── Hardscape.jsx       # 유목, 바위, 이끼
│   │   ├── Aquarium.jsx        # 바닥 & Caustics
│   │   └── UI.jsx              # 밝기 조절 UI
│   ├── store.js               # Zustand 상태 관리
│   ├── App.jsx                # 메인 앱
│   └── main.jsx               # 진입점
├── package.json
└── README.md
\`\`\`

## 🎮 사용법

### 카메라 조작
- **회전**: 마우스 드래그
- **줌**: 마우스 휠
- **제한**: 팬 비활성화, 각도 제한

### 밝기 조절
- 상단 슬라이더로 조명 강도 조절
- 왼쪽: 어두운 밤 🌙
- 오른쪽: 밝은 낮 ☀️

## 🎨 커스터마이징

### 물고기 추가
`src/components/Fish.jsx`의 `fishData` 배열에 추가:
\`\`\`javascript
{ type: 'clownfish', color: '#ff8c42', stripe: '#ffffff', count: 4, speed: 1.0 }
\`\`\`

### 수초 밀도 조절
`src/components/Plants.jsx`에서 `count` 값 수정

### 조명 강도
`src/components/Scene.jsx`에서 `sunIntensity` 공식 조절

## 📝 라이선스

MIT License

## 🙏 크레딧

- Three.js 커뮤니티
- React Three Fiber 팀
- 참조 이미지로 영감을 준 아쿠아스케이프 커뮤니티

---

**Made with ❤️ using React Three Fiber**
