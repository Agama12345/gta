#!/usr/bin/env python3
"""Generator ikon (czysty Python, bez zależności).

Dwa źródła piksel-artu:
  * launcher/assets/game-source.png      -> ikona GRY (public/icon-*.png, favicon)
  * launcher/assets/launcher-source.png  -> ikona LAUNCHERA (launcher/ui/*, .ico, C#)

Skalowanie: nearest-neighbour (piksele zostają ostre). Ikona launchera jest
doklejana na ciemną, zaokrągloną płytkę, żeby czytelnie wyglądała na pasku
zadań i w Eksploratorze.

Uzycie:  python3 tools/make_icons.py  [--only game|launcher]
"""
import os
import struct
import sys
import zlib

SIZES = [16, 32, 48, 64, 128, 256, 512]
ICO_SIZES = [16, 32, 48, 64, 128, 256]

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# kolory płytki launchera (fiolet / grafit)
PLATE_TOP = (36, 26, 54)
PLATE_BOTTOM = (20, 16, 30)
PLATE_EDGE = (168, 107, 240)


# ------------------------------------------------------------------ PNG
def read_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', 'to nie jest PNG'
    pos = 8
    width = height = 0
    bitdepth = colortype = 0
    idat = bytearray()
    palette = b''
    trns = b''
    while pos < len(data):
        (length,) = struct.unpack('>I', data[pos:pos + 4])
        ctype = data[pos + 4:pos + 8]
        chunk = data[pos + 8:pos + 8 + length]
        if ctype == b'IHDR':
            width, height, bitdepth, colortype, comp, filt, inter = struct.unpack('>IIBBBBB', chunk)
            assert bitdepth == 8 and inter == 0, 'obsługiwane są tylko 8-bit PNG bez przeplotu'
        elif ctype == b'IDAT':
            idat += chunk
        elif ctype == b'PLTE':
            palette = chunk
        elif ctype == b'tRNS':
            trns = chunk
        elif ctype == b'IEND':
            break
        pos += 12 + length

    raw = zlib.decompress(bytes(idat))

    if colortype == 3:
        channels = 1
        stride = width
        out = bytearray(width * height * 4)
        prev = bytearray(stride)
        pos = 0
        for y in range(height):
            f = raw[pos]
            pos += 1
            line = bytearray(raw[pos:pos + stride])
            pos += stride
            line = _unfilter(f, line, prev, channels)
            for x in range(width):
                pi = line[x] * 3
                o = (y * width + x) * 4
                out[o:o + 3] = palette[pi:pi + 3]
                out[o + 3] = trns[line[x]] if line[x] < len(trns) else 255
            prev = line
        return width, height, out

    channels = {0: 1, 2: 3, 4: 2, 6: 4}[colortype]
    stride = width * channels
    out = bytearray(width * height * 4)
    prev = bytearray(stride)
    pos = 0
    for y in range(height):
        f = raw[pos]
        pos += 1
        line = bytearray(raw[pos:pos + stride])
        pos += stride
        line = _unfilter(f, line, prev, channels)
        for x in range(width):
            o = (y * width + x) * 4
            if channels == 4:
                out[o:o + 4] = line[x * 4:x * 4 + 4]
            elif channels == 3:
                out[o:o + 3] = line[x * 3:x * 3 + 3]
                out[o + 3] = 255
            elif channels == 2:
                out[o] = out[o + 1] = out[o + 2] = line[x * 2]
                out[o + 3] = line[x * 2 + 1]
            else:
                out[o] = out[o + 1] = out[o + 2] = line[x]
                out[o + 3] = 255
        prev = line
    return width, height, out


def _unfilter(f, line, prev, channels):
    stride = len(line)
    if f == 1:
        for i in range(channels, stride):
            line[i] = (line[i] + line[i - channels]) & 0xFF
    elif f == 2:
        for i in range(stride):
            line[i] = (line[i] + prev[i]) & 0xFF
    elif f == 3:
        for i in range(stride):
            a = line[i - channels] if i >= channels else 0
            line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xFF
    elif f == 4:
        for i in range(stride):
            a = line[i - channels] if i >= channels else 0
            b = prev[i]
            c = prev[i - channels] if i >= channels else 0
            p = a + b - c
            pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
            pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
            line[i] = (line[i] + pr) & 0xFF
    return line


def write_png(path, width, height, pixels):
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        raw += pixels[y * width * 4:(y + 1) * width * 4]

    def chunk(ctype, payload):
        return (struct.pack('>I', len(payload)) + ctype + payload
                + struct.pack('>I', zlib.crc32(ctype + payload) & 0xFFFFFFFF))

    hdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR', hdr))
        f.write(chunk(b'IDAT', zlib.compress(bytes(raw), 9)))
        f.write(chunk(b'IEND', b''))


def write_ico(path, images):
    """ICO z osadzonymi PNG (Windows Vista i nowsze)."""
    count = len(images)
    header = struct.pack('<HHH', 0, 1, count)
    entries = bytearray()
    payload = bytearray()
    offset = 6 + 16 * count
    for size, data in images:
        entries += struct.pack('<BBBBHHII', size % 256, size % 256, 0, 0, 1, 32, len(data), offset)
        payload += data
        offset += len(data)
    with open(path, 'wb') as f:
        f.write(header + entries + payload)


# --------------------------------------------------------------- skalowanie
def scale_nearest(src, sw, sh, size):
    out = bytearray(size * size * 4)
    for y in range(size):
        sy = min(sh - 1, y * sh // size)
        row = sy * sw
        for x in range(size):
            sx = min(sw - 1, x * sw // size)
            si = (row + sx) * 4
            di = (y * size + x) * 4
            out[di:di + 4] = src[si:si + 4]
    return out


def compose_launcher_icon(src, sw, sh, size):
    """Piksel-art na ciemnej, zaokrąglonej płytce — czytelny w każdym rozmiarze."""
    out = bytearray(size * size * 4)
    radius = max(2.0, size * 0.22)
    for y in range(size):
        t = y / max(1, size - 1)
        base = [int(PLATE_TOP[i] + (PLATE_BOTTOM[i] - PLATE_TOP[i]) * t) for i in range(3)]
        for x in range(size):
            # odległość od zaokrąglonego narożnika
            dx = 0.0
            dy = 0.0
            if x < radius:
                dx = radius - x
            elif x > size - 1 - radius:
                dx = x - (size - 1 - radius)
            if y < radius:
                dy = radius - y
            elif y > size - 1 - radius:
                dy = y - (size - 1 - radius)
            dist = (dx * dx + dy * dy) ** 0.5
            alpha = 1.0
            if dist > radius:
                alpha = 0.0
            elif dist > radius - 1.0:
                alpha = radius - dist
            o = (y * size + x) * 4
            if alpha <= 0:
                continue
            r, g, b = base
            # delikatna fioletowa obwódka
            if dist > radius - 1.6 and size >= 32:
                r, g, b = PLATE_EDGE
            out[o] = r
            out[o + 1] = g
            out[o + 2] = b
            out[o + 3] = int(255 * alpha)

    inner = max(8, int(size * 0.80))
    art = scale_nearest(src, sw, sh, inner)
    off = (size - inner) // 2
    for y in range(inner):
        for x in range(inner):
            si = (y * inner + x) * 4
            a = art[si + 3]
            if a == 0:
                continue
            di = ((y + off) * size + (x + off)) * 4
            inv = 255 - a
            out[di] = (art[si] * a + out[di] * inv) // 255
            out[di + 1] = (art[si + 1] * a + out[di + 1] * inv) // 255
            out[di + 2] = (art[si + 2] * a + out[di + 2] * inv) // 255
            out[di + 3] = 255
    return out


# ------------------------------------------------------------------ główne
def build_game_icon():
    src_path = os.path.join(ROOT, 'launcher', 'assets', 'game-source.png')
    if not os.path.exists(src_path):
        print('pomijam ikonę gry: brak', src_path)
        return
    public = os.path.join(ROOT, 'public')
    os.makedirs(public, exist_ok=True)
    w, h, px = read_png(src_path)
    print(f'ikona gry: {w}×{h}')
    for size in SIZES:
        data = scale_nearest(px, w, h, size)
        write_png(os.path.join(public, f'icon-{size}.png'), size, size, data)
    write_png(os.path.join(public, 'favicon.png'), 32, 32, scale_nearest(px, w, h, 32))
    print('  zapisano', ', '.join(f'icon-{s}.png' for s in SIZES))


def build_launcher_icon():
    src_path = os.path.join(ROOT, 'launcher', 'assets', 'launcher-source.png')
    if not os.path.exists(src_path):
        print('pomijam ikonę launchera: brak', src_path)
        return
    w, h, px = read_png(src_path)
    print(f'ikona launchera: {w}×{h}')

    out_dirs = [
        os.path.join(ROOT, 'launcher', 'ui'),
        os.path.join(ROOT, 'launcher', 'src', 'Resources'),
    ]
    for d in out_dirs:
        os.makedirs(d, exist_ok=True)

    ico_images = []
    for size in SIZES:
        data = compose_launcher_icon(px, w, h, size)
        for d in out_dirs:
            name = 'app.png' if size == 512 else f'icon-{size}.png'
            write_png(os.path.join(d, name), size, size, data)
        # kopia do public (podgląd / strona)
        write_png(os.path.join(ROOT, 'public', f'launcher-icon-{size}.png'), size, size, data)
        if size in ICO_SIZES:
            with open(os.path.join(out_dirs[0], f'icon-{size}.png'), 'rb') as f:
                ico_images.append((size, f.read()))

    ico_paths = [
        os.path.join(ROOT, 'launcher', 'ArcaneSpire.ico'),
        os.path.join(ROOT, 'launcher', 'src', 'app.ico'),
    ]
    for p in ico_paths:
        write_ico(p, ico_images)
    print('  zapisano', ', '.join(f'icon-{s}.png' for s in SIZES), '+ .ico')


def main():
    only = None
    if '--only' in sys.argv:
        idx = sys.argv.index('--only')
        if idx + 1 < len(sys.argv):
            only = sys.argv[idx + 1]
    if only in (None, 'game'):
        build_game_icon()
    if only in (None, 'launcher'):
        build_launcher_icon()
    print('gotowe')


if __name__ == '__main__':
    main()
