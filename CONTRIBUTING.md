# 개발·커밋·PR 규칙

## 시작

```sh
git fetch origin
git status --short --branch
git switch main
git pull --ff-only
git switch -c feat/camera-overlay
npm ci
npm run setup:hooks
npm run dev
```

위 브랜치 전환은 현재 checkout을 혼자 쓰고 작업이 깨끗할 때 수행한다.
여러 채팅이 함께 작업하면 독립 worktree를 사용한다. 다른 작업의 변경을 삭제·stash·reset하지 않는다.
Git 인증은 본인의 기존 GitHub 로그인을 사용한다. 토큰을 코드나 `.env` 예시에 넣지 않는다.

## 브랜치

`main`은 배포 가능한 기준이다. 장기 `develop` 브랜치는 만들지 않는다.

| 목적   | 예                         |
| ------ | -------------------------- |
| 기능   | `feat/camera-overlay`      |
| 버그   | `fix/head-marker`          |
| 디자인 | `design/analysis-screen`   |
| 문서   | `docs/camera-guide`        |
| 환경   | `chore/project-foundation` |

`refactor/`, `test/`, `build/`, `ci/`, `perf/`, `style/`, `revert/`도 허용한다.
이름은 소문자 영문·숫자와 `-`, `.`를 사용한다. 병합 뒤 원격 작업 브랜치는 자동 삭제한다.

## 커밋과 PR 제목

```text
type(scope): 설명
feat(camera): 좌우 팔꿈치 관찰값 표시
fix(pose): 골반 미검출 상태 분리
docs(design): 분석 화면 상태 정의
ci: add pull request checks
```

허용 type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, `revert`.
scope는 선택이다. 제목은 100자 이내, 설명은 한글도 가능하다. 관련 변경끼리 커밋한다.
PR의 모든 커밋과 PR 제목을 CI에서 검사한다. 로컬 commit-msg 훅은 `npm run setup:hooks` 후 적용된다.
훅을 설치하지 않은 다른 checkout도 CI가 검사한다.

## PR 작성과 병합

1. `npm run check`를 실행한다.
2. `git push -u origin feat/camera-overlay`로 작업 브랜치를 올린다.
3. GitHub의 Compare & pull request에서 base `main`으로 PR을 만든다. 작성 중에는 Draft를 사용한다.
4. 기본 템플릿에 문제·변경 결과·검증·남은 한계를 적는다. UI 변경은 캡처, 카메라 변경은 입력 종류·기기·가림 조건을 포함한다.
5. `Quality`, `PR conventions` 성공과 대화 해결을 확인한다. base가 바뀌면 최신 `main`을 작업 브랜치에 반영한다.
6. 사용자의 세션 지시·담당 범위에 따라 검토한 뒤 squash 병합한다. PR 제목이 최종 커밋 제목이 된다.

저장소 보호는 PR·필수 검사·최신 base·선형 이력·대화 해결을 요구하는 구성이다.
main 강제 push와 삭제는 금지한다. 초기 빈 저장소의 첫 커밋은 예외였다.
초기 참여 계정은 한 명이므로 사람의 승인 1개를 강제하지 않는다. AI 채팅 둘은 독립된 GitHub 리뷰어 두 명이 아니다.
실제 협업 계정이 추가되면 승인 수와 CODEOWNERS를 함께 조정한다.

## 검사

`npm run check`: Prettier 형식 → TypeScript 타입 → Node 기본 테스트 → Vite 빌드.
새로운 계산·분기에는 의미 있는 작은 테스트를 추가한다. 사용자 영상·실제 기기 검증은 단위 테스트로 대체하지 않는다.
`npm run format`은 형식을 수정한다. package-lock을 커밋하고 CI와 새 checkout은 `npm ci`를 사용한다.

PR 빌드는 Actions의 `pr-build-실행번호` artifact에서 7일 동안 다운로드할 수 있다.
다운로드 후 로컬 정적 서버에서 확인한다. PR별 온라인 미리보기 URL은 현재 제공하지 않는다.

## 결정 기록

사용자 요구·채택 결정은 Notion에, 실행 방법·구현 제약·검사는 저장소에 기록한다.
문서가 충돌하면 사실과 변경 근거를 먼저 확인하고 관련 부분만 갱신한다.
