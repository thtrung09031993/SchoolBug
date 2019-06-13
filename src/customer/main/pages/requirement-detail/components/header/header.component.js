import React from 'react';
import { Header, Body, Left, Right, Button, Title, Icon } from 'native-base';
import { formatLanguage } from 'common/language';
import { styles } from './header.style';
import { customizeHeader } from './header.util';

export default class HeaderComponent extends React.Component {
  render() {
    const { isAvailable, findingDriver } = this.props;
    const headerStyle = customizeHeader(isAvailable, findingDriver);

    return (
      <Header hasTabs style={headerStyle}>
        <Left style={styles.left}>
          <Button transparent onPress={this.props.goBack}>
            <Icon style={styles.icon} name='arrow-round-back' />
          </Button>
        </Left>
        <Body style={styles.body}>
          <Title style={isAvailable ? styles.title : styles.historyTitle}>{formatLanguage('REQUIREMENT_DETAIL')}</Title>
        </Body>

        <Right style={styles.right}>
          {
            isAvailable
              ?
              <Button transparent onPress={this.props.openOptions}>
                <Icon style={styles.icon} name='more' />
              </Button>
              :
              null
          }
        </Right>
      </Header>
    );
  }
}

