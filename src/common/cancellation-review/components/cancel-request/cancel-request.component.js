import React from 'react';
import { View, Text } from 'native-base';
import ChildrenList from 'common/children-list';
import { styles, themeStyle } from './cancel-request.style';
import Language from 'common/language';
import { formatDate } from 'common/datetime-formatter';
import { CONTRACT } from 'constants/api';
import { CONTRACT_STATUS } from 'constants/status';

export default class CustomerCancelRequest extends React.Component {
  render() {

    const { type, request: { children, description, offDay, tempContract }, appType } = this.props;

    return (
      <View style={styles.container}>
        {
          type === 'customer'
            ?
            <View style={styles.content}>
              <ChildrenList isRowStyle={true} childrenList={children} />
            </View>
            :
            null
        }
        <View style={styles.content}>
          <Language style={styles.title}>OFF_AT </Language>
          <Text>{formatDate(offDay)}</Text>
          {
            appType === 'customer' && type === 'driver'
              ?
              <React.Fragment>
                {
                  tempContract
                    ?
                    <Language
                      style={tempContract[CONTRACT.STATUS] === CONTRACT_STATUS.TEMP
                        ? themeStyle.active
                        : themeStyle.pending}
                    >
                      {
                        tempContract[CONTRACT.STATUS] === CONTRACT_STATUS.TEMP
                          ?
                          ' (TEMP_FOUND)'
                          :
                          ' (TEMP_WAITING)'
                      }
                    </Language>
                    : <Language style={themeStyle.negative}> (NOT_TEMP)</Language>
                }
              </React.Fragment>
              :
              null
          }
        </View>
        <View style={styles.content}>
          <Language style={styles.title}>OFF_REASON: </Language>
          <Text>{description}</Text>
        </View>
      </View>
    );
  }
}
