import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <Image
            source={{uri: 'your-profile-image-url'}}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.sectionDescription}>
            Update your info to keep your account
          </Text>
          <SettingItem title="Account information" iconName="person-outline" />
          <SettingItem title="Friends" iconName="people-outline" />
          <SettingItem title="Notifications" iconName="notifications-none" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.sectionDescription}>
            Customize your privacy to make better
          </Text>
          <SettingItem title="Security" iconName="security" />
          <SettingItem title="Login details" iconName="input" />
          <SettingItem title="Payment" iconName="payment" />
          <SettingItem title="Privacy" iconName="privacy-tip" />
        </View>
        <Button title="Lock Wallet" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const SettingItem = ({title, iconName}) => (
  <TouchableOpacity style={styles.settingItem}>
    <Icon name={iconName} size={24} color="black" />
    <Text style={styles.itemTitle}>{title}</Text>
    <Icon name="chevron-right" size={24} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionDescription: {
    color: 'gray',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default ProfilePage;
