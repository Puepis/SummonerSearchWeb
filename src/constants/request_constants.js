
/* This file contains the constants that are used to construct the URL for the HTTP Request */

export const URL = {
    'base': 'https://{region}.api.riotgames.com/lol/{url}',
    'summoner_by_name': 'summoner/v{version}/summoners/by-name/{summoner_name}{api_key}',
    'league_by_summoner': 'league/v{version}/entries/by-summoner/{summoner_id}{api_key}',
    'mastery_score_by_summoner': 'champion-mastery/v{version}/scores/by-summoner/{summoner_id}{api_key}',
    'profile_icon': "http://ddragon.leagueoflegends.com/cdn/{version}/img/profileicon/{profile_icon_id}.png",
    'champion_icon': "http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champion_name}.png"
}

export const API_VERSIONS = {
    'summoner': '4',
    'league': '4',
    'champion-mastery': '4',
    'champion': '3',
    'match': '4',
    'spectator': '4'
}

export const DATA_DRAGON_VERSIONS = {
    'profileicon': '10.6.1',
    'champion' : '10.6.1',
    'item': '10.6.1',
    'summoner': '10.6.1',
    'mastery': '7.23.1',
    'rune': '7.23.1'
}

export const REGIONS = {
    'EUNE': 'eun1',
    'EUW': 'euw1',
    'NA': 'na1',
    'BR': 'br1',
    'JP': 'jp1',
    'KR': 'kr1',
    'OCE': 'oc1',
    'PBE': 'pbe1'
}
