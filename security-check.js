#!/usr/bin/env node

/**
 * Security Check Script
 * Run this before submitting to ensure no sensitive data is exposed
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Running Security Check...\n');

let issues = [];

// Check for .env files
function checkEnvFiles() {
  console.log('📁 Checking for .env files...');
  
  const envFiles = [
    '.env',
    'task-manager-backend/.env',
    'task-manager-frontend/.env',
    '.env.local',
    '.env.production'
  ];
  
  envFiles.forEach(file => {
    if (fs.existsSync(file)) {
      issues.push(`❌ Found .env file: ${file} - This should not be committed!`);
    } else {
      console.log(`✅ No .env file found: ${file}`);
    }
  });
}

// Check for hardcoded secrets in code
function checkHardcodedSecrets() {
  console.log('\n🔍 Checking for hardcoded secrets...');
  
  const patterns = [
    { pattern: /mongodb\+srv:\/\/[^@]+@/, message: 'Hardcoded MongoDB URI found' },
    { pattern: /jwt_secret.*=.*['"][^'"]{20,}['"]/, message: 'Hardcoded JWT secret found' },
    { pattern: /password.*=.*['"][^'"]{8,}['"]/, message: 'Hardcoded password found' },
    { pattern: /api_key.*=.*['"][^'"]{10,}['"]/, message: 'Hardcoded API key found' }
  ];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.includes('node_modules')) {
        scanDirectory(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        patterns.forEach(({ pattern, message }) => {
          if (pattern.test(content)) {
            issues.push(`❌ ${message} in ${filePath}`);
          }
        });
      }
    });
  }
  
  scanDirectory('.');
  
  if (issues.length === 0) {
    console.log('✅ No hardcoded secrets found');
  }
}

// Check .gitignore
function checkGitignore() {
  console.log('\n📋 Checking .gitignore files...');
  
  const gitignoreFiles = [
    '.gitignore',
    'task-manager-backend/.gitignore',
    'task-manager-frontend/.gitignore'
  ];
  
  gitignoreFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('.env')) {
        console.log(`✅ .env is in .gitignore: ${file}`);
      } else {
        issues.push(`❌ .env not found in .gitignore: ${file}`);
      }
    } else {
      issues.push(`❌ Missing .gitignore: ${file}`);
    }
  });
}

// Check for .env.example files
function checkEnvExamples() {
  console.log('\n📄 Checking for .env.example files...');
  
  const exampleFiles = [
    'task-manager-backend/.env.example',
    'task-manager-frontend/.env.example'
  ];
  
  exampleFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ Found .env.example: ${file}`);
    } else {
      issues.push(`❌ Missing .env.example: ${file}`);
    }
  });
}

// Run all checks
checkEnvFiles();
checkHardcodedSecrets();
checkGitignore();
checkEnvExamples();

// Summary
console.log('\n' + '='.repeat(50));
console.log('🔒 SECURITY CHECK SUMMARY');
console.log('='.repeat(50));

if (issues.length === 0) {
  console.log('✅ All security checks passed!');
  console.log('🎉 Your project is ready for submission!');
} else {
  console.log('❌ Security issues found:');
  issues.forEach(issue => console.log(issue));
  console.log('\n🔧 Please fix these issues before submitting.');
}

console.log('\n📋 Remember:');
console.log('- Never commit .env files');
console.log('- Use .env.example as a template');
console.log('- Set real values only in your local .env file');
console.log('- Use environment variables in production');
