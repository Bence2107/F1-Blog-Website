import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({
    projectId: "angular-project-396d7",
    appId: "1:391810489463:web:9c74d7338de754c48c7a72",
    storageBucket: "angular-project-396d7.firebasestorage.app",
    apiKey: "AIzaSyDroeIVIwtcnkqmFYnBtiAmGoTAFzod6jE",
    authDomain: "angular-project-396d7.firebaseapp.com",
    messagingSenderId: "391810489463" })),
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
