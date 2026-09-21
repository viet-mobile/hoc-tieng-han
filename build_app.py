"""Reads sample_data.py (or, later, real *_data.py modules with the same shape) and writes
data_block.js -- the JS constant the page's inline script consumes. Mirrors the
hoc.tieng.viet.mobile build_app.py/data_block.js pattern so the two codebases stay easy to
cross-reference, but this project never imports anything from that other repo at build time
or at runtime -- it is a fully independent site.
"""
import json
from sample_data import SITE_ID, SITE_NAME, BASE_LANG, UI_LANG, TTS_LOCALE, CATEGORIES


def js_json(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


SITE_DATA = {
    "siteId": SITE_ID,
    "siteName": SITE_NAME,
    "baseLang": BASE_LANG,
    "uiLang": UI_LANG,
    "ttsLocale": TTS_LOCALE,
    "categories": CATEGORIES,
}

DATA_JS = f"const SITE_DATA = {js_json(SITE_DATA)};\n"

open("data_block.js", "w", encoding="utf-8").write(DATA_JS)
print("data block bytes:", len(DATA_JS))
