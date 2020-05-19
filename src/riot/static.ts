interface QueueDTO {
    queueId: number,
    map: string,
    description: string | null,
    notes: string | null
}
type QueuesDTO = QueueDTO[];

let _queues = <Promise<{ [key: number]: QueueDTO }> | undefined>undefined;

export function queues() {
    if (_queues == undefined) _queues = fetch('http://static.developer.riotgames.com/docs/lol/queues.json')
        .then(async r => {
            const _qs: QueuesDTO = await r.json();
            const map: { [key: number]: QueueDTO } = {};
            for (const q of _qs) {
                map[q.queueId] = q;
            }
            return map;
        });
    return _queues;
}

const _VERSION = '10.10.3208608';

interface DDrag<T> {
    type: string,
    format: string,
    version: string,
    data: T[]
}

interface ChampionDTO {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number,
        defense: number,
        magic: number,
        difficulty: number
    },
    image: {
        full: string,
        sprite: string,
        group: string,
        x: number,
        y: number,
        w: number,
        h: number
    },
    tags: string[],
    partype: string,
    stats: {
        hp: number,
        hpperlevel: number,
        mp: number,
        mpperlevel: number,
        movespeed: number,
        armor: number,
        armorperlevel: number,
        spellblock: number,
        spellblockperlevel: number,
        attackrange: number,
        hpregen: number,
        hpregenperlevel: number,
        mpregen: number,
        mpregenperlevel: number,
        crit: number,
        critperlevel: number,
        attackdamage: number,
        attackdamageperlevel: number,
        attackspeedperlevel: number,
        attackspeed: number
    }
}

let _champions = <Promise<{ [key: number]: ChampionDTO }> | undefined>undefined;

export function champions() {
    if (_champions == undefined) _champions = fetch(`http://ddragon.leagueoflegends.com/cdn/${_VERSION}/data/en_US/champion.json`)
        .then(async r => {
            const _cs: DDrag<ChampionDTO> = await r.json();
            const map: { [key: number]: ChampionDTO } = {};
            for (const c of _cs.data) {
                map[+c.key] = c;
            }
            return map;
        });
    return _champions;
}

interface SummonerDTO {
    id: string,
    name: string,
    description: string,
    tooltip: string,
    maxrank: 1,
    cooldown: [number],
    cooldownBurn: string,
    cost: [number],
    costBurn: string,
    datavalues: {},
    effect: (null | [number])[],
    effectBurn: (null | [string])[],
    vars: {
        link: string,
        coeff: number[],
        key: string
    }[],
    key: string,
    summonerLevel: 4,
    modes: string[],
    costType: string,
    maxammo: string,
    range: [number],
    rangeBurn: string,
    image: {
        full: string,
        sprite: string,
        group: string,
        x: number,
        y: number,
        w: number,
        h: number
    },
    resource: string
}

let _summoners = <Promise<{ [key: number]: SummonerDTO }> | undefined>undefined;

export function summoners() {
    if (_summoners == undefined) _summoners = fetch(`http://ddragon.leagueoflegends.com/cdn/${_VERSION}/data/en_US/summoner.json`)
        .then(async r => {
            const _cs: DDrag<SummonerDTO> = await r.json();
            const map: { [key: number]: SummonerDTO } = {};
            for (const c of _cs.data) {
                map[+c.key] = c;
            }
            return map;
        });
    return _summoners;
}