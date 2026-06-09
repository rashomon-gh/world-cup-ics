import { Match, matchToDate } from '../data/matches';

function toICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function sanitize(str: string): string {
  return str.replace(/[,;\\]/g, '\\$&').replace(/\n/g, '\\n');
}

function generateUID(match: Match): string {
  const slug = match.teams.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `wc2026-${match.grp.toLowerCase()}-${match.date}-${slug}@worldcup2026`;
}

export function generateICS(matches: Match[]): string {
  const now = toICSDate(new Date());
  const events = matches.map(match => {
    const start = matchToDate(match);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const roundLabel = getRoundLabel(match.grp);
    const summary = match.grp.length <= 1 || ['R32','R16','QF','SF','F','3rd'].includes(match.grp)
      ? `${match.teams} — WC2026 ${roundLabel}`
      : `${match.teams} (Group ${match.grp}) — WC2026`;
    const desc = `FIFA World Cup 2026\\n${roundLabel}\\nVenue: ${match.venue}`;

    return [
      'BEGIN:VEVENT',
      `UID:${generateUID(match)}`,
      `DTSTAMP:${now}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      `SUMMARY:${sanitize(summary)}`,
      `DESCRIPTION:${sanitize(desc)}`,
      `LOCATION:${sanitize(match.venue)}`,
      'END:VEVENT',
    ].join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//World Cup 2026 Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:FIFA World Cup 2026',
    'X-WR-CALDESC:FIFA World Cup 2026 match schedule',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(matches: Match[], filename = 'worldcup2026.ics'): void {
  const content = generateICS(matches);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function getRoundLabel(grp: string): string {
  const labels: Record<string, string> = {
    'R32': 'Round of 32', 'R16': 'Round of 16',
    'QF': 'Quarter-final', 'SF': 'Semi-final',
    'F': 'Final', '3rd': 'Third Place Play-off',
  };
  return labels[grp] ?? `Group ${grp}`;
}
