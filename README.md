# Sistem Manajemen Keuangan Rumah Sakit

Aplikasi sistem manajemen keuangan rumah sakit yang dibuat dengan Node.js, Express, dan EJS.

## Features

- **Main Dashboard**: Overall financial performance and metrics from both accounting and treasury departments
- **Treasury Management**: Manage bills, payments, and cash flow efficiently
- **Accounting System**: Manage financial reports, balance sheets, income statements, and general ledger

## Role-Based Access

- **Admin**: Full access to all dashboards and features
- **Treasurer**: Access to treasury management features
- **Accountant**: Access to accounting features

## Deploy ke Netlify

Langkah-langkah untuk men-deploy aplikasi ke Netlify:

1. **Login ke Netlify**

   - Buat akun di [Netlify](https://www.netlify.com/) jika belum punya
   - Login ke dashboard Netlify

2. **Deploy dari GitHub**

   - Klik tombol "New site from Git"
   - Pilih GitHub sebagai penyedia Git
   - Pilih repositori yang berisi aplikasi ini
   - Konfigurasi deployment:
     - Branch: `main` atau `master`
     - Build command: `npm run build`
     - Publish directory: `public`

3. **Konfigurasi Environment Variables**

   - Pergi ke Site settings > Build & deploy > Environment
   - Tambahkan variabel lingkungan yang diperlukan (jika ada)

4. **Konfigurasi Functions**

   - Pastikan konfigurasi netlify.toml sudah benar
   - Netlify akan menjalankan fungsi serverless dari folder `functions`

5. **Deploy Ulang**

   - Klik "Trigger deploy" untuk men-deploy ulang jika diperlukan

## Keterbatasan Netlify untuk Aplikasi Server

Perlu diingat bahwa Netlify utamanya didesain untuk website statis. Beberapa keterbatasan ketika menggunakan Netlify Functions untuk aplikasi server:

1. **Database**: Tidak ada database persisten. Untuk solusi penuh, pertimbangkan:
   - Menggunakan layanan database eksternal (MongoDB Atlas, Supabase, dll)
   - Beralih ke platform yang mendukung penuh aplikasi server (Heroku, Render, Railway)

2. **Session**: Session berbasis memori tidak akan bertahan lama. Pertimbangkan:
   - Menggunakan JWT untuk autentikasi
   - Menggunakan penyimpanan session eksternal

3. **Cold Start**: Netlify Functions memiliki "cold start" di mana fungsi yang jarang diakses akan membutuhkan waktu saat pertama kali dipanggil.

## Alternatif Hosting

Untuk aplikasi server Express.js penuh, pertimbangkan platform hosting berikut:

- **Render**: Mendukung aplikasi server Node.js dan memiliki lapisan gratis
- **Railway**: Platform hosting modern dengan pengalaman developer yang baik 
- **Vercel**: Terutama untuk JAMstack tetapi juga mendukung serverless functions
- **Heroku**: Platform populer dengan dukungan baik untuk Node.js (berbayar)

## Local Development

```bash
# Install dependencies
npm install

# Run in development with hot reload
npm run dev

# Run in production
npm start
```

## Default Users

For testing purposes, the system comes with pre-configured users:

| Role       | Email                   | Password  |
|------------|-------------------------|-----------|
| Admin      | admin@hospital.com      | admin123  |
| Treasurer  | treasurer@hospital.com  | admin123  |
| Accountant | accountant@hospital.com | admin123  |

## Project Structure

```
hospital-finance-management/
├── config/                 # Configuration files
├── controllers/            # Route controllers
├── middlewares/            # Middleware functions
├── models/                 # Data models
├── public/                 # Static files (CSS, JS, images)
│   ├── css/                
│   ├── js/                 
│   └── img/                
├── routes/                 # Route definitions
├── views/                  # EJS templates
│   ├── accounting/         # Accounting dashboard views
│   ├── auth/               # Authentication views
│   ├── dashboard/          # Main dashboard views
│   ├── layouts/            # Layout templates
│   └── treasurer/          # Treasury dashboard views
├── server.js               # Application entry point
├── package.json            
└── README.md               
```

## Future Enhancements

- Database integration with MySQL/MongoDB
- Advanced reporting features
- Invoice generation
- Patient billing integration
- API for mobile application access

## License

This project is licensed under the MIT License - see the LICENSE file for details. 