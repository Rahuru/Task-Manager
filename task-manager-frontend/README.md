# Task Manager Frontend

A cross-platform mobile app built with React Native and Expo for task management with user authentication.

## Features

- ✅ Cross-platform support (iOS, Android, Web)
- ✅ User authentication with JWT
- ✅ Task CRUD operations
- ✅ Task filtering (All, Pending, Completed)
- ✅ Due date management
- ✅ Offline token storage with AsyncStorage
- ✅ Auto-login functionality
- ✅ Loading indicators and error handling
- ✅ Input validation
- ✅ Responsive UI design
- ✅ Pull-to-refresh functionality
- ✅ Overdue task highlighting

## Setup

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (macOS) or Android Studio (for emulators)
- Expo Go app on your mobile device (optional)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Backend URL**
   The app automatically detects the backend URL based on the platform:
   - Web: Uses current hostname
   - Mobile: Uses localhost (configure your local IP in `utils/api.js` if needed)
   
   For production, set `EXPO_PUBLIC_API_HOST` environment variable.

3. **Start the Development Server**
   ```bash
   # Start Expo development server
   npm start
   
   # Or platform-specific
   npm run android   # Android emulator/device
   npm run ios       # iOS simulator
   npm run web       # Web browser
   ```

## Project Structure

```
frontend/
├── components/
│   ├── TaskItem.js        # Task list item component
│   ├── Button.js          # Custom button component
│   └── InputField.js      # Custom input component
├── navigation/
│   └── AppNavigator.js    # Navigation configuration
├── screens/
│   ├── LoginScreen.js     # Login functionality
│   ├── RegisterScreen.js  # User registration
│   ├── TaskListScreen.js  # Task management
│   ├── AddTaskScreen.js   # Add/Edit tasks
│   └── SplashScreen.js    # Loading screen
├── utils/
│   ├── api.js            # API configuration
│   └── auth.js           # Authentication utilities
├── assets/            # Images and icons
├── App.js             # Main app component
├── app.json           # Expo configuration
└── package.json       # Dependencies
```

## Screens

### Authentication Flow
- **Login Screen**: Email/password authentication
- **Register Screen**: User registration with auto-login
- **Splash Screen**: Initial loading and token verification

### Main App Flow
- **Task List Screen**: View, filter, and manage tasks
- **Add/Edit Task Screen**: Create new tasks or edit existing ones

## Key Features

### Authentication
- JWT token stored securely in AsyncStorage
- Automatic login on app launch
- Logout functionality with token cleanup

### Task Management
- Create tasks with title, description, and due date
- Mark tasks as completed/pending
- Edit existing tasks
- Delete tasks with confirmation
- Filter tasks by status (All/Pending/Completed)

### User Experience
- Loading indicators during API calls
- Error handling with user-friendly messages
- Pull-to-refresh on task list
- Visual indicators for overdue tasks
- Responsive design for different screen sizes

## API Integration

The app communicates with the backend API using Axios:
- Base URL automatically configured for development/production
- JWT token automatically attached to requests
- Comprehensive error handling
- Request/response logging for debugging

## Building for Production

### Web Build
```bash
npx expo export:web
```

### Mobile Build
```bash
# Create development build
npx expo build:android
npx expo build:ios

# Or use EAS Build (recommended)
npx expo install @expo/cli
eas build --platform android
eas build --platform ios
```

## Deployment Options

### Web Deployment
- **Vercel**: Connect GitHub repository for automatic deployment
- **Netlify**: Drag and drop build folder or connect repository
- **GitHub Pages**: Deploy static build

### Mobile App Distribution
- **Expo Go**: For development and testing
- **App Store**: iOS app distribution
- **Google Play Store**: Android app distribution
- **Internal Distribution**: Using Expo Development Build

## Environment Variables

- `EXPO_PUBLIC_API_HOST`: Backend hostname for mobile builds

## Troubleshooting

### Common Issues

1. **Network Error on Mobile**
   - Ensure backend server is accessible from your device
   - Update `EXPO_PUBLIC_API_HOST` or modify `utils/api.js`

2. **Authentication Issues**
   - Check AsyncStorage for stored tokens
   - Verify backend JWT secret configuration

3. **Build Errors**
   - Clear Expo cache: `expo r -c`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple platforms
5. Submit a pull request

## Configuration

- Set `EXPO_PUBLIC_API_URL` to point to your backend.
  - Development example: `http://<your-computer-ip>:5000`
  - Production example: `https://your-deployed-backend.onrender.com`
- The app auto-detects a token at startup and navigates to Task List when present.

## Start

```
npm install
npm start
```

Open on Android/iOS simulators or web as preferred.

## Environment

Ensure backend is running on port 5000.

## Notes

- JWT is stored in AsyncStorage and attached as both `x-auth-token` and `Authorization` headers.
- Check the console (browser DevTools or Metro logs) for request/response logs.


