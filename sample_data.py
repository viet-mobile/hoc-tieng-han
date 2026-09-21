# SAMPLE DATA -- structure/wiring verification only. NOT real course content.
# Every learner-facing string below is prefixed "[SAMPLE]" so it can never be mistaken for
# reviewed material. Replace CATEGORIES with real content later; keep the same shape
# (id / label / items[{id, base, ui, note}]) so build_app.py and app_logic.js need no changes.
#
# IMPORTANT -- direction is REVERSED from hoc.tieng.viet.mobile and from bahasa-indonesia/
# zhong-wen: this site's learners are Vietnamese speakers learning Korean, so
# base = 한국어 (the language being learned), ui = Tieng Viet (the explanation language).

SITE_ID = "hoc-tieng-han"
SITE_NAME = "Học tiếng Hàn"
BASE_LANG = "ko"
UI_LANG = "vi"
TTS_LOCALE = "ko-KR"

CATEGORIES = [
    {
        "id": "dialogue",
        "label": {"base": "대화", "ui": "Hội thoại"},
        "items": [
            {"id": "d1", "base": "안녕하세요.", "ui": "[SAMPLE] Xin chào.", "note": ""},
            {"id": "d2", "base": "이름이 뭐예요?", "ui": "[SAMPLE] Bạn tên là gì?", "note": ""},
            {"id": "d3", "base": "제 이름은 민수예요.", "ui": "[SAMPLE] Tôi tên là Min-su.", "note": ""},
        ],
    },
    {
        "id": "sentence",
        "label": {"base": "문장", "ui": "Câu"},
        "items": [
            {"id": "s1", "base": "저는 베트남어를 공부하고 있어요.", "ui": "[SAMPLE] Tôi đang học tiếng Việt.", "note": ""},
            {"id": "s2", "base": "오늘 날씨가 좋아요.", "ui": "[SAMPLE] Hôm nay thời tiết đẹp.", "note": ""},
        ],
    },
    {
        "id": "grammar",
        "label": {"base": "문법", "ui": "Ngữ pháp"},
        "items": [
            {"id": "g1", "base": "~고 있다", "ui": "[SAMPLE] Diễn tả hành động đang diễn ra (thì tiếp diễn)", "note": ""},
        ],
    },
    {
        "id": "vocab",
        "label": {"base": "어휘", "ui": "Từ vựng"},
        "items": [
            {"id": "v1", "base": "감사합니다", "ui": "[SAMPLE] Cảm ơn", "note": ""},
            {"id": "v2", "base": "죄송합니다", "ui": "[SAMPLE] Xin lỗi", "note": ""},
            {"id": "v3", "base": "도와주세요", "ui": "[SAMPLE] Xin hãy giúp tôi", "note": ""},
        ],
    },
    {
        "id": "culture",
        "label": {"base": "문화", "ui": "Văn hóa"},
        "items": [
            {"id": "c1", "base": "설날", "ui": "[SAMPLE] Tết Nguyên đán của Hàn Quốc", "note": ""},
        ],
    },
]
