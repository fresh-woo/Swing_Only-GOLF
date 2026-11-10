import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const types = 'feat|fix|docs|style|refactor|test|build|ci|chore|perf|revert';
const subjectPattern = new RegExp(`^(${types})(\\([a-z0-9.-]+\\))?!?: \\S.*$`);
const branchPattern = new RegExp(
  `^(${types}|design)/[a-z0-9]+(?:[.-][a-z0-9]+)*$`,
);

export const validSubject = (value) =>
  typeof value === 'string' &&
  value.length <= 100 &&
  !/[\r\n]/.test(value) &&
  subjectPattern.test(value);
export const validBranch = (value) =>
  typeof value === 'string' && branchPattern.test(value);

function check() {
  if (process.argv[2] === 'commit') {
    const subject = readFileSync(process.argv[3], 'utf8').split(/\r?\n/, 1)[0];
    if (!validSubject(subject))
      throw new Error(
        '커밋 제목은 type(scope): 설명 형식, 100자 이내로 작성하세요.',
      );
    return;
  }
  if (process.argv[2] !== 'pr') throw new Error('Expected commit or pr mode.');
  if (!validSubject(process.env.PR_TITLE))
    throw new Error('PR 제목의 Conventional Commits 형식을 확인하세요.');
  if (!validBranch(process.env.PR_BRANCH))
    throw new Error(
      '브랜치는 feat/name, fix/name, design/name, chore/name 등의 형식으로 만드세요.',
    );
  const { PR_BASE_SHA: base, PR_HEAD_SHA: head } = process.env;
  if (![base, head].every((sha) => /^[a-f0-9]{40}$/.test(sha || '')))
    throw new Error('Invalid PR commit range.');
  const subjects = execFileSync(
    'git',
    ['log', `${base}..${head}`, '--format=%s'],
    { encoding: 'utf8' },
  )
    .trim()
    .split('\n');
  if (!subjects.every(validSubject))
    throw new Error(
      'PR에 포함된 모든 커밋 제목이 Conventional Commits 형식이어야 합니다.',
    );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    check();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
