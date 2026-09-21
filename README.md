# Học tiếng Hàn (hoc-tieng-han)

베트남어 사용자를 위한 한국어 학습 사이트 (모바일 우선, 독립 프로젝트).

**방향이 반대입니다**: `hoc.tieng.viet.mobile`은 한국어 사용자 → 베트남어 학습 방향이지만,
이 프로젝트(`hoc.tieng.han.viet.mobile`)는 **베트남어 사용자 → 한국어 학습** 방향입니다.
그래서 UI/설명 언어를 한국어가 아니라 **베트남어**로 설계했습니다(탭 이름, 검색창, 빈 결과
문구, 복습 안내 문구 등 모든 UI 크롬 텍스트가 베트남어).

이 프로젝트는 `hoc.tieng.viet.mobile`의 검증된 UI/빌드 패턴(디자인 토큰, 모바일 우선
반응형 레이아웃, TTS, 카드 UI, PWA 구조)을 참고해 새로 작성한 **완전히 독립된** 프로젝트입니다.
런타임에 그 프로젝트의 데이터나 코드를 참조하지 않습니다. 기존 한국어 자료를 그대로 복사하지
않았고, 베트남어 UI/자료를 대량으로 자동 생성하지도 않았습니다(전부 `[SAMPLE]` 표시된
최소 예시).

## 대상 학습자
베트남어를 사용하는, 한국어를 배우고 싶은 사람.

## 기본 학습 언어
한국어 (`base`) — 기본 UI/설명 언어: **Tiếng Việt** (`ui`)

## 현재 상태 — SAMPLE 데이터
`sample_data.py`의 모든 학습 항목은 `[SAMPLE]` 표시가 붙은 **구조 검증용 예시**입니다.
실제 콘텐츠가 아닙니다. `base`=한국어, `ui`=베트남어 방향을 그대로 유지한 채 실제 콘텐츠로
교체/확장하면 됩니다.

## 로컬 실행 / 빌드 방법

```bash
python build_app.py     # sample_data.py -> data_block.js 생성
python assemble_app.py  # template.html + app_logic.js + data_block.js -> dist/index.html 생성
```

`dist/` 폴더가 배포 결과물입니다.

## 주요 파일
- `template.html` — `lang="vi"`, base 텍스트는 한국어 폰트(Noto Sans KR), UI/설명 텍스트는
  베트남어 폰트(Be Vietnam Pro)로 분리 지정
- `app_logic.js` — 탭/검색/복습/TTS 안내 문구가 전부 베트남어(예: "Tìm kiếm", "Không có kết quả.")
- `sample_data.py` — category label의 `ui` 필드가 베트남어("Hội thoại", "Câu", "Ngữ pháp" 등)
- `build_app.py`, `assemble_app.py` — 다른 두 사이트와 동일한 구조
- `manifest.webmanifest` — name: "Học tiếng Hàn", short_name: "Tiếng Hàn"
- `sw.js` — cache name: `hoc-tieng-han-cache-v1`
- `assets/icon-192.png`, `assets/icon-512.png` — **플레이스홀더 아이콘**(실제 브랜드 아이콘으로 교체 필요)

## TTS
**`ko-KR`** 고정.

## localStorage
prefix: **`kh-app-`** (예: `kh-app-last-tab`)로 결정했습니다. `ht-app-`도 검토했으나
어느 쪽도 기존 `vn-app-`/`bi-app-`/`zw-app-`와 충돌하지 않아, 이번 세 사이트 접두사
(`bi-`, `zw-`)와 함께 두 글자 약어로 일관되게 맞추기 위해 `kh-app-`(Korean-Hoc)을 선택했습니다.

## Cloudflare Pages 설정
- Framework preset: `None`
- Production branch: `main`
- Build command: `python build_app.py && python assemble_app.py`
- Build output directory: `dist`
- Root directory: `/`
- Environment variables: 없음
- Custom domain: `hoc.tieng.han.viet.mobile`

추후 `han.viet.mobile` → `hoc.tieng.han.viet.mobile` 301 redirect는 Cloudflare에서 별도 설정 예정
(이 저장소 코드에는 redirect 로직 없음).

## 참고 — 삭제된 이전 폴더
작업 시작 시 상위 폴더에 있던 `hoc-tieng-han-viet-mobile`(별도 git 저장소, 단순 정적
랜딩 페이지, canonical이 동일하게 `https://hoc.tieng.han.viet.mobile/`로 설정되어 있었음)은
사용자 확인 후 삭제하고 이 프로젝트로 대체했습니다.
