import React, { Component } from 'react';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textIndex: 0,
        };
        this.nextText = this.nextText.bind(this);
        this.previousText = this.previousText.bind(this);
    }

    nextText() {
        const { textIndex } = this.state;
        const theSize = this.props.panels.length - 1;
        if (textIndex >= 0 && textIndex < theSize) {
            this.state.textIndex++;
            this.setState({ textIndex: this.state.textIndex });
        }
    }

    previousText() {
        const theSize = this.props.panels.length - 1;
        if (this.state.textIndex > 0 && this.state.textIndex <= theSize) {
            this.state.textIndex--;
            this.setState({ textIndex: this.state.textIndex });
        }
    }

    render() {
        return (
            <div className="Buttons">
                <p> {this.props.panels[this.state.textIndex]} </p>

                <button onClick={this.previousText} className="BackButton">
                    <svg width="21px" height="36px" viewBox="0 0 21 36" version="1.1">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Enter-your-name_v2" transform="translate(-787.000000, -903.000000)" stroke="#FFFFFF" stroke-width="3">
                                <g id="next_btn" transform="translate(767.000000, 888.000000)">
                                    <polyline id="Path" transform="translate(31.500000, 33.000000) scale(-1, 1) rotate(-270.000000) translate(-31.500000, -33.000000) " points="15.5 41.5 31.5 24.5 31.5 24.5 47.5 41.5"></polyline>
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
                <button onClick={this.nextText} className="ForthButton">
                    <svg width="21px" height="35px" viewBox="0 0 21 35" version="1.1">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Enter-your-name_v2" transform="translate(-876.000000, -904.000000)" stroke="#FFFFFF" stroke-width="3">
                                <g id="next_btn" transform="translate(851.000000, 888.000000)">
                                    <polyline id="Path" transform="translate(35.000000, 33.500000) rotate(-270.000000) translate(-35.000000, -33.500000) " points="19 42 35 25 35 25 51 42"></polyline>
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        );
    }
}

export default Buttons;
