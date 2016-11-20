// AUTH ENDPOINT
const AUTH_PREFIX: string = '/auth';
export const LOGIN_ENDPOINT: string = AUTH_PREFIX + '/login';

const API_PREFIX: string = '/api/v1';

// ADMIN ENDPOINT
export const MEDICINE_ENDPOINT: string = API_PREFIX + '/medicines';
export const CLINIC_ENDPOINT: string = API_PREFIX + '/clinics';

export const PATIENT_ENDPOINT: string = API_PREFIX + '/patients';
export const DOCTOR_ENDPOINT: string = API_PREFIX + '/doctors';
export const NURSE_ENDPOINT: string = API_PREFIX + '/nurses';
export const STAFF_ENDPOINT: string = API_PREFIX + '/staffs';
export const PHARMACIST_ENDPOINT: string = API_PREFIX + '/pharmacists';

// DOCTOR ENDPOINT
export const SCHEDULE_ENDPOINT: string = API_PREFIX + '/schedules';
export const WORKDAY_ENDPOINT: string = API_PREFIX + '/workdays';
export const APPOINTMENT_ENDPOINT: string = API_PREFIX + '/appointments';

// NURSE ENDPOINT
export const PATIENT_RECORD_ENDPOINT: string = API_PREFIX + '/patientRecords';

// PHARMACIST ENDPOINT
export const DIAGNOSIS_RESULT_ENDPOINT: string = API_PREFIX + '/diagnosisResults';