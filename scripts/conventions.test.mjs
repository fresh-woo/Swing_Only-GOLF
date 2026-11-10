import test from 'node:test';
import assert from 'node:assert/strict';
import { validSubject, validBranch } from './check-conventions.mjs';

test('accepts scoped, breaking, and Korean conventional subjects', () => {
  for (const value of [
    'feat(camera): 팔꿈치 각도 표시',
    'docs: 개발 가이드',
    'fix!: change output',
    'refactor(pose)!: simplify',
  ])
    assert.ok(validSubject(value), value);
});
test('rejects missing descriptions, invalid types, multiline, and long titles', () => {
  for (const value of [
    '',
    'update: stuff',
    'feat:',
    'feat:  ',
    'feat: hello\nfix: other',
    `feat: ${'a'.repeat(100)}`,
    undefined,
  ])
    assert.equal(validSubject(value), false);
});
test('branch conventions separate roles and reject main and shell-like text', () => {
  for (const value of [
    'feat/camera-overlay',
    'design/analysis-screen',
    'chore/project-foundation',
    'fix/head-track',
  ])
    assert.ok(validBranch(value), value);
  for (const value of [
    'main',
    'dev',
    'feat/',
    'feat/a b',
    'feat/x;echo',
    undefined,
  ])
    assert.equal(validBranch(value), false);
});
