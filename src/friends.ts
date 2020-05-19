import { BehaviorSubject } from 'rxjs';

import markup from './friends.html';

import { PLATFORMS, getSummonerByName, MAX_MATCHLIST_QUERY, getMatchlists, getMatch } from './riot';
import { error } from './util';
import { MatchlistDto, MatchReferenceDto } from './riot/schema';
import { Logger } from './logger';
import { queues, champions, summoners } from './riot/static';

const _NUM_CONCURRENT_REQUESTS = 10;

interface State {
    playerHistory: BehaviorSubject<Match[] | null>;
}

export function createFriendsElement(logger: Logger): HTMLElement {
    const dom = document.createElement('div');
    dom.innerHTML = markup;

    const state: State = {
        playerHistory: new BehaviorSubject(<Match[] | null>null)
    };

    setupLoadFromRiotForm(state, dom.querySelector('.load-from-riot') ?? error("could not find .load-from-riot form"), logger);

    return dom;
}

interface Player {
    name: string;
    champion: string;
    summoner1: string;
    summoner2: string;
}

interface Match {
    team1: Player[];
    team2: Player[];
    queue: string;
    time: Date;
}

function setupLoadFromRiotForm(state: State, form: HTMLFormElement, logger: Logger) {
    const keyInput = form.elements.namedItem('apikey');
    const playerNameInput = form.elements.namedItem('playername');
    const platformInput = form.elements.namedItem('platform');
    if (!(keyInput instanceof HTMLInputElement)) error('couldn\'t get api key input element');
    if (!(playerNameInput instanceof HTMLInputElement)) error('couldn\'t get player name input element');
    if (!(platformInput instanceof HTMLSelectElement)) error('couldn\'t get platform input element');

    for (const platform of Object.entries(PLATFORMS)) {
        const option = document.createElement('option');
        option.value = platform[1];
        option.innerText = platform[0];
        platformInput.appendChild(option);
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const auth = keyInput.value;
        const playerName = playerNameInput.value;
        const platform = platformInput.value;

        const config = {
            platform,
            auth
        };

        const summoner = await getSummonerByName(config, playerName);

        const matchPages: MatchlistDto[] = [];

        let matchlistIndex = -MAX_MATCHLIST_QUERY;
        const getMatchlistIndex = () => { matchlistIndex += MAX_MATCHLIST_QUERY; return matchlistIndex; }
        let completedPages = 0;
        let totalPages = 10000;
        logger.startProgress(totalPages);

        const matchlistFetcher = async () => {
            for (;;) {
                const r = await getMatchlists(config, summoner.accountId, { beginIndex: getMatchlistIndex() });
                ++completedPages;
                totalPages = Math.ceil(r.totalGames / MAX_MATCHLIST_QUERY);
                logger.updateProgress(completedPages, totalPages);
                if (r.matches.length === 0) break;
                let insertAt = matchPages.length;
                while (insertAt > 0 && matchPages[insertAt - 1].startIndex > r.startIndex) {
                    --insertAt;
                }
                matchPages.splice(insertAt, 0, r);
            }
        };

        await Promise.all(Array(_NUM_CONCURRENT_REQUESTS).fill(null).map(() => matchlistFetcher()));

        const matchRefs = matchPages.map(r => r.matches).flat();

        const matches = <Match[]>[];

        let matchIndex = 0;
        let completedMatches = 0;
        logger.startProgress(matchRefs.length);
        const matchFetcher = async () => {
            while (matchIndex < matches.length) {
                const matchId = matchRefs[matchIndex++].gameId;
                const r = await getMatch(config, matchId);
                const queue = (await queues())[r.queueId];
                const match: Match = {
                    team1: [],
                    team2: [],
                    queue: `${queue.map} - ${queue.description}`,
                    time: new Date(r.gameCreation)
                }
                for (const participant of r.participants) {
                    const team = participant.teamId === 100 ? match.team1 : match.team2;
                    const player = r.participantIdentities.find(i => i.participantId == participant.participantId)?.player;
                    const champion = (await champions())[participant.championId];
                    const summoner1 = (await summoners())[participant.spell1Id];
                    const summoner2 = (await summoners())[participant.spell2Id];
                    if (player == undefined) error(`could not find player matching id ${participant.participantId}`);
                    team.push({
                        name: player.summonerName,
                        champion: champion.name,
                        summoner1: summoner1.name,
                        summoner2: summoner2.name
                    });
                }
                let insertAt = matches.length;
                while (insertAt > 0 && matches[insertAt - 1].time > match.time) {
                    --insertAt;
                }
                matches.splice(insertAt, 0, match);
                logger.updateProgress(matches.length);
            }
        }

        await Promise.all(Array(_NUM_CONCURRENT_REQUESTS).fill(null).map(() => matchFetcher()));

        state.playerHistory.next(matches);

        console.log(matches);

        return false;
    });
}