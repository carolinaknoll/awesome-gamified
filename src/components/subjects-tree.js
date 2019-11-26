import React, {Component}  from 'react';
import PropTypes from 'prop-types';
// import SavedItems from "./saved-items";
// import ToggleTheme from "./toggle-theme";
import SearchBar from './searchbar.js';
import axios from 'axios';
import {sortByNameAscending, toggleDifferentClasses} from '../common/helpers';

export default class SubjectsTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      subjects: {},
    };
  }

  getSubjectEntries = () => {
    axios.get('https://raw.githubusercontent.com/lockys/awesome.json/master/awesome/awesome.json')
    .then((subjects) => {
      this.setState({
        subjects: subjects.data,
        errorMessage: '',
      });

      if (!this.state.subjects) {
        this.setState({
          errorMessage: 'There was an error. Unable to load the Awesome subjects.'
        });
      }
    }).catch((error) => {
      this.setState({
        errorMessage: `There was an error. Unable to load the Awesome subjects: ${error}.`
      });
    });
  }

  componentDidMount() {
    this.getSubjectEntries();
  }

  renderSubjectTree = () => {
    const {subjects} = this.state;

    if (subjects) {
      return (
        Object.keys(subjects).sort().map((subject) => {
          return (
            <div key={subject} className="subjects-tree-container">
              <div className="subject-container" onClick={(e) => this.toggleTopicOpenClass(e)}>
                <i className='chevron-icon tree-icon fas fa-chevron-circle-right'></i>
                <h3 className="subject-title">{subject}</h3>
              </div>

              <div className='subject-topic-list-container'>
                {this.renderSubjectTopics(subjects, subject)}
              </div>
            </div>
          )
        })
      )
    }
  }

  toggleTopicOpenClass = (e) => {
    e.target.nextSibling.classList.toggle('open');
    this.toggleChevronClass(e);
  }

  toggleChevronClass = (e) => {
    if (e) {
      let chevronIcon = e.target.querySelector('.chevron-icon');

      toggleDifferentClasses(chevronIcon, 'fa-chevron-circle-right', 'fa-chevron-circle-down');
    }
  }

  toggleChevronClassWithoutEvent = () => {
    let chevronIconElements = Array.from(document.getElementsByClassName('chevron-icon'));

    chevronIconElements.map((element) => {
      toggleDifferentClasses(element, 'fa-chevron-circle-right', 'fa-chevron-circle-down');
    });
  }

  getTopicSubjects = (data) => {
    let subjects = [];

    if (!data) {
      return subjects;
    }

    let lastParent = null;

    data.reduce((a, e) => {
      let name = e.name;

      let filtered = Object.keys(a).filter((item) => {
        return name.startsWith(item);
      });
      
      a[name] = name in a ? ++a[name] : 0;
      
      if(filtered.length === 0){
        lastParent = name;
        
        subjects.push({ 'Topic': name, 'TopicData': e, 'Subjects': [] });
      }
      
      if (lastParent) {
        let subject = subjects.filter((item) => {
          return item.Topic === lastParent;
        })[0];
          
        if (subject) {
          if (subject.Subjects.filter((obj) => { return obj === e; }).length === 0) {
            if (name !== lastParent) {
              subject.Subjects.push(e);
            }
          }
        }
      }
      
      return a;
    }, {});

    return subjects;
  }

  renderSubjectTopics = (subjects, subject) => {
    let data = subjects[subject];

    sortByNameAscending(data);

    let topicSubjects = this.getTopicSubjects(data);

    //console.log(topicSubjects);

    return topicSubjects.map((item) => {
      let divObj = <div></div>

      if (item.Subjects.length > 0) {
        let subjectDivs = item.Subjects.map((subjectItem) => {
          return (
            <div key={subjectItem.url} className="topic-container" onClick={(e) => this.handleTopicClick(e, subjectItem)}>
              <i className="topic-icon far fa-bookmark"></i>
              <p className="topic-name">{subjectItem.name}</p>
            </div>
          )
        })

        divObj = <div key={item.TopicData.url} className="topic-container" onClick={(e) => this.handleTopicClick(e, item.TopicData)}>
        <i className="topic-icon far fa-bookmark"></i>
        <p className="topic-name">{item.Topic}</p>
        {subjectDivs}
      </div>
      } else {
        divObj = <div key={item.TopicData.url} className="topic-container" onClick={(e) => this.handleTopicClick(e, item.TopicData)}>
          <i className="topic-icon far fa-bookmark"></i>
          <p className="topic-name">{item.Topic}</p>
        </div>
      }

      return divObj;
    })

    // return data.map((topic) => {
    //   return (
    //     <div key={topic.url} className="topic-container" onClick={(e) => this.handleTopicClick(e, topic)}>
    //       <i className="topic-icon far fa-bookmark"></i>
    //       <p className="topic-name">{topic.name}</p>
    //     </div>
    //   )
    // })
  }

  handleTopicClick = (e, topic) => {
    let topicNameContainers = Array.from(document.getElementsByClassName('topic-container'));

    topicNameContainers.map((name) => {
      if (name.classList.contains('selected')) {
        name.classList.remove('selected');
      }
    })

    e.target.classList.add('selected');

    this.props.onTopicClick(topic);
  }

  toggleSubjectTopics = () => {
    let topicContainers = Array.from(document.getElementsByClassName('subject-topic-list-container'));

    topicContainers.map((container) => {
      container.classList.toggle('open');
    })

    this.toggleChevronClassWithoutEvent();
  }

	render() {
    return (
      <div className="subjects">
        <div className="awesome-text-gradient subjects-tree-title-container">
          <i className="awesome-text-gradient tree-icon fas fa-book-open"></i>
          <h3 className="subject-title">Choose a subject below:</h3>
          <p className="toggle-subject-topics" onClick={this.toggleSubjectTopics}>
            <i className="awesome-text-gradient topic-icon far fa-bookmark"></i>
            Open/Close all subject topics
          </p>
        </div>
        <SearchBar 
          isNightlyTheme={this.props.isNightlyTheme} 
          onTopicClick={this.props.onTopicClick} 
          subjects={this.state.subjects}
          />
        {this.renderSubjectTree()}
      </div>
    );
	}
}

SubjectsTree.propTypes = {
  onTopicClick: PropTypes.func.isRequired,
}
