import React from 'react';
import TreeView from './components/treeView';
import ObjectiveCard from './components/objectiveCard';

import { filterTree } from './utils';
import { getOKRs } from './api';

import './styles.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.model = {
      categories: [
        'Company',
        'Sales',
        'Marketing',
        'Finance',
        'People',
        'Product Management',
        'Engineering',
        'Administration',
        'Customer Success',
        'Design'
      ]
    };
    this.state = {
      category: '',
      data: [],
      filterdData: []
    };
  }

  componentDidMount() {
    getOKRs().then((data) => {
      this.setState({ filterdData: data }, () => {
        this.model.data = data;
      });
    });
  }

  filterByCategory = (e) => {
    const category = e.target.value;
    this.setState({
      category: category,
      filterdData: filterTree(this.model.data, category)
    });
  };

  render() {
    return (
      <div className="App">
        <h3>OKR List</h3>
        <hr />
        <div className="filters">
          <label>
            Filter by category:
            <select value={this.state.category} onChange={this.filterByCategory}>
              <option value="All">All</option>
              {this.model.categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
        <TreeView data={this.state.filterdData} treeNode={ObjectiveCard} />
      </div>
    );
  }
}
