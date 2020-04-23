import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="blue-grey">
                    <div className="container">
                        <a className="brand-logo center" href="/">Home</a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;