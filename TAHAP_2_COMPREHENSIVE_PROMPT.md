# DJ PORTAL SOUNDCLOUD-LIKE - TAHAP 2 COMPREHENSIVE PROMPT

## 🎯 OVERVIEW PROJECT

**Project Name:** DJ Portal - SoundCloud-like Music Platform  
**Current Stage:** Tahap 2 - User Dashboard & Track Details  
**Previous Stage Completed:** Tahap 1 - Basic Authentication & Upload System  
**Next Stage:** Tahap 3 - Google Drive/Sheets Integration & Deployment  

**Repository Reference (Tahap 1):**
- GitHub: https://github.com/supportbjk-sketch/dj-portal-soundcloud
- Tech Stack: React 18 + Vite + Tailwind CSS + React Router
- Data Storage: localStorage (akan dipindah ke Google Sheets di Tahap 3)

---

## 📋 DETAILED REQUIREMENTS - TAHAP 2

### A. HALAMAN PROFILE/DASHBOARD USER (`src/pages/Profile.jsx`)

**Access Control:**
- Hanya user yang sudah login AND status approved
- Route: `/profile`
- Protection: `<ProtectedRoute type="approved">`

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ User Info Card (kiri) | Upload Stats (kanan)        │
├─────────────────────────────────────────────────────┤
│ Nama Lengkap                                        │
│ @username | Email | Phone                           │
│ Status Badge: ✓ Approved                            │
│ Joined: [tanggal] | Total Uploads: [count]          │
│                                                     │
│ Stats Boxes:                                        │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ 5 Songs  │ │ 234      │ │ 1,250    │            │
│ │ Uploaded │ │ Downloads│ │ Plays    │            │
│ └──────────┘ └──────────┘ └──────────┘            │
├─────────────────────────────────────────────────────┤
│ My Songs / Uploads                                  │
├─────────────────────────────────────────────────────┤
│ [Filter: All | Pending | Published]                │
│                                                     │
│ ┌──────┐ Title        Remixer      Genre  2020     │
│ │Cover │ Don't Start  Dua Lipa     Pop    45 DL   │
│ └──────┘                                            │
│                                                     │
│ ┌──────┐ Title        Remixer      Genre  2020     │
│ │Cover │ Levitating   Dua Lipa     Disco  32 DL   │
│ └──────┘                                            │
│                                                     │
│ [Show More] atau Pagination                        │
├─────────────────────────────────────────────────────┤
│ [Edit Profile] [Settings] [Logout]                  │
└─────────────────────────────────────────────────────┘
```

**Components to Display:**
1. **User Info Card**
   - Avatar placeholder (bisa menggunakan initial atau icon)
   - Nama lengkap
   - @username
   - Email
   - Phone
   - Status badge (Approved/Pending/Rejected)
   - Member since date
   - Edit profile button (future phase)

2. **Statistics Section**
   - Total lagu diupload (berapa songs)
   - Total download diterima (total dari semua lagu user)
   - Total play/stream (berapa kali lagu diplay)
   - Last upload date

3. **My Uploads / My Songs Table**
   - Sortable table atau card grid
   - Columns: Cover, Judul, Remixer, Genre, Tahun, Upload Date, Download Count, Action
   - Action buttons: View, Edit (future), Delete
   - Pagination: tampilkan 10 per halaman atau infinite scroll
   - Filter options: All, This Month, This Year, Sorted by date/downloads
   - Empty state: "Belum ada lagu yang diupload"

4. **Bottom Actions**
   - Button: Upload Lagu Baru (link ke `/upload`)
   - Button: Edit Profil (future phase, disabled for now)
   - Button: Settings (future phase, disabled for now)
   - Button: Logout

---

### B. HALAMAN DETAIL TRACK (`src/pages/TrackDetail.jsx`)

**Access Control:**
- Accessible untuk semua user (guest & authenticated)
- Route: `/track/:id`
- No protection needed (public page)

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ [← Back]                                   [Share]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌──────────┐  Title: Levitating                    │
│ │  Cover   │  Remixer: Dua Lipa                    │
│ │   Art    │  Album: Future Nostalgia              │
│ │ (300x300)│  Year: 2020 | Genre: Disco Pop       │
│ │          │                                       │
│ │          │  👤 Uploaded by: Dua Lipa (@dualipa) │
│ │          │  📅 Uploaded: 12 Jan 2024             │
│ │          │  📥 45 Downloads | 350 Plays         │
│ └──────────┘                                        │
│                                                     │
├─────────────────────────────────────────────────────┤
│ Audio Player                                        │
├─────────────────────────────────────────────────────┤
│ [Play] ━━━━━━━━● ─────  3:23 / 5:00               │
│ [Volume] ━━━━━●                                    │
│                                                     │
│ [♡ Like] [⬇ Download] [📤 Share] [📋 More]      │
├─────────────────────────────────────────────────────┤
│ More from Dua Lipa:                                │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ │Don't │ │Hotter│ │Blow  │ │New   │              │
│ │Start │ │Than  │ │Your  │ │Song  │              │
│ └──────┘ └──────┘ └──────┘ └──────┘              │
├─────────────────────────────────────────────────────┤
│ Similar Genre (Disco Pop):                         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ │Song1 │ │Song2 │ │Song3 │ │Song4 │              │
│ └──────┘ └──────┘ └──────┘ └──────┘              │
└─────────────────────────────────────────────────────┘
```

**Components to Display:**
1. **Track Header**
   - Large cover art (300x300px minimum)
   - Track metadata: Judul, Remixer, Album, Tahun, Genre
   - Uploader info: nama lengkap & username (link ke profile uploader)
   - Upload date
   - Statistics: Download count, Play count, View count
   - Back button & Share button

2. **Audio Player (Reuse existing AudioPlayer component)**
   - Play/Pause button
   - Progress bar
   - Volume control
   - Current time / Duration
   - Muted indicator

3. **Action Buttons**
   - ♡ Like (future phase)
   - ⬇ Download (conditional: enabled if user approved, disabled if guest with tooltip)
   - 📤 Share (copy link)
   - 📋 More (future: report, add to playlist)

4. **Related Tracks Section**
   - "More from [Remixer]" - tampilkan 4 lagu dari remixer yang sama
   - "Similar Genre" - tampilkan 4 lagu dengan genre sama (exclude current track)
   - Gunakan TrackCard component untuk masing-masing
   - Klik untuk navigate ke track detail lain

5. **Recommendation Engine (Simple)**
   - Filter by remixer (same uploader)
   - Filter by genre (same category)
   - Exclude current track
   - Sort by most recent atau most popular

---

### C. UPDATE NAVBAR COMPONENT (`src/components/Navbar.jsx`)

**Current State:**
- Show login/register buttons if not authenticated
- Show user info if authenticated

**Required Updates:**
1. **User Profile Menu Dropdown (saat user login)**
   ```
   ┌─────────────────────────┐
   │ 👤 [Username ▼]         │
   ├─────────────────────────┤
   │ My Profile              │ → /profile
   │ Upload Lagu             │ → /upload
   │ Settings                │ → /settings (future)
   │ ─────────────────────── │
   │ Admin Panel             │ → /admin (only if admin)
   │ ─────────────────────── │
   │ Logout                  │ → logout()
   └─────────────────────────┘
   ```

2. **Desktop Menu**
   - Logo + Home link (left)
   - Search bar (center) - optional di Tahap 2
   - If guest: Login | Daftar buttons
   - If user: User dropdown menu

3. **Mobile Menu**
   - Hamburger icon
   - Same menu items dalam drawer/modal
   - Close button

4. **Visual Indicators**
   - Show approval status badge
   - Show user avatar (placeholder)
   - Highlight current page

---

### D. DATA STRUCTURE UPDATES

**Update mockData.js:**

```javascript
// Track struktur ditambah:
{
  id: 1,
  judul: 'Levitating',
  remixer: 'Dua Lipa',
  album: 'Future Nostalgia',
  tahun: 2020,
  genre: 'Disco Pop',
  uploadedBy: 'dualipa_dj',
  uploadedByUser: {  // BARU
    id: 2,
    username: 'dualipa_dj',
    namaLengkap: 'Dua Lipa',
    email: 'dua@email.com'
  },
  fileUrl: 'https://...',
  coverUrl: 'https://...',
  folderPath: 'Dua Lipa/audio/Levitating.mp3',
  createdAt: '2024-01-12',
  uploadedAt: '2024-01-12T10:30:00Z',  // BARU
  downloadCount: 45,
  playCount: 350,  // BARU
  viewCount: 500   // BARU
}
```

**Update User struktur di auth.js:**

```javascript
{
  id: 2,
  username: 'dualipa_dj',
  email: 'dua@email.com',
  password: 'pass123',
  namaLengkap: 'Dua Lipa',
  phone: '081987654321',
  role: 'user',
  status: 'approved',
  createdAt: '2024-01-11',
  joinedAt: '2024-01-11T08:00:00Z',  // BARU
  totalUploads: 2,  // BARU
  totalDownloads: 77,  // BARU (sum dari download semua track user)
  totalPlays: 682  // BARU (sum dari plays semua track user)
}
```

**Update auth.js functions:**

```javascript
// BARU: Get user stats
export const getUserStats = (username) => {
  const tracks = getTracks().filter(t => t.uploadedBy === username);
  return {
    totalUploads: tracks.length,
    totalDownloads: tracks.reduce((sum, t) => sum + (t.downloadCount || 0), 0),
    totalPlays: tracks.reduce((sum, t) => sum + (t.playCount || 0), 0),
    lastUpload: tracks[0]?.uploadedAt || null
  };
};

// BARU: Get user's tracks
export const getUserTracks = (username) => {
  return getTracks().filter(t => t.uploadedBy === username);
};

// BARU: Track play/download untuk analytics
export const incrementPlayCount = (trackId) => {
  const tracks = getTracks();
  const track = tracks.find(t => t.id === trackId);
  if (track) {
    track.playCount = (track.playCount || 0) + 1;
    localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  }
};

export const incrementDownloadCount = (trackId) => {
  const tracks = getTracks();
  const track = tracks.find(t => t.id === trackId);
  if (track) {
    track.downloadCount = (track.downloadCount || 0) + 1;
    localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  }
};

// BARU: Get track by ID
export const getTrackById = (trackId) => {
  return getTracks().find(t => t.id === parseInt(trackId));
};

// BARU: Get related tracks (same remixer)
export const getTracksByRemixer = (remixer, excludeId = null) => {
  return getTracks()
    .filter(t => t.remixer === remixer && t.id !== excludeId)
    .slice(0, 4);
};

// BARU: Get tracks by genre
export const getTracksByGenre = (genre, excludeId = null, limit = 4) => {
  return getTracks()
    .filter(t => t.genre === genre && t.id !== excludeId)
    .slice(0, limit);
};
```

---

### E. GOOGLE DRIVE & GOOGLE SHEETS BLUEPRINT

**Create file: `src/lib/googleDriveService.js`**

```javascript
/**
 * BLUEPRINT: Google Drive Service
 * Akan diimplementasikan di Tahap 3
 * 
 * Struktur Folder Google Drive yang akan digunakan:
 * DJ Portal/
 *   ├── Dua Lipa/
 *   │   ├── audio/
 *   │   │   ├── Levitating.mp3
 *   │   │   └── Don't Start Now.mp3
 *   │   └── covers/
 *   │       ├── Levitating.jpg
 *   │       └── Don't Start Now.jpg
 *   ├── The Weeknd/
 *   │   ├── audio/
 *   │   └── covers/
 *   └── Justin Bieber/
 *       ├── audio/
 *       └── covers/
 */

// PLACEHOLDER FUNCTIONS (TO BE IMPLEMENTED TAHAP 3)

/**
 * Upload audio file ke Google Drive
 * @param {File} audioFile - Audio file dari user
 * @param {string} remixerName - Nama remixer untuk folder organization
 * @param {string} trackTitle - Judul lagu untuk nama file
 * @returns {Promise<string>} - URL file di Google Drive
 */
export const uploadAudioToDrive = async (audioFile, remixerName, trackTitle) => {
  // TODO: Implement
  // 1. Authenticate dengan Google Drive API
  // 2. Check/create folder "DJ Portal"
  // 3. Check/create subfolder berdasarkan remixer name
  // 4. Check/create "audio" subfolder
  // 5. Upload file dengan nama: [trackTitle].mp3
  // 6. Make file public (add permission)
  // 7. Return shareable link
  console.log('uploadAudioToDrive not implemented');
};

/**
 * Upload cover image ke Google Drive
 * @param {File} coverFile - Cover image dari user
 * @param {string} remixerName - Nama remixer untuk folder organization
 * @param {string} trackTitle - Judul lagu untuk nama file
 * @returns {Promise<string>} - URL file di Google Drive
 */
export const uploadCoverToDrive = async (coverFile, remixerName, trackTitle) => {
  // TODO: Implement
  console.log('uploadCoverToDrive not implemented');
};

/**
 * Save track metadata ke Google Sheets
 * @param {Object} trackData - Track data dengan struktur lengkap
 * @returns {Promise<boolean>} - Success status
 */
export const saveMetadataToSheets = async (trackData) => {
  // TODO: Implement
  // 1. Authenticate dengan Google Sheets API
  // 2. Append row ke sheet "tracks"
  // 3. Row format:
  //    | ID | Judul | Remixer | Album | Tahun | Genre | 
  //    | AudioURL | CoverURL | Uploader | Status | CreatedAt | ...
  console.log('saveMetadataToSheets not implemented');
};

/**
 * Get all tracks dari Google Sheets
 * @returns {Promise<Array>} - Array of tracks
 */
export const getTracksFromSheets = async () => {
  // TODO: Implement
  // 1. Authenticate dengan Google Sheets API
  // 2. Read all rows dari sheet "tracks"
  // 3. Convert ke array of objects
  // 4. Return data
  console.log('getTracksFromSheets not implemented');
};

/**
 * Update download count untuk track
 * @param {number} trackId - Track ID
 * @returns {Promise<boolean>} - Success status
 */
export const updateTrackDownloadCount = async (trackId) => {
  // TODO: Implement
  // 1. Find row dengan track ID di Google Sheets
  // 2. Increment download_count
  // 3. Update row
  console.log('updateTrackDownloadCount not implemented');
};

/**
 * Update play count untuk track
 * @param {number} trackId - Track ID
 * @returns {Promise<boolean>} - Success status
 */
export const updateTrackPlayCount = async (trackId) => {
  // TODO: Implement
  console.log('updateTrackPlayCount not implemented');
};

/**
 * Get user info dari Google Sheets
 * @param {string} username - Username
 * @returns {Promise<Object>} - User data
 */
export const getUserFromSheets = async (username) => {
  // TODO: Implement
  console.log('getUserFromSheets not implemented');
};

/**
 * Save/Update user info ke Google Sheets
 * @param {Object} userData - User data
 * @returns {Promise<boolean>} - Success status
 */
export const saveUserToSheets = async (userData) => {
  // TODO: Implement
  console.log('saveUserToSheets not implemented');
};

export default {
  uploadAudioToDrive,
  uploadCoverToDrive,
  saveMetadataToSheets,
  getTracksFromSheets,
  updateTrackDownloadCount,
  updateTrackPlayCount,
  getUserFromSheets,
  saveUserToSheets,
};
```

**Create file: `src/config/googleConfig.js`**

```javascript
/**
 * BLUEPRINT: Google Configuration
 * Akan diisi dengan credentials di Tahap 3
 */

// TODO TAHAP 3: Isi dengan credentials
export const GOOGLE_DRIVE_CONFIG = {
  // OAuth 2.0 credentials akan diisi di Tahap 3
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  redirectUri: 'http://localhost:5173/auth/google/callback',
  
  // Folder IDs di Google Drive (akan didapat setelah setup)
  mainFolderId: 'YOUR_MAIN_FOLDER_ID', // DJ Portal folder
  
  // Scopes yang diperlukan
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets'
  ]
};

export const GOOGLE_SHEETS_CONFIG = {
  // Spreadsheet ID (akan didapat setelah setup)
  spreadsheetId: 'YOUR_SPREADSHEET_ID',
  
  // Sheet names
  sheets: {
    tracks: 'tracks',
    users: 'users',
    downloads: 'downloads_log'
  },
  
  // Column headers untuk reference
  trackColumns: [
    'id', 'judul', 'remixer', 'album', 'tahun', 'genre',
    'audioUrl', 'coverUrl', 'uploadedBy', 'uploadedByUser',
    'status', 'createdAt', 'downloadCount', 'playCount', 'viewCount'
  ],
  
  userColumns: [
    'id', 'username', 'email', 'namaLengkap', 'phone',
    'role', 'status', 'createdAt', 'totalUploads', 'totalDownloads', 'totalPlays'
  ]
};

// Helper untuk generate folder structure path
export const getFolderPath = (remixerName, fileType = 'audio') => {
  // fileType: 'audio' atau 'covers'
  return `DJ Portal/${remixerName}/${fileType}`;
};

export default {
  GOOGLE_DRIVE_CONFIG,
  GOOGLE_SHEETS_CONFIG,
  getFolderPath
};
```

---

### F. ROUTING UPDATES

**Update App.jsx:**

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import Profile from './pages/Profile';           // BARU
import TrackDetail from './pages/TrackDetail';   // BARU
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { initStorage } from './lib/auth';

export default function App() {
  initStorage();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track/:id" element={<TrackDetail />} />  {/* PUBLIC */}
        
        <Route
          path="/upload"
          element={
            <ProtectedRoute type="approved">
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute type="approved">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute type="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### G. COMPONENT MODIFICATIONS

**Update Navbar.jsx:**
- Add profile dropdown menu
- Add link to `/profile`
- Add link to `/upload`
- Show user avatar/initial
- Show approval status badge

**Update TrackCard.jsx:**
- Add onClick handler untuk navigate ke `/track/:id`
- Show play count di card (optional)
- Maintain existing download button logic

**Reuse AudioPlayer.jsx:**
- Sudah ada, tinggal diintegrasikan ke TrackDetail page
- Tambah listener untuk increment play count

---

### H. STYLING & UX

**Tailwind CSS Classes yang akan digunakan:**
- Grid layouts untuk tracks display
- Dropdown menus untuk user profile
- Responsive tables untuk uploads list
- Badge components untuk status
- Card components untuk track details
- Modal/Dialog untuk share functionality (future)

**Dark Theme:**
- Primary color: `#FF6B35` (orange)
- Secondary color: `#004E89` (dark blue)
- Background: `#0a0a0a` (near black)
- Card background: `#1a1a1a` atau `#111827`
- Text: white/gray-300/gray-400

---

## 🧪 TESTING CHECKLIST - TAHAP 2

### Navigation & Access
- [ ] User approved dapat akses `/profile`
- [ ] User pending TIDAK bisa akses `/profile` (redirect ke home)
- [ ] Guest TIDAK bisa akses `/profile`
- [ ] Semua user (guest & auth) dapat akses `/track/:id`
- [ ] Navbar menampilkan profile dropdown jika login

### Profile Page Functionality
- [ ] Tampilkan user info: nama, username, email, phone, status
- [ ] Tampilkan upload stats: total songs, total downloads, total plays
- [ ] Tampilkan list lagu user dengan pagination
- [ ] Click upload lagu → navigate ke `/upload`
- [ ] Click lagu di list → navigate ke `/track/:id`
- [ ] Logout button berfungsi

### Track Detail Page Functionality
- [ ] Tampilkan cover art besar
- [ ] Tampilkan semua metadata: judul, remixer, album, tahun, genre
- [ ] Tampilkan info uploader dengan link ke profile uploader (future)
- [ ] Tampilkan download count, play count
- [ ] Audio player berfungsi (play, pause, seek, volume)
- [ ] Click play → increment play count
- [ ] Click download (user approved) → increment download count
- [ ] Click download (guest) → button disabled dengan tooltip
- [ ] "More from [Remixer]" section tampilkan lagu dari remixer sama
- [ ] "Similar Genre" section tampilkan lagu dari genre sama
- [ ] Click track di related section → navigate ke track lain

### Navbar Updates
- [ ] Dropdown menu muncul saat user login
- [ ] Menu items berfungsi (profile, upload, logout)
- [ ] Admin dapat akses admin panel dari navbar
- [ ] Mobile menu responsive

### Data Structure
- [ ] Track memiliki: playCount, viewCount, uploadedAt, uploadedByUser object
- [ ] User memiliki: joinedAt, totalUploads, totalDownloads, totalPlays
- [ ] Auth functions dapat menghitung stats dengan benar

### Browser & Mobile
- [ ] Responsive di desktop (1920px+)
- [ ] Responsive di tablet (768px)
- [ ] Responsive di mobile (375px)
- [ ] No horizontal scroll issues

---

## 📦 DELIVERABLES - TAHAP 2

### New Files to Create:
1. `src/pages/Profile.jsx` - User profile & dashboard page
2. `src/pages/TrackDetail.jsx` - Track detail page
3. `src/lib/googleDriveService.js` - Google Drive blueprint
4. `src/config/googleConfig.js` - Google configuration blueprint

### Files to Update:
1. `src/App.jsx` - Add new routes
2. `src/components/Navbar.jsx` - Add profile menu dropdown
3. `src/lib/auth.js` - Add utility functions for stats & related tracks
4. `src/lib/mockData.js` - Update data structure
5. `package.json` - Add google-auth-library & googleapis (for Tahap 3)

### Total Effort:
- **Estimated time:** 4-6 hours untuk developer berpengalaman
- **Complexity:** Medium
- **Dependencies:** None additional (semua sudah ada)

---

## 🎯 ACCEPTANCE CRITERIA - FINAL

**Tahap 2 dianggap COMPLETE jika:**

✅ Profile page fully functional dengan semua stats & uploads list  
✅ Track detail page fully functional dengan audio player & recommendations  
✅ Navbar updated dengan profile menu  
✅ Data structure siap untuk Google Sheets integration  
✅ Google Drive/Sheets blueprint lengkap & siap diimplementasikan  
✅ Semua routes protected dengan benar  
✅ Responsive di semua ukuran device  
✅ Semua test cases di testing checklist PASSED  
✅ No console errors  
✅ Code well-structured & documented  

---

## 🚀 TAHAP 3 PREPARATION

Setelah Tahap 2 selesai, Tahap 3 akan fokus pada:

1. **Google OAuth Setup**
   - Setup Google Cloud Project
   - Create OAuth 2.0 credentials
   - Implement Google login

2. **Google Drive Integration**
   - Implement file upload ke Drive
   - Create folder structure otomatis
   - Generate shareable links

3. **Google Sheets Integration**
   - Setup Spreadsheet dengan proper schema
   - Sync data dari localStorage ke Sheets
   - Implement real-time data fetch dari Sheets

4. **Deployment**
   - Deploy ke Vercel / Netlify
   - Setup environment variables
   - Testing di production

5. **Monitoring & Optimization**
   - Setup error tracking
   - Optimize performance
   - Add loading states & error handling

---

## 📝 IMPORTANT NOTES

1. **Backward Compatibility:**
   - Semua fungsi baru harus backward compatible dengan Tahap 1
   - Mock data tetap menggunakan localStorage di Tahap 2
   - Migration ke Google Sheets hanya di Tahap 3

2. **Code Quality:**
   - Use meaningful variable names
   - Add JSDoc comments untuk functions
   - Follow existing code patterns
   - Use Tailwind classes yang consistent

3. **Performance:**
   - Lazy load images
   - Use React.memo untuk optimization
   - Implement pagination (jangan load semua data sekaligus)

4. **Security:**
   - Never expose API keys di client-side
   - Validate user input
   - Implement CSRF protection (tahap 3)
   - Sanitize file names sebelum upload

5. **Accessibility:**
   - Use semantic HTML
   - Add alt text untuk images
   - Implement keyboard navigation
   - Use ARIA labels jika diperlukan

---

## 🎨 REFERENCE DESIGN

Homepage (Existing):
- Modern dark theme
- Grid layout untuk track cards
- Search & filter UI
- Audio player di bottom

Profile Page (New):
- Sidebar dengan user info
- Main content dengan uploads grid/table
- Stats summary boxes
- Call-to-action buttons

Track Detail Page (New):
- Large cover art display
- Centered metadata
- Full-width audio player
- Related tracks carousel
- Responsive layout

---

## 📞 QUICK REFERENCE

**API Functions to Implement in auth.js:**
```
- getUserStats(username) → object
- getUserTracks(username) → array
- incrementPlayCount(trackId) → void
- incrementDownloadCount(trackId) → void
- getTrackById(trackId) → object
- getTracksByRemixer(remixer, excludeId) → array
- getTracksByGenre(genre, excludeId, limit) → array
```

**Routes to Add:**
```
- /profile → Profile.jsx (protected: approved)
- /track/:id → TrackDetail.jsx (public)
```

**Components to Update:**
```
- Navbar: add profile dropdown
- TrackCard: add click handler to detail page
- AudioPlayer: add increment play count
```

**Files to Create:**
```
- src/pages/Profile.jsx
- src/pages/TrackDetail.jsx
- src/lib/googleDriveService.js
- src/config/googleConfig.js
```

---

**END OF TAHAP 2 COMPREHENSIVE PROMPT**

*Gunakan prompt ini untuk mendapatkan hasil yang konsisten dan sesuai dengan rencana master project.*
