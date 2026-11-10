# Swing Only Golf

노트북 카메라의 빈손 스윙 분석을 골프 게임으로 연결하는 프로젝트입니다.

우선 분석은 양쪽 팔꿈치 굽힘·펴짐, 어깨 위치, 몸통·골반 사용, 머리 움직임입니다.
현재 화면은 배포 연결 확인용이며 카메라·스윙 분석·게임은 아직 구현하지 않았습니다.

## 실행

Node.js 24와 npm 11을 사용합니다.

```sh
npm ci
npm run setup:hooks
npm run dev
```

개발 주소: http://localhost:5173/Swing_Only-GOLF/

```sh
npm run check
npm run preview
```

빌드 미리보기: http://localhost:4173/Swing_Only-GOLF/

## 함께 작업하기

- [제품 기준](PRODUCT.md)
- [Git·커밋·PR 규칙](CONTRIBUTING.md)
- [배포와 복구](docs/DEPLOYMENT.md)
- [개발자 채팅 지시문](docs/DEVELOPER_HANDOFF.md)
- [디자인 채팅 지시문](docs/DESIGN_HANDOFF.md)
- [디자인 작업 범위](DESIGN.md)
- [공유 프로젝트 홈](https://app.notion.com/p/4141b5ca85c080cd953dd29f867e87c5)

기준 흐름은 작업 브랜치 → PR → 검사 → squash 병합 → Pages 배포입니다.
배포 목표 주소: https://fresh-woo.github.io/Swing_Only-GOLF/
GitHub Actions와 Pages 설정의 실제 성공 여부는 배포 기록을 확인합니다.
