// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import api from '../utils/api';
import { storeToken } from '../utils/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please enter email and password');
    
    setLoading(true);
    try {
      console.log('Login payload:', { email });
      const res = await api.post('/auth/login', { email, password });
      console.log('Login success');
      const { token } = res.data;
      await storeToken(token);
      
      // Direct navigation to TaskList after successful login
      navigation.reset({ index: 0, routes: [{ name: 'TaskList' }] });
    } catch (err) {
      console.error('Login error', err?.response?.data || err.message);
      const validation = err?.response?.data?.errors?.[0]?.msg;
      const msg = err?.response?.data?.msg || validation || 'Login failed';
      Alert.alert('Login Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>Welcome to Task Manager</Text>
      <Text style={styles.subtitle}>Please login to continue</Text>
      
      <TextInput 
        placeholder="Email" 
        autoCapitalize="none" 
        keyboardType="email-address" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={onLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Register</Text>
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
    backgroundColor: '#2e78b7', 
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
