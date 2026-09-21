from pathlib import Path
import shutil

tpl = open("template.html", encoding="utf-8").read()
data_js = open("data_block.js", encoding="utf-8").read()
app_js = open("app_logic.js", encoding="utf-8").read()
out = tpl.replace("__DATA_JS__", data_js, 1)
out = out.replace("__APP_JS__", app_js, 1)

# Cloudflare Pages deploys only dist/ -- keep source files out of the public output,
# mirroring hoc.tieng.viet.mobile's assemble_app.py.
dist_dir = Path("dist")
dist_dir.mkdir(exist_ok=True)
(dist_dir / "index.html").write_text(out, encoding="utf-8")
shutil.copyfile("manifest.webmanifest", dist_dir / "manifest.webmanifest")
shutil.copyfile("sw.js", dist_dir / "sw.js")
shutil.copytree("assets", dist_dir / "assets", dirs_exist_ok=True)

print("dist/index.html bytes:", len(out))
