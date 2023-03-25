import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCUHh1hkhved5rBpCXLpeZnrbHqIO0xnyc',
  authDomain: 'piola-imagenes.firebaseapp.com',
  projectId: 'piola-imagenes',
  storageBucket: 'piola-imagenes.appspot.com',
  messagingSenderId: '795425240149',
  appId: '1:795425240149:web:ed8c93d58c5d89019f90dc'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export const uploadFile = async (file, name) => {
  const storageRef = ref(storage, name)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
