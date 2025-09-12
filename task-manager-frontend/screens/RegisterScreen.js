// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import api from '../utils/api';
import { storeToken } from '../utils/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!name || !email || !password) return Alert.alert('Error', 'Please fill all fields');
    
    setLoading(true);
    try {
      console.log('Register payload:', { name, email });
      const res = await api.post('/auth/register', { name, email, password });
      console.log('Register success', res.data);
      // Always redirect to Login page after successful registration
      // Don't auto-login, make user manually login
      Alert.alert('Success', 'Account created successfully! Please login with your credentials.', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) }
      ]);
    } catch (err) {
      console.error('Register error', err?.response?.data || err.message);
      const validation = err?.response?.data?.errors?.[0]?.msg;
      const msg = err?.response?.data?.msg || validation || 'Registration failed';
      Alert.alert('Register error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>Join Task Manager today</Text>
      
      <TextInput 
        placeholder="Full Name" 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Email" 
        autoCapitalize="none" 
        keyboardType="email-address" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        placeholder="Password (min 6 characters)" 
        secureTextEntry 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={onRegister} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    textAlign: 'center',
    color: '#2e78b7'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16
  },
  button: { 
    backgroundColor: '#4caf50', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  },
  footer: { 
    marginTop: 20, 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#666',
    fontSize: 16
  },
  linkText: {
    color: '#2e78b7',
    fontSize: 16,
    fontWeight: '600'
  }
});
