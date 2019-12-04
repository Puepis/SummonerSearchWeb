import React from 'react';

function Header() {
    const folder = require.context('../../public', true);
    const icon = folder('./lol_icon.png');
    return (
        <div className="header">
            <div className="title">
                <h1>LoL Searcher</h1>
            </div>
        </div>
    )
}

export default Header;
