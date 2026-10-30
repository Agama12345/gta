// Ikony SVG rysowane wektorowo — niezależne od czcionek i systemu.

const ICONS = {
  sword: '<path d="M19 4.5l-8.5 10.5-2 2-2-2 2-2L19 4.5z"/><path d="M15.5 8l2 2"/><path d="M6.5 16.5L4 19"/>',
  axe: '<path d="M13 4c4.5 0 7 2.5 7 5.5S17.5 15 13 15z"/><path d="M13 15l-1 5"/><path d="M11.5 3.5v17"/>',
  bow: '<path d="M6 4c6.5 4.5 6.5 11.5 0 16"/><path d="M6 4l13 16"/><path d="M15.5 9.5l3.5-1"/>',
  armor: '<path d="M8.5 4.5L12 6l3.5-1.5L19 8l-2 12H7L5 8z"/><path d="M10 11.5h4"/>',
  helm: '<path d="M5 13a7 7 0 0 1 14 0v4.5H5z"/><path d="M9.5 17.5v-4M14.5 17.5v-4"/>',
  amulet: '<circle cx="12" cy="15.5" r="3.8"/><path d="M5.5 4.5c2.2 3.2 4 4.4 6.5 4.4s4.3-1.2 6.5-4.4"/>',
  ring: '<circle cx="12" cy="14.5" r="4.5"/><path d="M9.4 8.4L12 4l2.6 4.4z"/>',
  potion: '<path d="M9.5 3.5h5v3.8l3.6 6.3A4.6 4.6 0 0 1 14 20.5h-4a4.6 4.6 0 0 1-4.1-6.9L9.5 7.3z"/><path d="M7.5 14.5h9"/>',
  elixir: '<path d="M6.5 4h11l-1.8 6.4a4 4 0 0 1-7.4 0z"/><path d="M12 14.5V19"/><path d="M9 20h6"/>',
  meat: '<path d="M8 17.5a5.5 5.5 0 1 1 7.5-7.5c2.2 0 4 1.8 4 4s-1.8 4-4 4z"/><path d="M17.5 6.5l-2 2"/>',
  bread: '<ellipse cx="12" cy="12.5" rx="8" ry="5"/><path d="M8.5 10.5v4M12 9.5v6M15.5 10.5v4"/>',
  pelt: '<path d="M6 4.5c3 1.2 5 .2 6-.8 1 1 3 2 6 .8-1 4.2-2 8-2 12.5-2.2 1-5.8 1-8 0 0-4.5-1-8.3-2-12.5z"/><path d="M9.5 12h1M13.5 12h1"/>',
  ore: '<path d="M4.5 15.5l3-6.5 4 2 3-4 4.5 6.5-2 5H6.5z"/><path d="M7.5 9l1.5 3M14.5 7l-1 4"/>',
  herb: '<path d="M12 20.5V9.5"/><path d="M12 12.5c-4 0-6.2-2-6.2-6.2 4 0 6.2 2 6.2 6.2z"/><path d="M12 15.5c4 0 6.2-2 6.2-6.2-4 0-6.2 2-6.2 6.2z"/>',
  metal: '<path d="M4 17l4.5-8h11.5L15.5 17z"/><path d="M8.5 9l4 8"/>',
  crystal: '<path d="M12 3.5l5 7-5 10-5-10z"/><path d="M7 10.5h10"/>',
  shard: '<path d="M12 3l1.9 6.6L20.5 12l-6.6 2.4L12 21l-1.9-6.6L3.5 12l6.6-2.4z"/>',
  key: '<circle cx="8" cy="8" r="3.6"/><path d="M10.6 10.6L19 19"/><path d="M15.5 15.5l2 2"/><path d="M18 18l1.5 1.5"/>',
  grain: '<path d="M9 4.5h6l1 3.2c2 2.1 2.2 5.3 2.2 8.3H5.8c0-3 .2-6.2 2.2-8.3z"/><path d="M9 4.5h6"/><path d="M9.5 12.5v3.5M14.5 12.5v3.5"/>',
  bone: '<path d="M8.5 15.5l7-7"/><circle cx="7" cy="17" r="2.4"/><circle cx="17" cy="7" r="2.4"/>',
  coin: '<circle cx="12" cy="12" r="7.5"/><path d="M12 8.5v7M10 10h3.2a1.6 1.6 0 0 1 0 3.2H10"/>',
  star: '<path d="M12 3.5l2.4 5.6 6 .6-4.5 4 1.4 5.9-5.3-3.1-5.3 3.1 1.4-5.9-4.5-4 6-.6z"/>',
  unknown: '<circle cx="12" cy="12" r="7.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3v1.7"/><path d="M12 17h.01"/>',
};

export function icon(name, size = 20, className = '') {
  const path = ICONS[name] ?? ICONS.unknown;
  return `<svg class="ico-svg ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

export const hasIcon = (name) => !!ICONS[name];
