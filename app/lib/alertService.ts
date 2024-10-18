// alertService.ts
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addRateAlert = async (title: string, value: number, currency: string) => {
  try {
    const docRef = await addDoc(collection(db, 'rateAlerts'), {
      title,
      value,
      currency,
      createdAt: new Date(),
    });
    console.log('Rate alert added with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding rate alert:', e);
  }
};

export const getRateAlerts = async () => {
  const querySnapshot = await getDocs(collection(db, 'rateAlerts'));
  const alerts: any[] = [];
  querySnapshot.forEach((doc) => {
    alerts.push({ id: doc.id, ...doc.data() });
  });
  return alerts;
};


export const checkAlertTrigger = async (alert: { value: number, currency: string }) => {
  const response = await fetch(`https://web-api.vance.club/public/api/currency-converter/forex?code=${alert.currency}INR%3DX&timeline=1M`)
  const data = await response.json()
  
  for (const item of data) {
    if (parseFloat(item.close) >= alert.value) {
      return new Date(item.resDate).toLocaleDateString('en-GB')
    }
  }
  
  return undefined
}