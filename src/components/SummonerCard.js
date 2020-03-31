import React from 'react';
import * as constants from '../constants/request_constants';
import * as rankedQueues from '../constants/ranked_queues';

import formatUnicorn from 'format-unicorn';

// React animations
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';

const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`animation: 2s ${FadeInAnimation}`;

/* This component will receive all information about the searched summoner
   Here we will handle retrieving the profile picture and the respective ranked emblems

   REQUIRED to Display
   Summoner Name, Level, Mastery Score, Profile Picture, Ranked Info */
class SummonerCard extends React.Component {

    // Render all the required elements
    render() {
        const rankedData = this.props.rankedData;
        const summonerInfo = this.props.summonerInfo;
        const masteryScore = this.props.masteryScore;
        return (

            // If summoner has been updated
            summonerInfo.name ?
            <FadeInDiv>
                <div className="card">
                    <div className="profile-pic">
                        {displayProfilePicture(summonerInfo)}
                    </div>
                    <div className="summoner-info">
                        {displaySummonerInfo(summonerInfo)}
                        {displayMasteryScore(masteryScore)}
                    </div>

                    <div className="ranked-data">
                        {displayRankedInfo(rankedData)}
                    </div>
                </div>
            </FadeInDiv>
             : null
        )
    }
}

// Retrieves and displays profile picture
function displayProfilePicture(info) {

    // Image URl
    const url = constants.URL['profile_icon'].formatUnicorn({
        version: constants.DATA_DRAGON_VERSIONS['profileicon'],
        profile_icon_id: info.profileIconId
    })

    return (
        <img className='profile-image' src={url} alt="new" width="130" height="130"/>
    );
}

// Displays summoner info
function displaySummonerInfo(info) {
    return (
        // Split the text into different lines
        <div>
            <div className='summoner-name'>{info.name}</div>
            <div level='level'>{'LEVEL ' + info.summonerLevel}</div>
        </div>
    )
}

// Displays mastery score
function displayMasteryScore(level) {
    return (
        'MASTERY SCORE ' + level
    )
}

// Displays ranked information
function displayRankedInfo(rankedData) {
    return (
    rankedData.length ? rankedData.map(queue =>
        <div className="queue-info" key={queue.leagueId}>
        {'{type}\n{tier} {rank}\n {wins} WINS {lp} LP'.formatUnicorn({
            type: rankedQueues.QUEUES[queue['queueType']],
            tier: queue['tier'],
            rank: queue['rank'],
            wins: queue['wins'],
            lp: queue['leaguePoints']
        }).split("\n").map((i, key) => {return <div className="info-line" key={key}>{i}</div>;})}
        {getRankedEmblem(queue)} </div>)
        : displayUnranked()
    )
}

// Handles case where summoner is unranked
function displayUnranked() {
    return (
        <div className="queue-info" key='none'>
            <div className="unranked-line" key='unranked'>
                UNRANKED
            </div>
            {getUnrankedEmblem()}
        </div>
    )
}

// Get the unranked emblem
function getUnrankedEmblem() {
    const emblems = require.context('../ranked_emblems', true);
    const emblem = emblems('./unranked.png');
    return (
        <div className="unranked-image">
            <img src={emblem} alt="Unranked Emblem"/>
        </div>
    )
}

// Get respective ranked emblem
function getRankedEmblem(queue) {

    // Load ranked_emblems file
    const emblems = require.context('../ranked_emblems', true);

    // Retrieve respective emblem
    const emblem = emblems('./{tier}.png'.formatUnicorn({
        tier: queue['tier'].toLowerCase()
    }));
    return (
        <div>
            <img src={emblem} alt="Emblem" width="120px" height="136.8px"/>
        </div>
    )
}

export default SummonerCard
