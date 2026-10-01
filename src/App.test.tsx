import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

beforeEach(() => {
  vi.unstubAllGlobals();
  vi.stubEnv('SPORTMICRO_API_KEY', 'test-key');
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => []
  }));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('App', () => {
  it('shows a loading message and empty-state copy when no live matches are returned', async () => {
    vi.useFakeTimers();
    render(<App />);

    expect(screen.getByText(/Loading live matches/i)).toBeInTheDocument();
    await vi.waitFor(() => expect(screen.getByText(/No live matches found/i)).toBeInTheDocument());
  });
});
