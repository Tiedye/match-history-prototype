import { SummonerDTO, MatchlistDto, MatchDto } from './schema';
import { trim } from '../util';

export const PLATFORMS = {
    'br': 'br1.api.riotgames.com',
    'eun': 'eun1.api.riotgames.com',
    'euw': 'euw1.api.riotgames.com',
    'jp': 'jp1.api.riotgames.com',
    'kr': 'kr.api.riotgames.com',
    'la1': 'la1.api.riotgames.com',
    'la2': 'la2.api.riotgames.com',
    'na': 'na1.api.riotgames.com',
    'oc': 'oc1.api.riotgames.com',
    'tr': 'tr1.api.riotgames.com',
    'ru': 'ru.api.riotgames.com'
};

export const MAX_MATCHLIST_QUERY = 100;

const _INITIAL_RETRY = 100;
const _EXPONENTIAL_FALLOFF = 5;
const _MAX_ATTEMPTS = 6;

export interface RiotConfig {
    platform: string,
    auth: string
}

async function fetchRiot<T, U extends {} = {}>(config: RiotConfig, path: string, params?: { [key: string]: string | undefined }, body?: U): Promise<T> {
    for (let attempt = 0; attempt < _MAX_ATTEMPTS; ++attempt) {
        const r = await fetch(`https://${config.platform}${path}?${params ? new URLSearchParams(trim(params)).toString() : ''}`, {
            headers: new Headers({ 'X-Riot-Token': config.auth }),
            method: body ? 'POST': 'GET'
        });
        if (r.status === 429) {
            await new Promise<void>(resolve => setTimeout(() => resolve(), _INITIAL_RETRY * Math.pow(_EXPONENTIAL_FALLOFF, attempt)));
            continue;
        }
        return r.json();
    }
    throw new Error("Rate limit exceeded");
}

export function getSummonerByName(config: RiotConfig, summonerName: string) {
    return fetchRiot<SummonerDTO>(config, `/lol/summoner/v4/summoners/by-name/${summonerName}`);
}

interface MatchlistsQuery {
    queue?: number[],
    season?: number[],
    champion?: number[],
    beginTime?: Date,
    endTime?: Date,
    beginIndex?: number,
    endIndex?: number
}

export function getMatchlists(config: RiotConfig, accountId: string, query?: MatchlistsQuery) {
    return fetchRiot<MatchlistDto>(config, `/lol/match/v4/matchlists/by-account/${accountId}`, {
        queue: query?.queue?.join(','),
        season: query?.season?.join(','),
        champion: query?.champion?.join(','),
        beginTime: query?.beginTime?.getTime().toString(),
        endTime: query?.endTime?.getTime().toString(),
        beginIndex: query?.beginIndex?.toString(),
        endIndex: query?.endIndex?.toString()
    });
}

export function getMatch(config: RiotConfig, matchId: number) {
    return fetchRiot<MatchDto>(config, `/lol/match/v4/matches/${matchId}`);
}