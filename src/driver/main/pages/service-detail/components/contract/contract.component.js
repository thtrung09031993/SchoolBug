import React from 'react';
import { View, Icon, Text, Button } from 'native-base';

import Language from 'common/language';
import ChildrenList from 'common/children-list';
import Image from 'common/image';

import { CHILDREN, CONTRACT, USER, REQUIREMENT } from 'constants/api';

import { formatCurrency } from 'utils/currency';

import { styles, themeStyles } from './contract.style';
import { TouchableOpacity } from 'react-native';
import { CONTRACT_STATUS } from 'constants/status';
import { formatDate } from 'common/datetime-formatter';

export default class Contract extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { contracts, handleAcceptPendingContract, handleRejectPendingContract,
      openContractCancellation, chooseContractToCancel } = this.props;

    return (
      contracts.length
        ? <View style={styles.container}>
          {contracts.map((contractItem, index) =>
            <ContractItem
              key={index}
              contractItem={contractItem}
              handleAcceptPendingContract={handleAcceptPendingContract}
              handleRejectPendingContract={handleRejectPendingContract}
              openContractCancellation={openContractCancellation}
              chooseContractToCancel={chooseContractToCancel}
            />
          )}
        </View>
        : <Language style={styles.contractTitle}>NO_CONTRACT</Language>
    );
  }
}

class ContractItem extends React.Component {

  handleContractCancellation = () => {
    const { openContractCancellation, chooseContractToCancel, contractItem: contract } = this.props;

    openContractCancellation();
    chooseContractToCancel(contract[CONTRACT.CONTRACT_ID]);
  }

  render() {
    // const contract = this.props.contractItem;
    const { contractItem: contract, handleAcceptPendingContract, handleRejectPendingContract } = this.props;

    let status = '';

    let themeStyle = {};

    switch (contract[CONTRACT.STATUS]) {
      case CONTRACT_STATUS.PENDING:
        status = 'PENDING_REQUEST';
        themeStyle = themeStyles.pending;
        break;
      case CONTRACT_STATUS.EXTENDING:
        status = 'EXTENDING_REQUEST';
        themeStyle = themeStyles.pending;
        break;
      case CONTRACT_STATUS.INACTIVE:
        status = 'INACTIVE_CONTRACT';
        themeStyle = themeStyles.history;
        break;
      case CONTRACT_STATUS.FINISHED:
        status = 'FINISH_CONTRACT';
        themeStyle = themeStyles.history;
        break;
      case CONTRACT_STATUS.FUTURE:
        status = 'FUTURE_CONTRACT';
        themeStyle = themeStyles.active;
        break;
      case CONTRACT_STATUS.TEMP:
        status = 'TEMP';
        themeStyle = themeStyles.active;
        break;
      case CONTRACT_STATUS.TEMP_PENDING:
        status = 'TEMP_PENDING';
        themeStyle = themeStyles.pending;
        break;
      default:
        status = CONTRACT_STATUS.ACTIVE;
        themeStyle = themeStyles.active;
        break;
    }

    return (
      <TouchableOpacity disabled={status !== CONTRACT_STATUS.ACTIVE}
        onLongPress={status === CONTRACT_STATUS.ACTIVE ? this.handleContractCancellation : () => { }}
        style={styles.contract}>

        {status === CONTRACT_STATUS.ACTIVE
          ? null
          :
          <View style={styles.status}>
            <Language style={themeStyle}>
              {status}
              {
                contract[CONTRACT.STATUS] === CONTRACT_STATUS.FUTURE
                  ? ` (EXTENDED_TO ${formatDate(contract[REQUIREMENT.END_DATE])})`
                  :
                  null
              }
              {
                contract[CONTRACT.STATUS] === CONTRACT_STATUS.TEMP
                  ? ` (TEMP_CONTRACT ${formatDate(contract[REQUIREMENT.START_DATE])})`
                  :
                  null
              }
            </Language>
          </View>
        }

        <View style={styles.info}>
          <Image style={styles.avatar} src={contract[USER.CUSTOMER][USER.IMAGE]} resizeMode="cover" />
          <View style={styles.parent}>
            <Text style={styles.parentName}>
              <Language style={styles.parentLabel}>PARENT</Language>: {contract[USER.CUSTOMER][USER.NAME]}
            </Text>
            <Text style={styles.phoneNumber}>{contract[USER.CUSTOMER][USER.PHONE_NUMBER]}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="people" style={{ ...styles.icon, ...themeStyle }} />
          </View>
          <View style={styles.rightCol}>
            <ChildrenList childrenList={contract[CHILDREN.CHILDREN]} />
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="cash" style={{ ...styles.icon, ...themeStyle }} />
          </View>
          <View style={styles.rightCol}>
            <Language style={styles.infoText}>
              UNIT_PRICE: {formatCurrency(contract[CONTRACT.UNIT_PRICE])}/PERSON/DAY
            </Language>
            {status === CONTRACT_STATUS.ACTIVE
              ? <Language style={styles.infoText}>
                TOTAL_PRICE: {formatCurrency(contract[CONTRACT.TOTAL_PRICE])}
              </Language>
              : null
            }
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="navigate" style={{ ...styles.icon, ...themeStyle }} />
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.infoText} numberOfLines={2}>{contract[REQUIREMENT.PICK_UP_ADDRESS]}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="timer" style={{ ...styles.icon, ...themeStyle }} />
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.infoText}>{contract[REQUIREMENT.PICK_UP_TIME]}</Text>
          </View>
        </View>

        {contract[CONTRACT.STATUS] === CONTRACT_STATUS.PENDING
          || contract[CONTRACT.STATUS] === CONTRACT_STATUS.EXTENDING
          || contract[CONTRACT.STATUS] === CONTRACT_STATUS.TEMP_PENDING
          ? <View style={styles.info}>
            <Button
              transparent
              style={styles.button}
              onPress={() => handleAcceptPendingContract(contract[CONTRACT.CONTRACT_ID])}
            >
              <Icon ios='ios-checkmark' android="md-checkmark" style={styles.buttonAcceptionText} />
              <Language style={styles.buttonAcceptionText}>ACCEPT</Language>
            </Button>
            <Button
              transparent
              style={styles.button}
              onPress={() => handleRejectPendingContract(contract[CONTRACT.CONTRACT_ID])}
            >
              <Icon ios='ios-close' android="md-close" style={styles.buttonRejectionText} />
              <Language style={styles.buttonRejectionText}>REJECT</Language>
            </Button>
          </View>
          : null
        }

      </TouchableOpacity >
    );
  }
}
