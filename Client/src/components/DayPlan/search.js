import React, {PureComponent} from 'react';
import Icon from '@mui/icons-material/Search';
import {Button} from "antd";

class Search extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: this.props.searchTerm,
            defaultValue: ''
        };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        console.log('Search component did mount:');
    }

    onComponentDidUpdate() {
        console.log('Search component updated:');
    }

    componentWillReceiveProps(props) {
        console.log('Search component updated:');
        this.textInput.current.value = null;
        if (props.focused) {
            this.textInput.current.focus();
        }
    }

    handleChange(event) {
        this.props.onSearch(event.target.value);
    }

    render() {
        return (
            <div>
                <form>
                    <div className="header__search-bar">
                        <div className="search-bar-icon">
                            <Icon titleAccess="search icon" className="material-icon" color="disabled">
                                search
                            </Icon>
                        </div>

                        <input
                            ref={this.textInput}
                            className="search-bar-input"
                            placeholder="Поиск еды..."
                            onChange={this.handleChange.bind(this)}
                        ></input>

                    </div>
                </form>
            </div>
        );
    }
}

export default Search;
