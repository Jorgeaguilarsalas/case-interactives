#!/usr/bin/env python3
"""Builds the combined presentation: start page + five views in one self-contained HTML file.
people_src.html / europcar_src.html get base.css and engine.js inlined at their markers."""
import json, pathlib, sys
here = pathlib.Path(__file__).parent
out_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here / 'Europcar_Praesentation.html'
shell = (here / 'shell_template.html').read_text(encoding='utf-8')
css = (here / 'base.css').read_text(encoding='utf-8')
eng = (here / 'engine.js').read_text(encoding='utf-8')
def page(name):
    s = (here / name).read_text(encoding='utf-8')
    if '/*BASE_CSS*/' in s:
        s = s.replace('/*BASE_CSS*/', css).replace('<script>/*ENGINE_JS*/</script>', '<script>\n' + eng + '</script>')
    return s
pages = ['folie3_werdegang.html', 'people_src.html', 'folie4_datenfluss.html', 'folie5_bi.html', 'europcar_src.html']
def js(s):
    return json.dumps(s, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
marker = 'var SRC=[null,/*P1*/,/*P2*/,/*P3*/,/*P4*/,/*P5*/];'
assert marker in shell
out = shell.replace(marker, 'var SRC=[null,' + ','.join(js(page(p)) for p in pages) + '];')
out_path.write_text(out, encoding='utf-8')
# standalone copies of the two new views (for Drive / direct opening)
for p, n in [('people_src.html', 'people_management.html'), ('europcar_src.html', 'mein_beitrag_europcar.html')]:
    (out_path.parent / n).write_text(page(p), encoding='utf-8') if len(sys.argv) <= 1 else None
print('ok', out_path, len(out))
