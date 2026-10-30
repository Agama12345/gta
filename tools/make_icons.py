#!/usr/bin/env python3
"""Przeskalowanie ikony gry (czysty Python, bez zależności).

Czyta PNG z kanałem alfa, skaluje metodą nearest-neighbour (piksel-art
zachowuje ostre krawędzie) i zapisuje zestaw rozmiarów oraz plik .ico
dla launchera systemowego.
"""
import os
import struct
import sys
import zlib

SIZES = [16, 32, 48, 64, 128, 256, 512]


def read_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', 'to nie jest PNG'
    pos = 8
    width = height = 0
    bitdepth = colortype = 0
    idat = bytearray()
    while pos < len(data):
        (length,) = struct.unpack('>I', data[pos:pos + 4])
        ctype = data[pos + 4:pos + 8]
        chunk = data[pos + 8:pos + 8 + length]
        if ctype == b'IHDR':
            width, height, bitdepth, colortype, comp, filt, inter = struct.unpack('>IIBBBBB', chunk)
            assert bitdepth == 8 and inter == 0, 'obsługiwane są tylko 8-bit PNG bez przeplotu'
        elif ctype == b'IDAT':
            idat += chunk
        elif ctype == b'IEND':
            break
        pos += 12 + length

    channels = {0: 1, 2: 3, 3: 4, 4: 2, 6: 4}[colortype]
    raw = zlib.decompress(bytes(idat))
    stride = width * channels
    out = bytearray(width * height * 4)
    prev = bytearray(stride)
    pos = 0
    for y in range(height):
        f = raw[pos]
        pos += 1
        line = bytearray(raw[pos:pos + stride])
        pos += stride
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


def scale_nearest(src, sw, sh, size):
    out = bytearray(size * size * 4)
    for y in range(size):
        sy = min(sh - 1, y * sh // size)
        for x in range(size):
            sx = min(sw - 1, x * sw // size)
            si = (sy * sw + sx) * 4
            di = (y * size + x) * 4
            out[di:di + 4] = src[si:si + 4]
    return out


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


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else '/tmp/arena-coding-uploads/ikona0.png'
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    public = os.path.join(root, 'public')
    os.makedirs(public, exist_ok=True)
    launcher_ui = os.path.join(root, 'launcher', 'ui')
    os.makedirs(launcher_ui, exist_ok=True)

    w, h, px = read_png(src)
    print(f'źródło: {w}×{h}')
    ico_images = []
    for size in SIZES:
        scaled = scale_nearest(px, w, h, size)
        name = f'icon-{size}.png'
        write_png(os.path.join(public, name), size, size, scaled)
        with open(os.path.join(launcher_ui, name), 'wb') as f:
            f.write(open(os.path.join(public, name), 'rb').read())
        if size in (16, 32, 48, 64, 128, 256):
            with open(os.path.join(public, name), 'rb') as f:
                ico_images.append((size, f.read()))
        print('  zapisano', name)
    write_png(os.path.join(public, 'favicon.png'), 32, 32, scale_nearest(px, w, h, 32))
    write_ico(os.path.join(public, 'ArcaneSpire.ico'), ico_images)
    # ikona aplikacji dla launchera (kopia .ico w katalogu launchera)
    with open(os.path.join(public, 'ArcaneSpire.ico'), 'rb') as f:
        data = f.read()
    with open(os.path.join(root, 'launcher', 'ArcaneSpire.ico'), 'wb') as f:
        f.write(data)
    print('gotowe')


if __name__ == '__main__':
    main()
