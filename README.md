# 🌍 Hidden Spots - Location-Based Community Platform

A mobile application developed using React Native (Expo) that enables users to discover, add, and rate hidden locations across **Gwalior**, India. The platform supports user-generated content including photos, ratings, and vibe tagging, making it a community-driven explorer tool.

<p align="left">
  <img alt="Made with love" src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red">
</p>

---

## 🚀 Features

- 📍 Map-based interface to explore hidden spots
- ➕ Add new spots with images, coordinates, and a custom vibe
- 🌈 Live color-coded vibe legend (including custom vibes)
- 📷 Upload up to 5 images per spot via Expo Image Picker
- 🌟 Rate each spot on uniqueness, vibe, safety, and crowd
- 💬 Add user comments with optional name
- 🗑️ Delete support for user-added spots
- ☁️ Cloudinary integration for optimized image storage
- 🧠 Backend API powered by Express.js and MongoDB

---

## 🛠️ Tech Stack

### 📱 Frontend
- React Native (Expo)
- react-native-maps
- expo-image-picker
- axios
- @react-native-picker/picker
- @react-native-community/slider

### 🌐 Backend
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary SDK

---

## 📂 Project Structure

hidden-spots-project/
├── hidden-spots-app/ # Frontend (React Native)
├── hidden-spots-backend/ # Backend (Express + MongoDB)

---

## 🔒 Environment Variables

> Ensure `.env` files are added to `.gitignore` and not pushed to the repository.

### `.env` (Frontend)
```env
BACKEND_URL=http://your-local-ip:5000
GOOGLE_MAPS_API_KEY=your-api-key

PORT=5000
MONGO_URI=your-mongo-uri
CLOUDINARY_NAME=cloudinary-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

📌 Future Enhancements
🔐 Authentication and user accounts

🔖 Spot bookmarking / favoriting

📊 Sorting and filtering by rating

🌐 Offline access and caching

📄 License
This project is for educational and evaluation purposes only.

Made with ❤️ by Deepali
