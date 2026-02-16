// ====================================================================
var firebaseConfig = {
    apiKey: "", 
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const refPeminjaman = db.ref('peminjaman');
const refRiwayat = db.ref('riwayat');

// ====================================================================
// FUNGSI UMUM
// ====================================================================

function showMessage(msg, type = 'success') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.style.display = 'block';
    if (type === 'success') {
        messageEl.style.backgroundColor = '#d4edda';
        messageEl.style.color = '#155724';
    } else { 
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
    }
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 4000);
}

// ====================================================================
// 1. TAMBAH BUKU BARU (CREATE)
// ====================================================================

document.getElementById('tambahBukuBtn').addEventListener('click', () => {
    const uidBuku = document.getElementById('uidBuku').value.toUpperCase().trim();
    const namaBuku = document.getElementById('namaBuku').value.trim();

    if (!uidBuku || !namaBuku) {
        showMessage('UID dan Nama Buku harus diisi!', 'error');
        return;
    }

    refPeminjaman.child(uidBuku).once('value', (snapshot) => {
        if (snapshot.exists()) {
            showMessage(`Buku dengan UID ${uidBuku} sudah terdaftar.`, 'error');
            return;
        }

        const dataBuku = {
            nama: namaBuku, // Menyimpan nama buku
            status: 'tersedia', // Status awal sesuai permintaan
            waktu: new Date().toISOString()
        };

        refPeminjaman.child(uidBuku).set(dataBuku)
            .then(() => {
                showMessage(`Buku "${namaBuku}" (UID: ${uidBuku}) berhasil ditambahkan.`);
                document.getElementById('uidBuku').value = '';
                document.getElementById('namaBuku').value = '';
            })
            .catch(error => {
                showMessage(`Gagal menambahkan buku: ${error.message}`, 'error');
            });
    });
});


// ====================================================================
// 2. DAFTAR BUKU (READ - Realtime)
// ====================================================================

const daftarBukuBody = document.querySelector('#daftarBukuTable tbody');

refPeminjaman.on('value', (snapshot) => {
    daftarBukuBody.innerHTML = '';

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const uid = childSnapshot.key;
            const data = childSnapshot.val();

            const row = daftarBukuBody.insertRow();
            row.insertCell(0).textContent = uid;
            row.insertCell(1).textContent = data.nama || 'Nama Tidak Tersedia';
            
            const statusCell = row.insertCell(2);
            const statusText = data.status || 'tersedia';
            statusCell.textContent = statusText.toUpperCase();
            
            if (statusText === 'dipinjam') {
                statusCell.style.color = 'red';
                statusCell.style.fontWeight = 'bold';
            } else { // status "tersedia"
                statusCell.style.color = 'green';
            }
        });
    } else {
        const row = daftarBukuBody.insertRow();
        row.insertCell(0).textContent = 'N/A';
        row.insertCell(1).textContent = 'Belum ada buku terdaftar.';
        row.insertCell(2).textContent = '';
    }
});


// ====================================================================
// 3. RIWAYAT PEMINJAMAN (READ - Realtime)
// ====================================================================

const riwayatPeminjamanBody = document.querySelector('#riwayatPeminjamanTable tbody');

refRiwayat.on('value', async (snapshot) => {
    riwayatPeminjamanBody.innerHTML = ''; 

    if (!snapshot.exists()) return;

    // Ambil semua data buku dari /peminjaman/ untuk mendapatkan nama
    const bukuSnapshot = await refPeminjaman.once('value');
    const bukuData = bukuSnapshot.val() || {}; 

    let allRiwayat = [];

    snapshot.forEach((uidSnapshot) => {
        const uid = uidSnapshot.key;
        // Ambil nama buku dari data utama
        const namaBuku = bukuData[uid] ? bukuData[uid].nama : 'Buku Tidak Dikenal (' + uid + ')';

        uidSnapshot.forEach((riwayatKeySnapshot) => {
            const riwayat = riwayatKeySnapshot.val();
            
            allRiwayat.push({
                namaBuku: namaBuku,
                keterangan: riwayat.aksi || 'Status Tidak Diketahui', // Menggunakan 'aksi' (dikembalikan/dipinjam)
                waktu: riwayat.waktu || riwayatKeySnapshot.key.replace(/_/g, ' ')
            });
        });
    });

    // Urutkan riwayat berdasarkan waktu (terbaru di atas)
    allRiwayat.sort((a, b) => new Date(b.waktu) - new Date(a.waktu));

    allRiwayat.forEach(item => {
        const row = riwayatPeminjamanBody.insertRow();
        row.insertCell(0).textContent = item.namaBuku;
        row.insertCell(1).textContent = item.keterangan.toUpperCase();
        row.insertCell(2).textContent = item.waktu;
    });

});