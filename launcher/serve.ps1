# Arcane Spire — lokalny serwer plików gry.
# Uruchamiany w ukrytym procesie przez launcher; obsługuje tylko pętlę zwrotną.
param(
  [int]$Port = 4173,
  [string]$Root = '.'
)

$ErrorActionPreference = 'Continue'

try {
  $Root = (Resolve-Path -LiteralPath $Root).Path
} catch {
  exit 2
}

$Mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.htm'  = 'text/html; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.mjs'  = 'application/javascript; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.webp' = 'image/webp'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.woff' = 'font/woff'
  '.woff2' = 'font/woff2'
  '.ttf'  = 'font/ttf'
  '.otf'  = 'font/otf'
  '.wasm' = 'application/wasm'
  '.mp3'  = 'audio/mpeg'
  '.ogg'  = 'audio/ogg'
  '.wav'  = 'audio/wav'
  '.webm' = 'video/webm'
  '.mp4'  = 'video/mp4'
  '.txt'  = 'text/plain; charset=utf-8'
  '.map'  = 'application/json; charset=utf-8'
  '.glb'  = 'model/gltf-binary'
  '.gltf' = 'model/gltf+json'
}

function Send-Bytes {
  param($Stream, [string]$Head, [byte[]]$Body)
  $headBytes = [System.Text.Encoding]::ASCII.GetBytes($Head)
  $Stream.Write($headBytes, 0, $headBytes.Length)
  if ($Body -ne $null -and $Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
}

function Send-Status {
  param($Stream, [int]$Code, [string]$Text, [string]$Message)
  $body = [System.Text.Encoding]::UTF8.GetBytes($Message)
  $head = "HTTP/1.1 $Code $Text`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
  Send-Bytes -Stream $Stream -Head $head -Body $body
}

$listener = $null
try {
  $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $Port)
  $listener.Start()
} catch {
  exit 1
}

while ($true) {
  $client = $null
  try {
    $client = $listener.AcceptTcpClient()
    $client.ReceiveTimeout = 8000
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)

    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrEmpty($requestLine)) {
      $client.Close()
      continue
    }
    while ($true) {
      $line = $reader.ReadLine()
      if ([string]::IsNullOrEmpty($line)) { break }
    }

    $parts = $requestLine.Split(' ')
    $rawPath = '/'
    if ($parts.Length -ge 2) { $rawPath = $parts[1] }

    $clean = $rawPath.Split('?')[0]
    $clean = [System.Uri]::UnescapeDataString($clean)
    $rel = $clean.TrimStart('/')
    if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }
    $rel = $rel -replace '/', [System.IO.Path]::DirectorySeparatorChar

    $full = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $rel))
    if (-not $full.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
      Send-Status -Stream $stream -Code 403 -Text 'Forbidden' -Message 'Brak dostepu'
      $client.Close()
      continue
    }

    if (Test-Path -LiteralPath $full -PathType Container) {
      $full = [System.IO.Path]::Combine($full, 'index.html')
    }

    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
      Send-Status -Stream $stream -Code 404 -Text 'Not Found' -Message 'Nie znaleziono pliku'
      $client.Close()
      continue
    }

    $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
    $type = 'application/octet-stream'
    if ($Mime.ContainsKey($ext)) { $type = $Mime[$ext] }

    $bytes = [System.IO.File]::ReadAllBytes($full)
    $cache = 'no-store'
    if ($ext -ne '.html') { $cache = 'max-age=300' }
    $head = "HTTP/1.1 200 OK`r`nContent-Type: $type`r`nContent-Length: $($bytes.Length)`r`nCache-Control: $cache`r`nConnection: close`r`n`r`n"
    Send-Bytes -Stream $stream -Head $head -Body $bytes
    $client.Close()
  } catch {
    if ($client -ne $null) {
      try { $client.Close() } catch { }
    }
  }
}
