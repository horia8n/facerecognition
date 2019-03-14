import React, {Component} from 'react';
import './Profile.css';

class Profile extends Component {

    constructor(props){
        //{isProfileOpen, toggleModal,  user, updateProfile}
        super(props);
        this.state ={
            user: props.user
        };
    }
    onInputChange = (field, event) => {
        console.log('onInputChange', field);
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({user});
    };

    render() {
        return (
            <div
                className="profile-modal"
            >
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80 relative">
                        <h1>{this.state.user.name}</h1>
                        <h4 className="f5">Inamges Submited: {this.state.user.entries}</h4>
                        <h4 className="f5">Member since: {this.state.user.joined}</h4>
                        <div className="mt3">
                            <label className="db lh-copy f6" htmlFor="user-name">Name:</label>
                            <input
                                onChange={e => this.onInputChange('name', e)}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="user-name"
                                id="name"
                                value={this.props.user.name}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db lh-copy f6" htmlFor="user-age">Age:</label>
                            <input
                                onChange={e => this.onInputChange('age', e)}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="user-age"
                                id="age"
                                value={this.props.user.age}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db lh-copy f6" htmlFor="user-pet">Pet:</label>
                            <input
                                onChange={e => this.onInputChange('pet', e)}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="text"
                                name="user-pet"
                                id="pet"
                                value={this.props.user.pet}
                            />
                        </div>
                        <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <button
                                onClick={() => this.props.updateProfile(this.state.user)}
                                className="b ph2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                            >Save
                            </button>
                            <button
                                onClick={this.props.toggleModal}
                                className="b ph2 grow pointer hover-white w-40 bg-light-pink b--black-20"
                            >Cancel
                            </button>
                        </div>
                        <div
                            className="modal-close absolute top-1 right-0 pointer f2"
                            onClick={this.props.toggleModal}
                        >&times;</div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Profile;