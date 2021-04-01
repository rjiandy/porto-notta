import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  bankListContainer: {
    marginTop: 12
  },
  bankRowItem: {
    borderRadius: 15,
    backgroundColor: colors.yellowGreen,
    padding: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});

function BankRowItem(props) {
  const { bankName, onPress } = props;
  return (
    <TouchableOpacity style={modalStyles.bankRowItem} onPress={onPress}>
      <Text style={fonts['Default-14-white-bold']}>
        {bankName}
      </Text>
    </TouchableOpacity>
  );
}

function BankOptions(props) {
  const { onSelectBank, data } = props;
  console.log('bank data', data);
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.content}>
          <View>
            <Text style={fonts['Default-16-black-bold']}>Pilih Bank</Text>
            <View style={modalStyles.bankListContainer}>
              {
                data.map((bankData, key) => {
                  return (
                    <BankRowItem
                      key={key}
                      onPress={() => onSelectBank(bankData)}
                      bankName={bankData.bank_name}
                    />
                  );
                })
              }
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default BankOptions;
