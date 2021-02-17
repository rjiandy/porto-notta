import React from 'react';
import {
  View
} from 'react-native';

import {
  // Loading,
  // Success,
  Blank
} from '../components';

function DevScene() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Loading
        label="Mohon tunggu sebentar, kami membutuhkan beberapa saat untuk memproses"
      /> */}
      {/* <Success
        label="Rekening telah berhasil ditambahkan"
      /> */}
      <Blank
        label="Kamu tidak memiliki rekening yang terhubung, silahkan tambahkan rekening."
        buttonLabel="Tambah Rekening"
        onPress={() => {
          alert('Tambah Rekening');
        }}
      />
    </View>
  );
}

export default DevScene;
