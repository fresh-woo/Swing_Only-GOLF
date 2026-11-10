# 배포·환경·복구

## 초기 배포

- 프런트엔드: GitHub Pages, 저장소의 공개 범위에 맞는 공개 HTTPS 주소.
- 목표 주소: https://fresh-woo.github.io/Swing_Only-GOLF/
- 런타임: Node.js 24 / npm 11. 빌드 결과는 `dist/`.
- Vite base: `/Swing_Only-GOLF/`. 모델·WASM·이미지 URL도 이 하위 경로를 고려한다.
- 연결 화면은 배포 검증용이다. 현재 스윙 분석·게임·계정·멀티플레이 기능은 없다.

## 배포 흐름

작업 브랜치 → PR 검사 → squash 병합 → main의 `Deploy Pages` → 설치·검사·빌드 → artifact → `github-pages` 환경 배포.
수동 실행도 main에서만 배포한다. 환경의 배포 허용 브랜치는 main으로 제한한다.
배포 job만 `pages: write`, `id-token: write`를 받는다. 개인 액세스 토큰이나 호스팅 비밀키는 필요하지 않다.
실행 중인 배포는 중간 취소하지 않고 순서대로 처리한다.

Actions의 성공, Pages의 실제 URL 응답, 화면의 배포 커밋을 함께 확인한다.
PR 검사 통과는 배포 성공이나 실제 카메라 분석 검증을 의미하지 않는다.

## 로컬과 PR 확인

`npm run dev`: 개발 서버. `npm run build` 뒤 `npm run preview`: 빌드 결과의 로컬 미리보기.
PR의 `Quality` job은 7일 보관 artifact를 올린다. 이것은 다운로드 가능한 빌드이며 PR별 공개 미리보기 URL은 아니다.
필요할 때 별도의 미리보기 호스팅을 선택하며, 계정·비용·공개 범위를 확인한다.

## 비밀값과 카메라

초기 앱에는 필수 환경변수가 없다. `VITE_COMMIT_SHA`는 CI가 주입하는 공개 버전 표시다.
`VITE_` 환경변수는 브라우저 코드에 포함되므로 비밀값을 넣지 않는다.
향후 API 비밀키는 별도 서버의 환경변수로 관리한다.
카메라는 HTTPS 또는 브라우저가 허용하는 localhost 환경에서 사용한다.
기본 설계는 영상의 기기 내 처리다. 실제 구현·네트워크 동작을 검증하기 전 개인정보 처리 완료를 주장하지 않는다.

## 온라인 서버 확장

GitHub Pages는 정적 프런트엔드이며 Colyseus/WebSocket 서버를 실행하지 않는다.
2인 온라인 개발 단계에서 서버 호스팅·주소·CORS·연결 복구·로그 정책을 별도 PR로 구성한다.
현재 서버, 도메인 구매, 유료 서비스 결제는 없다.

## 장애·복구

1. Actions에서 실패 job을 확인하고 재현 가능한 로그를 남긴다. 인증 헤더나 비밀값을 공유하지 않는다.
2. 일시적 외부 실패는 원인을 확인한 뒤 해당 run을 재실행한다.
3. 코드 문제라면 수정 PR 또는 문제 커밋을 되돌리는 revert PR을 만든다.
4. 동일 검사 후 main에 병합하면 이전 동작으로 재배포된다. 강제 push로 이력을 바꾸지 않는다.
5. 성공한 run과 배포 화면 버전을 기록한다.

## 관리 설정 확인 링크

- [Actions](https://github.com/fresh-woo/Swing_Only-GOLF/actions)
- [Pages 설정](https://github.com/fresh-woo/Swing_Only-GOLF/settings/pages)
- [main 보호](https://github.com/fresh-woo/Swing_Only-GOLF/settings/branches)
- [배포 환경](https://github.com/fresh-woo/Swing_Only-GOLF/settings/environments)

관리 설정과 텍스트 지침의 실제 일치 여부는 GitHub에서 확인한다. 저장소 설정을 바꾸면 이 문서와 Notion 운영 기록을 함께 갱신한다.
