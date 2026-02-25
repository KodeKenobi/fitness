import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, ImageBackground, StatusBar, Pressable, Platform } from "react-native";
import { Text, useTheme, Surface, Button } from "react-native-paper";
import Constants from 'expo-constants';
import { GymBooking } from "../components/GymBooking";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalModal } from "../context/ModalContext";

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { showModal, hideModal } = useGlobalModal();

  const handleShowInsight = () => {
    showModal({
      title: 'Smart Insights',
      icon: 'graphql',
      subtitle: 'Traffic Prediction',
      description: 'Based on historical data from the last 4 Mondays, the club experiences a significant dip between 14:00 and 16:00. Expect less than 20% occupancy during this window—ideal for heavy rack work or circuit training.',
      bullets: [
        'Shortest wait times for squat racks.',
        'Maximum floor space availability.'
      ],
      buttonText: 'GOT IT',
      onButtonPress: hideModal
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text variant="labelLarge" style={styles.clubName}>Finlink Fitness</Text>
              <Text variant="titleLarge" style={styles.greeting}>Level Up,{"\n"}Today</Text>
            </View>
            <Surface style={styles.avatarContainer} elevation={4}>
               <MaterialCommunityIcons name="account" size={24} color={theme.colors.primary} />
            </Surface>
          </View>

          <View style={styles.statsRow}>
              <View style={styles.statItem}>
                  <MaterialCommunityIcons name="star" size={20} color={theme.colors.primary} />
                  <Text style={styles.statValue}>1,240</Text>
                  <Text style={styles.statLabel}>XP Pts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                  <MaterialCommunityIcons name="fire" size={20} color="#FF5F1F" />
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
              </View>
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.sectionTitle}>LIVE CLUB LOAD</Text>
            <View style={styles.bookingCard}>
              {(() => {
                const debuggerHost = Constants.expoConfig?.hostUri;
                const address = debuggerHost?.split(':')[0] || 'localhost';
                // This is applicable for development but should be changed for production
                const apiBaseUrl = `http://${(Platform.OS === 'android' && (address === 'localhost' || address === '127.0.0.1')) ? '10.0.2.2' : address}:3000`;
                console.log(`[DEBUG] Detected API URL: ${apiBaseUrl} (from hostUri: ${debuggerHost})`);
                return <GymBooking gymId="1" apiBaseUrl={apiBaseUrl} />;
              })()}
            </View>

            <Pressable onPress={handleShowInsight}>
              <Surface style={styles.infoSurface} elevation={1}>
                 <MaterialCommunityIcons name="information-outline" size={20} color={theme.colors.primary} style={styles.infoIcon} />
                 <Text style={styles.infoText}>Optimal training window: 14:00 - 16:00 today for lowest occupancy.</Text>
                 <MaterialCommunityIcons name="chevron-right" size={16} color="#444" />
              </Surface>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#040404' 
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scroll: { 
    paddingTop: 60,
    paddingBottom: 40 
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  clubName: {
    color: '#CCFF00',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  greeting: {
    color: '#E2E8F0',
    textTransform: 'uppercase',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#0E0E0E',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1F1F1F',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#1F1F1F',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  statLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mainContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 16,
    paddingLeft: 4,
  },
  bookingCard: {
    marginBottom: 24,
  },
  infoSurface: {
    flexDirection: 'row',
    backgroundColor: '#0E0E0E',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  }
});
