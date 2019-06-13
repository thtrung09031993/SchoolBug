import React from 'react';
import { View, Text } from 'native-base';
import Language, { formatLanguage } from 'common/language';
import Image from 'common/image';
import { CONTRACT, USER, ADDRESS, CAR } from 'constants/api';
import { styles } from './contract.style';
import { formatCurrency } from 'utils/currency';

export default class Contract extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { contract } = this.props;

    return (

      <View>
        <View style={contract[CONTRACT.STATUS] === 'ACTIVE' ? styles.topContract : styles.topContractPending}>
          <View style={styles.topContractContent}>
            <Text style={styles.topText}>
              {formatCurrency(contract[CONTRACT.TOTAL_PRICE])}
            </Text>
            <Text style={styles.topText}>
              {formatCurrency(contract[CONTRACT.UNIT_PRICE])}
            </Text>
            <Text style={styles.topText}>
              /{formatLanguage('TRIP')}
            </Text>
          </View>
          <View style={styles.topContractContent}>
            <Image src={contract[USER.DRIVER][USER.IMAGE]} style={styles.avatar} resizeMode='cover' />
          </View>
          <View style={styles.topContractContent}>
            <Text style={styles.topText}>
              {contract[CAR.CAR][CAR.BRAND]} {contract[CAR.CAR][CAR.MODEL]} {contract[CAR.CAR][CAR.COLOR]}
            </Text>
            <Text style={styles.topText}>{contract[CAR.CAR][CAR.PLATE_NUMBER]}</Text>
          </View>
        </View>
        <View style={styles.bottomContract}>
          <View style={styles.bottomContractContent}>
            <Language style={styles.bottomContractText}>
              DRIVER {contract[USER.DRIVER][USER.NAME]}
            </Language>
            {
              <Language style={styles.status}>
                {contract[CONTRACT.STATUS] === 'PENDING' ? ' (PENDING)' : ''}
              </Language>
            }
          </View>
          <View style={styles.bottomContractContent}>
            <Text style={styles.bottomContractText}>{contract[USER.DRIVER][USER.PHONE_NUMBER]}</Text>
          </View>
          <View style={styles.bottomContractContent}>
            <Text style={styles.driverAddress}>
              {contract[USER.DRIVER][ADDRESS.ADDRESS]}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
