# 📚 RFID Book Management Dashboard (Firebase)

Proyek ini adalah sistem dashboard berbasis web untuk mengelola peminjaman buku menggunakan teknologi **RFID** dan **Firebase Realtime Database**. Sistem ini memungkinkan pencatatan buku baru, pemantauan status buku secara *real-time*, serta pencatatan riwayat peminjaman otomatis.

## 🚀 Fitur Utama

* **Pendaftaran Buku (Create)**: Menambahkan buku baru ke sistem menggunakan UID kartu RFID dan nama buku.
* **Monitoring Real-time (Read)**: Daftar buku diperbarui secara otomatis tanpa *refresh* halaman berkat integrasi Firebase.
* **Riwayat Peminjaman**: Mencatat aktivitas peminjaman dan pengembalian lengkap dengan stempel waktu (*timestamp*).
* **Indikator Status**: Visualisasi status buku yang jelas (Hijau untuk "TERSEDIA" dan Merah untuk "DIPINJAM").
* **Integrasi IoT Ready**: Dirancang untuk bekerja selaras dengan modul ESP8266/ESP32 dan pemindai RFID.

## 🛠️ Teknologi yang Digunakan

* **Frontend**: HTML5, CSS3 (Modern Card UI), dan JavaScript (ES6+).
* **Backend/Database**: [Firebase Realtime Database](https://firebase.google.com/) (Version 8.10.0).
* **Hardware Compatibility**: Kompatibel dengan sistem berbasis ESP8266/ESP32 dan RFID RC522.
