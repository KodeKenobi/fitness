import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Portal, Modal, Button, useTheme, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface GlobalModalProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  bullets?: string[];
  buttonText?: string;
  onButtonPress?: () => void;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({
  visible,
  onDismiss,
  title,
  subtitle,
  description,
  icon = 'information',
  bullets = [],
  buttonText = 'GOT IT',
  onButtonPress,
}) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
        theme={{
          colors: {
            backdrop: 'rgba(0, 0, 0, 0.85)',
          },
        }}
      >
         <Surface style={styles.modalContent}>
           <IconButton
             icon="close"
             size={24}
             iconColor="#666"
             onPress={onDismiss}
             style={styles.absoluteClose}
           />
           <View style={styles.modalHeader}>
             <MaterialCommunityIcons name={icon as any} size={32} color={theme.colors.primary} />
             <Text variant="titleLarge" style={styles.modalTitle}>{title}</Text>
           </View>

          {subtitle && <Text style={styles.modalSubtitle}>{subtitle}</Text>}
          
          <Text style={styles.modalDescription}>{description}</Text>

          {bullets.map((bullet, index) => (
            <View key={index} style={styles.bulletRow}>
              <MaterialCommunityIcons name="check-circle-outline" size={18} color={theme.colors.primary} />
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}

          <Button
            mode="contained"
            onPress={onButtonPress || onDismiss}
            style={styles.closeButton}
            buttonColor={theme.colors.primary}
            textColor="#000"
          >
            {buttonText}
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111111',
    padding: 32,
    borderRadius: 32,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#333333',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#CCFF00',
    fontWeight: '900',
    marginLeft: 12,
    letterSpacing: -1,
  },
  modalSubtitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  modalDescription: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '100',
    marginLeft: 12,
  },
  closeButton: {
    marginTop: 12,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
  },
  absoluteClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
});
