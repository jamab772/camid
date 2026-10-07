"""Genera youcan/nubepaso-youcan.html: la landing en un solo archivo HTML
para pegar en un bloque de código personalizado de YouCan.

Uso:  npm run build && python3 scripts/export-youcan.py
Requiere Playwright (preinstalado en el entorno) para renderizar la página.
"""
import glob, os, re, subprocess, sys, time, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Las imágenes se sirven desde GitHub. Cambia esta URL si las subes a YouCan u otro sitio.
IMG_BASE = os.environ.get(
    'IMG_BASE',
    'https://raw.githubusercontent.com/jamab772/camid/claude/landing-page-assets-buhwqz/public/images/',
)
OUT = os.path.join(ROOT, 'youcan', 'nubepaso-youcan.html')
PORT = 4319

# Especificidad (0,1,0): gana a los estilos de etiqueta del tema de YouCan (h2, p, img...)
# y pierde frente a las clases de Tailwind, que van después.
RESET = """
.nbp,.nbp :where(*,:before,:after){box-sizing:border-box;margin:0;padding:0;border:0 solid}
.nbp{font-family:var(--font-sans);line-height:1.5;-webkit-text-size-adjust:100%;color:var(--color-slate-700);background:var(--color-cloud)}
.nbp :where(h1,h2,h3,p,dl,dd,dt,ul,li,span,div){font-size:inherit;font-weight:inherit;color:inherit;letter-spacing:inherit;text-transform:none;line-height:inherit;font-family:inherit}
.nbp :where(ul){list-style:none}
.nbp :where(img,video,svg){display:block;vertical-align:middle;max-width:100%;height:auto}
.nbp :where(strong){font-weight:700}
"""


def unwrap_layers(css: str) -> str:
    """Quita los @layer para que los estilos no pierdan frente al tema de YouCan.
    La capa base (reset global de Tailwind) se elimina y se sustituye por RESET."""
    out, i = [], 0
    while True:
        m = re.compile(r'@layer\s+([a-z]+)\s*\{').search(css, i)
        if not m:
            out.append(css[i:])
            break
        out.append(css[i:m.start()])
        depth, j = 1, m.end()
        while depth:
            depth += {'{': 1, '}': -1}.get(css[j], 0)
            j += 1
        if m.group(1) != 'base':
            out.append(css[m.end():j - 1])
        i = j
    return ''.join(out)


def main():
    css_file = glob.glob(os.path.join(ROOT, 'dist', 'assets', '*.css'))
    if not css_file:
        sys.exit('Primero ejecuta: npm run build')
    css = unwrap_layers(open(css_file[0]).read())
    # Los @import deben ir al principio de la hoja de estilos.
    imports = ''.join(re.findall(r'@import\s*(?:"[^"]*"|url\([^)]*\))[^;]*;', css))
    css = re.sub(r'@import\s*(?:"[^"]*"|url\([^)]*\))[^;]*;', '', css)

    server = subprocess.Popen(['npx', 'vite', 'preview', '--port', str(PORT), '--strictPort'], cwd=ROOT,
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(3)
        js = r"""
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage();
await p.goto('http://localhost:%d', { waitUntil: 'networkidle' });
const html = await p.evaluate(() => {
  // El formulario de opiniones depende de Netlify: en YouCan se usan sus propias reseñas.
  for (const b of document.querySelectorAll('button')) if (b.textContent.includes('Escribe tu opinión')) b.remove();
  return document.getElementById('root').innerHTML;
});
console.log(JSON.stringify(html));
await b.close();
""" % PORT
        res = subprocess.run(['node', '--input-type=module', '-e', js], capture_output=True, text=True, check=True)
        body = json.loads(res.stdout)
    finally:
        server.terminate()

    body = body.replace('src="/images/', f'src="{IMG_BASE}').replace('poster="/images/', f'poster="{IMG_BASE}')
    # React no escribe el atributo "muted"; sin él los móviles no reproducen el vídeo automáticamente.
    body = re.sub(r'<video ', '<video muted ', body)

    html = f"""<!-- Nubepaso · landing para YouCan. Generado con scripts/export-youcan.py -->
<style>
{imports}
{RESET}
{css}
</style>
<div class="nbp">
{body}
</div>
"""
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'w').write(html)
    print(OUT, len(html) // 1024, 'KB')


if __name__ == '__main__':
    main()
