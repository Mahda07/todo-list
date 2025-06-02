import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query, 
  orderBy,
  where
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyCfqZD7UZZt-GWmtNhfJyksrv3-8ENRjto",
  authDomain: "insan-cemerlang-d5574.firebaseapp.com",
  projectId: "insan-cemerlang-d5574",
  storageBucket: "insan-cemerlang-d5574.appspot.com",
  messagingSenderId: "1035937160050",
  appId: "1:1035937160050:web:6d77d3874c3f78b2811beb",
  measurementId: "G-EVVQ80Q08C"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarTodo() {
  try {
    const refDokumen = collection(basisdata, "todo");
    const kueri = query(refDokumen, orderBy("teks")); // Mengurutkan berdasarkan teks
    const cuplikanKueri = await getDocs(kueri);
    
    return cuplikanKueri.docs.map((dokumen) => ({
      id: dokumen.id,
      teks: dokumen.data().teks,
      status: dokumen.data().status
    }));
  } catch (error) {
    console.error("Gagal mengambil data todo:", error);
    return [];
  }
}

export async function tambahTodo(teks) {
  try {
    // Menyimpan data ke Firestore
    const refDokumen = await addDoc(collection(basisdata, "todo"), {
      teks: teks,
      status: false // status default: belum selesai
    });
    
    // Menampilkan pesan berhasil
    console.log("Berhasil menyimpan todo");
    return refDokumen.id;
  } catch (e) {
    // Menampilkan pesan gagal
    console.log("Gagal menyimpan todo: " + e);
    return null;
  }
}