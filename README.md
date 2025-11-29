# 🏙️ City Explorer - Premium Edition

**A Premium Mobile Guide for Local Events and Food Discovery**

*Featuring a sleek dark mode UI and premium user experience.*

## 📱 Demo

### 📸 Screenshots

<div align="center">
  <img src="assets/photo_2025-11-30 03.25.25.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.21.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.17.jpeg" width="30%" />
</div>
<div align="center">
  <img src="assets/photo_2025-11-30 03.25.11.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.28.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.13.jpeg" width="30%" />
</div>
<div align="center">
  <img src="assets/photo_2025-11-30 03.25.15.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.08.jpeg" width="30%" />
  <img src="assets/photo_2025-11-30 03.25.23.jpeg" width="30%" />
</div>

<br/>

Discover the best events and restaurants in your city with this beautiful React Native app built with Expo. Now featuring city-based filtering, social interactions, and a premium user experience.

## 📱 Features

### 🎨 Premium Dark UI
- **Modern Design:** A sleek, modern dark theme (`#121212`) with high-contrast elements and premium card designs.
- **Smooth Animations:** Custom transitions and micro-interactions for a polished feel.

### 📍 City-Based Discovery
- **Smart Filtering:** Automatically filters content based on your selected city (Default: **Pune**, also supports New Delhi).
- **Local Content:** Curated events and dining options specific to your location.

### 🎉 Events Discovery
- **Browse & Filter:** Find events by category (Music 🎵, Art 🎨, Comedy �, etc.), price, and date.
- **Detailed Views:** View event schedules, locations, and prices.
- **Social Actions:** Check-in to events and share with friends.

### 🍽️ Food & Dining
- **Restaurant Guide:** Explore top-rated restaurants and cafes.
- **Advanced Filters:** Filter by cuisine (🇮🇹 Italian, 🥗 Healthy, etc.), price range, and dietary preferences (Vegan, Gluten-Free).
- **Reviews:** Read and write reviews for your favorite spots.

### 👤 User Profile & Saved Items
- **Authentication:** Secure Login and Signup screens with premium styling.
- **Bookmarks:** Save your favorite events and restaurants for quick access.
- **Reminders:** Set reminders for upcoming events.

## 🛠️ Built With

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **React Navigation** - Stack and Bottom Tab navigation
- **Context API** - State management for Auth, Location, and Saved items
- **@expo/vector-icons** - Beautiful icons including Ionicons
- **React Native Safe Area Context** - Responsive layout handling

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
├── App.js                 # Main app entry & Navigation setup
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AddReviewModal.js   # Modal for adding reviews
│   │   ├── CategoryFilter.js   # Horizontal category scroll
│   │   ├── FilterModal.js      # Detailed filter modal
│   │   ├── FilterSection.js    # Section within filter modal
│   │   ├── RatingInput.js      # Star rating input
│   │   ├── ReviewCard.js       # User review display card
│   │   ├── SearchBar.js        # Search and filter header
│   │   └── SocialActions.js    # Check-in and share buttons
│   ├── context/           # State Management
│   │   ├── AuthContext.js      # Authentication state
│   │   ├── LocationContext.js  # City detection and filtering
│   │   └── SavedContext.js     # Bookmarks management
│   ├── data/              # Mock Data
│   │   ├── eventsData.js       # Events data (Pune/Delhi)
│   │   ├── foodData.js         # Restaurant data
│   │   └── notificationsData.js # Notification templates
│   ├── screens/           # Application Screens
│   │   ├── EventsScreen.js     # Events listing
│   │   ├── FoodScreen.js       # Dining listing
│   │   ├── SavedScreen.js      # User profile & saved items
│   │   ├── LoginScreen.js      # Authentication
│   │   ├── SignupScreen.js     # Registration
│   │   ├── EventDetailScreen.js # Event details view
│   │   └── FoodDetailScreen.js  # Restaurant details view
│   └── utils/             # Helper Functions
│       ├── authService.js      # Auth logic (AsyncStorage)
│       ├── mapUtils.js         # Map linking utilities
│       └── socialService.js    # Review/Check-in logic
├── assets/                # App icons and images
└── package.json           # Dependencies and scripts
```

## 🎨 Screens

### Events Screen
- **Header:** Shows current city context.
- **Search & Filter:** Powerful search bar with category chips and detailed filter modal.
- **List:** Vertical list of premium event cards.

### Food Screen
- **Dining Guide:** curated list of restaurants.
- **Rich Data:** Cuisine tags, price ratings (₹₹₹), and average cost for two.

### Profile (Saved) Screen
- **Personalized:** View your saved items and check-in history.
- **Management:** Remove items or set reminders directly from the card.

## 📦 Dependencies

```json
{
  "@expo/vector-icons": "^15.0.2",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/bottom-tabs": "^7.4.7",
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/stack": "^7.4.8",
  "expo": "~54.0.10",
  "expo-location": "~19.0.7",
  "expo-status-bar": "~3.0.8",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "react-native-maps": "1.20.1",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-screens": "^4.16.0"
}
```

## � Future Enhancements

- [ ] Real API integration (Backend)
- [ ] Live Map View for venues
- [ ] User-generated content (Photo uploads)
- [ ] Push Notifications integration
- [ ] Multi-city support (beyond Pune/Delhi)

## 👨‍💻 Development

### Adding New Features

1. **New Screen**: Add to `src/screens/` and update `App.js` navigation stacks.
2. **New Data**: Add mock data to `src/data/` directory.
3. **Styling**: Use the `StyleSheet` objects with the defined dark theme palette (`#121212`, `#1E1E1E`, `#E23744`).

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
