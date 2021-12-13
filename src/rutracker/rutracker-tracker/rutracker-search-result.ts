import { RutrackerSearchQuery } from './rutracker-search-query';

export interface RutrackerSearchResult extends RutrackerSearchQuery {
  count: number;
}
