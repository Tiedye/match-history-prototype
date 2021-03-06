export interface SummonerDTO {
    /** Encrypted account ID. Max length 56 characters. */
    accountId: string;
    /** ID of the summoner icon associated with the summoner. */
    profileIconId: number;
    /** Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change */
    revisionDate: number;
    /** Summoner name. */
    name: string;
    /** Encrypted summoner ID. Max length 63 characters. */
    id: string;
    /** Encrypted PUUID. Exact length of 78 characters. */
    puuid: string;
    /** Summoner level associated with the summoner.  */
    summonerLevel: number;
}

export interface MatchReferenceDto {
    gameId: number;
    role: string;
    season: number;
    platformId: string;
    champion: number;
    queue: number;
    lane: string;
    timestamp: number;
}

export interface MatchlistDto {
    startIndex: number;
    totalGames: number;
    endIndex: number;
    matches: MatchReferenceDto[];
}

export interface MatchDto {
    /** */
    gameId: number;
    /** Participant identity information. */
    participantIdentities: ParticipantIdentityDto[];
    /** Please refer to the Game Constants documentation. */
    queueId: number;
    /** Please refer to the Game Constants documentation. */
    gameType: string;
    /** Match duration in seconds. */
    gameDuration: number;
    /** Team information. */
    teams: TeamStatsDto[];
    /** Platform where the match was played. */
    platformId: string;
    /** Designates the timestamp when champion select ended and the loading screen appeared, NOT when the game timer was at 0:00. */
    gameCreation: number;
    /** Please refer to the Game Constants documentation. */
    seasonId: number;
    /** The major.minor version typically indicates the patch the match was played on. */
    gameVersion: string;
    /** Please refer to the Game Constants documentation. */
    mapId: number;
    /** Please refer to the Game Constants documentation. */
    gameMode: string;
    /** Participant information. */
    participants: ParticipantDto[];
}

export interface ParticipantIdentityDto {
    /** */
    participantId: number;
    /** Player information not included in the response for custom matches. Custom matches are considered private unless a tournament code was used to create the match. */
    player: PlayerDto;
}

export interface PlayerDto {
    /** */
    profileIcon: number;
    /** Player's original accountId (Encrypted) */
    accountId: string;
    /** */
    matchHistoryUri: string;
    /** Player's current accountId (Encrypted) */
    currentAccountId: string;
    /** */
    currentPlatformId: string;
    /** */
    summonerName: string;
    /** Player's summonerId (Encrypted) */
    summonerId: string;
    /** Original platformId. */
    platformId: string;
}

export interface TeamStatsDto {
    /** Number of towers the team destroyed. */
    towerKills: number;
    /** Number of times the team killed Rift Herald. */
    riftHeraldKills: number;
    /** Flag indicating whether or not the team scored the first blood. */
    firstBlood: boolean;
    /** Number of inhibitors the team destroyed. */
    inhibitorKills: number;
    /** If match queueId has a draft, contains banned champion data, otherwise empty. */
    bans: TeamBansDto[];
    /** Flag indicating whether or not the team scored the first Baron kill. */
    firstBaron: boolean;
    /** Flag indicating whether or not the team scored the first Dragon kill. */
    firstDragon: boolean;
    /** For Dominion matches, specifies the points the team had at game end. */
    dominionVictoryScore: number;
    /** Number of times the team killed Dragon. */
    dragonKills: number;
    /** Number of times the team killed Baron. */
    baronKills: number;
    /** Flag indicating whether or not the team destroyed the first inhibitor. */
    firstInhibitor: boolean;
    /** Flag indicating whether or not the team destroyed the first tower. */
    firstTower: boolean;
    /** Number of times the team killed Vilemaw. */
    vilemawKills: number;
    /** Flag indicating whether or not the team scored the first Rift Herald kill. */
    firstRiftHerald: boolean;
    /** 100 for blue side. 200 for red side. */
    teamId: number;
    /** String indicating whether or not the team won. There are only two values visibile in public match history. (Legal values: Fail, Win) */
    win: string;
}

export interface TeamBansDto {
    /** Banned championId. */
    championId: number;
    /** Turn during which the champion was banned. */
    pickTurn: number;
}

export interface ParticipantDto {
    /**  */
    participantId: number;
    /**  */
    championId: number;
    /** List of legacy Rune information. Not included for matches played with Runes Reforged. */
    runes: RuneDto[];
    /** Participant statistics. */
    stats: ParticipantStatsDto;
    /** 100 for blue side. 200 for red side. */
    teamId: number;
    /** Participant timeline data. */
    timeline: ParticipantTimelineDto;
    /** First Summoner Spell id. */
    spell1Id: number;
    /** Second Summoner Spell id. */
    spell2Id: number;
    /** Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation. (Legal values: CHALLENGER, MASTER, DIAMOND, PLATINUM, GOLD, SILVER, BRONZE, UNRANKED) */
    highestAchievedSeasonTier: string;
    /** List of legacy Mastery information. Not included for matches played with Runes Reforged. */
    masteries: MasteryDto[];
}

export interface RuneDto {
    runeId: number;
    rank: number;
}

export interface ParticipantStatsDto {
    item0: number;
    item2: number;
    totalUnitsHealed: number;
    item1: number;
    largestMultiKill: number;
    goldEarned: number;
    firstInhibitorKill: boolean;
    physicalDamageTaken: number;
    nodeNeutralizeAssist: number;
    totalPlayerScore: number;
    champLevel: number;
    damageDealtToObjectives: number;
    totalDamageTaken: number;
    neutralMinionsKilled: number;
    deaths: number;
    tripleKills: number;
    magicDamageDealtToChampions: number;
    wardsKilled: number;
    pentaKills: number;
    damageSelfMitigated: number;
    largestCriticalStrike: number;
    nodeNeutralize: number;
    totalTimeCrowdControlDealt: number;
    firstTowerKill: boolean;
    magicDamageDealt: number;
    totalScoreRank: number;
    nodeCapture: number;
    wardsPlaced: number;
    totalDamageDealt: number;
    timeCCingOthers: number;
    magicalDamageTaken: number;
    largestKillingSpree: number;
    totalDamageDealtToChampions: number;
    physicalDamageDealtToChampions: number;
    neutralMinionsKilledTeamJungle: number;
    totalMinionsKilled: number;
    firstInhibitorAssist: boolean;
    visionWardsBoughtInGame: number;
    objectivePlayerScore: number;
    kills: number;
    firstTowerAssist: boolean;
    combatPlayerScore: number;
    inhibitorKills: number;
    turretKills: number;
    participantId: number;
    trueDamageTaken: number;
    firstBloodAssist: boolean;
    nodeCaptureAssist: number;
    assists: number;
    teamObjective: number;
    altarsNeutralized: number;
    goldSpent: number;
    damageDealtToTurrets: number;
    altarsCaptured: number;
    win: boolean;
    totalHeal: number;
    unrealKills: number;
    visionScore: number;
    physicalDamageDealt: number;
    firstBloodKill: boolean;
    numberestTimeSpentLiving: number;
    killingSprees: number;
    sightWardsBoughtInGame: number;
    trueDamageDealtToChampions: number;
    neutralMinionsKilledEnemyJungle: number;
    doubleKills: number;
    trueDamageDealt: number;
    quadraKills: number;
    item4: number;
    item3: number;
    item6: number;
    item5: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    /** Primary path keystone rune */
    perk0: number;
    /** Post game rune stats */
    perk0Var1: number;
    /** Post game rune stats */
    perk0Var2: number;
    /** Post game rune stats */
    perk0Var3: number;
    /** Primary path rune */
    perk1: number;
    /** Post game rune stats */
    perk1Var1: number;
    /** Post game rune stats */
    perk1Var2: number;
    /** Post game rune stats */
    perk1Var3: number;
    /** Primary path rune */
    perk2: number;
    /** Post game rune stats */
    perk2Var1: number;
    /** Post game rune stats */
    perk2Var2: number;
    /** Post game rune stats */
    perk2Var3: number;
    /** Primary path rune */
    perk3: number;
    /** Post game rune stats */
    perk3Var1: number;
    /** Post game rune stats */
    perk3Var2: number;
    /** Post game rune stats */
    perk3Var3: number;
    /** Secondary path rune */
    perk4: number;
    /** Post game rune stats */
    perk4Var1: number;
    /** Post game rune stats */
    perk4Var2: number;
    /** Post game rune stats */
    perk4Var3: number;
    /** Secondary path rune */
    perk5: number;
    /** Post game rune stats */
    perk5Var1: number;
    /** Post game rune stats */
    perk5Var2: number;
    /** Post game rune stats */
    perk5Var3: number;
    /** Primary rune  */
    perkPrimaryStyle: number;
    /** Secondary rune  */
    perkSubStyle: number;
}

export interface ParticipantTimelineDto {
    /** */
    participantId: number;
    /** Creep score difference versus the calculated lane opponent(s) for a specified period. */
    csDiffPerMinDeltas: { [key: string]: number };
    /** Damage taken for a specified period. */
    damageTakenPerMinDeltas: { [key: string]: number };
    /** Participant's calculated role. (Legal values: DUO, NONE, SOLO, DUO_CARRY, DUO_SUPPORT) */
    role: string;
    /** Damage taken difference versus the calculated lane opponent(s) for a specified period. */
    damageTakenDiffPerMinDeltas: { [key:string]: number};
    /** Experience change for a specified period. */
    xpPerMinDeltas: { [key:string]: number};
    /** Experience difference versus the calculated lane opponent(s) for a specified period. */
    xpDiffPerMinDeltas: { [key:string]: number};
    /** Participant's calculated lane. MID and BOT are legacy values. (Legal values: MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM) */
    lane: string;
    /** Creeps for a specified period. */
    creepsPerMinDeltas: { [key:string]: number};
    /** Gold for a specified period. */
    goldPerMinDeltas: { [key:string]: number};
}

export interface MasteryDto {
    rank: number;
    masteryId: number;
}