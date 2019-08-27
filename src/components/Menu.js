// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators/auth';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    right: '10px',
  },
  contents: {
    background: 'lime',
    padding: '5px',
  },
  item: {
    border: '1px solid red',
    padding: '10px',
    marginTop: '5px',
    background: 'grey',
    textAlign: 'center',
  }
};

type Props = {
  logOut: () => void,
};

type State = {
  visible: boolean,
};

export class MenuComp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  show = () => {
     this.setState({ visible: true });
  }

  hide = () => {
    this.setState({ visible: false });
  }

  render() {
    console.log('props:', this.props);

    return (
      <div
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
        style={styles.container}
      >
        <div>Account</div>
        {
          this.state.visible && (
            <div style={styles.contents}>
              <div style={styles.item} onClick={this.props.logOut}>Logout</div>
            </div>
          )
        }
      </div>
    );
  }
}

export const Menu = connect(null, actions)(MenuComp);
