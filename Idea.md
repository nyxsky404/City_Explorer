# City Explorer

---

### **1. Project Title**
*City Explorer: A Mobile Guide for Local Events and Food Discovery*

---

### **2. Your Name & Roll Number**
*Sumit Kumar – 2024-B-30092007*

---

### **3. Problem Statement**
*For residents and tourists in a city, finding interesting local events and unique food spots often requires Browse multiple apps and websites (e.g., one for events, another for restaurant reviews). This fragmented discovery process is inefficient and can lead to users missing out on experiences. This project aims to solve this by creating a single, curated platform for discovering things to do and places to eat within a city.*

---

### **4. Proposed Solution**
*A cross-platform mobile application, "City Explorer," that serves as a centralized hub for discovering local events and food spots. The app will feature separate, easy-to-navigate sections for events (like concerts, workshops) and food discovery. Users will be able to view details, see locations on a map, and save their favorite finds for later, all within a clean and intuitive interface.*

---

### **5. Key Features**
* **Dual Discovery Feeds**: Separate, scrollable lists for "Events" and "Food" to provide a clear and organized user experience.
* **Interactive Detail Screens**: Tapping on any item opens a detailed view with a description, images, and other relevant information.
* **Embedded Map View**: Integration with `react-native-maps` on the detail screen to visually display the location of each event or restaurant.
* **Local Favorites/Bookmarking**: A "Save" feature that allows users to bookmark items. These saved items will persist on the user's device using `AsyncStorage`.
* **Dynamic Data Integration**: The app will initially be built with mock data and will later fetch live, dynamic content from free public APIs (e.g., TheMealDB for food).
* **Tab-Based Navigation**: Simple, intuitive navigation using a bottom tab bar to switch between the main sections of the app (Events, Food, Saved).

---

### **6. Target Users**
*City residents looking for new experiences, tourists exploring the city, and students or young professionals seeking weekend plans.*

---

### **7. Technology Stack**
* **Mobile Framework**: React Native
* **Language**: JavaScript (ES6+)
* **Navigation**: React Navigation (for Tab and Stack navigators)
* **UI Components**: React Native Paper (for Material Design components like Cards, Buttons)
* **Maps**: `react-native-maps`
* **Local Storage**: `AsyncStorage`
* **API Communication**: `fetch` API or `Axios`

---

### **8. Expected Outcome**
*A fully functional, cross-platform (iOS and Android) mobile application with a polished and responsive UI. The app will successfully display data from a mock or live API, allow users to view details on an interactive map, and save their favorite items locally on their device.*

---

### **9. Additional Notes (Optional)**
* **Challenge**: The initial setup of `react-native-maps` can be complex as it requires native configuration for both iOS and Android. This will be a key learning milestone.
* **Reference Apps**: Inspired by the discovery features of apps like *District by Zomato* and *Eventbrite*.