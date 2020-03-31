import React from 'react';

// Components
import Header from './components/Header';
import SearchSummonerBar from './components/SearchSummonerBar';
import SummonerCard from './components/SummonerCard';

// Constants
import * as constants from './constants/request_constants';

// Styling
import './App.css';

// Makes HTTP Requests
import axios from 'axios';

// App Main Component
class App extends React.Component {

    // The state will contain all the information about the summoner required:
    // Summoner Info, Mastery Score, Ranked Data
    constructor(props) {
        super(props);
        this.state = {
            region: constants.REGIONS['NA'],
            responseCode: 200,

            // Summoner Information
            rankedData: {},
            masteryScore: null,
            basicSummonerInfo: {}
        }

        // Bind the function to App instance instead of function instance
        this.searchSummoner=this.searchSummoner.bind(this);
    }

    // Search summoner
    async searchSummoner(summonerName) {

        try {

            // Basic summoner info (profile pic id, name, level)
            const summonerIDResponse = await axios.post(constants.URL['server'] + '/summoner/id/by/name', {
                region: this.state.region,
                name: summonerName
            });

            console.log(summonerIDResponse);
            // Make second HTTP request for ranked info (using id)
            const rankedInfoResponse = await axios.post(constants.URL['server'] + '/summoner/ranked/by/id', {
                region: this.state.region,
                id: summonerIDResponse.data.id
            });

            // Make third HTTP request for mastery level (using id)
            const masteryScoreResponse = await axios.post(constants.URL['server'] + '/summoner/mastery/by/id', {
                region: this.state.region,
                id: summonerIDResponse.data.id
            });

            // TODO: Handle error responses
            this.setState({
                masteryScore: masteryScoreResponse.data.id,
                basicSummonerInfo: summonerIDResponse.data,
                rankedData: rankedInfoResponse.data,
                responseCode: summonerIDResponse.status,
            });
        }
        catch (error) {
            this.setState({responseCode: 400})
        }
    }

    // Render the view
    render() {
        const code = this.state.responseCode;
        const rankedData = this.state.rankedData;
        const basicSummonerInfo = this.state.basicSummonerInfo;
        const masteryScore = this.state.masteryScore;

        return (
            <div className="App">
                <div className="container">
                      <Header />
                      <SearchSummonerBar searchSummoner={this.searchSummoner}/>
                      {code === 200 ? <SummonerCard rankedData={rankedData} masteryScore={masteryScore}
                      summonerInfo={basicSummonerInfo} /> : <Error />}
                </div>
            </div>

        );
    }
}

function Error(props) {
    return (
        <div className='summoner-error'>
            Invalid Summoner Name!
        </div>
    )
}
export default App;
