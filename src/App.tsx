import { useState, useMemo, useCallback } from 'react';
import { KNOCKOUT_MATCHES, ALL_MATCHES, GROUP_STAGE_TEAMS, FLAGS, GROUPS, matchToDate, Match } from './data/matches';
import { downloadICS } from './utils/ics';

const TIMEZONES = [
  { label: 'Auckland (NZST, UTC+12)', iana: 'Pacific/Auckland' },
  { label: 'Sydney / Melbourne (AEST, UTC+10)', iana: 'Australia/Sydney' },
  { label: 'Brisbane (AEST, UTC+10)', iana: 'Australia/Brisbane' },
  { label: 'Adelaide (ACST, UTC+9:30)', iana: 'Australia/Adelaide' },
  { label: 'Tokyo / Seoul (UTC+9)', iana: 'Asia/Tokyo' },
  { label: 'Perth (AWST, UTC+8)', iana: 'Australia/Perth' },
  { label: 'Singapore / Hong Kong (UTC+8)', iana: 'Asia/Singapore' },
  { label: 'Beijing / Shanghai (CST, UTC+8)', iana: 'Asia/Shanghai' },
  { label: 'Bangkok / Jakarta (UTC+7)', iana: 'Asia/Bangkok' },
  { label: 'Dhaka (BST, UTC+6)', iana: 'Asia/Dhaka' },
  { label: 'India (IST, UTC+5:30)', iana: 'Asia/Kolkata' },
  { label: 'Karachi / Islamabad (PKT, UTC+5)', iana: 'Asia/Karachi' },
  { label: 'Dubai / Abu Dhabi (GST, UTC+4)', iana: 'Asia/Dubai' },
  { label: 'Nairobi / Riyadh (UTC+3)', iana: 'Africa/Nairobi' },
  { label: 'Moscow (MSK, UTC+3)', iana: 'Europe/Moscow' },
  { label: 'Istanbul (TRT, UTC+3)', iana: 'Europe/Istanbul' },
  { label: 'Cairo (EET, UTC+2)', iana: 'Africa/Cairo' },
  { label: 'Johannesburg (SAST, UTC+2)', iana: 'Africa/Johannesburg' },
  { label: 'Berlin / Paris / Rome (CEST, UTC+2)', iana: 'Europe/Berlin' },
  { label: 'Athens / Helsinki (EEST, UTC+2)', iana: 'Europe/Athens' },
  { label: 'London (BST, UTC+1)', iana: 'Europe/London' },
  { label: 'Dublin (IST, UTC+1)', iana: 'Europe/Dublin' },
  { label: 'Lagos / Casablanca (WAT, UTC+1)', iana: 'Africa/Lagos' },
  { label: 'UTC+0 / Reykjavik', iana: 'Atlantic/Reykjavik' },
  { label: 'Accra / Dakar (GMT, UTC+0)', iana: 'Africa/Accra' },
  { label: 'Buenos Aires / São Paulo (UTC-3)', iana: 'America/Sao_Paulo' },
  { label: 'Santiago (CLT, UTC-4)', iana: 'America/Santiago' },
  { label: 'New York / Toronto (EDT, UTC-4)', iana: 'America/New_York' },
  { label: 'Caracas / La Paz (UTC-4)', iana: 'America/Caracas' },
  { label: 'Chicago (CDT, UTC-5)', iana: 'America/Chicago' },
  { label: 'Lima / Bogota (UTC-5)', iana: 'America/Bogota' },
  { label: 'Mexico City / Denver (MDT, UTC-6)', iana: 'America/Mexico_City' },
  { label: 'Los Angeles / Vancouver (PDT, UTC-7)', iana: 'America/Los_Angeles' },
  { label: 'Anchorage (AKDT, UTC-8)', iana: 'America/Anchorage' },
  { label: 'Honolulu (HST, UTC-10)', iana: 'Pacific/Honolulu' },
];

function formatTime(date: Date, iana: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: iana,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function getLocalDateKey(date: Date, iana: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: iana,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  return parts; // returns 'YYYY-MM-DD'
}

function formatDayHeader(dateKey: string): { name: string; date: string } {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const name = dt.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
  const date = dt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  return { name, date };
}

function FlagImg({ team }: { team: string }) {
  const code = FLAGS[team];
  if (!code) return null;
  return <img className="flag" src={`https://flagcdn.com/w20/${code}.png`} alt="" />;
}

function MatchTeams({ teamsStr }: { teamsStr: string }) {
  const parts = teamsStr.split(' v ');
  if (parts.length !== 2) return <span>{teamsStr}</span>;
  const [home, away] = parts.map(s => s.trim());
  return (
    <>
      <FlagImg team={home} /> {home}
      <span className="vs">v</span>
      {away} <FlagImg team={away} />
    </>
  );
}

function getGroupColor(grp: string): string {
  const colors: Record<string, string> = {
    A:'#E74C3C',B:'#E67E22',C:'#F0C040',D:'#2ECC71',
    E:'#1ABC9C',F:'#5DADE2',G:'#A569BD',H:'#EC407A',
    I:'#FF7043',J:'#26C6DA',K:'#9CCC65',L:'#FFA726',
  };
  return colors[grp] ?? 'var(--text-muted)';
}

function getRoundLabel(grp: string): string {
  const labels: Record<string, string> = {
    R32:'R32',R16:'R16',QF:'QF',SF:'SF',F:'Final','3rd':'3rd',
  };
  return labels[grp] ?? `Grp ${grp}`;
}

type StageFilter = 'all' | 'knockout';

export default function App() {
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
  const [stageFilter, setStageFilter] = useState<StageFilter>('knockout');
  const [teamSearch, setTeamSearch] = useState('');

  const toggleTeam = useCallback((team: string) => {
    setSelectedTeams(prev => {
      const next = new Set(prev);
      if (next.has(team)) next.delete(team);
      else next.add(team);
      return next;
    });
  }, []);

  const selectAll = () => setSelectedTeams(new Set(GROUP_STAGE_TEAMS));
  const clearAll = () => setSelectedTeams(new Set());

  const filteredTeams = useMemo(() =>
    GROUP_STAGE_TEAMS.filter(t => t.toLowerCase().includes(teamSearch.toLowerCase())),
    [teamSearch]
  );

  const visibleMatches = useMemo(() => {
    const base = stageFilter === 'knockout' ? KNOCKOUT_MATCHES : ALL_MATCHES;

    if (selectedTeams.size === 0) return base;
    return base.filter(m => {
      if (!['A','B','C','D','E','F','G','H','I','J','K','L'].includes(m.grp)) return true;
      const parts = m.teams.split(' v ').map(s => s.trim());
      return parts.some(t => selectedTeams.has(t));
    });
  }, [stageFilter, selectedTeams]);

  const groupedByDay = useMemo(() => {
    const buckets: Record<string, Match[]> = {};
    visibleMatches.forEach(m => {
      const d = matchToDate(m);
      const key = getLocalDateKey(d, timezone);
      (buckets[key] = buckets[key] || []).push(m);
    });
    const keys = Object.keys(buckets).sort();
    keys.forEach(k => {
      buckets[k].sort((a, b) => matchToDate(a).getTime() - matchToDate(b).getTime());
    });
    return keys.map(k => ({ key: k, matches: buckets[k] }));
  }, [visibleMatches, timezone]);

  const EXPORTABLE_GRPS = new Set(['A','B','C','D','E','F','G','H','I','J','K','L','R32','R16']);

  const exportableMatches = useMemo(() =>
    visibleMatches.filter(m => EXPORTABLE_GRPS.has(m.grp)),
    [visibleMatches]
  );

  const handleExportAll = () => {
    const label = selectedTeams.size > 0
      ? [...selectedTeams].join('-').slice(0, 40)
      : 'all-matches';
    downloadICS(exportableMatches, `wc2026-${label}.ics`);
  };

  const handleExportMatch = (match: Match) => {
    if (!EXPORTABLE_GRPS.has(match.grp)) return;
    const slug = match.teams.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    downloadICS([match], `wc2026-${slug}.ics`);
  };

  const teamForGroup = (team: string): string => {
    for (const [g, teams] of Object.entries(GROUPS)) {
      if (teams.includes(team)) return g;
    }
    return '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>FIFA World Cup <span>2026</span></h1>
          <div className="subtitle">104 matches · 11 Jun – 19 Jul · USA / Canada / Mexico</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={handleExportAll} disabled={exportableMatches.length === 0}>
            ⬇ Export {exportableMatches.length} match{exportableMatches.length !== 1 ? 'es' : ''} (.ics)
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          {/* Timezone */}
          <div className="sidebar-section">
            <h3>Timezone</h3>
            <select value={timezone} onChange={e => setTimezone(e.target.value)}>
              {TIMEZONES.map(tz => (
                <option key={tz.iana} value={tz.iana}>{tz.label}</option>
              ))}
            </select>
          </div>

          {/* Stage filter */}
          <div className="sidebar-section">
            <h3>Stage</h3>
            <div className="stage-toggle">
              {(['knockout','all'] as StageFilter[]).map(s => (
                <button
                  key={s}
                  className={stageFilter === s ? 'active' : ''}
                  onClick={() => setStageFilter(s)}
                >
                  {s === 'all' ? 'All (incl. group)' : 'Knockout'}
                </button>
              ))}
            </div>
          </div>

          {/* Team filter */}
          <div className="sidebar-section">
            <h3>Filter by Team</h3>
            <div className="team-search">
              <input
                type="text"
                placeholder="Search teams..."
                value={teamSearch}
                onChange={e => setTeamSearch(e.target.value)}
              />
            </div>
            <div className="team-actions">
              <button className="btn btn-secondary btn-sm" onClick={selectAll}>All</button>
              <button className="btn btn-secondary btn-sm" onClick={clearAll}>None</button>
              {selectedTeams.size > 0 && (
                <span style={{ fontSize: 12, color: 'var(--accent)', marginLeft: 4 }}>
                  {selectedTeams.size} selected
                </span>
              )}
            </div>
            <div className="team-grid">
              {filteredTeams.map(team => (
                <label key={team} className="team-item">
                  <input
                    type="checkbox"
                    checked={selectedTeams.has(team)}
                    onChange={() => toggleTeam(team)}
                  />
                  <FlagImg team={team} />
                  <span className="team-name">{team}</span>
                  <span className="team-group">{teamForGroup(team)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export info */}
          <div className="sidebar-section">
            <div className="export-summary">
              <p>
                {exportableMatches.length} match{exportableMatches.length !== 1 ? 'es' : ''} available.
                {' '}Click any match's 📅 icon or use the export button above.
              </p>
              <button className="btn btn-primary btn-full" onClick={handleExportAll} disabled={exportableMatches.length === 0}>
                ⬇ Export .ics Calendar
              </button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {groupedByDay.length === 0 ? (
            <div className="empty-state">
              <h3>No matches found</h3>
              <p>Try adjusting your team selection or stage filter.</p>
            </div>
          ) : (
            groupedByDay.map(({ key, matches }) => {
              const { name, date } = formatDayHeader(key);
              return (
                <div key={key} className="day-block">
                  <div className="day-header">
                    <span className="day-name">{name}</span>
                    <span className="day-date">{date}</span>
                  </div>
                  {matches.map((m, i) => {
                    const d = matchToDate(m);
                    const timeStr = formatTime(d, timezone);
                    const [timePart, period] = timeStr.split(' ');
                    const isGroupMatch = ['A','B','C','D','E','F','G','H','I','J','K','L'].includes(m.grp);
                    const isExportable = isGroupMatch || m.grp === 'R32';
                    const isHighlighted = isGroupMatch && m.teams.split(' v ').some(t => selectedTeams.has(t.trim()));
                    return (
                      <div key={i} className={`match-card${isHighlighted ? ' highlighted' : ''}`}>
                        <div className="match-time">
                          {timePart}
                          {period && <span className="time-period">{period}</span>}
                        </div>
                        <div
                          className="match-grp"
                          style={{ color: isGroupMatch ? getGroupColor(m.grp) : 'var(--accent)' }}
                        >
                          {getRoundLabel(m.grp)}
                        </div>
                        <div className="match-teams">
                          <MatchTeams teamsStr={m.teams} />
                        </div>
                        <div className="match-venue">{m.venue}</div>
                        <div className="match-export">
                          <button
                            className="btn btn-ghost btn-sm"
                            title={isExportable ? 'Add to calendar' : 'Fixtures TBD — not exportable yet'}
                            disabled={!isExportable}
                            onClick={() => handleExportMatch(m)}
                          >
                            📅
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
