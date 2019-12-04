import React from 'react';

// Components
import Header from './components/Header';
import SearchSummonerBar from './components/SearchSummonerBar';
import SummonerCard from './components/SummonerCard';

// Constants
import * as constants from './constants/request_constants';
import * as key from './constants/key';

// Styling
import './App.css';

// String formatting
import formatUnicorn from 'format-unicorn';

// Makes HTTP Requests
import axios from 'axios';

// App Main Component
class App extends React.Component {

    // The state will contain all the information about the summoner required:
    // Summoner Info, Mastery Score, Ranked Data
    constructor(props) {
        super(props);
        this.state = {
            apiKey: key.API_KEY['apiKey'],
            region: constants.REGIONS['NA'],

            responseCode: 200,

            // Summoner Information
            masteryScore: null,
            basicSummonerInfo: {},
            rankedData: {}
        }

        // Bind the function to App instance instead of function instance
        this.searchSummoner=this.searchSummoner.bind(this);
    }

    // Search summoner
    async searchSummoner(summonerName) {

        // if name is invalid, we want to display an error message
        // 1. If name contains non-alphanumeric characters (e.g. /)
        // 2. Proceed with request for summoner name
        // If responseCode is not 200, then display error message
        // 3. else, continue with requests

        try {
            // Basic summoner info (profile pic id, name, level)
            const summonerIDResponse = await
                axios.get(constants.URL['base'].formatUnicorn({
                    region: this.state.region,
                    url: constants.URL['summoner_by_name'].formatUnicorn({
                        version: constants.API_VERSIONS['summoner'],
                        summoner_name: summonerName,
                        api_key: this.state.apiKey
                    })
                }));

            // Make second HTTP request for ranked info (using id)
            const rankedInfoResponse = await axios.get(constants.URL['base'].formatUnicorn({
                region: this.state.region,
                url: constants.URL['league_by_summoner'].formatUnicorn({
                    version: constants.API_VERSIONS['league'],
                    summoner_id: summonerIDResponse.data.id,
                    api_key: this.state.apiKey
                })
            }));

            // Make third HTTP request for mastery level (using id)
            const masteryScoreResponse = await axios.get(constants.URL['base'].formatUnicorn({
                region: this.state.region,
                url: constants.URL['mastery_score_by_summoner'].formatUnicorn({
                    version: constants.API_VERSIONS['champion-mastery'],
                    summoner_id: summonerIDResponse.data.id,
                    api_key: this.state.apiKey
                })
            }));

            // Reset the state
            // TODO: Handle error responses
            this.setState({
                masteryScore: masteryScoreResponse.data,
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
        const rankedData = this.state.rankedData;
        const masteryScore = this.state.masteryScore;
        const basicSummonerInfo = this.state.basicSummonerInfo;
        const code = this.state.responseCode;

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
