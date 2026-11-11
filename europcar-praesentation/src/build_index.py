#!/usr/bin/env python3
"""Build europcar-praesentation/index.html: welcome page + views 01-03 in one file.

Usage (from the repository root):  python3 europcar-praesentation/src/build_index.py
"""
import json, pathlib
src = pathlib.Path(__file__).resolve().parent
shell = (src / 'shell_template.html').read_text(encoding='utf-8')
pages = ['folie3_werdegang.html', 'folie4_datenfluss.html', 'folie5_bi.html']
def js(s):
    return json.dumps(s, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
marker = 'var SRC=[null,/*F3*/,/*F4*/,/*F5*/];'
assert marker in shell, 'placeholder missing in shell_template.html'
out = shell.replace(marker, 'var SRC=[null,' + ','.join(js((src / p).read_text(encoding='utf-8')) for p in pages) + '];')
(src.parent / 'index.html').write_text(out, encoding='utf-8')
print('built', src.parent / 'index.html', len(out), 'chars')
