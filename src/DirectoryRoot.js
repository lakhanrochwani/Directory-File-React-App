import React from 'react';
import './style.css';

export default class DirectoryRoot extends React.Component {
  sample_dir = {
    id: 1,
    name: 'P1',
    children: [
      {
        id: 2,
        name: 'C1_P1',
        children: [
          {
            id: 3,
            name: 'C1_C1_P1',
          },
          {
            id: 4,
            name: 'C2_C1_P1',
            children: [
              {
                id: 5,
                name: 'C1_C2_C1_P1',
              },
              {
                id: 9,
                name: 'C2_C2_C1_P1',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        name: 'C2_P1',
      },
      {
        id: 7,
        name: 'C3_P1',
        children: [
          {
            id: 8,
            name: 'C1_C3_P1',
            children: [
              {
                id: 10,
                name: 'C1_C1_C3_P1',
                children: [
                  {
                    name: 'C1_C1_C1_C3_P1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  constructor() {
    super();
    this.state = {
      dirs: this.sample_dir,
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    var sub_dirs = this.state.dirs.children.map(
      function (dir) {
        return <Directory dirs={dir} />;
      }.bind(this)
    );
    console.log(this.state.dirs);
    return (
      <div onClick={this.handleClick}>
        <div>Root {this.state.dirs.name} </div>
        {this.state.clicked ? (
          <div style={{ marginLeft: 10 }}> {sub_dirs} </div>
        ) : null}
      </div>
    );
    //return <div> {this.recursiveDirRender(this.state.dirs)}</div>;
  }
}

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  handleClick = (event) => {
    event.stopPropagation();
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    console.log(this.props.dirs);
    var sub_dirs = this.props.dirs.children
      ? this.props.dirs.children.map(
          function (dir) {
            return (
              <div key={dir.key}>
                <Directory dirs={dir} />
              </div>
            );
          }.bind(this)
        )
      : null;

    return (
      <div onClick={this.handleClick}>
        {this.props.dirs.name}
        <div
          style={{
            marginLeft: 20,
            display: this.state.clicked ? null : 'none',
          }}
        >
          {' '}
          {sub_dirs}{' '}
        </div>
      </div>
    );
  }
}
