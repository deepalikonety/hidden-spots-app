# 🌍 Hidden Spots - Location-Based Community Platform

A mobile app built using **React Native (Expo)** that lets users explore, share, and rate hidden gems around **Gwalior**, India. The app is community-driven — users can add custom spots, rate their vibe, and upload images!

<p align="left">
  <img alt="Made with love" src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red">
</p>

---

## 📽️ Demo Video

📎 [Watch Demo on Google Drive](https://drive.google.com/your-demo-link-here](https://drive.google.com/file/d/1YCAUSzitvNr-O4EXiMXQdiGSu2oKBJ0f/view?usp=sharing)  
*(Replace with your actual video link)*

---

## 🚀 Features

- 📍 Interactive **map** to explore hidden spots
- ➕ **Add new locations** with photos, coordinates, and a custom vibe
- 🌈 Color-coded **vibe legend**, including user-defined ones
- 📷 **Upload up to 5 images** per spot via Expo Image Picker
- 🌟 Rate spots on **Uniqueness, Vibe, Safety, Crowd**
- 💬 **Commenting system** (name optional)
- 🗑️ **Delete** support for user-added spots
- ☁️ **Cloudinary** integration for image hosting
- 🔄 **Live syncing** between frontend and backend (MongoDB)

---

## 🛠️ Tech Stack

### 📱 Frontend

- React Native (Expo)
- `react-native-maps`
- `expo-image-picker`
- `axios`
- `@react-native-picker/picker`
- `@react-native-community/slider`

### 🌐 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- Cloudinary SDK

---

## 📂 Folder Structure

hidden-spots-project/
├── hidden-spots-app/ # Frontend (Expo React Native)
├── hidden-spots-backend/ # Backend (Express + MongoDB)


---

## 🔒 Environment Variables

Ensure you create `.env` files for both **frontend** and **backend** and **never commit them** to GitHub.

### 📱 Frontend `.env`

BACKEND_URL=http://your-local-ip:5000
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

---


> In code, access via: `import { BACKEND_URL, GOOGLE_MAPS_API_KEY } from '@env';`

### 🌐 Backend `.env`

PORT=5000
MONGO_URI=your-mongodb-uri
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

## 🧠 Future Enhancements

- 🔐 Authentication & user accounts  
- 🔖 Spot bookmarking & favoriting  
- 📊 Filter by vibe, rating, and location  
- 🌐 Offline map access & caching  
- 🏆 Featured Spots + Admin panel  

---

## 📄 License

This project was developed solely for academic and evaluation purposes.

---

Made with ❤️ by Deepali
