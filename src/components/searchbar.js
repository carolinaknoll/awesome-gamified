import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/searchbar.css';

class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            subjects: [],
            filteredSubjects: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        if(props.subjects && Object.keys(state.subjects).length == 0) {
            let topics = [];
            Object.keys(props.subjects).map((key) => {
                let values = props.subjects[key];
                topics.push(...values);
            });
            return {
                subjects: topics
            };
        }
        return null;
    }

    onSearchInput = (e) => {
        const searchQuery = e.target.value.trim().toLowerCase();
        if(searchQuery.length !== 0) {
            let filteredSubjects = this.state.subjects.filter((item) => {
                if(item.name.toLowerCase().indexOf(searchQuery) > -1) {
                    return true;
                }
            });
            this.setState({
                filteredSubjects
            });
        } else {
            this.setState({
                filteredSubjects: []
            });
        }
    };

    onItemClick = (item) => {
        this.setState({
            filteredSubjects: []
        });
        this.props.onTopicClick(item);
    };

    render() {
        const searchResultStyle = this.state.filteredSubjects.length == 0 ? { display: 'none' } : {};
        const nightThemeClass = this.props.isNightlyTheme ? "night" : "";
        return (
            <div className="searchbar">
                <input
                    className={`searchinput ${nightThemeClass}`}
                    type="text" 
                    placeholder="Search" 
                    onChange={(e) => this.onSearchInput(e)}/>
                <div style={searchResultStyle} className={`searchresults ${nightThemeClass}`}>
                    {
                        this.state.filteredSubjects.map((item) => {
                            return (
                                <p 
                                    key={item.name} 
                                    className={`topic-name ${nightThemeClass}`}
                                    onClick={() => this.onItemClick(item)}
                                >
                                    {item.name}
                                </p>
                            );
                        })
                    }
                </div>
            </div>
        );
    }


}


SearchBar.propTypes = {
    subjects: PropTypes.object.isRequired,
    onTopicClick: PropTypes.func.isRequired,
    isNightlyTheme: PropTypes.bool.isRequired
}


export default SearchBar;