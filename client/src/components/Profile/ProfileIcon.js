import React, {Component} from "react";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    render() {
        return (
            <div className="pa4 tc">
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle tag="span">
                        <img
                            src="http://www.iconninja.com/files/617/395/648/person-administrator-male-geek-employee-man-member-admin-user-human-suit-account-people-profile-icon.png"
                            className="br-100 ba h3 w3 p-2 dib"
                            alt="profile"
                        />
                    </DropdownToggle>
                    <DropdownMenu
                        right
                        className="b--transparent shadow-s mt-0"
                        style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                    >
                        <DropdownItem onClick={() => this.props.toggleModal()} >View Profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange('signout')} >Signout</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}

export default ProfileIcon;
