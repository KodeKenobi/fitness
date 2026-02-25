import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Surface style={styles.card} elevation={4}>
            <MaterialCommunityIcons name="alert-octagon" size={64} color="#CCFF00" />
            <Text variant="headlineMedium" style={styles.title}>TRAINING INTERRUPTED</Text>
            <Text style={styles.message}>
              We hit a technical snag during your session. 
              {"\n"}
              Let's reset the rack and try again.
            </Text>
            
            <Button 
              mode="contained" 
              onPress={this.handleReset}
              buttonColor="#CCFF00"
              textColor="#000"
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              RELOAD WORKOUT
            </Button>

            {__DEV__ && (
              <Surface style={styles.debugCard}>
                <Text style={styles.debugText}>{this.state.error?.toString()}</Text>
              </Surface>
            )}
          </Surface>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040404',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#111111',
    padding: 32,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: '#CCFF00',
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
  },
  message: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    borderRadius: 16,
    width: '100%',
    height: 56,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  debugCard: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    width: '100%',
  },
  debugText: {
    color: '#FF3B30',
    fontSize: 10,
    fontFamily: 'monospace',
  }
});
