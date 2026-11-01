#!/usr/bin/env python3
"""Pakuje .gltf + .bin w jeden plik .glb (tekstury zostają obok, jako PNG).

Po co: przeglądarka pobiera wtedy jeden plik z geometrią zamiast dwóch, a loader
nie zgaduje już ścieżek względnych do `.bin`. Obrazki zostają osobnymi plikami,
bo atlas często dzielą dziesiątki modeli — kopiowanie go do każdego .glb
zwiększyłoby paczkę gry o megabajty.

    python3 tools/pack_gltf.py public/assets/models/props
    python3 tools/pack_gltf.py public/assets/models/props --keep-sources
"""
import base64
import json
import os
import struct
import sys

GLB_MAGIC = 0x46546C67
CHUNK_JSON = 0x4E4F534A
CHUNK_BIN = 0x004E4942


def _pad(data: bytes, fill: bytes = b"\x00") -> bytes:
    return data + fill * ((4 - len(data) % 4) % 4)


def _read_uri(base: str, uri: str) -> bytes:
    if uri.startswith("data:"):
        return base64.b64decode(uri.split(",", 1)[1])
    with open(os.path.join(base, uri), "rb") as fh:
        return fh.read()


def pack(gltf_path: str) -> str:
    base = os.path.dirname(gltf_path)
    with open(gltf_path, "r", encoding="utf-8") as fh:
        doc = json.load(fh)

    blob = bytearray()
    buffers = doc.get("buffers", [])
    buffer_views = doc.get("bufferViews", [])
    accessors = doc.get("accessors", [])

    # jeden wspólny bufor: dopisujemy kolejne pliki .bin i przesuwamy offsety
    offsets = {}
    for index, buff in enumerate(buffers):
        uri = buff.get("uri")
        if not uri:
            offsets[index] = 0
            continue
        data = _read_uri(base, uri)
        while len(blob) % 4:
            blob.append(0)
        offsets[index] = len(blob)
        blob.extend(data)
        buff.pop("uri", None)
        buff["byteLength"] = len(data)

    for view in buffer_views:
        src = view.get("buffer", 0)
        view["byteOffset"] = view.get("byteOffset", 0) + offsets.get(src, 0)
        view["buffer"] = 0
    for accessor in accessors:
        src = accessor.get("buffer")
        if src is not None:
            accessor["byteOffset"] = accessor.get("byteOffset", 0) + offsets.get(src, 0)
            accessor["buffer"] = 0

    doc["buffers"] = [{"byteLength": len(blob)}] if blob else []
    if not blob:
        buffer_views.clear()
        doc.pop("bufferViews", None)

    json_chunk = _pad(json.dumps(doc, separators=(",", ":")).encode("utf-8"), b" ")
    bin_chunk = _pad(bytes(blob))
    total = 12 + 8 + len(json_chunk) + (8 + len(bin_chunk) if bin_chunk else 0)
    out = bytearray()
    out += struct.pack("<III", GLB_MAGIC, 2, total)
    out += struct.pack("<II", len(json_chunk), CHUNK_JSON)
    out += json_chunk
    if bin_chunk:
        out += struct.pack("<II", len(bin_chunk), CHUNK_BIN)
        out += bin_chunk

    glb_path = gltf_path[:-5] + ".glb"
    with open(glb_path, "wb") as fh:
        fh.write(bytes(out))
    return glb_path


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    folder = argv[1]
    keep = "--keep-sources" in argv
    converted = 0
    for name in sorted(os.listdir(folder)):
        if not name.endswith(".gltf"):
            continue
        path = os.path.join(folder, name)
        try:
            out = pack(path)
        except Exception as err:  # noqa: BLE001 — raportujemy i idziemy dalej
            print(f"  ! {name}: {err}")
            continue
        print(f"  {name} -> {os.path.basename(out)} ({os.path.getsize(out) // 1024} kB)")
        converted += 1
        if not keep:
            os.remove(path)
            bin_name = name[:-5] + ".bin"
            bin_path = os.path.join(folder, bin_name)
            if os.path.exists(bin_path):
                os.remove(bin_path)
    print(f"spakowano {converted} plików")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
