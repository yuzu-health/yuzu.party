import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import { P as PUBLIC_FIREBASE_STORAGE_BUCKET } from "./public.js";
const SECRET_TWILIO_ACCOUNT_SID = "AC56566f84ff4303173778114b015e07da";
const SECRET_TWILIO_AUTH_TOKEN = "241f372c731c5fee967658eb05aeb3b9";
const SECRET_TWILIO_PHONE_NUMBER = "+19804002150";
const SECRET_FIREBASE_SERVICE_ACCOUNT_KEY = '{"type": "service_account","project_id": "yuzu-party","private_key_id": "15e6817955403d07883b114842484a18db1f11c3","private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2MfL9acKYOpbb\\ngWGLfmbbTkzYH5MIjMJYq07nrIeZUAxbcBDbjwpLt30vfKvv2lfQFovfMU7JtA/u\\nuP6aX+ou5rF2VSlZaIYfF9euyUztgA+KiKpY8DfaU7TTAQOZyP7/TDumqV/iMN2i\\n3+SHCrY6rWEUc5K9D+O+24HPAfGW+/tySRbyzjgiqINRGfwc5PN90kOIS1P8gyTK\\nc4iS5Yp6YK6VDKY+rGFlTZGVEKwpk+FR97aA/rf2vTsvyhnM76eXXLL++UTobVIk\\nHTQpn7h8nT309mSZTNX5evMR3kDAokwIReGduQ33ANFPV9Bb9wLLp96feXerCxeL\\nXbfu+IlfAgMBAAECggEADDbsYnQ3rpBRqCT+uXpfl5j36o6wrc8PVyB3qW0rU2pG\\nxHk5OBmuiAWk0o0vfboL+bsOj4e1D4K52rhI9r0ywbLc94udZQ1uiHZxvZm98DeN\\n/ddMYaq2eTWewX1SP3ohK6kcX/+qRPYftcQALymBrrdhnccNxw0MqLFQp48qzNi5\\n8rBun1j7hIgLjeT931hzlic57A6yfZqdC1wLZxplgpmk9X/B8jtYx10UYVm//OIj\\niUaGwKEz6DXJm7m0C84dHJJlOFsVF2WVFgOo709Tkf0WQaPO+83alxL6DwjJenpw\\npFZsTsPJyu5Q8AfBvKqOEdz6tbofR+Q2GJi4pCUmYQKBgQD42W7eBUsazaKlFePg\\n9qpMNtndfWcHIEP1+zFb2QT17jpkLf+N2uBzCbgUdcNz95XSGqKRDz4UozDUbQq9\\noM7QzYfqq0WTI+nBjhACQU5AMni3Y81V1XBUDHtJm4uNkJchbUi1+xLlvfeIt9Dc\\nffyDOLP4sPkpRDLFvHkUMi74sQKBgQC7bjMASXWB90KTcOuALorPwY2D+X4W92l3\\nI2iL+1w0KCMhkcHKQZPcBVvl+bZycYiSRTcyMggoL9lwcRlf2jKJhumiZB1/jbR1\\n3Z3aKT/1VC8xg9pD+/YVJd8uSbNVNYZ9C38Gx/Pyu1nQfHOQTiRyEiTTzwcw3Di/\\n//GtYOUnDwKBgDu7XVxXou59G6RKu9c8/iWrKOJ8fmV8fjOmJvPoBMPPeh6f1+7B\\n8gxK8e+fUNoePM0g7ZKqOPmVLlxfDCv2VI5UN2LB18J45Vw7cGZKLLFGLCnBAAGx\\naPQTxuglOPszEMPKSqC78o5I6gjcLnsulpUc4D46pKQeJZ3HHr0VSqcRAoGAN17x\\n4DbTaSbD20zztbWKOqAij4eIUX6cAJ9MRnZmod3tqwAlcPv4k3pd0M35sUuLHjMm\\ngES5li20nfw7k86hOXHK2beb40/YrS1gcc/X3kEVhBpAw+7OnybGDSWmvhiG97AK\\nwdUWY3InsWjitxHuwGhNyukRZcTZWxdgrWi/qc8CgYEAisi9WvWqg7ZDwMaiIOfP\\n9WJ8ke98F+KdFCgs6TZtEfaifveCH23gXucBDVdYY0/jO9dUGgSe12lOqDqxjyqT\\n+LLg+ianO6vBIQvVTrkZPcaivOyeX4EdySfDM0/OyXuLk0HsfrxqPrpe3tEgdtK9\\nVUU0PbfiYsV+HlTJ2UNZqQc=\\n-----END PRIVATE KEY-----\\n","client_email": "firebase-adminsdk-b8zlv@yuzu-party.iam.gserviceaccount.com","client_id": "111146135642942445925","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b8zlv%40yuzu-party.iam.gserviceaccount.com"}';
const serviceAccount = JSON.parse(SECRET_FIREBASE_SERVICE_ACCOUNT_KEY);
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://" + PUBLIC_FIREBASE_STORAGE_BUCKET
});
const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true });
const storage = getStorage(app);
const auth = getAuth(app);
export {
  SECRET_TWILIO_PHONE_NUMBER as S,
  auth as a,
  SECRET_TWILIO_ACCOUNT_SID as b,
  SECRET_TWILIO_AUTH_TOKEN as c,
  db as d,
  storage as s
};
