# DocCare Go

<img src="./web/src/assets/img/logo_horizontal.png" align="center">

> Term Project รายวิชา Software Engineering คณะวิศวกรรมศาสตร์ ภาควิชาวิศวกรรมคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย ปีการศึกษา 2559 พัฒนาโดยกลุ่ม Hospital Again? โดยใช้ชุด MEAN Stack ในการพัฒนา

DocCare Go คือระบบจัดการการนัดหมายของผู้ป่วยนอก (OPD - Out Patient Department) โดยเป็นเพียงแค่**โจทย์สมมติที่ใช้ในรายวิชา Software Engineering เท่านั้น**ไม่ใช่ระบบที่มีการนำไปใช้จริงหรือใช้งานในเชิงการค้าแต่อย่างใด สามารถนำไปเป็นตัวอย่างในกรณีศึกษาของการพัฒนาทำ Web Application ขนาดใหญ่ก็ได้

# Project Tools
- **Angular 2** สำหรับ Front-End framework พัฒนาโดยใช้ภาษา TypeScript
- **Node.js** สำหรับ Server-Side ที่เขียนโดยภาษา JavaScript
- **ExpressJS** Framework ของ Node.js ในการทำ API Back-End
- **MongoDB** สำหรับระบบจัดการฐานข้อมูล
- **Mongoose** ที่ทำให้จัดทำระบบฐานข้อมูลในลักษณะ Model-Base
- **Bulma** สำหรับ CSS Framework
- **Font-Awesome** สำหรับ icon ทั้งหมดในแอพ
- **MomentJS** สำหรับจัดการ Date-Time
- **JSON Web Token (JWT)** สำหรับการทำ Authentication
- **Chai** สำหรับการทำ Test และ API Testing
- **Webpack** สำหรับการทำ Module Bundler
- **Gulp** สำหรับทำ Task Runner
- **Docker** สำหรับการ Deployment

# Prerequisite
สำหรับคนที่ต้องการทดลอง Build ดู ต้องมีการติดตั้ง **Node.js เวอร์ชัน 6.0 เป็นต้นไป, gulp-cli และ webpack** โดยติดตั้ง gulp-cli และ webpack ได้ โดยใช้คำสั่ง

```
npm install -g webpack gulp-cli
```

# Project Setup & Build
- Clone โปรเจค หรือ Download Source Code
- ติดตั้ง Library ที่ต้องใช้ โดยสั่ง `npm install`
- Build โค้ดต้นฉบับ (Source Code) โดยใช้คำสั่ง `npm run build:dev`
- Copy ไฟล์ `.env.example` ไปเป็น `.env` และทำการแก้ค่าตามที่ต้องการใน `.env`
- เปิด Server โดยสั่ง `npm start`

**หมายเหตุ**: หากมีการตั้งค่า `.env` โดยให้ APP_DEBUG=false ให้ทำการ Build โปรเจคให้เป็น Production-Ready ก่อน โดยสั่ง `npm run build:prod`

# Project Seeder API
ระบบที่พัฒนาขึ้นมา ได้มีการ mock ข้อมูลเพื่อทดสอบการใช้งานระบบ โดยสามารถสร้างข้อมูลทดสอบดังกล่าวได้ ผ่านทาง Seeder API ดังต่อไปนี้ โดยสามารถใช้ Tool ใดๆ ก็ได้ที่สามารถสร้าง HTTP Request ได้ เช่น Postman ดังนี้ (โปรดทำตามลำดับ)
- POST /seed/admin
- POST /seed/default/facility
- POST /seed/default/data
- POST /seed/default/user

# Docker
สามารถ Deployment ระบบไว้ใช้งานได้ผ่าน Docker โดยสั่ง `npm run docker:build` เพื่อ Build และสั่งเปิดได้ผ่าน `npm run docker:start`