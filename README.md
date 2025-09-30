# 🏙️ City Explorer

**A Mobile Guide for Local Events and Food Discovery**

Discover the best events and restaurants in your city with this beautiful React Native app built with Expo.

## 📱 Features

### 🎉 Events Discovery

- Browse local events and activities
- View event details including date, time, and location
- Categories include Music 🎵, Art 🎨, Food 🍕, Entertainment 🎬, and Shopping 🛍️
- Beautiful card-based interface

### 🍽️ Food & Dining

- Explore restaurants and dining options
- View cuisine types with flag emojis (🇮🇹 Italian, 🇯🇵 Japanese, 🇲🇽 Mexican, etc.)
- Check ratings, price ranges, and operating hours
- Get location details for each restaurant

### ⭐ Saved Items (Coming Soon)

- Bookmark your favorite events and restaurants
- Quick access to your preferred venues
- Personalized recommendations

## 🛠️ Built With

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library with bottom tabs
- **@expo/vector-icons** - Beautiful icons including Ionicons
- **React Native Safe Area Context** - Safe area handling

## 📋 Prerequisites

Before running this app, make sure you have:

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac) or Android Emulator
- Expo Go app (for physical device testing)

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nyxsky404/City_Explorer.git
   cd City_Explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

### Running the App

**On iOS Simulator:**

```bash
npx expo start --ios
```

**On Android Emulator:**

```bash
npx expo start --android
```

**On Physical Device:**

1. Install Expo Go from App Store/Play Store
2. Scan the QR code from the terminal
3. The app will load on your device

## 📁 Project Structure

```
City_Explorer/
├── App.js                 # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── EventsScreen.js     # Events listing screen
│   │   ├── FoodScreen.js       # Food & dining screen
│   │   └── SavedScreen.js      # Saved items screen
│   └── data/
│       ├── eventsData.js       # Mock events data
│       └── foodData.js         # Mock food data
├── assets/                 # App icons and images
├── package.json           # Dependencies and scripts
└── .gitignore            # Git ignore rules
```

## 🎨 Screens

### Events Screen

- Displays local events in card format
- Shows event title, category badge, date/time, location, and description
- Categories have emoji indicators for easy identification

### Food Screen

- Lists restaurants and dining options
- Features cuisine type badges with country flags
- Shows ratings, price ranges, and operating hours
- Clean card-based design

### Saved Screen

- Coming soon feature for bookmarking favorites
- Will allow users to save events and restaurants
- Personalized experience

## 📦 Dependencies

```json
{
  "@expo/vector-icons": "^13.0.0",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/bottom-tabs": "^7.4.7",
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/stack": "^7.4.8",
  "expo": "~54.0.10",
  "expo-status-bar": "~3.0.8",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-screens": "^4.16.0"
}
```

## 🔧 Troubleshooting

### Common Issues

**Simulator Connection Timeout:**

```bash
# Clear cache and restart
npx expo start --clear

# Try different connection methods
npx expo start --tunnel
npx expo start --localhost
```

**Missing Dependencies:**

```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

**iOS Simulator Issues:**

```bash
# Reset simulator
xcrun simctl shutdown all
xcrun simctl erase all
```

## 🚀 Future Enhancements

- [ ] Real API integration for events and restaurants
- [ ] User authentication and profiles
- [ ] Favorites/bookmarking functionality
- [ ] Search and filtering options
- [ ] Maps integration for locations
- [ ] Reviews and ratings system
- [ ] Push notifications for new events
- [ ] Social sharing features

## 👨‍💻 Development

### Adding New Features

1. **New Screen**: Add to `src/screens/` and update navigation in `App.js`
2. **New Data**: Add mock data to `src/data/` directory
3. **Styling**: Follow the existing card-based design pattern

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Maintain consistent styling across screens
- Use descriptive variable names

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Developer:** nyxsky404  
**Repository:** [https://github.com/nyxsky404/City_Explorer](https://github.com/nyxsky404/City_Explorer)

---

⭐ **Star this repository if you found it helpful!**
