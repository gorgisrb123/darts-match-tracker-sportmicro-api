export type SportmicroMatch = {
  id: string;
  status: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  tournament: string;
  startTime?: string;
};

type SportmicroMatchResponse = Record<string, unknown>;

export class SportmicroClient {
  constructor(private readonly config: { baseUrl: string; apiKey: string }) {}

  async getLiveMatches(): Promise<SportmicroMatch[]> {
    if (!this.config.apiKey) {
      throw new Error('SPORTMICRO_API_KEY is missing. Add it to your environment before starting the app.');
    }

    const response = await fetch(`${this.config.baseUrl}/matches-live`, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Sportmicro request failed with status ${response.status}.`);
    }

    const data = (await response.json()) as SportmicroMatchResponse[];
    return data.map(normalizeMatch).filter(Boolean) as SportmicroMatch[];
  }
}

function normalizeMatch(item: SportmicroMatchResponse): SportmicroMatch | null {
  const id = asString(item.id);
  if (!id) return null;
  return {
    id,
    status: asString(item.status_type ?? item.status ?? item.type) || 'unknown',
    homeTeam: asString(item.home_team_name ?? item.home_team ?? item.home_name) || 'Home team',
    awayTeam: asString(item.away_team_name ?? item.away_team ?? item.away_name) || 'Away team',
    homeScore: asString(item.home_team_score ?? item.home_score ?? item.score_home) || '-',
    awayScore: asString(item.away_team_score ?? item.away_score ?? item.score_away) || '-',
    tournament: asString(item.tournament_name ?? item.tournament) || 'Tournament unavailable',
    startTime: asString(item.start_time ?? item.series_start_date_timestamp)
  };
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
}
