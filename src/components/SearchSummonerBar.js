import React from 'react';

class SearchSummonerBar extends React.Component {

    state = {
        summonerName: '',
    }

    // When user clicks submit
    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchSummoner(this.state.summonerName);
        this.setState({summonerName: ''})
    }
    // Updates state as the user types stuff into the search box
    onChange = (e) => this.setState({summonerName: e.target.value});
    render() {
        return (
            <div className="search_bar">
                <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                    <input type="text"
                        name="summonerName"
                        placeholder="Search Summoner (NA Only)"
                        value={this.state.summonerName}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn"/>
                </form>
            </div>
        )
    }
}

export default SearchSummonerBar;
