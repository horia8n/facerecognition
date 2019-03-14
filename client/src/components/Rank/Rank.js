import React, {Component} from 'react';

class Rank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rank: -1
        }
    }

    componentDidMount() {
        this.props.generateEmoji(this.props.entries);
    }

    componentDidUpdate() {
        if (this.props.entries !== this.state.rank) {
            this.setState({rank: this.props.entries});
            this.props.generateEmoji(this.props.entries);
        }
    }

    render() {

        return (
            <div>
                <div className='white f3'>
                    {`${this.props.name}, your current entry count is...`}
                </div>
                <div className='white f1'>
                    {this.props.entries}
                </div>
                <div className='white f3'>
                    {'Rank Badge: ' + this.props.emoji}
                </div>
            </div>
        );
    }

}

export default Rank;