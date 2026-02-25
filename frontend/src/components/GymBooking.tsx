import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { Button, Text, Surface, useTheme, ActivityIndicator } from "react-native-paper";
import { GymService } from "../services/gymService";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface GymBookingProps {
  gymId: string;
  apiBaseUrl: string;
}

type Status = "idle" | "loading" | "success" | "error";

export const GymBooking: React.FC<GymBookingProps> = ({ gymId, apiBaseUrl }) => {
  const theme = useTheme();
  const service = new GymService(apiBaseUrl);
  const [capacity, setCapacity] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const bookedScale = useRef(new Animated.Value(0)).current;

  const getFriendlyErrorMessage = (error: any) => {
    const msg = (error?.response?.data?.error || error.message || "").toLowerCase();
    
    if (msg.includes("network error") || msg.includes("connrefused") || msg.includes("timeout")) {
      return "Main Lab connection lost. Grab some water while we reconnect.";
    }
    if (msg.includes("404") || msg.includes("not found")) {
      return "The rack seems to be missing. Let's try another one.";
    }
    if (msg.includes("401") || msg.includes("unauthorized")) {
      return "Access denied. Check your membership badge.";
    }
    
    return "Technical snag in the hub. Try refreshing the view.";
  };

  const fetchCapacity = async () => {
    try {
      setStatus("loading");
      const data = await service.getCapacity(gymId, "user123");
      setCapacity(data.percentage);
      setIsBooked(!!data.isBooked);
      setStatus("idle");
    } catch (err: any) {
      setErrorMessage(getFriendlyErrorMessage(err));
      setStatus("error");
    }
  };

  const bookSlot = async () => {
    try {
      setStatus("loading");
      await service.bookSlot(gymId, "user123");
      setStatus("success");
      fetchCapacity();
    } catch (err: any) {
      setErrorMessage(getFriendlyErrorMessage(err));
      setStatus("error");
    }
  };

  // Pulse animation for loading
  useEffect(() => {
    if (status === "loading") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status]);

  // Capacity rotation animation
  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: capacity,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1)),
    }).start();
  }, [capacity]);

  // Status message entrance animations
  useEffect(() => {
    if (status === "success") {
      Animated.spring(successScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      successScale.setValue(0);
    }
  }, [status]);

  useEffect(() => {
    if (isBooked && status !== "success") {
      Animated.spring(bookedScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      bookedScale.setValue(0);
    }
  }, [isBooked, status]);

  useEffect(() => {
    fetchCapacity();
  }, []);

  const getCapacityColor = (cap: number) => {
    if (cap > 80) return "#FF3B30";
    if (cap > 50) return "#FFD60A";
    return '#CCFF00';
  };

  const getStatusLabel = (cap: number) => {
    if (cap > 80) return "HEAVY LOAD";
    if (cap > 50) return "MODERATE";
    return "OPEN FLOOR";
  };

  const spin = rotationAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Surface style={styles.card} elevation={2}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
             <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
             <Text style={styles.locationText}>MAIN LAB // ZONE 2</Text>
          </View>
          <TouchableOpacity onPress={fetchCapacity} disabled={status === "loading"}>
            <MaterialCommunityIcons name="cached" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.gaugeContainer, { opacity: pulseAnim }]}>
          <View style={styles.circularGauge}>
            <Animated.View 
                style={[
                    styles.gaugeFill, 
                    { 
                        borderRightColor: getCapacityColor(capacity), 
                        transform: [{ rotate: spin }] 
                    }
                ]} 
            />
            <View style={styles.gaugeCenter}>
                <Text style={[styles.capacityNumber, { color: getCapacityColor(capacity) }]}>{capacity}%</Text>
            </View>
          </View>
          
          <View style={styles.infoCol}>
              <Text variant="titleLarge" style={styles.clubTitle}>Strength Floor</Text>
              <View style={styles.statusBadge}>
                  <View style={[styles.statusDot, { backgroundColor: getCapacityColor(capacity) }]} />
                  <Text style={styles.statusLabelText}>{getStatusLabel(capacity)}</Text>
                  {status === "error" && (
                    <View style={styles.errorIndicator}>
                      <MaterialCommunityIcons name="alert-circle" size={12} color="#FF3B30" />
                    </View>
                  )}
              </View>
          </View>
        </Animated.View>

        <View style={styles.featureRow}>
            <View style={styles.feature}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                <Text style={styles.featureText}>24/7 Access</Text>
            </View>
            <View style={styles.feature}>
                <MaterialCommunityIcons name="weight-lifter" size={16} color="#666" />
                <Text style={styles.featureText}>Pro Racks</Text>
            </View>
        </View>

        <View style={styles.footer}>
            {status === "success" && (
                 <Animated.View style={[styles.messageBox, { borderColor: '#34C759', transform: [{ scale: successScale }] }]}>
                     <Text style={styles.successText}>SESSION RESERVED</Text>
                 </Animated.View>
             )}

             {isBooked && status !== "success" && (
                 <Animated.View style={[styles.messageBox, { borderStyle: 'dashed', borderColor: '#333', transform: [{ scale: bookedScale }] }]}>
                     <Text style={[styles.successText, { color: '#666' }]}>YOU ARE BOOKED</Text>
                 </Animated.View>
             )}
 
             <Button
                 mode="contained"
                 onPress={bookSlot}
                 disabled={status === "loading" || isBooked}
                 style={[
                   styles.actionButton, 
                   isBooked && { backgroundColor: '#1A1A1A' },
                   status === "error" && { backgroundColor: '#221111', borderColor: '#FF3B30', borderWidth: 1 }
                 ]}
                 contentStyle={styles.buttonContent}
                 labelStyle={[
                   styles.buttonLabel, 
                   isBooked && { color: '#444' },
                   status === "error" && { color: '#FF3B30' }
                 ]}
                 icon={status === "error" ? "refresh" : (isBooked ? "check-all" : "check-decagram")}
             >
                 {status === "error" ? "TRY REFRESH" : (isBooked ? "ALREADY BOOKED" : "BOOK A SLOT")}
             </Button>
             
             {status === "error" && (
               <Text style={styles.errorSubtext}>{errorMessage}</Text>
             )}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0F0F0F', 
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1F1F1F', 
    overflow: 'hidden',
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#444',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: 1,
  },
  gaugeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  circularGauge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  gaugeFill: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  gaugeCenter: {
    alignItems: 'center',
  },
  capacityNumber: {
    fontSize: 22,
    fontWeight: '900',
  },
  infoCol: {
    flex: 1,
  },
  clubTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusLabelText: {
    color: '#666',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  errorIndicator: {
    marginLeft: 8,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  feature: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  featureText: {
      color: '#444',
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 6,
  },
  footer: {
    marginTop: 0,
  },
  messageBox: {
      padding: 12,
      marginBottom: 16,
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
  },
  successText: {
      color: '#34C759',
      fontSize: 12,
      fontWeight: '900',
  },
  actionButton: {
    backgroundColor: '#CCFF00',
    borderRadius: 16,
  },
  buttonContent: {
    height: 60,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  errorSubtext: {
    color: '#ffffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '100',
  }
});
