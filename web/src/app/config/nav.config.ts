const rootPath = {
    patient: '/patient/',
    doctor: '/doctor/',
    nurse: '/nurse/',
    pharmacist: '/pharmacist/',
    staff: '/staff/',
    admin: '/admin/'
}

export const PATIENT_ROLE_NAV = {
    class: 'patient-role',
    links : [
        {
            url: rootPath.patient + 'view-appointment',
            iconClass: 'fa fa-calendar',
            text: 'ดูการนัดหมาย'
        },
        {
            url: rootPath.patient + 'make-appointment',
            iconClass: 'fa fa-calendar-plus-o',
            text: 'นัดหมายแพทย์'
        }
    ]
}

export const DOCTOR_ROLE_NAV = {
    class: 'doctor-role',
    links : [
        {
            url: rootPath.doctor + 'manage-workday',
            iconClass: 'fa fa-calendar',
            text: 'จัดการวันออกตรวจ'
        },
        {
            url: rootPath.doctor + 'add-workday',
            iconClass: 'fa fa-calendar-plus-o',
            text: 'เพิ่มวันออกตรวจ'
        },
        {
            url: rootPath.doctor + 'start-working',
            iconClass: 'fa fa-stethoscope',
            text: 'ตรวจผู้ป่วย'
        }
    ]
}

export const NURSE_ROLE_NAV = {
    class: 'nurse-role',
    links : [
        {
            url: rootPath.nurse + 'view-today-patient',
            iconClass: 'fa fa-users',
            text: 'ดูรายการผู้ป่วยวันนี้'
        }
    ]
}

export const PHARMACIST_ROLE_NAV = {
    class: 'pharmacist-role',
    links : [
        {
            url: rootPath.pharmacist + 'view-prescription',
            iconClass: 'fa fa-medkit',
            text: 'ดูรายการสั่งยาวันนี้'
        }
    ]
}

export const STAFF_ROLE_NAV = {
    class: 'staff-role',
    links : [
        {
            url: rootPath.staff + 'manage-appointment',
            iconClass: 'fa fa-plus-square',
            text: 'จัดการการนัดหมาย'
        },
        {
            url: rootPath.staff + 'make-appointment',
            iconClass: 'fa fa-plus',
            text: 'เพิ่มการนัดหมาย'
        },
        {
            url: rootPath.staff + 'manage-workday',
            iconClass: 'fa fa-calendar',
            text: 'จัดการวันออกตรวจแพทย์'
        }
    ]
}

export const ADMIN_ROLE_NAV = {
    class: 'admin-role',
    links : [
        {
            url: rootPath.admin + 'personnel-management',
            iconClass: 'fa fa-users',
            text: 'จัดการข้อมูลบุคลากร'
        },
        {
            url: rootPath.admin + 'medicine-management',
            iconClass: 'fa fa-medkit',
            text: 'จัดการข้อมูลยา'
        },
        {
            url: rootPath.admin + 'clinic-management',
            iconClass: 'fa fa-hospital-o',
            text: 'จัดการข้อมูลแผนก'
        }
    ]
}

