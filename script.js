/* ==========================================================
   MLBB TOURNAMENT SIMULATOR — SCRIPT
   STEP 2: data league + season + team (+ logo).
   ========================================================== */

// ----------------------------------------------------------
// LOGO GENERATOR
// Logo resmi tiap tim TIDAK kita hotlink dari internet, karena:
// 1) project ini harus bisa dibuka offline (file:// index.html),
// 2) gambar hasil hotlink gampang putus / lambat / berisiko hak cipta
//    kalau ikut ke-download orang lain.
// Jadi logo dibuat otomatis sebagai badge SVG memakai warna asli
// brand tiap tim + singkatan nama tim. Tetap look esports, tapi
// 100% lokal dan ringan.
// ----------------------------------------------------------
function makeLogo(initials, bg, fg) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="18" fill="${bg}" />
      <text x="50" y="58" font-family="Space Grotesk, Arial, sans-serif"
            font-weight="700" font-size="34" fill="${fg}"
            text-anchor="middle">${initials}</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

// ----------------------------------------------------------
// LEAGUES
// Hanya liga MPL resmi yang benar memang ada/pernah ada.
// League yang masih comingSoon: rosternya belum berhasil
// diverifikasi datanya, jadi belum diisi (biar tidak asal mengarang).
// ----------------------------------------------------------
const leagues = [
  { id: "mpl-id",    name: "🇮🇩 MPL Indonesia",   historical: false, comingSoon: false },
  { id: "mpl-ph",    name: "🇵🇭 MPL Philippines", historical: false, comingSoon: false },
  { id: "mpl-my",    name: "🇲🇾 MPL Malaysia",    historical: false, comingSoon: false },
  { id: "mpl-sg",    name: "🇸🇬 MPL Singapore",   historical: false, comingSoon: false },
  { id: "mpl-kh",    name: "🇰🇭 MPL Cambodia",    historical: false, comingSoon: false },
  { id: "mpl-mena",  name: "MPL MENA",             historical: false, comingSoon: false },
  { id: "mpl-latam", name: "MPL LATAM",            historical: false, comingSoon: false },
  { id: "mpl-br",    name: "MPL Brazil",           historical: true,  comingSoon: false },
];

// ----------------------------------------------------------
// SEASONS per league (season pertama di array = default terpilih)
// ----------------------------------------------------------
const seasons = {
  "mpl-id":    ["S17", "S16"],
  "mpl-ph":    ["S17", "S18", "S16"],
  "mpl-my":    ["S17", "S16"],
  "mpl-sg":    ["S11", "S10"],
  "mpl-kh":    ["S10", "S9"],
  "mpl-mena":  ["S9", "S8"],
  "mpl-latam": ["S4", "S3"],
  "mpl-br":    ["S5", "S4"],
};

// ----------------------------------------------------------
// TEAMS
// Key format: "<leagueId>" saja — tim resmi TERKUNCI per liga,
// tidak berubah walau season yang diketik user berapapun (S1,
// S17, S100, dst). Season cuma dipakai untuk hal lain (misal
// penentuan MSC/M-Series di tab International).
// Strength = angka simulator buatan sendiri, BUKAN rating resmi.
// ----------------------------------------------------------
const officialTeams = {
  "mpl-id": [
    { id: "onic",    name: "ONIC Esports",        short: "ONIC", strength: 90, logo: makeLogo("ON", "#F4D14C", "#0C0C0C") },
    { id: "btr",     name: "Bigetron by Vitality", short: "BTR",  strength: 91, logo: makeLogo("BTR", "#7A1F2B", "#F0B429") },
    { id: "rrq",     name: "RRQ Hoshi",            short: "RRQ",  strength: 86, logo: makeLogo("RRQ", "#101010", "#FFFFFF") },
    { id: "evos",    name: "EVOS Esports",         short: "EVOS", strength: 82, logo: makeLogo("EV", "#FF6A00", "#101010") },
    { id: "ae",      name: "Alter Ego",            short: "AE",   strength: 80, logo: makeLogo("AE", "#8A1414", "#FFFFFF") },
    { id: "geek",    name: "Geek Fam ID",          short: "GEEK", strength: 74, logo: makeLogo("GK", "#4B1F91", "#FFFFFF") },
    { id: "dewa",    name: "Dewa United Esports",  short: "DEWA", strength: 76, logo: makeLogo("DU", "#123C8C", "#FFFFFF") },
    { id: "tlid",    name: "Team Liquid ID",       short: "TLID", strength: 78, logo: makeLogo("TL", "#0D1F1C", "#7CFFE3") },
    { id: "navi",    name: "NAVI Indonesia",       short: "NAVI", strength: 68, logo: makeLogo("NV", "#0B0B0B", "#F5DA1E") },
  ],
  "mpl-ph": [
    { id: "apbren",  name: "AP.Bren",              short: "APBR", strength: 84, logo: makeLogo("AB", "#B4122B", "#FFFFFF") },
    { id: "falcons", name: "Team Falcons PH",      short: "FLCP", strength: 87, logo: makeLogo("FL", "#0C0C0C", "#F0B429") },
    { id: "onicph",  name: "ONIC Philippines",     short: "ONPH", strength: 83, logo: makeLogo("ON", "#F4D14C", "#0C0C0C") },
    { id: "smartomega", name: "Smart Omega",       short: "SOMG", strength: 75, logo: makeLogo("SO", "#E8590C", "#101010") },
    { id: "aurora",  name: "Aurora Gaming PH",      short: "AURA", strength: 79, logo: makeLogo("AU", "#5A1E9E", "#FFFFFF") },
    { id: "tlph",    name: "Team Liquid PH",       short: "TLPH", strength: 89, logo: makeLogo("TL", "#0D1F1C", "#7CFFE3") },
    { id: "tnc",     name: "TNC Pro Team",         short: "TNC",  strength: 73, logo: makeLogo("TNC", "#F2C310", "#101010") },
    { id: "twisted", name: "Twisted Minds PH",     short: "TWPH", strength: 72, logo: makeLogo("TM", "#1A1A2E", "#B62BF0") },
  ],
  "mpl-my": [
    { id: "srg",     name: "Selangor Red Giants",  short: "SRG",  strength: 89, logo: makeLogo("SRG", "#7A1620", "#F0B429") },
    { id: "vamos",   name: "Team Vamos",           short: "VMS",  strength: 84, logo: makeLogo("VMS", "#1A1A1A", "#29F1D8") },
    { id: "rey",     name: "Team Rey",             short: "TR",   strength: 71, logo: makeLogo("TR", "#8C1D1D", "#FFFFFF") },
    { id: "rrqmy",   name: "RRQ Malaysia",         short: "RRQ",  strength: 76, logo: makeLogo("RRQ", "#101010", "#FFFFFF") },
    { id: "btrm",    name: "Bigetron MY by VIT",   short: "BTRM", strength: 77, logo: makeLogo("BTM", "#7A1F2B", "#F0B429") },
    { id: "ac",      name: "All Combo",            short: "AC",   strength: 70, logo: makeLogo("AC", "#243B55", "#FFFFFF") },
    { id: "ig",      name: "Invictus Gaming",      short: "iG",   strength: 74, logo: makeLogo("iG", "#B7202E", "#FFFFFF") },
    { id: "flash",   name: "Team Flash",           short: "TF",   strength: 80, logo: makeLogo("TF", "#0C0C0C", "#29F1D8") },
  ],
  "mpl-sg": [
    { id: "ignite",  name: "IGNITE Gaming",        short: "IGN",  strength: 85, logo: makeLogo("IGN", "#D9432C", "#FFFFFF") },
    { id: "evil",    name: "Evil",                 short: "EVIL", strength: 84, logo: makeLogo("EVL", "#101010", "#B62BF0") },
    { id: "clarity", name: "Clarity Gaming",       short: "CG",   strength: 76, logo: makeLogo("CG", "#1B4965", "#FFFFFF") },
    { id: "kingdom", name: "Kingdom Esports",      short: "KDM",  strength: 72, logo: makeLogo("KDM", "#4B2E83", "#F0B429") },
    { id: "abszero", name: "Absolute Zero",        short: "ABZ",  strength: 70, logo: makeLogo("ABZ", "#123C69", "#29F1D8") },
    { id: "sindicate", name: "Sindicate Esports",  short: "SIN",  strength: 69, logo: makeLogo("SIN", "#2B2B2B", "#FFC145") },
  ],
  "mpl-kh": [
    { id: "cfu",     name: "CFU Gaming",           short: "CFU",  strength: 82, logo: makeLogo("CFU", "#0F5C56", "#FFFFFF") },
    { id: "gxl",     name: "Galaxy Legends",       short: "GXL",  strength: 81, logo: makeLogo("GXL", "#1A1A40", "#F0B429") },
    { id: "pro",     name: "PRO Esports",          short: "PRO",  strength: 83, logo: makeLogo("PRO", "#8C1D1D", "#FFFFFF") },
    { id: "gxp",     name: "Galaxy Phoenix",       short: "GXP",  strength: 74, logo: makeLogo("GXP", "#B4122B", "#F0B429") },
    { id: "sys",     name: "See You Soon",         short: "SYS",  strength: 73, logo: makeLogo("SYS", "#123C69", "#FFFFFF") },
    { id: "flkh",    name: "Team Flash KH",        short: "FLKH", strength: 75, logo: makeLogo("FKH", "#0C0C0C", "#29F1D8") },
    { id: "vigor",   name: "Vigor Apex",           short: "VGR",  strength: 70, logo: makeLogo("VGR", "#2B2B2B", "#F0B429") },
    { id: "valhalla",name: "Valhalla",             short: "VAL",  strength: 68, logo: makeLogo("VAL", "#4B2E83", "#FFFFFF") },
    { id: "duck",    name: "Duck Rice Esports",    short: "DUCK", strength: 65, logo: makeLogo("DCK", "#D9A02C", "#101010") },
    { id: "eye",     name: "Evil Eye Esports",     short: "EYE",  strength: 66, logo: makeLogo("EYE", "#101010", "#B62BF0") },
  ],
  "mpl-mena": [
    { id: "geekay",  name: "Geekay Esports",       short: "GK",   strength: 86, logo: makeLogo("GK", "#123C69", "#F0B429") },
    { id: "falconsmena", name: "Team Falcons",     short: "FLCN", strength: 85, logo: makeLogo("FL", "#0C0C0C", "#F0B429") },
    { id: "twistedmena", name: "Twisted Minds",    short: "TWIS", strength: 77, logo: makeLogo("TW", "#1A1A2E", "#B62BF0") },
    { id: "occupy",  name: "Team Occupy",          short: "OPY",  strength: 74, logo: makeLogo("OPY", "#7A1620", "#FFFFFF") },
    { id: "xprojekt",name: "XProjekt Esports",     short: "XP",   strength: 71, logo: makeLogo("XP", "#2B2B2B", "#29F1D8") },
    { id: "gs",      name: "GS Team",              short: "GS",   strength: 70, logo: makeLogo("GS", "#4B2E83", "#FFFFFF") },
    { id: "axeokami",name: "Axe Okami",            short: "XO",   strength: 75, logo: makeLogo("XO", "#8C1D1D", "#F0B429") },
    { id: "gamax",   name: "GAMAX Esports",        short: "GMX",  strength: 69, logo: makeLogo("GMX", "#101010", "#FFC145") },
  ],
  "mpl-latam": [
    { id: "corinthians", name: "Corinthians",      short: "SCCP", strength: 87, logo: makeLogo("COR", "#0C0C0C", "#FFFFFF") },
    { id: "influencerage", name: "INFLUENCE RAGE", short: "INF",  strength: 85, logo: makeLogo("INF", "#8C1D1D", "#F0B429") },
    { id: "9z",      name: "9z Team",              short: "9z",   strength: 83, logo: makeLogo("9z", "#101010", "#29F1D8") },
    { id: "infinity",name: "Infinity",             short: "INFY", strength: 74, logo: makeLogo("IFY", "#123C69", "#FFFFFF") },
    { id: "dreammax",name: "DreamMax e-Sports",    short: "DMX",  strength: 72, logo: makeLogo("DMX", "#4B2E83", "#F0B429") },
    { id: "entity7", name: "Entity7",              short: "E7",   strength: 78, logo: makeLogo("E7", "#2B2B2B", "#FFC145") },
    { id: "abyssal", name: "Abyssal Order",        short: "ABY",  strength: 70, logo: makeLogo("ABY", "#1A1A40", "#B62BF0") },
    { id: "blacksentence", name: "Black Sentence Esports", short: "BSE", strength: 69, logo: makeLogo("BSE", "#101010", "#FFFFFF") },
    { id: "alpha7",  name: "Alpha7 Esports",       short: "A7",   strength: 68, logo: makeLogo("A7", "#7A1620", "#F0B429") },
    { id: "ulf",     name: "ULF Esports",          short: "ULF",  strength: 67, logo: makeLogo("ULF", "#123C8C", "#FFFFFF") },
  ],
  "mpl-br": [
    { id: "rrqakira",     name: "RRQ Akira",           short: "RRQA", strength: 88, logo: makeLogo("RRQ", "#101010", "#FFFFFF") },
    { id: "btrsons",      name: "Bigetron Sons",       short: "BTRS", strength: 76, logo: makeLogo("BTR", "#7A1F2B", "#F0B429") },
    { id: "dreammaxbr",   name: "DreamMax e-Sports",   short: "DMX",  strength: 72, logo: makeLogo("DMX", "#4B2E83", "#F0B429") },
    { id: "randomsbr",    name: "Randoms Esports",     short: "RND",  strength: 68, logo: makeLogo("RND", "#123C69", "#FFFFFF") },
    { id: "teamzeusbr",   name: "Team Zeus E-sports",  short: "TMZ",  strength: 74, logo: makeLogo("TMZ", "#1A1A40", "#29F1D8") },
    { id: "malvinasbr",   name: "Malvinas Brazil",     short: "MVG",  strength: 70, logo: makeLogo("MVG", "#8C1D1D", "#FFFFFF") },
    { id: "influencebr",  name: "Influence Chemin",    short: "INFC", strength: 69, logo: makeLogo("INF", "#2B2B2B", "#F0B429") },
    { id: "madeinbrazil", name: "Made In Brazil",      short: "MIB",  strength: 66, logo: makeLogo("MIB", "#0C6B3A", "#FFFFFF") },
  ],
};

// ----------------------------------------------------------
// SIMULATION ENGINE
// ----------------------------------------------------------

// Tentukan winner: strength lebih tinggi = peluang menang lebih besar,
// tapi underdog masih bisa menang (bukan 100% pasti).
// Peluang A menang = strength A / (strength A + strength B).
function decideWinner(teamA, teamB) {
  const chanceA = teamA.strength / (teamA.strength + teamB.strength);
  return Math.random() < chanceA ? teamA : teamB;
}

// Generate skor valid untuk format BO3/BO5/BO7.
// winsNeeded = jumlah game yang harus dimenangkan untuk menang match.
// skor loser random antara 0 sampai (winsNeeded - 1).
function generateScore(bestOf) {
  const winsNeeded = Math.ceil(bestOf / 2); // BO3 -> 2, BO5 -> 3, BO7 -> 4
  const loserScore = Math.floor(Math.random() * winsNeeded); // 0..winsNeeded-1
  return { winnerScore: winsNeeded, loserScore };
}

// Fungsi utama: simulasikan satu match antara dua tim.
// Return: { winner, loser, winnerScore, loserScore }
function simulateMatch(teamA, teamB, bestOf = 3) {
  const winner = decideWinner(teamA, teamB);
  const loser = winner === teamA ? teamB : teamA;
  const { winnerScore, loserScore } = generateScore(bestOf);
  return { winner, loser, winnerScore, loserScore };
}

// ----------------------------------------------------------
// SCHEDULE (Regular Season) — Double Round Robin, diacak
// ----------------------------------------------------------

// Acak urutan array (Fisher-Yates shuffle)
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Setiap tim ketemu semua tim lain 2x, lalu urutan pertandingan diacak.
function generateSchedule(teams) {
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({ teamAId: teams[i].id, teamBId: teams[j].id });
      matches.push({ teamAId: teams[j].id, teamBId: teams[i].id });
    }
  }

  let matchNumber = 1;
  return shuffleArray(matches).map((m) => ({
    id: "m" + matchNumber++,
    teamAId: m.teamAId,
    teamBId: m.teamBId,
    played: false,
    winnerId: null,
    scoreA: null,
    scoreB: null,
  }));
}

// Hitung standings dari state.teams + state.schedule
function computeStandings() {
  const table = {};
  state.teams.forEach((t) => {
    table[t.id] = { team: t, mp: 0, w: 0, l: 0, gw: 0, gl: 0 };
  });

  state.schedule.forEach((match) => {
    if (!match.played) return;
    const rowA = table[match.teamAId];
    const rowB = table[match.teamBId];
    if (!rowA || !rowB) return;

    rowA.mp++;
    rowB.mp++;
    rowA.gw += match.scoreA;
    rowA.gl += match.scoreB;
    rowB.gw += match.scoreB;
    rowB.gl += match.scoreA;

    if (match.winnerId === rowA.team.id) {
      rowA.w++;
      rowB.l++;
    } else {
      rowB.w++;
      rowA.l++;
    }
  });

  const rows = Object.values(table).map((row) => {
    const override = state.pointOverrides[row.team.id];
    return {
      ...row,
      gd: row.gw - row.gl,
      // pakai override manual kalau ada, kalau enggak default 1 poin per match menang
      pts: override !== undefined ? override : row.w,
      ptsIsManual: override !== undefined,
    };
  });

  // tiebreaker: Match Point desc, lalu Game Difference desc
  rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd);
  return rows;
}

// ----------------------------------------------------------
// STATE
// ----------------------------------------------------------
const state = {
  leagueId: "mpl-id",
  season: "S17",
  teams: [],
  schedule: [],
  knockout: null,
  pointOverrides: {}, // { teamId: customPoints } — override manual Match Point di Standings
  news: [], // berita & interview otomatis per league-season
};

// kalau ada pilihan league/season terakhir tersimpan, lanjut dari situ
{
  const lastSelection = loadLastSelection();
  if (lastSelection && lastSelection.leagueId && lastSelection.season) {
    state.leagueId = lastSelection.leagueId;
    state.season = lastSelection.season;
  }
}

// custom team disimpan terpisah per league-season di localStorage
function customTeamsKey() {
  return `mlbb-sim:custom-teams:${state.leagueId}-${state.season}`;
}

function loadCustomTeams() {
  const raw = localStorage.getItem(customTeamsKey());
  return raw ? JSON.parse(raw) : [];
}

function saveCustomTeams(list) {
  localStorage.setItem(customTeamsKey(), JSON.stringify(list));
}

// ----------------------------------------------------------
// PROGRESS PERSISTENCE
// Hasil simulasi (jadwal regular season + knockout bracket)
// disimpan ke localStorage per league-season, jadi kalau browser
// di-refresh, progress-nya tidak hilang.
// ----------------------------------------------------------
function progressKey() {
  return `mlbb-sim:progress:${state.leagueId}-${state.season}`;
}

function saveProgress() {
  try {
    localStorage.setItem(
      progressKey(),
      JSON.stringify({ schedule: state.schedule, knockout: state.knockout, pointOverrides: state.pointOverrides })
    );
  } catch (e) {
    // localStorage penuh / tidak tersedia — progress cukup di-skip, gak fatal
  }
}

// Coba muat progress tersimpan. Return null kalau gak ada / rusak /
// tim yang direferensikan di dalamnya udah gak ada lagi (misal habis dihapus).
function loadProgress() {
  try {
    const raw = localStorage.getItem(progressKey());
    if (!raw) return null;
    const saved = JSON.parse(raw);

    const scheduleValid =
      Array.isArray(saved.schedule) &&
      saved.schedule.every((m) => teamById(m.teamAId) && teamById(m.teamBId));

    if (!scheduleValid) return null;
    if (!saved.pointOverrides) saved.pointOverrides = {};
    return saved;
  } catch (e) {
    return null;
  }
}

// Ingat pilihan league & season terakhir, biar pas dibuka lagi
// lanjut dari situ (bukan selalu balik ke MPL Indonesia S17).
function saveLastSelection() {
  localStorage.setItem(
    "mlbb-sim:last-selection",
    JSON.stringify({ leagueId: state.leagueId, season: state.season })
  );
}

function loadLastSelection() {
  try {
    const raw = localStorage.getItem("mlbb-sim:last-selection");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Simpan champion + runner-up tiap kali Grand Final sebuah league
// selesai. Ini terpisah dari progress schedule/knockout biasa, karena
// M-Series butuh data dari SEMUA league sekaligus (bukan cuma yang
// sedang aktif dipilih).
function qualifiedKey(leagueId) {
  return `mlbb-sim:qualified:${leagueId}`;
}

function saveQualifiedTeams(leagueId, champion, runnerUp, season) {
  try {
    localStorage.setItem(qualifiedKey(leagueId), JSON.stringify({ champion, runnerUp, season }));
  } catch (e) {
    // skip, gak fatal
  }
}

function loadQualifiedTeams(leagueId) {
  try {
    const raw = localStorage.getItem(qualifiedKey(leagueId));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------------
// PLAYER / ROSTER MANAGEMENT
// Setiap tim punya roster 5 role tetap: Roam, Jungler, EXP Laner,
// Gold Laner, Mid Laner. Disimpan di localStorage per team id
// (jadi nyambung terus walau ganti league/season/refresh browser).
//
// Team Power Mode:
// - MANUAL (default): strength tim tetap dikontrol slider yang
//   sudah ada dari awal — TIDAK berubah dari sistem lama.
// - AUTO: strength tim dihitung otomatis dari rata-rata rating
//   5 player utama (baru bisa diaktifkan kalau roster lengkap 5).
// ----------------------------------------------------------
const ROSTER_ROLES = ["Roam", "Jungler", "EXP Laner", "Gold Laner", "Mid Laner"];

// Roster default cuma diisi untuk tim yang datanya memang publik &
// diketahui (sesuai instruksi: jangan mengarang roster tim resmi).
// Tim lain mulai kosong — isi manual lewat Manage Roster atau pakai
// Randomize Roster.
// Nama, role, dan rating di bawah ini diambil dari roster resmi
// MPL Indonesia Season 18 (Agustus 2026) yang sudah diverifikasi.
// Catatan: MLBB tidak punya "rating pemain" resmi publik, jadi angka
// rating tiap pemain adalah perkiraan buatan sendiri untuk simulator
// (bukan rating resmi) — sama seperti Team Strength yang sudah ada.
const defaultRosters = {
  onic: {
    "Roam": { name: "Kiboy", rating: 88 },
    "Jungler": { name: "Kairi", rating: 93 },
    "EXP Laner": { name: "Lutpi", rating: 89 },
    "Gold Laner": { name: "Kelra", rating: 91 },
    "Mid Laner": { name: "Sanz", rating: 90 },
  },
  btr: {
    "Roam": { name: "Finn", rating: 89 },
    "Jungler": { name: "Nnael", rating: 93 },
    "EXP Laner": { name: "Shogun", rating: 90 },
    "Gold Laner": { name: "Emann", rating: 92 },
    "Mid Laner": { name: "Moreno", rating: 91 },
  },
  rrq: {
    "Roam": { name: "Idok", rating: 84 },
    "Jungler": { name: "Demonkite", rating: 90 },
    "EXP Laner": { name: "Lynch", rating: 85 },
    "Gold Laner": { name: "Kuroky", rating: 87 },
    "Mid Laner": { name: "Clayyy", rating: 84 },
  },
  evos: {
    "Roam": { name: "Muezza", rating: 80 },
    "Jungler": { name: "Alberttt", rating: 87 },
    "EXP Laner": { name: "Rendyy", rating: 81 },
    "Gold Laner": { name: "Erlan", rating: 83 },
    "Mid Laner": { name: "DrianW", rating: 79 },
  },
  ae: {
    "Roam": { name: "Alenxander", rating: 78 },
    "Jungler": { name: "Affan", rating: 82 },
    "EXP Laner": { name: "Nino", rating: 81 },
    "Gold Laner": { name: "Dingarai", rating: 79 },
    "Mid Laner": { name: "Dalvin", rating: 80 },
  },
  geek: {
    "Roam": { name: "AudyTzy", rating: 76 },
    "Jungler": { name: "Nazara", rating: 75 },
    "EXP Laner": { name: "marceL", rating: 73 },
    "Gold Laner": { name: "KennzyySkie", rating: 72 },
    "Mid Laner": { name: "ABOY", rating: 74 },
  },
  dewa: {
    "Roam": { name: "Kesu", rating: 74 },
    "Jungler": { name: "Kayn", rating: 78 },
    "EXP Laner": { name: "Qinn", rating: 76 },
    "Gold Laner": { name: "Maybeee", rating: 77 },
    "Mid Laner": { name: "Octa", rating: 75 },
  },
  tlid: {
    "Roam": { name: "Lyoni", rating: 76 },
    "Jungler": { name: "Kevin", rating: 81 },
    "EXP Laner": { name: "Aran", rating: 79 },
    "Gold Laner": { name: "Keven", rating: 80 },
    "Mid Laner": { name: "Drichel", rating: 74 },
  },
  navi: {
    "Roam": { name: "Aprho", rating: 65 },
    "Jungler": { name: "Andoryuuu", rating: 71 },
    "EXP Laner": { name: "Karss", rating: 68 },
    "Gold Laner": { name: "Zeonn", rating: 69 },
    "Mid Laner": { name: "Jiizee", rating: 67 },
  },
  // ---- MPL Philippines Season 17 ----
  apbren: {
    "Roam": { name: "Nova", rating: 82 },
    "Jungler": { name: "Jamespangks", rating: 86 },
    "EXP Laner": { name: "Kielvj", rating: 85 },
    "Gold Laner": { name: "Shizou", rating: 84 },
    "Mid Laner": { name: "Aqua", rating: 83 },
  },
  falcons: {
    "Roam": { name: "Owgwen", rating: 86 },
    "Jungler": { name: "Kyle", rating: 89 },
    "EXP Laner": { name: "Flap", rating: 87 },
    "Gold Laner": { name: "Super Marco", rating: 88 },
    "Mid Laner": { name: "Hadji", rating: 88 },
  },
  onicph: {
    "Roam": { name: "Brusko", rating: 82 },
    "Jungler": { name: "K1NGKONG", rating: 85 },
    "EXP Laner": { name: "Kirk", rating: 83 },
    "Gold Laner": { name: "Savero", rating: 84 },
    "Mid Laner": { name: "Super Frince", rating: 83 },
  },
  smartomega: {
    "Roam": { name: "Perkziva", rating: 74 },
    "Jungler": { name: "Raizen", rating: 77 },
    "EXP Laner": { name: "Jeymz", rating: 75 },
    "Gold Laner": { name: "Netskie", rating: 74 },
    "Mid Laner": { name: "Minguin", rating: 75 },
  },
  aurora: {
    "Roam": { name: "Light", rating: 80 },
    "Jungler": { name: "Demonkite", rating: 83 },
    "EXP Laner": { name: "Edward", rating: 81 },
    "Gold Laner": { name: "Domengkite", rating: 79 },
    "Mid Laner": { name: "Yue", rating: 78 },
  },
  tlph: {
    "Roam": { name: "Jaypee", rating: 90 },
    "Jungler": { name: "KarlTzy", rating: 93 },
    "EXP Laner": { name: "Sanford", rating: 89 },
    "Gold Laner": { name: "Teddy", rating: 88 },
    "Mid Laner": { name: "Sanji", rating: 89 },
  },
  tnc: {
    "Roam": { name: "Ch4knu", rating: 72 },
    "Jungler": { name: "Zaida", rating: 75 },
    "EXP Laner": { name: "3Mar", rating: 73 },
    "Gold Laner": { name: "Bennyqt", rating: 74 },
    "Mid Laner": { name: "LanceCy", rating: 73 },
  },
  twisted: {
    "Roam": { name: "Caloy", rating: 71 },
    "Jungler": { name: "MPtheKing", rating: 74 },
    "EXP Laner": { name: "Lansu", rating: 72 },
    "Gold Laner": { name: "Noisa", rating: 71 },
    "Mid Laner": { name: "Sionnn", rating: 72 },
  },
  // ---- MPL Malaysia Season 17 ----
  srg: {
    "Roam": { name: "Yums", rating: 90 },
    "Jungler": { name: "Sekys", rating: 92 },
    "EXP Laner": { name: "Kramm", rating: 88 },
    "Gold Laner": { name: "Innocent", rating: 88 },
    "Mid Laner": { name: "Stormie", rating: 87 },
  },
  vamos: {
    "Roam": { name: "Zqeef", rating: 82 },
    "Jungler": { name: "Valdo", rating: 84 },
    "EXP Laner": { name: "Zeno", rating: 83 },
    "Gold Laner": { name: "Natco", rating: 84 },
    "Mid Laner": { name: "ClawKun", rating: 83 },
  },
  rey: {
    "Roam": { name: "Ivann", rating: 68 },
    "Jungler": { name: "Zahyed", rating: 71 },
    "EXP Laner": { name: "Sizkaa", rating: 69 },
    "Gold Laner": { name: "Loleal", rating: 72 },
    "Mid Laner": { name: "Martzyyyy", rating: 70 },
  },
  rrqmy: {
    "Roam": { name: "Super Yoshi", rating: 73 },
    "Jungler": { name: "Garyy", rating: 76 },
    "EXP Laner": { name: "Dyrennn", rating: 78 },
    "Gold Laner": { name: "Rough", rating: 75 },
    "Mid Laner": { name: "Kyym", rating: 74 },
  },
  btrm: {
    "Roam": { name: "Rasy", rating: 74 },
    "Jungler": { name: "Chibii", rating: 77 },
    "EXP Laner": { name: "Lynchh", rating: 75 },
    "Gold Laner": { name: "Zieyy", rating: 76 },
    "Mid Laner": { name: "CikuGais", rating: 78 },
  },
  ac: {
    "Roam": { name: "Widy", rating: 68 },
    "Jungler": { name: "EyyMal", rating: 71 },
    "EXP Laner": { name: "Momo", rating: 69 },
    "Gold Laner": { name: "Kusey", rating: 70 },
    "Mid Laner": { name: "Izanami", rating: 69 },
  },
  ig: {
    "Roam": { name: "NovaXcobar", rating: 72 },
    "Jungler": { name: "Hazle", rating: 76 },
    "EXP Laner": { name: "Ye3", rating: 73 },
    "Gold Laner": { name: "Melqt", rating: 74 },
    "Mid Laner": { name: "Swaylow", rating: 73 },
  },
  flash: {
    "Roam": { name: "Hadess", rating: 79 },
    "Jungler": { name: "Razin", rating: 82 },
    "EXP Laner": { name: "Diablo", rating: 80 },
    "Gold Laner": { name: "SkyZED", rating: 79 },
    "Mid Laner": { name: "KurtTzy", rating: 81 },
  },
  // ---- MPL Singapore Season 11 ----
  // Catatan: cuma 3 dari 6 tim yang datanya cukup jelas soal role
  // tiap pemain. Sisanya (Clarity, Absolute Zero, Sindicate) sengaja
  // dibiarkan kosong daripada asal nebak siapa main di role apa.
  evil: {
    "Roam": { name: "Venn", rating: 85 },
    "Jungler": { name: "Aether", rating: 87 },
    "EXP Laner": { name: "Gear", rating: 84 },
    "Gold Laner": { name: "PoWerFuL", rating: 83 },
    "Mid Laner": { name: "Bladee", rating: 84 },
  },
  kingdom: {
    "Roam": { name: "Lolsie", rating: 72 },
    "Jungler": { name: "Yaawn", rating: 74 },
    "EXP Laner": { name: "Arey", rating: 71 },
    "Gold Laner": { name: "Vanix", rating: 72 },
    "Mid Laner": { name: "Hate", rating: 71 },
  },
  ignite: {
    "Roam": { name: "Zac Scofield", rating: 84 },
    "Jungler": { name: "CS", rating: 87 },
    "EXP Laner": { name: "Kelvin", rating: 85 },
    "Gold Laner": { name: "Roy", rating: 84 },
    "Mid Laner": { name: "Jayy", rating: 85 },
  },
};

function rosterKey(teamId) {
  return `mlbb-sim:roster:${teamId}`;
}

function rosterModeKey(teamId) {
  return `mlbb-sim:roster-mode:${teamId}`;
}

function loadRoster(teamId) {
  try {
    const raw = localStorage.getItem(rosterKey(teamId));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // data rusak — anggap kosong
  }
  return defaultRosters[teamId] ? { ...defaultRosters[teamId] } : {};
}

function saveRoster(teamId, roster) {
  try {
    localStorage.setItem(rosterKey(teamId), JSON.stringify(roster));
  } catch (e) {
    // localStorage penuh — skip, gak fatal
  }
}

function loadRosterMode(teamId) {
  return localStorage.getItem(rosterModeKey(teamId)) || "manual";
}

function saveRosterMode(teamId, mode) {
  localStorage.setItem(rosterModeKey(teamId), mode);
}

function deleteRosterData(teamId) {
  localStorage.removeItem(rosterKey(teamId));
  localStorage.removeItem(rosterModeKey(teamId));
}

function isRosterComplete(roster) {
  return ROSTER_ROLES.every((role) => roster[role] && roster[role].name);
}

function computeTeamPower(roster) {
  const total = ROSTER_ROLES.reduce((sum, role) => sum + Number(roster[role].rating), 0);
  return total / ROSTER_ROLES.length;
}

// Kalau tim ini mode Team Power-nya AUTO & rosternya lengkap,
// timpa team.strength dengan rata-rata rating roster (dibulatkan).
// Kalau MANUAL (default), team.strength gak disentuh sama sekali —
// sistem Team Strength lama tetap jalan seperti biasa.
function applyRosterPowerToTeam(team) {
  if (loadRosterMode(team.id) !== "auto") return;
  const roster = loadRoster(team.id);
  if (!isRosterComplete(roster)) return;
  team.strength = Math.round(computeTeamPower(roster));
}

// Randomize Roster: 5 role terisi, nama fiktif, rating acak 60-100
const RANDOM_PLAYER_SYLLABLES = ["Ka", "Re", "Zy", "Vo", "Ilo", "Bram", "To", "Naz", "Sen", "Dio", "Aru", "Kito", "Vale", "Miro", "Yudo"];
function generateRandomPlayerName() {
  const a = RANDOM_PLAYER_SYLLABLES[Math.floor(Math.random() * RANDOM_PLAYER_SYLLABLES.length)];
  const b = Math.floor(Math.random() * 90) + 10;
  return a + b;
}

function generateRandomRoster() {
  const roster = {};
  ROSTER_ROLES.forEach((role) => {
    roster[role] = {
      name: generateRandomPlayerName(),
      rating: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
    };
  });
  return roster;
}

// ----------------------------------------------------------
// PLAYER OF THE MATCH (MVP)
// Diambil dari roster tim yang menang. Bisa diacak (default,
// begitu match selesai) atau dipilih manual sama user lewat
// dropdown di tiap match card.
// ----------------------------------------------------------
function getFilledRosterRoles(teamId) {
  const roster = loadRoster(teamId);
  return ROSTER_ROLES.filter((role) => roster[role] && roster[role].name);
}

// Return { role, name } atau null kalau tim itu belum punya roster sama sekali
function pickRandomMvp(teamId) {
  const filled = getFilledRosterRoles(teamId);
  if (filled.length === 0) return null;
  const roster = loadRoster(teamId);
  const role = filled[Math.floor(Math.random() * filled.length)];
  return { role, name: roster[role].name };
}

// HTML baris MVP yang dipakai ulang di schedule item & knockout match card.
// kind dipakai buat bedain data-attribute ("schedule" / "knockout" / "quick")
function mvpRowHtml(kind, matchId, winnerTeamId, mvp) {
  const filled = getFilledRosterRoles(winnerTeamId);
  const roster = loadRoster(winnerTeamId);

  if (filled.length === 0) {
    return `<div class="mvp-row mvp-row--empty">MVP: <em>isi roster tim dulu</em></div>`;
  }

  const optionsHtml = filled
    .map((role) => {
      const isSelected = mvp && mvp.role === role;
      return `<option value="${role}" ${isSelected ? "selected" : ""}>${roster[role].name} (${role})</option>`;
    })
    .join("");

  return `
    <div class="mvp-row">
      <span class="mvp-row__label">🏅 MVP</span>
      <select class="mvp-row__select" data-${kind}-mvp-select="${matchId}">
        ${optionsHtml}
      </select>
      <button class="mvp-row__reroll" data-${kind}-mvp-reroll="${matchId}" title="Acak MVP">🎲</button>
    </div>`;
}

// ---- Modal ----
const rosterModalOverlay = document.getElementById("rosterModalOverlay");
const rosterModalLogo = document.getElementById("rosterModalLogo");
const rosterModalTeamName = document.getElementById("rosterModalTeamName");
const rosterModalCloseBtn = document.getElementById("rosterModalClose");
const rosterList = document.getElementById("rosterList");
const rosterModeManualBtn = document.getElementById("rosterModeManualBtn");
const rosterModeAutoBtn = document.getElementById("rosterModeAutoBtn");
const rosterModalPowerValue = document.getElementById("rosterModalPowerValue");
const rosterRandomizeBtn = document.getElementById("rosterRandomizeBtn");

let rosterModalTeamId = null;
let rosterModalEditingRole = null;

function openRosterModal(teamId) {
  const team = state.teams.find((t) => t.id === teamId);
  if (!team) return;

  rosterModalTeamId = teamId;
  rosterModalEditingRole = null;
  rosterModalLogo.src = team.logo;
  rosterModalLogo.alt = team.name + " logo";
  rosterModalTeamName.textContent = team.name;
  rosterModalOverlay.hidden = false;
  renderRosterModal();
}

function closeRosterModal() {
  rosterModalOverlay.hidden = true;
  rosterModalTeamId = null;
  rosterModalEditingRole = null;
}

rosterModalCloseBtn.addEventListener("click", closeRosterModal);
rosterModalOverlay.addEventListener("click", (e) => {
  if (e.target === rosterModalOverlay) closeRosterModal();
});

function renderRosterModal() {
  const team = state.teams.find((t) => t.id === rosterModalTeamId);
  if (!team) return;

  const roster = loadRoster(team.id);
  const mode = loadRosterMode(team.id);
  const complete = isRosterComplete(roster);

  rosterModeManualBtn.classList.toggle("roster-mode-btn--active", mode !== "auto");
  rosterModeAutoBtn.classList.toggle("roster-mode-btn--active", mode === "auto");
  rosterModeAutoBtn.disabled = !complete;
  rosterModalPowerValue.textContent =
    mode === "auto" && complete
      ? `Team Power: ${Math.round(computeTeamPower(roster))}`
      : `Team Strength (manual): ${team.strength}`;

  rosterList.innerHTML = ROSTER_ROLES.map((role) => {
    const player = roster[role];

    if (rosterModalEditingRole === role) {
      return `
        <div class="roster-player roster-player--editing">
          <div class="roster-player__role">${role}</div>
          <label>Player Name
            <input type="text" class="roster-player__input" id="rosterEditName" value="${player ? player.name : ""}" placeholder="Nama player" />
          </label>
          <label>Rating (1-100)
            <input type="number" min="1" max="100" class="roster-player__input" id="rosterEditRating" value="${player ? player.rating : 70}" />
          </label>
          <div class="roster-player__editing-actions">
            <button class="btn btn--primary" id="rosterSaveBtn">SAVE</button>
            <button class="btn btn--ghost" id="rosterCancelEditBtn">Batal</button>
          </div>
        </div>`;
    }

    if (!player) {
      return `
        <div class="roster-player roster-player--empty">
          <div class="roster-player__role">${role}</div>
          <div class="roster-player__empty-label">Belum ada player</div>
          <button class="btn btn--ghost roster-player__edit-btn" data-add-role="${role}">+ ADD PLAYER</button>
        </div>`;
    }

    return `
      <div class="roster-player">
        <div class="roster-player__role">${role}</div>
        <div class="roster-player__info">
          <span class="roster-player__name">${player.name}</span>
          <span class="roster-player__rating">Rating ${player.rating}</span>
        </div>
        <button class="btn btn--ghost roster-player__edit-btn" data-edit-role="${role}">EDIT</button>
        <div class="roster-player__bar"><div class="roster-player__bar-fill" style="width:${player.rating}%"></div></div>
      </div>`;
  }).join("");

  rosterList.querySelectorAll("[data-edit-role], [data-add-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      rosterModalEditingRole = btn.dataset.editRole || btn.dataset.addRole;
      renderRosterModal();
    });
  });

  const saveBtn = document.getElementById("rosterSaveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const nameInput = document.getElementById("rosterEditName");
      const ratingInput = document.getElementById("rosterEditRating");
      const name = nameInput.value.trim();

      if (!name) {
        alert("Nama player wajib diisi.");
        return;
      }

      let rating = Number(ratingInput.value);
      if (isNaN(rating)) rating = 70;
      rating = Math.max(1, Math.min(100, rating));

      const updatedRoster = loadRoster(team.id);
      updatedRoster[rosterModalEditingRole] = { name, rating };
      saveRoster(team.id, updatedRoster);

      rosterModalEditingRole = null;
      applyRosterPowerToTeam(team);
      renderRosterModal();
      renderTeamGrid(false);
    });
  }

  const cancelBtn = document.getElementById("rosterCancelEditBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      rosterModalEditingRole = null;
      renderRosterModal();
    });
  }
}

rosterModeManualBtn.addEventListener("click", () => {
  if (!rosterModalTeamId) return;
  saveRosterMode(rosterModalTeamId, "manual");
  // MANUAL: strength balik dipegang slider yang sudah ada, nilainya
  // gak diubah otomatis di sini.
  renderRosterModal();
  renderTeamGrid(false);
});

rosterModeAutoBtn.addEventListener("click", () => {
  if (!rosterModalTeamId) return;
  const team = state.teams.find((t) => t.id === rosterModalTeamId);
  const roster = loadRoster(rosterModalTeamId);

  if (!isRosterComplete(roster)) {
    alert("Lengkapi dulu 5 role (Roam, Jungler, EXP Laner, Gold Laner, Mid Laner) sebelum pakai mode AUTO.");
    return;
  }

  saveRosterMode(rosterModalTeamId, "auto");
  applyRosterPowerToTeam(team);
  saveProgress();
  renderRosterModal();
  renderTeamGrid(false);
  renderQuickSimOptions();
});

rosterRandomizeBtn.addEventListener("click", () => {
  if (!rosterModalTeamId) return;
  const team = state.teams.find((t) => t.id === rosterModalTeamId);

  saveRoster(rosterModalTeamId, generateRandomRoster());
  rosterModalEditingRole = null;
  applyRosterPowerToTeam(team);
  saveProgress();
  renderRosterModal();
  renderTeamGrid(false);
  renderQuickSimOptions();
});

// ----------------------------------------------------------
// NEWS & POST-MATCH INTERVIEW
// Berita & wawancara dibuat otomatis pakai template + randomisasi
// lokal (tanpa API AI eksternal), berdasarkan hasil match yang
// sudah ada. Disimpan per league-season di localStorage.
// ----------------------------------------------------------
function pickRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillNewsTemplate(str, vars) {
  const filled = str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : ""));
  return filled.replace(/[ \t]+/g, " ").replace(/ +([.,!?])/g, "$1").trim();
}

const NEWS_TEMPLATES = {
  upset: {
    label: "🔥 Upset",
    headlines: [
      "🔥 UPSET! {winner} Tumbangkan {loser}",
      "Kejutan Besar! {winner} Kalahkan {loser} yang Diunggulkan",
      "Siapa Sangka! {winner} Bikin Kejutan Lawan {loser}",
    ],
    bodies: [
      "Di luar prediksi banyak orang, {winner} berhasil mengalahkan {loser} dengan skor {scoreA}-{scoreB}. Meski di atas kertas {loser} lebih diunggulkan, {winner} tampil percaya diri dan mampu memanfaatkan momentum sepanjang pertandingan.\n\nHasil ini membuktikan bahwa di {league} {season}, tidak ada yang benar-benar pasti. {winner} kini melanjutkan perjalanan mereka dengan modal kepercayaan diri yang tinggi.",
    ],
  },
  bigwin: {
    label: "💪 Big Win",
    headlines: [
      "Dominasi Total! {winner} Menang {scoreA}-{scoreB} atas {loser}",
      "{winner} Tak Terbendung, Libas {loser} dengan Mudah",
      "Tanpa Perlawanan Berarti, {winner} Amankan Kemenangan atas {loser}",
    ],
    bodies: [
      "{winner} tampil dominan sepanjang laga melawan {loser}, menutup pertandingan dengan skor telak {scoreA}-{scoreB}. Sejak awal, {winner} sudah mengambil kendali penuh dan tidak memberi banyak ruang bagi {loser} untuk bangkit.\n\nHasil ini menegaskan status {winner} sebagai salah satu kandidat kuat di {league} {season}.",
    ],
  },
  close: {
    label: "⚔️ Close Match",
    headlines: [
      "Pertandingan Sengit! {winner} Menang Tipis atas {loser}",
      "Drama Hingga Game Penentuan, {winner} Menang atas {loser}",
      "Nyaris Terbalik! {winner} Tetap Menang Lawan {loser}",
    ],
    bodies: [
      "Laga antara {winner} dan {loser} berjalan sangat ketat dan harus ditentukan hingga game terakhir. Setelah pertarungan sengit, {winner} akhirnya keluar sebagai pemenang dengan skor {scoreA}-{scoreB}.\n\nKedua tim menunjukkan permainan solid, namun {winner} sedikit lebih baik di momen-momen krusial.",
    ],
  },
  normal: {
    label: "📰 Match Result",
    headlines: [
      "{winner} Berhasil Mengalahkan {loser}",
      "{winner} Menang atas {loser} dengan Skor {scoreA}-{scoreB}",
      "{winner} Amankan Kemenangan Lawan {loser}",
    ],
    bodies: [
      "{winner} berhasil meraih kemenangan atas {loser} dengan skor akhir {scoreA}-{scoreB} pada pertandingan {league} {season}. Performa solid {winner} sepanjang laga membuahkan hasil positif.\n\n{winner} kini melanjutkan perjalanan mereka di kompetisi ini dengan modal kemenangan yang berharga.",
    ],
  },
  grandfinal: {
    label: "🏆 Champion News",
    headlines: [
      "🏆 {winner} RESMI MENJADI JUARA {league} {season}!",
      "🏆 Gelar Juara {league} {season} Jatuh ke Tangan {winner}!",
    ],
    bodies: [
      "{winner} berhasil memastikan gelar juara {league} {season} setelah mengalahkan {loser} di Grand Final dengan skor {scoreA}-{scoreB}. Perjalanan panjang sepanjang season akhirnya terbayar dengan trofi juara.\n\nSelamat kepada {winner} atas pencapaian luar biasa ini!",
    ],
  },
  eliminated: {
    label: "❌ Bracket Update",
    headlines: ["{team} Tersingkir dari {league} {season}", "Perjalanan {team} Berakhir di {league} {season}"],
    bodies: [
      "{team} harus mengakhiri perjalanan mereka di {league} {season} setelah kalah di babak Knockout. Meski begitu, performa {team} sepanjang turnamen tetap patut diapresiasi oleh para penggemar.",
    ],
  },
  qualified: {
    label: "🌍 Tournament Update",
    headlines: ["🌍 {team} Resmi Qualified ke {event}!"],
    bodies: [
      "{team} berhasil mengamankan tiket ke {event} setelah tampil impresif di {league} {season}. Ini menjadi kesempatan bagi {team} untuk unjuk gigi di panggung internasional.",
    ],
  },
};

const INTERVIEW_QUESTIONS = [
  "Apa kunci kemenangan kalian hari ini?",
  "Bagaimana persiapan kalian menghadapi pertandingan ini?",
  "Apa yang kalian pikirkan saat sempat tertinggal?",
  "Bagaimana komunikasi tim selama pertandingan?",
  "Apa pendapatmu tentang permainan lawan?",
  "Ada pesan untuk fans?",
  "Bagaimana perasaanmu setelah memenangkan pertandingan ini?",
  "Apa yang akan kalian lakukan untuk pertandingan berikutnya?",
];

const ROLE_ANSWER_FLAVOR = {
  "Roam": [
    "Komunikasi jadi hal penting, kami terus kasih informasi ke tim selama pertandingan.",
    "Saya fokus melindungi carry dan buka ruang buat tim.",
  ],
  "Jungler": [
    "Kami bermain lebih sabar dan ikuti rencana rotasi yang udah disiapin.",
    "Kontrol objektif jadi fokus utama kami sepanjang game.",
  ],
  "EXP Laner": [
    "Saya berusaha jaga lane dan bantu tim pas dibutuhkan.",
    "Fokus saya split push dan cari celah di sisi map.",
  ],
  "Gold Laner": [
    "Saya fokus farming dan nunggu momen yang tepat buat team fight.",
    "Positioning jadi kunci biar damage saya maksimal.",
  ],
  "Mid Laner": [
    "Kami coba jaga tempo permainan dan gak terburu-buru.",
    "Saya coba kontrol rotasi map dari mid biar sisi lain lebih ringan.",
  ],
};

const RESULT_ANSWER_FLAVOR = {
  dominant: ["Kami cukup puas karena game berjalan sesuai rencana.", "Persiapan kami emang terbayar hari ini."],
  close: [
    "Sempat tegang di akhir, tapi kami tetap percaya sama komunikasi tim.",
    "Pertandingan ketat begini yang bikin kami makin solid ke depannya.",
  ],
  upset: [
    "Banyak yang gak nyangka kami bisa menang, tapi kami percaya sama persiapan kami.",
    "Kami emang underdog di atas kertas, tapi kami main tanpa beban.",
  ],
  grandfinal: [
    "Rasanya luar biasa, kerja keras satu season akhirnya terbayar jadi juara.",
    "Ini pencapaian besar buat tim, makasih buat semua yang udah dukung kami.",
  ],
  normal: [
    "Kami senang bisa menang hari ini dan lanjut ke pertandingan berikutnya.",
    "Tim main cukup solid hari ini, semoga bisa dipertahankan.",
  ],
};

// Bikin 1 pasang pertanyaan+jawaban wawancara buat 1 pemain
function buildInterviewQA(playerName, role, category) {
  const question = pickRandomFrom(INTERVIEW_QUESTIONS);
  const roleFlavor = ROLE_ANSWER_FLAVOR[role] ? pickRandomFrom(ROLE_ANSWER_FLAVOR[role]) : "";
  const resultKey =
    category === "grandfinal" ? "grandfinal" : category === "upset" ? "upset" : category === "close" ? "close" : category === "bigwin" ? "dominant" : "normal";
  const resultFlavor = pickRandomFrom(RESULT_ANSWER_FLAVOR[resultKey]);

  return {
    player: playerName,
    role,
    category,
    question,
    answer: `${resultFlavor} ${roleFlavor}`,
  };
}

// Pilih pemain buat diwawancara dari tim pemenang — defaultnya Player
// of the Match kalau ada, biar dua fitur ini nyambung satu sama lain.
function generateInterviewForWinner(winnerTeamId, category, mvp) {
  const roster = loadRoster(winnerTeamId);
  const filled = ROSTER_ROLES.filter((r) => roster[r] && roster[r].name);
  if (filled.length === 0) return null;

  const role = mvp && roster[mvp.role] ? mvp.role : pickRandomFrom(filled);
  const player = roster[role];
  return buildInterviewQA(player.name, role, category);
}

function classifyMatchNewsCategory(winner, loser, winnerScore, loserScore, bestOf, isGrandFinal) {
  if (isGrandFinal) return "grandfinal";
  if (loser.strength - winner.strength >= 8) return "upset";
  const winsNeeded = Math.ceil(bestOf / 2);
  if (loserScore === 0 && winner.strength - loser.strength >= 6) return "bigwin";
  if (loserScore === winsNeeded - 1) return "close";
  return "normal";
}

// Bikin 1 item berita lengkap (+ interview) buat 1 match yang baru
// selesai, lalu simpan ke state.news (terbaru di paling atas).
function buildMatchNewsItem(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, mvp, leagueNameOverride, seasonOverride) {
  const loser = winner.id === teamA.id ? teamB : teamA;
  const winnerScore = winner.id === teamA.id ? scoreA : scoreB;
  const loserScore = winner.id === teamA.id ? scoreB : scoreA;

  const category = classifyMatchNewsCategory(winner, loser, winnerScore, loserScore, bestOf, isGrandFinal);
  const set = NEWS_TEMPLATES[category];
  const league = leagues.find((l) => l.id === state.leagueId);
  const vars = {
    winner: winner.name,
    loser: loser.name,
    scoreA: winnerScore,
    scoreB: loserScore,
    league: leagueNameOverride !== undefined ? leagueNameOverride : league ? league.name : state.leagueId,
    season: seasonOverride !== undefined ? seasonOverride : state.season,
  };

  return {
    id: matchKey + ":" + Date.now() + ":" + Math.floor(Math.random() * 1000),
    matchKey,
    timestamp: Date.now(),
    categoryKey: category,
    categoryLabel: set.label,
    headline: fillNewsTemplate(pickRandomFrom(set.headlines), vars),
    body: fillNewsTemplate(pickRandomFrom(set.bodies), vars),
    teamAName: teamA.name,
    teamBName: teamB.name,
    scoreA,
    scoreB,
    interview: generateInterviewForWinner(winner.id, category, mvp),
  };
}

function recordMatchNews(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, mvp) {
  const newsItem = buildMatchNewsItem(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, mvp);
  state.news.unshift(newsItem);
  if (state.news.length > 200) state.news.length = 200; // batasi biar localStorage gak membengkak
  saveNews();
  return newsItem;
}

// Berita non-match (eliminasi, qualified ke MSC/M-Series)
function recordEventNews(categoryKey, vars) {
  const set = NEWS_TEMPLATES[categoryKey];
  const newsItem = {
    id: categoryKey + ":" + Date.now() + ":" + Math.floor(Math.random() * 1000),
    matchKey: null,
    timestamp: Date.now(),
    categoryKey,
    categoryLabel: set.label,
    headline: fillNewsTemplate(pickRandomFrom(set.headlines), vars),
    body: fillNewsTemplate(pickRandomFrom(set.bodies), vars),
    teamAName: null,
    teamBName: null,
    scoreA: null,
    scoreB: null,
    interview: null,
  };
  state.news.unshift(newsItem);
  if (state.news.length > 200) state.news.length = 200;
  saveNews();
  return newsItem;
}

function newsStorageKey() {
  return `mlbb-sim:news:${state.leagueId}-${state.season}`;
}

function saveNews() {
  try {
    localStorage.setItem(newsStorageKey(), JSON.stringify(state.news));
  } catch (e) {
    // skip, gak fatal
  }
}

function loadNewsFromStorage() {
  try {
    const raw = localStorage.getItem(newsStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function findNewsByMatchKey(matchKey) {
  return state.news.find((n) => n.matchKey === matchKey);
}

// ---- Rendering: News Center tab ----
const newsTimeline = document.getElementById("newsTimeline");

function formatNewsTime(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleString("id-ID", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}

function renderNewsTimeline() {
  if (state.news.length === 0) {
    newsTimeline.innerHTML = `<p class="news-empty">Belum ada berita. Mainkan beberapa pertandingan dulu di Standings atau Knockout.</p>`;
    return;
  }

  newsTimeline.innerHTML = state.news
    .map((item) => {
      const matchLine = item.matchKey ? `<div class="news-card__match">${item.teamAName} ${item.scoreA} - ${item.scoreB} ${item.teamBName}</div>` : "";
      return `
        <div class="news-card" data-news-id="${item.id}">
          <div class="news-card__top">
            <span class="news-card__category">${item.categoryLabel}</span>
            <span class="news-card__time">${formatNewsTime(item.timestamp)}</span>
          </div>
          <div class="news-card__headline">${item.headline}</div>
          ${matchLine}
          <span class="news-card__link">Baca Selengkapnya →</span>
        </div>`;
    })
    .join("");

  newsTimeline.querySelectorAll("[data-news-id]").forEach((card) => {
    card.addEventListener("click", () => openNewsModal(card.dataset.newsId));
  });
}

// ---- News Detail Modal ----
const newsModalOverlay = document.getElementById("newsModalOverlay");
const newsModalCategory = document.getElementById("newsModalCategory");
const newsModalHeadline = document.getElementById("newsModalHeadline");
const newsModalMeta = document.getElementById("newsModalMeta");
const newsModalBody = document.getElementById("newsModalBody");
const newsModalOpenInterviewBtn = document.getElementById("newsModalOpenInterviewBtn");
let currentNewsModalItem = null;

function openNewsModal(newsId) {
  const item = state.news.find((n) => n.id === newsId);
  if (!item) return;
  openNewsModalDirect(item);
}

function openNewsModalDirect(item) {
  currentNewsModalItem = item;

  newsModalCategory.textContent = item.categoryLabel;
  newsModalHeadline.textContent = item.headline;
  newsModalMeta.textContent = item.matchKey
    ? `${item.teamAName} ${item.scoreA} - ${item.scoreB} ${item.teamBName} · ${formatNewsTime(item.timestamp)}`
    : formatNewsTime(item.timestamp);
  newsModalBody.textContent = item.body;
  newsModalOpenInterviewBtn.hidden = !item.interview;

  newsModalOverlay.hidden = false;
}

document.getElementById("newsModalClose").addEventListener("click", () => {
  newsModalOverlay.hidden = true;
});
newsModalOverlay.addEventListener("click", (e) => {
  if (e.target === newsModalOverlay) newsModalOverlay.hidden = true;
});
newsModalOpenInterviewBtn.addEventListener("click", () => {
  if (!currentNewsModalItem || !currentNewsModalItem.interview) return;
  newsModalOverlay.hidden = true;
  openInterviewModalFromItem(currentNewsModalItem);
});

// ---- Post-Match Interview Modal ----
const interviewModalOverlay = document.getElementById("interviewModalOverlay");
const interviewModalEmpty = document.getElementById("interviewModalEmpty");
const interviewModalContent = document.getElementById("interviewModalContent");
const interviewModalPlayerName = document.getElementById("interviewModalPlayerName");
const interviewModalPlayerRole = document.getElementById("interviewModalPlayerRole");
const interviewModalQuestion = document.getElementById("interviewModalQuestion");
const interviewModalAnswer = document.getElementById("interviewModalAnswer");
let currentInterviewNewsItem = null;

function renderInterviewModal() {
  const interview = currentInterviewNewsItem && currentInterviewNewsItem.interview;
  interviewModalEmpty.hidden = !!interview;
  interviewModalContent.hidden = !interview;
  if (!interview) return;

  interviewModalPlayerName.textContent = interview.player;
  interviewModalPlayerRole.textContent = interview.role;
  interviewModalQuestion.textContent = `"${interview.question}"`;
  interviewModalAnswer.textContent = `"${interview.answer}"`;
}

function openInterviewModalFromItem(item) {
  currentInterviewNewsItem = item;
  renderInterviewModal();
  interviewModalOverlay.hidden = false;
}

function openInterviewModalByMatchKey(matchKey) {
  const item = findNewsByMatchKey(matchKey);
  if (!item) return;
  openInterviewModalFromItem(item);
}

document.getElementById("interviewModalClose").addEventListener("click", () => {
  interviewModalOverlay.hidden = true;
});
interviewModalOverlay.addEventListener("click", (e) => {
  if (e.target === interviewModalOverlay) interviewModalOverlay.hidden = true;
});
document.getElementById("interviewModalNextBtn").addEventListener("click", () => {
  if (!currentInterviewNewsItem || !currentInterviewNewsItem.interview) return;
  const { player, role, category } = currentInterviewNewsItem.interview;
  currentInterviewNewsItem.interview = buildInterviewQA(player, role, category);
  saveNews();
  renderInterviewModal();
});

// HTML tombol kecil "📰 Berita" / "🎤 Interview" — dipasang di match
// card yang udah ada beritanya (schedule, knockout, quick sim)
function matchNewsActionsHtml(matchKey) {
  const item = findNewsByMatchKey(matchKey);
  if (!item) return "";
  return `
    <div class="match-news-actions">
      <button data-open-news="${item.id}">📰 Berita</button>
      ${item.interview ? `<button data-open-interview="${matchKey}">🎤 Interview</button>` : ""}
    </div>`;
}

// dipanggil sekali di tiap render yang pakai matchNewsActionsHtml,
// biar tombolnya kepasang listener-nya
function wireMatchNewsActions(container) {
  container.querySelectorAll("[data-open-news]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openNewsModal(btn.dataset.openNews);
    });
  });
  container.querySelectorAll("[data-open-interview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openInterviewModalByMatchKey(btn.dataset.openInterview);
    });
  });
}

// ----------------------------------------------------------
// DROPDOWNS
// ----------------------------------------------------------
const leagueSelect = document.getElementById("leagueSelect");
const seasonInput = document.getElementById("seasonInput");

function renderLeagueOptions() {
  leagueSelect.innerHTML = leagues
    .map((l) => `<option value="${l.id}">${l.name}${l.historical ? " (Historical)" : ""}</option>`)
    .join("");
  leagueSelect.value = state.leagueId;
}

// Season sekarang input bebas — user boleh ketik season berapa pun
// (S1 sampai S1000, terserah). Kalau season itu punya data resmi,
// tim resminya otomatis muncul. Kalau tidak, tetap bisa dipakai
// dengan Custom Team.
function syncSeasonInputFromState() {
  seasonInput.value = String(state.season).replace(/[^0-9]/g, "");
}

function applySeasonInput() {
  const num = parseInt(seasonInput.value, 10);
  state.season = "S" + (isNaN(num) || num < 1 ? 1 : num);
  syncSeasonInputFromState();
  loadTeamsForCurrentSelection();
}

leagueSelect.addEventListener("change", () => {
  state.leagueId = leagueSelect.value;
  state.season = (seasons[state.leagueId] || [])[0] || "S1";
  syncSeasonInputFromState();
  loadTeamsForCurrentSelection();
});

seasonInput.addEventListener("change", applySeasonInput);
seasonInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") applySeasonInput();
});

// ----------------------------------------------------------
// LOAD + RENDER TEAMS
// ----------------------------------------------------------
const teamGrid = document.getElementById("teamGrid");

function loadTeamsForCurrentSelection() {
  const official = officialTeams[state.leagueId];

  if (!official) {
    // liga/season ini belum ada data resminya (comingSoon)
    state.teams = [...loadCustomTeams()];
  } else {
    state.teams = [...official, ...loadCustomTeams()];
  }

  // kalau ada tim yang mode Team Power-nya AUTO, hitung ulang
  // strength-nya dari rata-rata rating 5 roster utama
  state.teams.forEach(applyRosterPowerToTeam);
  renderTeamGrid(!official);

  state.schedule = state.teams.length >= 2 ? generateSchedule(state.teams) : [];
  state.knockout = null; // default: bracket direset, harus di-generate ulang
  state.pointOverrides = {};
  state.news = loadNewsFromStorage();

  // kalau ada progress tersimpan buat league-season ini, pakai itu
  // (asal tim yang direferensikan masih ada semua)
  const saved = loadProgress();
  if (saved) {
    state.schedule = saved.schedule;
    state.knockout = saved.knockout;
    state.pointOverrides = saved.pointOverrides || {};
  }

  saveLastSelection();

  renderOverviewStats();
  renderQuickSimOptions();
  renderStandings();
  renderSchedule();
  renderKnockout();
  renderInternational();
  renderNewsTimeline();
}

function renderTeamGrid(isComingSoon) {
  if (isComingSoon && state.teams.length === 0) {
    teamGrid.innerHTML = `
      <p style="color:var(--text-dim); grid-column: 1 / -1;">
        Data tim resmi untuk liga ini belum ditambahkan.
        Kamu tetap bisa membuat Custom Team di bawah.
      </p>`;
    return;
  }

  teamGrid.innerHTML = state.teams
    .map((team) => {
      const mode = loadRosterMode(team.id);
      const isAuto = mode === "auto" && isRosterComplete(loadRoster(team.id));
      return `
      <div class="team-card" data-team-id="${team.id}">
        <button class="team-card__delete" data-delete-team="${team.id}" title="Hapus tim ini">✕</button>
        <img class="team-card__logo" src="${team.logo}" alt="${team.name} logo" />
        <div class="team-card__name">${team.name}</div>
        <div class="team-card__strength-row">
          <input type="range" min="1" max="100" value="${team.strength}"
                 data-strength-for="${team.id}" ${isAuto ? "disabled" : ""} />
          <span class="team-card__strength-value">${team.strength}</span>
          ${isAuto ? '<span class="team-card__auto-badge">AUTO</span>' : ""}
        </div>
        <button class="team-card__roster-btn" data-manage-roster="${team.id}">MANAGE ROSTER</button>
      </div>`;
    })
    .join("");

  // pasang listener slider strength per kartu tim
  teamGrid.querySelectorAll("input[data-strength-for]").forEach((slider) => {
    slider.addEventListener("input", () => {
      const teamId = slider.dataset.strengthFor;
      const team = state.teams.find((t) => t.id === teamId);
      team.strength = Number(slider.value);
      slider.nextElementSibling.textContent = slider.value;
      persistCustomStrengthIfNeeded(team);
    });
  });

  // pasang listener tombol hapus tim
  teamGrid.querySelectorAll("[data-delete-team]").forEach((btn) => {
    btn.addEventListener("click", () => removeTeam(btn.dataset.deleteTeam));
  });

  // pasang listener tombol Manage Roster
  teamGrid.querySelectorAll("[data-manage-roster]").forEach((btn) => {
    btn.addEventListener("click", () => openRosterModal(btn.dataset.manageRoster));
  });
}

// Hapus tim dari kompetisi yang sedang berjalan.
// Kalau tim itu Custom Team, dihapus permanen juga dari localStorage.
// Schedule & Knockout otomatis di-reset karena daftar tim berubah.
function removeTeam(teamId) {
  const team = state.teams.find((t) => t.id === teamId);
  if (!team) return;

  const confirmed = confirm(`Hapus "${team.name}" dari kompetisi ini?`);
  if (!confirmed) return;

  state.teams = state.teams.filter((t) => t.id !== teamId);

  // kalau custom team, hapus permanen dari localStorage
  const customs = loadCustomTeams().filter((t) => t.id !== teamId);
  saveCustomTeams(customs);
  deleteRosterData(teamId);

  state.schedule = state.teams.length >= 2 ? generateSchedule(state.teams) : [];
  state.knockout = null;
  saveProgress();

  renderTeamGrid(state.teams.length === 0);
  renderOverviewStats();
  renderStandings();
  renderSchedule();
  renderKnockout();
  renderInternational();
  renderQuickSimOptions();
}

// jika tim yang strength-nya diubah adalah custom team, simpan ke localStorage
function persistCustomStrengthIfNeeded(team) {
  const customs = loadCustomTeams();
  const idx = customs.findIndex((t) => t.id === team.id);
  if (idx !== -1) {
    customs[idx].strength = team.strength;
    saveCustomTeams(customs);
  }
}

// ----------------------------------------------------------
// STANDINGS
// ----------------------------------------------------------
const standingsBody = document.getElementById("standingsBody");

function renderStandings() {
  const rows = computeStandings();

  if (rows.length === 0) {
    standingsBody.innerHTML = `<tr><td colspan="6" style="color:var(--text-dim)">Belum ada tim.</td></tr>`;
    return;
  }

  standingsBody.innerHTML = rows
    .map(
      (row, idx) => `
      <tr>
        <td><span class="rank-badge">${idx + 1}</span></td>
        <td class="standings-table__team">
          <img src="${row.team.logo}" alt="${row.team.name} logo" />
          <span>${row.team.name}</span>
        </td>
        <td class="standings-table__accent">
          <input type="number" class="standings-points-input ${row.ptsIsManual ? "standings-points-input--manual" : ""}"
                 value="${row.pts}" data-points-for="${row.team.id}" title="Klik buat edit Match Point manual" />
        </td>
        <td>${row.w} - ${row.l}</td>
        <td class="standings-table__accent">${row.gd >= 0 ? "+" + row.gd : row.gd}</td>
        <td>${row.gw} - ${row.gl}</td>
      </tr>`
    )
    .join("");

  // edit Match Point manual — override angka poin tim ini, lepas dari
  // hasil match satu-satu
  standingsBody.querySelectorAll("[data-points-for]").forEach((input) => {
    input.addEventListener("change", () => {
      const teamId = input.dataset.pointsFor;
      const value = Number(input.value);
      state.pointOverrides[teamId] = isNaN(value) ? 0 : value;
      saveProgress();
      renderStandings();
    });
  });
}

// ----------------------------------------------------------
// SCHEDULE LIST + SIMULATE ALL
// ----------------------------------------------------------
const scheduleList = document.getElementById("scheduleList");
const simulateScheduleBtn = document.getElementById("simulateScheduleBtn");

function teamById(id) {
  return state.teams.find((t) => t.id === id);
}

function renderSchedule() {
  if (state.schedule.length === 0) {
    scheduleList.innerHTML = `<p style="color:var(--text-dim)">Belum ada jadwal — minimal butuh 2 tim.</p>`;
    return;
  }

  const scheduleItemHtml = (match, matchNumber) => {
    const teamA = teamById(match.teamAId);
    const teamB = teamById(match.teamBId);
    if (!teamA || !teamB) return "";

    const scoreText = match.played ? `${match.scoreA} - ${match.scoreB}` : "vs";
    const randomBtn = match.played
      ? `<button class="schedule-item__resim" data-resim="${match.id}" title="Simulasikan ulang (acak)">↻</button>`
      : `<button class="schedule-item__play" data-play="${match.id}" title="Simulasikan acak">🎲</button>`;

    const manualInputs = match.played
      ? ""
      : `
        <input type="number" min="0" class="manual-score-input manual-score-input--small" data-manual-a="${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input manual-score-input--small" data-manual-b="${match.id}" placeholder="0" />
        <button class="schedule-item__manual-submit" data-manual-submit="${match.id}" title="Input skor manual">✓</button>`;

    const mvpHtml = match.played ? mvpRowHtml("schedule", match.id, match.winnerId, match.mvp) : "";
    const newsActionsHtml = match.played ? matchNewsActionsHtml("sched:" + match.id) : "";

    return `
      <div class="schedule-item ${match.played ? "" : "schedule-item--pending"}">
        <div class="schedule-item__top">
          <span class="schedule-item__number">M${matchNumber}</span>
          <span class="schedule-item__teams">${teamA.short || teamA.name} ${scoreText} ${teamB.short || teamB.name}</span>
          ${manualInputs}
          ${randomBtn}
        </div>
        ${mvpHtml}
        ${newsActionsHtml}
      </div>`;
  };

  // Dikelompokkan per Week kayak jadwal MPL asli. Jumlah match tiap
  // Week disesuaikan dengan jumlah tim (kira-kira setengah jumlah
  // tim main tiap Week, sisanya lanjut Week berikutnya).
  const matchesPerWeek = Math.max(1, Math.floor(state.teams.length / 2));
  const weeks = [];
  for (let i = 0; i < state.schedule.length; i += matchesPerWeek) {
    weeks.push(state.schedule.slice(i, i + matchesPerWeek));
  }

  let matchCounter = 0;
  scheduleList.innerHTML = weeks
    .map((weekMatches, weekIdx) => {
      const itemsHtml = weekMatches
        .map((match) => {
          matchCounter++;
          return scheduleItemHtml(match, matchCounter);
        })
        .join("");

      return `
        <div class="schedule-week">
          <h4 class="schedule-week__label">Week ${weekIdx + 1}</h4>
          <div class="schedule-week__matches">${itemsHtml}</div>
        </div>`;
    })
    .join("");

  // tombol simulasi acak per match (bisa pilih match mana saja, boleh skip yang lain)
  scheduleList.querySelectorAll("[data-play], [data-resim]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.play || btn.dataset.resim;
      simulateOneMatch(matchId);
    });
  });

  // tombol input skor manual per match
  scheduleList.querySelectorAll("[data-manual-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.manualSubmit;
      const inputA = scheduleList.querySelector(`[data-manual-a="${matchId}"]`);
      const inputB = scheduleList.querySelector(`[data-manual-b="${matchId}"]`);
      submitManualScheduleScore(matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  // pilih MVP manual lewat dropdown
  scheduleList.querySelectorAll("[data-schedule-mvp-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const matchId = select.dataset.scheduleMvpSelect;
      const match = state.schedule.find((m) => m.id === matchId);
      if (!match) return;
      const roster = loadRoster(match.winnerId);
      const role = select.value;
      match.mvp = { role, name: roster[role].name };
      saveProgress();
    });
  });

  // acak ulang MVP
  scheduleList.querySelectorAll("[data-schedule-mvp-reroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.scheduleMvpReroll;
      const match = state.schedule.find((m) => m.id === matchId);
      if (!match) return;
      match.mvp = pickRandomMvp(match.winnerId);
      saveProgress();
      renderSchedule();
    });
  });

  wireMatchNewsActions(scheduleList);
}

// Input skor manual untuk match regular season (bukan random)
function submitManualScheduleScore(matchId, scoreA, scoreB) {
  const match = state.schedule.find((m) => m.id === matchId);
  if (!match || match.played) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const teamA = teamById(match.teamAId);
  const teamB = teamById(match.teamBId);

  match.played = true;
  match.scoreA = scoreA;
  match.scoreB = scoreB;
  match.winnerId = scoreA > scoreB ? match.teamAId : match.teamBId;
  match.mvp = pickRandomMvp(match.winnerId);

  if (teamA && teamB) {
    recordMatchNews("sched:" + match.id, teamA, teamB, scoreA, scoreB, teamById(match.winnerId), 3, false, match.mvp);
  }

  saveProgress();
  renderStandings();
  renderSchedule();
  renderOverviewStats();
  renderNewsTimeline();
}

function simulateOneMatch(matchId) {
  const match = state.schedule.find((m) => m.id === matchId);
  if (!match) return;

  const teamA = teamById(match.teamAId);
  const teamB = teamById(match.teamBId);
  if (!teamA || !teamB) return;

  const result = simulateMatch(teamA, teamB, 3); // regular season pakai BO3
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === teamB.id ? result.winnerScore : result.loserScore;
  match.mvp = pickRandomMvp(match.winnerId);

  recordMatchNews("sched:" + match.id, teamA, teamB, match.scoreA, match.scoreB, result.winner, 3, false, match.mvp);

  saveProgress();
  renderStandings();
  renderSchedule();
  renderOverviewStats();
  renderNewsTimeline();
}

simulateScheduleBtn.addEventListener("click", () => {
  state.schedule.forEach((match) => {
    if (match.played) return;
    const teamA = teamById(match.teamAId);
    const teamB = teamById(match.teamBId);
    if (!teamA || !teamB) return;

    // regular season pakai format BO3
    const result = simulateMatch(teamA, teamB, 3);
    match.played = true;
    match.winnerId = result.winner.id;
    match.scoreA = result.winner.id === teamA.id ? result.winnerScore : result.loserScore;
    match.scoreB = result.winner.id === teamB.id ? result.winnerScore : result.loserScore;
    match.mvp = pickRandomMvp(match.winnerId);

    recordMatchNews("sched:" + match.id, teamA, teamB, match.scoreA, match.scoreB, result.winner, 3, false, match.mvp);
  });

  saveProgress();
  renderStandings();
  renderSchedule();
  renderOverviewStats();
  renderNewsTimeline();
});

// Reset semua hasil pertandingan (regular season + knockout) buat
// league-season yang sedang aktif — kembali ke jadwal kosong, siap
// dimainkan ulang dari nol.
const resetResultsBtn = document.getElementById("resetResultsBtn");
resetResultsBtn.addEventListener("click", () => {
  const confirmed = confirm(
    "Reset SEMUA hasil pertandingan (regular season + knockout bracket) untuk league & season ini?"
  );
  if (!confirmed) return;

  state.schedule = state.teams.length >= 2 ? generateSchedule(state.teams) : [];
  state.knockout = null;
  state.pointOverrides = {};
  state.news = [];
  saveProgress();
  saveNews();

  renderStandings();
  renderSchedule();
  renderKnockout();
  renderOverviewStats();
  renderInternational();
  renderNewsTimeline();
});

// ----------------------------------------------------------
// KNOCKOUT BRACKET — Double Elimination, 6 tim (top 6 Standings)
// Struktur mengikuti bracket resmi MPL:
// - M1 & M2 adalah babak pertama. Yang KALAH di M1/M2 LANGSUNG GUGUR
//   (tidak masuk lower bracket sama sekali).
// - Pemenang M1/M2 lanjut ke Upper Bracket Semifinal (M3/M4) lawan
//   tim seed 1 & 2 yang dapat bye.
// - Lower Bracket baru mulai diisi oleh tim yang KALAH di M3/M4.
//
//   M1 (Seed3 vs Seed6)          -> menang ke M3(B), kalah GUGUR
//   M2 (Seed4 vs Seed5)          -> menang ke M4(B), kalah GUGUR
//   M3 (Seed1 vs menang M1)      -> menang ke M6(A), kalah ke M5(A)
//   M4 (Seed2 vs menang M2)      -> menang ke M6(B), kalah ke M5(B)
//   M5 Lower Bracket (kalah M3 vs kalah M4) -> menang ke M7(B)
//   M6 Upper Bracket Final (menang M3 vs menang M4) -> menang ke M8(A), kalah ke M7(A)
//   M7 Lower Bracket Final (kalah M6 vs menang M5)  -> menang ke M8(B)
//   M8 GRAND FINAL (menang M6 vs menang M7)         -> pemenang = CHAMPION
// ----------------------------------------------------------

function buildBracketFromStandings() {
  const rows = computeStandings();
  if (rows.length < 6) {
    alert("Butuh minimal 6 tim di league ini untuk membuat Knockout Bracket.");
    return;
  }

  const [s1, s2, s3, s4, s5, s6] = rows.slice(0, 6).map((r) => r.team);

  state.knockout = {
    champion: null,
    order: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
    matches: {
      m1: { id: "m1", label: "Upper Bracket R1", teamA: s3, teamB: s6, bestOf: 3, played: false, winTo: { match: "m3", slot: "B" }, loseTo: null },
      m2: { id: "m2", label: "Upper Bracket R1", teamA: s4, teamB: s5, bestOf: 3, played: false, winTo: { match: "m4", slot: "B" }, loseTo: null },
      m3: { id: "m3", label: "Upper Bracket Semifinal", teamA: s1, teamB: null, bestOf: 3, played: false, winTo: { match: "m6", slot: "A" }, loseTo: { match: "m5", slot: "A" } },
      m4: { id: "m4", label: "Upper Bracket Semifinal", teamA: s2, teamB: null, bestOf: 3, played: false, winTo: { match: "m6", slot: "B" }, loseTo: { match: "m5", slot: "B" } },
      m5: { id: "m5", label: "Lower Bracket", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m7", slot: "B" }, loseTo: null },
      m6: { id: "m6", label: "Upper Bracket Final", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m8", slot: "A" }, loseTo: { match: "m7", slot: "A" } },
      m7: { id: "m7", label: "Lower Bracket Final", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m8", slot: "B" }, loseTo: null },
      m8: { id: "m8", label: "GRAND FINAL", teamA: null, teamB: null, bestOf: 7, played: false, winTo: null, loseTo: null },
    },
  };

  renderKnockout();
  renderOverviewStats();
  renderInternational();
  saveProgress();
}

function simulateKnockoutMatch(matchId) {
  const kb = state.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  const result = simulateMatch(match.teamA, match.teamB, match.bestOf);
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === match.teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === match.teamB.id ? result.winnerScore : result.loserScore;
  match.mvp = pickRandomMvp(match.winnerId);

  if (match.winTo) {
    kb.matches[match.winTo.match]["team" + match.winTo.slot] = result.winner;
  }
  if (match.loseTo) {
    kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = result.loser;
  }
  if (matchId === "m8") {
    kb.champion = result.winner;
    saveQualifiedTeams(state.leagueId, result.winner, result.loser, state.season);
  }

  recordKnockoutEventNews(matchId, match, result.winner, result.loser);

  renderKnockout();
  renderOverviewStats();
  renderInternational();
  renderNewsTimeline();
  saveProgress();
}

// Bikin berita match Knockout + berita tambahan kalau ada tim yang
// gugur, jadi champion, atau qualified ke MSC/M-Series
function recordKnockoutEventNews(matchId, match, winner, loser) {
  const isGrandFinal = matchId === "m8";
  recordMatchNews("ko:" + matchId, match.teamA, match.teamB, match.scoreA, match.scoreB, winner, match.bestOf, isGrandFinal, match.mvp);

  const isEliminationRound = match.loseTo === null && !isGrandFinal;
  if (isEliminationRound) {
    const league = leagues.find((l) => l.id === state.leagueId);
    recordEventNews("eliminated", { team: loser.name, league: league ? league.name : state.leagueId, season: state.season });
  }

  if (isGrandFinal) {
    const league = leagues.find((l) => l.id === state.leagueId);
    const eventName = getInternationalEvent(state.season);
    if (eventName) {
      [winner, loser].forEach((team) => {
        recordEventNews("qualified", { team: team.name, event: eventName, league: league ? league.name : state.leagueId, season: state.season });
      });
    }
  }
}

function knockoutMatchCardHtml(match) {
  const teamA = match.teamA;
  const teamB = match.teamB;
  const isEliminationRound = match.loseTo === null && match.id !== "m8"; // M1/M2: kalah = gugur langsung

  const rowHtml = (team, scoreValue) => {
    if (!team) {
      return `
        <div class="match-card__row">
          <span class="match-card__row-name" style="color:var(--text-dim)">TBD</span>
        </div>`;
    }
    const isWinner = match.played && match.winnerId === team.id;
    const isEliminated = match.played && !isWinner && isEliminationRound;
    return `
      <div class="match-card__row ${isWinner ? "match-card__row--winner" : ""}">
        <img src="${team.logo}" alt="${team.name} logo" />
        <span class="match-card__row-name">${team.name}${isEliminated ? ' <span style="color:var(--danger);font-size:11px;">(GUGUR)</span>' : ""}</span>
        <span class="match-card__row-score">${match.played ? scoreValue : "-"}</span>
      </div>`;
  };

  let actionHtml;
  if (match.played) {
    const winnerName = match.winnerId === teamA.id ? teamA.name : teamB.name;
    actionHtml = `
      <div class="match-card__winner-tag">🏆 ${winnerName} WIN</div>
      ${mvpRowHtml("knockout", match.id, match.winnerId, match.mvp)}
      ${matchNewsActionsHtml("ko:" + match.id)}`;
  } else if (!teamA || !teamB) {
    actionHtml = `<div class="match-card__winner-tag" style="color:var(--text-dim)">Menunggu tim...</div>`;
  } else {
    actionHtml = `
      <button class="btn btn--ghost match-card__simulate" data-knockout-sim="${match.id}">🎲 Random (BO${match.bestOf})</button>
      <div class="manual-score-row">
        <input type="number" min="0" class="manual-score-input" data-manual-knockout-a="${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input" data-manual-knockout-b="${match.id}" placeholder="0" />
        <button class="btn btn--ghost manual-score-submit" data-manual-knockout-submit="${match.id}">✓ Input Skor</button>
      </div>`;
  }

  return `
    <div class="match-card">
      <div class="match-card__id">${match.id.toUpperCase()} · ${match.label}</div>
      ${rowHtml(teamA, match.scoreA)}
      ${rowHtml(teamB, match.scoreB)}
      ${actionHtml}
    </div>`;
}

// Input skor manual oleh user (bukan random) — validasi sederhana:
// dua angka berbeda, tidak boleh sama-sama 0 atau seri.
function submitManualKnockoutScore(matchId, scoreA, scoreB) {
  const kb = state.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const winner = scoreA > scoreB ? match.teamA : match.teamB;
  const loser = winner === match.teamA ? match.teamB : match.teamA;

  match.played = true;
  match.winnerId = winner.id;
  match.scoreA = scoreA;
  match.scoreB = scoreB;
  match.mvp = pickRandomMvp(winner.id);

  if (match.winTo) {
    kb.matches[match.winTo.match]["team" + match.winTo.slot] = winner;
  }
  if (match.loseTo) {
    kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = loser;
  }
  if (matchId === "m8") {
    kb.champion = winner;
    saveQualifiedTeams(state.leagueId, winner, loser, state.season);
  }

  recordKnockoutEventNews(matchId, match, winner, loser);

  renderKnockout();
  renderOverviewStats();
  renderInternational();
  renderNewsTimeline();
  saveProgress();
}

const upperBracketEl = document.getElementById("upperBracket");
const lowerBracketEl = document.getElementById("lowerBracket");
const grandFinalEl = document.getElementById("grandFinal");
const championBanner = document.getElementById("championBanner");
const championLogo = document.getElementById("championLogo");
const championName = document.getElementById("championName");

// Kelompokkan match jadi kolom per-round biar tampil kayak bracket beneran
function roundGroupHtml(title, matchIds, kb) {
  return `
    <div class="round-group">
      <div class="round-group__label">${title}</div>
      <div class="round-group__matches">
        ${matchIds.map((id) => knockoutMatchCardHtml(kb.matches[id])).join("")}
      </div>
    </div>`;
}

function renderKnockout() {
  const kb = state.knockout;

  if (!kb) {
    upperBracketEl.innerHTML = `<p style="color:var(--text-dim)">Klik "Generate Bracket from Standings" dulu.</p>`;
    lowerBracketEl.innerHTML = "";
    grandFinalEl.innerHTML = "";
    championBanner.hidden = true;
    return;
  }

  upperBracketEl.innerHTML =
    roundGroupHtml("Round 1", ["m1", "m2"], kb) +
    roundGroupHtml("Semifinal", ["m3", "m4"], kb) +
    roundGroupHtml("Upper Bracket Final", ["m6"], kb);

  lowerBracketEl.innerHTML =
    roundGroupHtml("Lower Bracket", ["m5"], kb) +
    roundGroupHtml("Lower Bracket Final", ["m7"], kb);

  grandFinalEl.innerHTML = roundGroupHtml("Grand Final (BO7)", ["m8"], kb);

  // tombol random per match
  document.querySelectorAll("[data-knockout-sim]").forEach((btn) => {
    btn.addEventListener("click", () => simulateKnockoutMatch(btn.dataset.knockoutSim));
  });

  // tombol input skor manual per match
  document.querySelectorAll("[data-manual-knockout-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.manualKnockoutSubmit;
      const inputA = document.querySelector(`[data-manual-knockout-a="${matchId}"]`);
      const inputB = document.querySelector(`[data-manual-knockout-b="${matchId}"]`);
      submitManualKnockoutScore(matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  // pilih MVP manual lewat dropdown
  document.querySelectorAll("[data-knockout-mvp-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const matchId = select.dataset.knockoutMvpSelect;
      const match = kb.matches[matchId];
      if (!match) return;
      const roster = loadRoster(match.winnerId);
      const role = select.value;
      match.mvp = { role, name: roster[role].name };
      saveProgress();
    });
  });

  // acak ulang MVP
  document.querySelectorAll("[data-knockout-mvp-reroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.knockoutMvpReroll;
      const match = kb.matches[matchId];
      if (!match) return;
      match.mvp = pickRandomMvp(match.winnerId);
      saveProgress();
      renderKnockout();
    });
  });

  wireMatchNewsActions(upperBracketEl);
  wireMatchNewsActions(lowerBracketEl);
  wireMatchNewsActions(grandFinalEl);

  if (kb.champion) {
    championBanner.hidden = false;
    championLogo.src = kb.champion.logo;
    championLogo.alt = kb.champion.name + " logo";
    championName.textContent = kb.champion.name;
  } else {
    championBanner.hidden = true;
  }
}

document.getElementById("generateBracketBtn").addEventListener("click", buildBracketFromStandings);

document.getElementById("simulateAllBtn").addEventListener("click", () => {
  if (!state.knockout) {
    alert('Klik "Generate Bracket from Standings" dulu sebelum Simulate All.');
    return;
  }
  state.knockout.order.forEach((id) => simulateKnockoutMatch(id));
});

// ----------------------------------------------------------
// MSC / M-SERIES QUALIFICATION
// Season ganjil -> MSC, season genap -> M-Series.
// Rank 1 (champion) & Rank 2 (runner-up) dari Grand Final otomatis qualified.
// ----------------------------------------------------------
function getInternationalEvent(seasonStr) {
  const num = parseInt(String(seasonStr).replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return null;
  return num % 2 !== 0 ? "MSC" : "M-SERIES";
}

const intlTarget = document.getElementById("intlTarget");
const intlList = document.getElementById("intlList");

function renderInternational() {
  const eventName = getInternationalEvent(state.season);
  const league = leagues.find((l) => l.id === state.leagueId);

  intlTarget.innerHTML = eventName
    ? `${league ? league.name : ""} <strong>${state.season}</strong> → <span style="color:var(--gold)">${eventName}</span>`
    : "";

  const grandFinal = state.knockout && state.knockout.matches.m8;
  if (!grandFinal || !grandFinal.played) {
    intlList.innerHTML = `<p style="color:var(--text-dim)">Selesaikan Grand Final dulu di tab Knockout untuk melihat tim yang qualified.</p>`;
    return;
  }

  const champion = grandFinal.winnerId === grandFinal.teamA.id ? grandFinal.teamA : grandFinal.teamB;
  const runnerUp = grandFinal.winnerId === grandFinal.teamA.id ? grandFinal.teamB : grandFinal.teamA;

  intlList.innerHTML = `
    <div class="intl-card">
      <div class="intl-card__team">
        <img src="${champion.logo}" alt="${champion.name} logo" />
        <span>🥇 ${champion.name}</span>
      </div>
      <div class="intl-card__team">
        <img src="${runnerUp.logo}" alt="${runnerUp.name} logo" />
        <span>🥈 ${runnerUp.name}</span>
      </div>
    </div>`;
}

// ----------------------------------------------------------
// OVERVIEW STATS
// ----------------------------------------------------------
function renderOverviewStats() {
  const container = document.getElementById("overviewStats");
  const playedCount = state.schedule.filter((m) => m.played).length;
  const championText = state.knockout && state.knockout.champion ? state.knockout.champion.name : "-";
  container.innerHTML = `
    <div class="stat-chip">
      <div class="stat-chip__value">${state.teams.length}</div>
      <div class="stat-chip__label">Teams</div>
    </div>
    <div class="stat-chip">
      <div class="stat-chip__value">${playedCount}/${state.schedule.length}</div>
      <div class="stat-chip__label">Matches Played</div>
    </div>
    <div class="stat-chip">
      <div class="stat-chip__value">${championText}</div>
      <div class="stat-chip__label">Champion</div>
    </div>
  `;
}

// ----------------------------------------------------------
// QUICK MATCH SIMULATOR (uji coba simulation engine)
// ----------------------------------------------------------
const quickTeamASelect = document.getElementById("quickTeamA");
const quickTeamBSelect = document.getElementById("quickTeamB");
const quickFormatSelect = document.getElementById("quickFormat");
const quickSimulateBtn = document.getElementById("quickSimulateBtn");
const quickSimResult = document.getElementById("quickSimResult");

function renderQuickSimOptions() {
  if (state.teams.length < 2) {
    quickTeamASelect.innerHTML = `<option>-</option>`;
    quickTeamBSelect.innerHTML = `<option>-</option>`;
    quickSimulateBtn.disabled = true;
    quickSimResult.innerHTML = `<p class="quick-sim__empty">Butuh minimal 2 tim untuk simulasi.</p>`;
    return;
  }

  quickSimulateBtn.disabled = false;
  const optionsHtml = state.teams
    .map((t) => `<option value="${t.id}">${t.name}</option>`)
    .join("");

  quickTeamASelect.innerHTML = optionsHtml;
  quickTeamBSelect.innerHTML = optionsHtml;
  // default: pilih dua tim pertama yang berbeda
  quickTeamASelect.value = state.teams[0].id;
  quickTeamBSelect.value = state.teams[1].id;
  quickSimResult.innerHTML = "";
}

let quickSimState = null; // { teamA, teamB, result, mvp } — biar reroll/select MVP gak perlu re-simulasi

function renderQuickSimResult() {
  if (!quickSimState) return;
  const { teamA, teamB, result, mvp, newsItem } = quickSimState;

  const rowsInOrder = [teamA, teamB].map((team) => {
    const isWinner = team.id === result.winner.id;
    const score = isWinner ? result.winnerScore : result.loserScore;
    return `
      <div class="quick-sim__result-row ${isWinner ? "quick-sim__result-row--winner" : ""}">
        <img src="${team.logo}" alt="${team.name} logo" />
        <span class="quick-sim__result-row-name">${team.name}</span>
        <span class="quick-sim__result-row-score">${score}</span>
      </div>`;
  });

  quickSimResult.innerHTML = `
    ${rowsInOrder.join("")}
    <div class="quick-sim__winner-tag">🏆 ${result.winner.name} WIN</div>
    ${mvpRowHtml("quick", "quick", result.winner.id, mvp)}
    <div class="match-news-actions">
      <button id="quickSimNewsBtn">📰 Berita</button>
      ${newsItem.interview ? `<button id="quickSimInterviewBtn">🎤 Interview</button>` : ""}
    </div>
  `;

  const select = quickSimResult.querySelector("[data-quick-mvp-select]");
  if (select) {
    select.addEventListener("change", () => {
      const roster = loadRoster(result.winner.id);
      quickSimState.mvp = { role: select.value, name: roster[select.value].name };
    });
  }

  const rerollBtn = quickSimResult.querySelector("[data-quick-mvp-reroll]");
  if (rerollBtn) {
    rerollBtn.addEventListener("click", () => {
      quickSimState.mvp = pickRandomMvp(result.winner.id);
      quickSimState.newsItem = buildMatchNewsItem("quick", teamA, teamB, teamA.id === result.winner.id ? result.winnerScore : result.loserScore, teamB.id === result.winner.id ? result.winnerScore : result.loserScore, result.winner, quickFormatSelect ? Number(quickFormatSelect.value) : 3, false, quickSimState.mvp);
      renderQuickSimResult();
    });
  }

  document.getElementById("quickSimNewsBtn").addEventListener("click", () => openNewsModalDirect(newsItem));
  const interviewBtn = document.getElementById("quickSimInterviewBtn");
  if (interviewBtn) {
    interviewBtn.addEventListener("click", () => openInterviewModalFromItem(newsItem));
  }
}

quickSimulateBtn.addEventListener("click", () => {
  const teamA = state.teams.find((t) => t.id === quickTeamASelect.value);
  const teamB = state.teams.find((t) => t.id === quickTeamBSelect.value);

  if (!teamA || !teamB || teamA.id === teamB.id) {
    quickSimResult.innerHTML = `<p class="quick-sim__empty">Pilih dua tim yang berbeda.</p>`;
    return;
  }

  const bestOf = Number(quickFormatSelect.value);
  const result = simulateMatch(teamA, teamB, bestOf);
  const scoreA = teamA.id === result.winner.id ? result.winnerScore : result.loserScore;
  const scoreB = teamB.id === result.winner.id ? result.winnerScore : result.loserScore;
  const mvp = pickRandomMvp(result.winner.id);
  const newsItem = buildMatchNewsItem("quick", teamA, teamB, scoreA, scoreB, result.winner, bestOf, false, mvp);

  quickSimState = { teamA, teamB, result, mvp, newsItem };
  renderQuickSimResult();
});

// ----------------------------------------------------------
// TAB SWITCHING
// ----------------------------------------------------------
const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.tab;
    tabButtons.forEach((b) => b.classList.remove("tab--active"));
    btn.classList.add("tab--active");
    panels.forEach((p) => p.classList.remove("panel--active"));
    document.getElementById(targetId).classList.add("panel--active");
  });
});

// ----------------------------------------------------------
// CUSTOM TEAM FORM
// ----------------------------------------------------------
const customTeamForm = document.getElementById("customTeamForm");
const openCustomTeamBtn = document.getElementById("openCustomTeamBtn");
const cancelCustomTeamBtn = document.getElementById("cancelCustomTeamBtn");
const createCustomTeamBtn = document.getElementById("createCustomTeamBtn");
const strengthSlider = document.getElementById("customTeamStrength");
const strengthValue = document.getElementById("customTeamStrengthValue");

openCustomTeamBtn.addEventListener("click", () => {
  customTeamForm.hidden = false;
});

cancelCustomTeamBtn.addEventListener("click", () => {
  customTeamForm.hidden = true;
});

strengthSlider.addEventListener("input", () => {
  strengthValue.textContent = strengthSlider.value;
});

createCustomTeamBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("customTeamName");
  const shortInput = document.getElementById("customTeamShort");
  const logoInput = document.getElementById("customTeamLogo");
  const strength = Number(strengthSlider.value);

  const name = nameInput.value.trim();
  const short = shortInput.value.trim().toUpperCase() || name.slice(0, 4).toUpperCase();

  if (!name) {
    alert("Nama tim wajib diisi.");
    return;
  }

  const finalize = (logoDataUrl) => {
    const newTeam = {
      id: "custom-" + Date.now(),
      name,
      short,
      strength,
      logo: logoDataUrl,
    };

    const customs = loadCustomTeams();
    customs.push(newTeam);
    saveCustomTeams(customs);

    state.teams.push(newTeam);
    state.schedule = generateSchedule(state.teams);
    state.knockout = null;
    saveProgress();
    renderTeamGrid(false);
    renderOverviewStats();
    renderStandings();
    renderSchedule();
    renderKnockout();
    renderInternational();
    renderQuickSimOptions();

    // reset form
    nameInput.value = "";
    shortInput.value = "";
    logoInput.value = "";
    strengthSlider.value = 70;
    strengthValue.textContent = "70";
    customTeamForm.hidden = true;
  };

  // custom team BOLEH upload logo sendiri; kalau tidak diupload,
  // pakai logo generated dari singkatan nama tim
  const file = logoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => finalize(e.target.result);
    reader.readAsDataURL(file);
  } else {
    finalize(makeLogo(short.slice(0, 3), "#232B44", "#EDEFF7"));
  }
});

// ----------------------------------------------------------
// M-SERIES WORLD CHAMPIONSHIP
// 16 tim (Champion + Runner-up dari Knockout tiap 8 MPL) ->
// Swiss Stage (sampai 8 tim capai 3 menang, 8 tim gugur di 3 kalah)
// -> Knockout Stage double-elimination 8 tim (struktur sama persis
// kayak M6 World Championship: Match1-10, Final Upper/Lower Bracket,
// Grand Final BO7).
// ----------------------------------------------------------
function mseriesStateKey() {
  return "mlbb-sim:mseries";
}

function saveMseriesState() {
  try {
    localStorage.setItem(mseriesStateKey(), JSON.stringify(mseriesState));
  } catch (e) {
    // skip, gak fatal
  }
}

function loadMseriesState() {
  try {
    const raw = localStorage.getItem(mseriesStateKey());
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

let mseriesState = loadMseriesState(); // { teams, swiss: {teams,rounds,resolved}, knockout: {...}, news: [] }

// Bikin & simpan berita+interview buat 1 match M-Series (Swiss atau
// Knockout). Dipakai sama persis kayak recordMatchNews, cuma
// disimpan di mseriesState.news (bukan state.news) karena M-Series
// gak terikat ke satu league-season tertentu.
function recordMseriesMatchNews(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal) {
  if (!mseriesState.news) mseriesState.news = [];
  const newsItem = buildMatchNewsItem(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, null, "M-Series World Championship", "");
  mseriesState.news.unshift(newsItem);
  if (mseriesState.news.length > 200) mseriesState.news.length = 200;
  return newsItem;
}

function findMseriesNewsByMatchKey(matchKey) {
  return mseriesState && mseriesState.news ? mseriesState.news.find((n) => n.matchKey === matchKey) : null;
}

function mseriesMatchNewsActionsHtml(matchKey) {
  const item = findMseriesNewsByMatchKey(matchKey);
  if (!item) return "";
  return `
    <div class="match-news-actions">
      <button data-open-mseries-news="${item.id}">📰 Berita</button>
      ${item.interview ? `<button data-open-mseries-interview="${matchKey}">🎤 Interview</button>` : ""}
    </div>`;
}

function wireMseriesNewsActions(container) {
  container.querySelectorAll("[data-open-mseries-news]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = mseriesState.news.find((n) => n.id === btn.dataset.openMseriesNews);
      if (item) openNewsModalDirect(item);
    });
  });
  container.querySelectorAll("[data-open-mseries-interview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = findMseriesNewsByMatchKey(btn.dataset.openMseriesInterview);
      if (item) openInterviewModalFromItem(item);
    });
  });
}

// ---- Qualification Overview ----
const mseriesQualificationGrid = document.getElementById("mseriesQualificationGrid");
const mseriesGenerateBtn = document.getElementById("mseriesGenerateBtn");
const mseriesResetBtn = document.getElementById("mseriesResetBtn");
const mseriesSwissSection = document.getElementById("mseriesSwissSection");
const mseriesKnockoutSection = document.getElementById("mseriesKnockoutSection");

function renderMseriesQualificationGrid() {
  let readyCount = 0;

  mseriesQualificationGrid.innerHTML = leagues
    .map((league) => {
      const qualified = loadQualifiedTeams(league.id);
      const isReady = !!(qualified && qualified.champion && qualified.runnerUp);
      if (isReady) readyCount++;

      const body = isReady
        ? `
          <div class="mseries-league-card__team">
            <img src="${qualified.champion.logo}" alt="" /> 🥇 ${qualified.champion.name}
          </div>
          <div class="mseries-league-card__team">
            <img src="${qualified.runnerUp.logo}" alt="" /> 🥈 ${qualified.runnerUp.name}
          </div>`
        : `<div class="mseries-league-card__empty">Belum lolos — selesaikan Grand Final Knockout league ini dulu.</div>`;

      return `
        <div class="mseries-league-card ${isReady ? "mseries-league-card--ready" : ""}">
          <div class="mseries-league-card__name">${league.name}</div>
          ${body}
        </div>`;
    })
    .join("");

  mseriesGenerateBtn.disabled = readyCount < leagues.length;
  mseriesGenerateBtn.textContent =
    readyCount < leagues.length
      ? `🔄 Generate M-Series (${readyCount}/${leagues.length} league siap)`
      : "🔄 Generate M-Series (16 Teams)";
}

mseriesGenerateBtn.addEventListener("click", () => {
  const allTeams = [];
  leagues.forEach((league) => {
    const qualified = loadQualifiedTeams(league.id);
    if (qualified && qualified.champion && qualified.runnerUp) {
      allTeams.push(qualified.champion, qualified.runnerUp);
    }
  });

  if (allTeams.length !== 16) {
    alert("Belum semua league punya 2 tim yang lolos. Selesaikan dulu Grand Final tiap league.");
    return;
  }

  mseriesState = {
    teams: allTeams,
    swiss: null,
    knockout: null,
    news: [],
  };
  startMseriesSwiss();
  saveMseriesState();
  renderMseriesAll();
});

mseriesResetBtn.addEventListener("click", () => {
  const confirmed = confirm("Reset seluruh progress M-Series (Swiss Stage + Knockout)? Data qualifikasi tiap league TIDAK ikut hilang.");
  if (!confirmed) return;
  mseriesState = null;
  saveMseriesState();
  renderMseriesAll();
});

// ---- Swiss Stage engine ----
function isSwissTeamResolved(t) {
  return t.wins >= 3 || t.losses >= 3;
}

function startMseriesSwiss() {
  mseriesState.swiss = {
    teams: mseriesState.teams.map((t) => ({ ...t, wins: 0, losses: 0 })),
    rounds: [],
    resolved: false,
  };
  generateNextSwissRound();
}

// Bikin 1 round baru: pasangkan tim dengan record menang-kalah yang
// sama, format BO3 kalau match ini penentu (2 menang / 2 kalah),
// selain itu BO1 — persis logika Swiss Stage asli.
function generateNextSwissRound() {
  const swiss = mseriesState.swiss;
  const active = swiss.teams.filter((t) => !isSwissTeamResolved(t));

  if (active.length === 0) {
    swiss.resolved = true;
    buildMseriesKnockoutFromSwiss();
    return;
  }

  const groups = {};
  active.forEach((t) => {
    const key = `${t.wins}-${t.losses}`;
    groups[key] = groups[key] || [];
    groups[key].push(t);
  });

  const matches = [];
  Object.entries(groups).forEach(([key, group]) => {
    const shuffled = shuffleArray(group);
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const a = shuffled[i];
      const b = shuffled[i + 1];
      const bestOf = a.wins === 2 || a.losses === 2 ? 3 : 1;
      matches.push({
        id: `r${swiss.rounds.length + 1}m${matches.length + 1}`,
        teamAId: a.id,
        teamBId: b.id,
        bestOf,
        groupRecord: key,
        played: false,
        winnerId: null,
        scoreA: null,
        scoreB: null,
      });
    }
  });

  swiss.rounds.push({ roundNumber: swiss.rounds.length + 1, matches });
}

function mseriesTeamById(teamId) {
  return mseriesState.swiss.teams.find((t) => t.id === teamId);
}

// Label grup record biar sama persis maknanya kayak diagram Swiss Format asli
function mseriesGroupLabel(key, bestOf) {
  const [w, l] = key.split("-").map(Number);
  let note = "";
  if (w === 2) note = " · penentu LOLOS ke Knockout";
  else if (l === 2) note = " · penentu GUGUR";
  return `Record ${w}-${l} (BO${bestOf})${note}`;
}

// Terapkan hasil satu match Swiss (dipakai baik oleh random maupun manual),
// update record menang-kalah tim, lalu cek apakah round ini udah selesai
// semua -> kalau iya, generate round berikutnya otomatis.
function applyMseriesSwissMatchResult(match, winnerId, scoreA, scoreB) {
  const teamA = mseriesTeamById(match.teamAId);
  const teamB = mseriesTeamById(match.teamBId);
  if (!teamA || !teamB) return;

  match.played = true;
  match.winnerId = winnerId;
  match.scoreA = scoreA;
  match.scoreB = scoreB;

  const winnerTeam = winnerId === teamA.id ? teamA : teamB;
  recordMseriesMatchNews("mseries-swiss:" + match.id, teamA, teamB, scoreA, scoreB, winnerTeam, match.bestOf, false);

  if (winnerId === teamA.id) {
    teamA.wins++;
    teamB.losses++;
  } else {
    teamB.wins++;
    teamA.losses++;
  }

  const round = mseriesState.swiss.rounds.find((r) => r.matches.includes(match));
  if (round && round.matches.every((m) => m.played)) {
    generateNextSwissRound();
  }

  saveMseriesState();
  renderMseriesAll();
}

// Simulasikan acak satu match Swiss tertentu
function simulateMseriesSwissMatch(roundNumber, matchId) {
  const round = mseriesState.swiss.rounds.find((r) => r.roundNumber === roundNumber);
  const match = round && round.matches.find((m) => m.id === matchId);
  if (!match || match.played) return;

  const teamA = mseriesTeamById(match.teamAId);
  const teamB = mseriesTeamById(match.teamBId);
  if (!teamA || !teamB) return;

  const result = simulateMatch(teamA, teamB, match.bestOf);
  const winnerScore = result.winner.id === teamA.id ? result.winnerScore : result.loserScore;
  const loserScore = result.winner.id === teamA.id ? result.loserScore : result.winnerScore;
  applyMseriesSwissMatchResult(match, result.winner.id, winnerScore, loserScore);
}

// Input skor manual buat satu match Swiss tertentu
function submitMseriesSwissManualScore(roundNumber, matchId, scoreA, scoreB) {
  const round = mseriesState.swiss.rounds.find((r) => r.roundNumber === roundNumber);
  const match = round && round.matches.find((m) => m.id === matchId);
  if (!match || match.played) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 1 - 0).");
    return;
  }

  const winnerId = scoreA > scoreB ? match.teamAId : match.teamBId;
  applyMseriesSwissMatchResult(match, winnerId, scoreA, scoreB);
}

// Simulasikan acak semua match yang belum main di satu round sekaligus
function simulateMseriesSwissRound(roundNumber) {
  const round = mseriesState.swiss.rounds.find((r) => r.roundNumber === roundNumber);
  if (!round) return;

  round.matches.forEach((match) => {
    if (match.played) return;
    const teamA = mseriesTeamById(match.teamAId);
    const teamB = mseriesTeamById(match.teamBId);
    if (!teamA || !teamB) return;

    const result = simulateMatch(teamA, teamB, match.bestOf);
    match.played = true;
    match.winnerId = result.winner.id;
    match.scoreA = result.winner.id === teamA.id ? result.winnerScore : result.loserScore;
    match.scoreB = result.winner.id === teamB.id ? result.winnerScore : result.loserScore;

    recordMseriesMatchNews("mseries-swiss:" + match.id, teamA, teamB, match.scoreA, match.scoreB, result.winner, match.bestOf, false);

    if (result.winner.id === teamA.id) {
      teamA.wins++;
      teamB.losses++;
    } else {
      teamB.wins++;
      teamA.losses++;
    }
  });

  // semua match round ini selesai -> generate round berikutnya
  // (atau tutup Swiss Stage & buka Knockout kalau udah gak ada yang aktif)
  generateNextSwissRound();

  saveMseriesState();
  renderMseriesAll();
}

// ---- Knockout Stage (8 tim, struktur sama persis kayak M6) ----
function buildMseriesKnockoutFromSwiss() {
  const advanced = mseriesState.swiss.teams
    .filter((t) => t.wins === 3)
    .sort((a, b) => a.losses - b.losses || b.strength - a.strength);

  const [s1, s2, s3, s4, s5, s6, s7, s8] = advanced;

  mseriesState.knockout = {
    champion: null,
    order: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13", "m14"],
    matches: {
      m1: { id: "m1", label: "Match 1 (Upper R1)", teamA: s1, teamB: s8, bestOf: 3, played: false, winTo: { match: "m5", slot: "A" }, loseTo: { match: "m7", slot: "A" } },
      m2: { id: "m2", label: "Match 2 (Upper R1)", teamA: s4, teamB: s5, bestOf: 3, played: false, winTo: { match: "m5", slot: "B" }, loseTo: { match: "m7", slot: "B" } },
      m3: { id: "m3", label: "Match 3 (Upper R1)", teamA: s2, teamB: s7, bestOf: 3, played: false, winTo: { match: "m6", slot: "A" }, loseTo: { match: "m8", slot: "A" } },
      m4: { id: "m4", label: "Match 4 (Upper R1)", teamA: s3, teamB: s6, bestOf: 3, played: false, winTo: { match: "m6", slot: "B" }, loseTo: { match: "m8", slot: "B" } },
      m5: { id: "m5", label: "Match 5 (Upper R2)", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m11", slot: "A" }, loseTo: { match: "m10", slot: "B" } },
      m6: { id: "m6", label: "Match 6 (Upper R2)", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m11", slot: "B" }, loseTo: { match: "m9", slot: "A" } },
      m7: { id: "m7", label: "Match 7 (Lower R1)", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m9", slot: "B" }, loseTo: null },
      m8: { id: "m8", label: "Match 8 (Lower R1)", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m10", slot: "A" }, loseTo: null },
      m9: { id: "m9", label: "Match 9 (Lower R2)", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m12", slot: "A" }, loseTo: null },
      m10: { id: "m10", label: "Match 10 (Lower R2)", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m12", slot: "B" }, loseTo: null },
      m11: { id: "m11", label: "Final Upper Bracket", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m14", slot: "A" }, loseTo: { match: "m13", slot: "B" } },
      m12: { id: "m12", label: "Match 12 (Lower R3)", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m13", slot: "A" }, loseTo: null },
      m13: { id: "m13", label: "Final Lower Bracket", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "m14", slot: "B" }, loseTo: null },
      m14: { id: "m14", label: "GRAND FINAL", teamA: null, teamB: null, bestOf: 7, played: false, winTo: null, loseTo: null },
    },
  };
}

function simulateMseriesMatch(matchId) {
  const kb = mseriesState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  const result = simulateMatch(match.teamA, match.teamB, match.bestOf);
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === match.teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === match.teamB.id ? result.winnerScore : result.loserScore;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = result.winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = result.loser;
  if (matchId === "m14") kb.champion = result.winner;

  recordMseriesMatchNews("mseries-ko:" + matchId, match.teamA, match.teamB, match.scoreA, match.scoreB, result.winner, match.bestOf, matchId === "m14");

  saveMseriesState();
  renderMseriesAll();
}

function submitMseriesManualScore(matchId, scoreA, scoreB) {
  const kb = mseriesState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const winner = scoreA > scoreB ? match.teamA : match.teamB;
  const loser = winner === match.teamA ? match.teamB : match.teamA;

  match.played = true;
  match.winnerId = winner.id;
  match.scoreA = scoreA;
  match.scoreB = scoreB;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = loser;
  if (matchId === "m14") kb.champion = winner;

  recordMseriesMatchNews("mseries-ko:" + matchId, match.teamA, match.teamB, scoreA, scoreB, winner, match.bestOf, matchId === "m14");

  saveMseriesState();
  renderMseriesAll();
}

// ---- Rendering ----
function mseriesMatchCardHtml(match) {
  const teamA = match.teamA;
  const teamB = match.teamB;

  const rowHtml = (team, scoreValue) => {
    if (!team) {
      return `<div class="match-card__row"><span class="match-card__row-name" style="color:var(--text-dim)">TBD</span></div>`;
    }
    const isWinner = match.played && match.winnerId === team.id;
    return `
      <div class="match-card__row ${isWinner ? "match-card__row--winner" : ""}">
        <img src="${team.logo}" alt="${team.name} logo" />
        <span class="match-card__row-name">${team.name}</span>
        <span class="match-card__row-score">${match.played ? scoreValue : "-"}</span>
      </div>`;
  };

  let actionHtml;
  if (match.played) {
    const winnerName = match.winnerId === teamA.id ? teamA.name : teamB.name;
    actionHtml = `
      <div class="match-card__winner-tag">🏆 ${winnerName} WIN</div>
      ${mseriesMatchNewsActionsHtml("mseries-ko:" + match.id)}`;
  } else if (!teamA || !teamB) {
    actionHtml = `<div class="match-card__winner-tag" style="color:var(--text-dim)">Menunggu tim...</div>`;
  } else {
    actionHtml = `
      <button class="btn btn--ghost match-card__simulate" data-mseries-sim="${match.id}">🎲 Random (BO${match.bestOf})</button>
      <div class="manual-score-row">
        <input type="number" min="0" class="manual-score-input" data-mseries-manual-a="${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input" data-mseries-manual-b="${match.id}" placeholder="0" />
        <button class="btn btn--ghost manual-score-submit" data-mseries-manual-submit="${match.id}">✓ Input Skor</button>
      </div>`;
  }

  return `
    <div class="match-card">
      <div class="match-card__id">${match.id.toUpperCase()} · ${match.label}</div>
      ${rowHtml(teamA, match.scoreA)}
      ${rowHtml(teamB, match.scoreB)}
      ${actionHtml}
    </div>`;
}

function mseriesRoundGroupHtml(title, matchIds, kb) {
  return `
    <div class="round-group">
      <div class="round-group__label">${title}</div>
      <div class="round-group__matches">${matchIds.map((id) => mseriesMatchCardHtml(kb.matches[id])).join("")}</div>
    </div>`;
}

const mseriesUpperBracketEl = document.getElementById("mseriesUpperBracket");
const mseriesLowerBracketEl = document.getElementById("mseriesLowerBracket");
const mseriesGrandFinalEl = document.getElementById("mseriesGrandFinal");
const mseriesChampionBanner = document.getElementById("mseriesChampionBanner");
const mseriesChampionLogo = document.getElementById("mseriesChampionLogo");
const mseriesChampionName = document.getElementById("mseriesChampionName");
const mseriesSimulateAllBtn = document.getElementById("mseriesSimulateAllBtn");

function renderMseriesKnockout() {
  const kb = mseriesState && mseriesState.knockout;
  mseriesKnockoutSection.hidden = !kb;
  if (!kb) return;

  mseriesUpperBracketEl.innerHTML =
    mseriesRoundGroupHtml("Upper Bracket R1", ["m1", "m2", "m3", "m4"], kb) +
    mseriesRoundGroupHtml("Upper Bracket R2", ["m5", "m6"], kb) +
    mseriesRoundGroupHtml("Final Upper Bracket", ["m11"], kb);

  mseriesLowerBracketEl.innerHTML =
    mseriesRoundGroupHtml("Lower Bracket R1", ["m7", "m8"], kb) +
    mseriesRoundGroupHtml("Lower Bracket R2", ["m9", "m10"], kb) +
    mseriesRoundGroupHtml("Lower Bracket R3", ["m12"], kb) +
    mseriesRoundGroupHtml("Final Lower Bracket", ["m13"], kb);

  mseriesGrandFinalEl.innerHTML = mseriesRoundGroupHtml("Grand Final (BO7)", ["m14"], kb);

  document.querySelectorAll("[data-mseries-sim]").forEach((btn) => {
    btn.addEventListener("click", () => simulateMseriesMatch(btn.dataset.mseriesSim));
  });

  document.querySelectorAll("[data-mseries-manual-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.mseriesManualSubmit;
      const inputA = document.querySelector(`[data-mseries-manual-a="${matchId}"]`);
      const inputB = document.querySelector(`[data-mseries-manual-b="${matchId}"]`);
      submitMseriesManualScore(matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  wireMseriesNewsActions(mseriesUpperBracketEl);
  wireMseriesNewsActions(mseriesLowerBracketEl);
  wireMseriesNewsActions(mseriesGrandFinalEl);

  if (kb.champion) {
    mseriesChampionBanner.hidden = false;
    mseriesChampionLogo.src = kb.champion.logo;
    mseriesChampionLogo.alt = kb.champion.name + " logo";
    mseriesChampionName.textContent = kb.champion.name;
  } else {
    mseriesChampionBanner.hidden = true;
  }
}

mseriesSimulateAllBtn.addEventListener("click", () => {
  if (!mseriesState || !mseriesState.knockout) return;
  mseriesState.knockout.order.forEach((id) => simulateMseriesMatch(id));
});

// ---- Swiss Stage rendering ----
const mseriesSwissStandings = document.getElementById("mseriesSwissStandings");
const mseriesSwissRoundsEl = document.getElementById("mseriesSwissRounds");

function renderMseriesSwiss() {
  const swiss = mseriesState && mseriesState.swiss;
  mseriesSwissSection.hidden = !swiss;
  if (!swiss) return;

  mseriesSwissStandings.innerHTML = swiss.teams
    .slice()
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses)
    .map((t) => {
      const cls = t.wins === 3 ? "mseries-swiss-team--advanced" : t.losses === 3 ? "mseries-swiss-team--eliminated" : "";
      return `
        <div class="mseries-swiss-team ${cls}">
          <img src="${t.logo}" alt="" />
          <span class="mseries-swiss-team__name">${t.name}</span>
          <span class="mseries-swiss-team__record">${t.wins}-${t.losses}</span>
        </div>`;
    })
    .join("");

  mseriesSwissRoundsEl.innerHTML = swiss.rounds
    .map((round) => {
      const allPlayed = round.matches.every((m) => m.played);

      // kelompokkan match dalam stage ini per record asal (2-0, 1-1, 0-2, dst)
      // persis kayak diagram Swiss Format resmi
      const groupOrder = [];
      const groupsInRound = {};
      round.matches.forEach((m) => {
        if (!groupsInRound[m.groupRecord]) {
          groupsInRound[m.groupRecord] = [];
          groupOrder.push(m.groupRecord);
        }
        groupsInRound[m.groupRecord].push(m);
      });
      groupOrder.sort((a, b) => b.split("-")[0] - a.split("-")[0]);

      const groupsHtml = groupOrder
        .map((key) => {
          const groupMatches = groupsInRound[key];
          const matchesHtml = groupMatches
            .map((match) => {
              const teamA = mseriesTeamById(match.teamAId);
              const teamB = mseriesTeamById(match.teamBId);
              if (!teamA || !teamB) return "";
              const scoreText = match.played ? `${match.scoreA} - ${match.scoreB}` : "vs";

              const controlsHtml = match.played
                ? ""
                : `
                  <input type="number" min="0" class="manual-score-input manual-score-input--small" data-mseries-swiss-a="${round.roundNumber}:${match.id}" placeholder="0" />
                  <span>-</span>
                  <input type="number" min="0" class="manual-score-input manual-score-input--small" data-mseries-swiss-b="${round.roundNumber}:${match.id}" placeholder="0" />
                  <button class="schedule-item__manual-submit" data-mseries-swiss-submit="${round.roundNumber}:${match.id}" title="Input skor manual">✓</button>
                  <button class="schedule-item__play" data-mseries-swiss-sim="${round.roundNumber}:${match.id}" title="Simulasikan acak">🎲</button>`;

              const newsActionsHtml = match.played ? mseriesMatchNewsActionsHtml("mseries-swiss:" + match.id) : "";

              return `
                <div class="schedule-item ${match.played ? "" : "schedule-item--pending"}">
                  <div class="schedule-item__top">
                    <span class="schedule-item__teams">${teamA.short || teamA.name} ${scoreText} ${teamB.short || teamB.name}</span>
                    ${controlsHtml}
                  </div>
                  ${newsActionsHtml}
                </div>`;
            })
            .join("");

          return `
            <div class="mseries-swiss-group">
              <div class="mseries-swiss-group__label">${mseriesGroupLabel(key, groupMatches[0].bestOf)}</div>
              <div class="mseries-swiss-round__matches">${matchesHtml}</div>
            </div>`;
        })
        .join("");

      return `
        <div class="mseries-swiss-round">
          <div class="mseries-swiss-round__header">
            <span class="mseries-swiss-round__label">Swiss Stage ${round.roundNumber}</span>
            ${
              allPlayed
                ? ""
                : `<button class="btn btn--primary" data-mseries-round="${round.roundNumber}">🎲 Simulate All di Stage Ini</button>`
            }
          </div>
          ${groupsHtml}
        </div>`;
    })
    .join("");

  mseriesSwissRoundsEl.querySelectorAll("[data-mseries-round]").forEach((btn) => {
    btn.addEventListener("click", () => simulateMseriesSwissRound(Number(btn.dataset.mseriesRound)));
  });

  // tombol acak per match
  mseriesSwissRoundsEl.querySelectorAll("[data-mseries-swiss-sim]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [roundNumber, matchId] = btn.dataset.mseriesSwissSim.split(":");
      simulateMseriesSwissMatch(Number(roundNumber), matchId);
    });
  });

  // input skor manual per match
  mseriesSwissRoundsEl.querySelectorAll("[data-mseries-swiss-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [roundNumber, matchId] = btn.dataset.mseriesSwissSubmit.split(":");
      const inputA = mseriesSwissRoundsEl.querySelector(`[data-mseries-swiss-a="${roundNumber}:${matchId}"]`);
      const inputB = mseriesSwissRoundsEl.querySelector(`[data-mseries-swiss-b="${roundNumber}:${matchId}"]`);
      submitMseriesSwissManualScore(Number(roundNumber), matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  wireMseriesNewsActions(mseriesSwissRoundsEl);
}

const mseriesNewsTimeline = document.getElementById("mseriesNewsTimeline");

function renderMseriesNewsTimeline() {
  const news = (mseriesState && mseriesState.news) || [];
  if (news.length === 0) {
    mseriesNewsTimeline.innerHTML = `<p class="news-empty">Belum ada berita M-Series. Mainkan Swiss Stage atau Knockout dulu.</p>`;
    return;
  }

  mseriesNewsTimeline.innerHTML = news
    .map((item) => {
      const matchLine = item.matchKey
        ? `<div class="news-card__match">${item.teamAName} ${item.scoreA} - ${item.scoreB} ${item.teamBName}</div>`
        : "";
      return `
        <div class="news-card" data-mseries-news-id="${item.id}">
          <div class="news-card__top">
            <span class="news-card__category">${item.categoryLabel}</span>
            <span class="news-card__time">${formatNewsTime(item.timestamp)}</span>
          </div>
          <div class="news-card__headline">${item.headline}</div>
          ${matchLine}
          <span class="news-card__link">Baca Selengkapnya →</span>
        </div>`;
    })
    .join("");

  mseriesNewsTimeline.querySelectorAll("[data-mseries-news-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const item = mseriesState.news.find((n) => n.id === card.dataset.mseriesNewsId);
      if (item) openNewsModalDirect(item);
    });
  });
}

function renderMseriesAll() {
  renderMseriesQualificationGrid();
  renderMseriesSwiss();
  renderMseriesKnockout();
  renderMseriesNewsTimeline();
}

// ----------------------------------------------------------
// MSC — MID-SEASON CUP
// 16 tim (Champion + Runner-up dari tiap 8 MPL, sama kayak sumber
// M-Series) dibagi jadi Group A & Group B (8 tim tiap grup).
//
// GROUP STAGE (double elimination BO3, 10 match per grup):
//   G-M1 (Seed1 vs Seed8) -> menang G-M5(A), kalah G-M7(A)
//   G-M2 (Seed4 vs Seed5) -> menang G-M5(B), kalah G-M7(B)
//   G-M3 (Seed2 vs Seed7) -> menang G-M6(A), kalah G-M8(A)
//   G-M4 (Seed3 vs Seed6) -> menang G-M6(B), kalah G-M8(B)
//   G-M5 (menang M1 vs menang M2) -> menang LOLOS KNOCKOUT, kalah G-M10(B)
//   G-M6 (menang M3 vs menang M4) -> menang LOLOS KNOCKOUT, kalah G-M9(A)
//   G-M7 (kalah M1 vs kalah M2)    -> menang G-M9(B)
//   G-M8 (kalah M3 vs kalah M4)    -> menang G-M10(A)
//   G-M9 (kalah M6 vs menang M7)   -> menang LOLOS KNOCKOUT
//   G-M10 (kalah M5 vs menang M8)  -> menang LOLOS KNOCKOUT
// Tiap grup meloloskan 4 tim (total 8 tim ke Knockout).
//
// KNOCKOUT STAGE (single elimination):
//   QF1-4 (BO5) -> SF1-2 (BO5) -> 3rd Place (BO5) + Grand Final (BO7)
// ----------------------------------------------------------
function mscStateKey() {
  return "mlbb-sim:msc";
}

function saveMscState() {
  try {
    localStorage.setItem(mscStateKey(), JSON.stringify(mscState));
  } catch (e) {
    // skip, gak fatal
  }
}

function loadMscState() {
  try {
    const raw = localStorage.getItem(mscStateKey());
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

let mscState = loadMscState(); // { teams, groupA, groupB, knockout, news }

const mscQualificationGrid = document.getElementById("mscQualificationGrid");
const mscGenerateBtn = document.getElementById("mscGenerateBtn");
const mscResetBtn = document.getElementById("mscResetBtn");
const mscGroupSection = document.getElementById("mscGroupSection");
const mscKnockoutSection = document.getElementById("mscKnockoutSection");

function renderMscQualificationGrid() {
  let readyCount = 0;

  mscQualificationGrid.innerHTML = leagues
    .map((league) => {
      const qualified = loadQualifiedTeams(league.id);
      const isReady = !!(qualified && qualified.champion && qualified.runnerUp);
      if (isReady) readyCount++;

      const body = isReady
        ? `
          <div class="mseries-league-card__team"><img src="${qualified.champion.logo}" alt="" /> 🥇 ${qualified.champion.name}</div>
          <div class="mseries-league-card__team"><img src="${qualified.runnerUp.logo}" alt="" /> 🥈 ${qualified.runnerUp.name}</div>`
        : `<div class="mseries-league-card__empty">Belum lolos — selesaikan Grand Final Knockout league ini dulu.</div>`;

      return `
        <div class="mseries-league-card ${isReady ? "mseries-league-card--ready" : ""}">
          <div class="mseries-league-card__name">${league.name}</div>
          ${body}
        </div>`;
    })
    .join("");

  mscGenerateBtn.disabled = readyCount < leagues.length;
  mscGenerateBtn.textContent =
    readyCount < leagues.length ? `🔄 Generate MSC (${readyCount}/${leagues.length} league siap)` : "🔄 Generate MSC (16 Teams)";
}

function buildMscGroupBracket(teams) {
  const [s1, s2, s3, s4, s5, s6, s7, s8] = teams;
  return {
    matches: {
      m1: { id: "m1", label: "Match 1", teamA: s1, teamB: s8, bestOf: 3, played: false, winTo: { match: "m5", slot: "A" }, loseTo: { match: "m7", slot: "A" } },
      m2: { id: "m2", label: "Match 2", teamA: s4, teamB: s5, bestOf: 3, played: false, winTo: { match: "m5", slot: "B" }, loseTo: { match: "m7", slot: "B" } },
      m3: { id: "m3", label: "Match 3", teamA: s2, teamB: s7, bestOf: 3, played: false, winTo: { match: "m6", slot: "A" }, loseTo: { match: "m8", slot: "A" } },
      m4: { id: "m4", label: "Match 4", teamA: s3, teamB: s6, bestOf: 3, played: false, winTo: { match: "m6", slot: "B" }, loseTo: { match: "m8", slot: "B" } },
      m5: { id: "m5", label: "Upper Bracket R1 — Advance Slot", teamA: null, teamB: null, bestOf: 3, played: false, winTo: null, loseTo: { match: "m10", slot: "B" } },
      m6: { id: "m6", label: "Upper Bracket R1 — Advance Slot", teamA: null, teamB: null, bestOf: 3, played: false, winTo: null, loseTo: { match: "m9", slot: "A" } },
      m7: { id: "m7", label: "Lower Bracket R1", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m9", slot: "B" }, loseTo: null },
      m8: { id: "m8", label: "Lower Bracket R1", teamA: null, teamB: null, bestOf: 3, played: false, winTo: { match: "m10", slot: "A" }, loseTo: null },
      m9: { id: "m9", label: "Lower Bracket R2 — Advance Slot", teamA: null, teamB: null, bestOf: 3, played: false, winTo: null, loseTo: null },
      m10: { id: "m10", label: "Lower Bracket R2 — Advance Slot", teamA: null, teamB: null, bestOf: 3, played: false, winTo: null, loseTo: null },
    },
    order: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    advanceIds: ["m5", "m6", "m9", "m10"], // match yang pemenangnya lolos Knockout
  };
}

mscGenerateBtn.addEventListener("click", () => {
  const allTeams = [];
  leagues.forEach((league) => {
    const qualified = loadQualifiedTeams(league.id);
    if (qualified && qualified.champion && qualified.runnerUp) {
      allTeams.push(qualified.champion, qualified.runnerUp);
    }
  });

  if (allTeams.length !== 16) {
    alert("Belum semua league punya 2 tim yang lolos. Selesaikan dulu Grand Final tiap league.");
    return;
  }

  const groupATeams = allTeams.slice(0, 8);
  const groupBTeams = allTeams.slice(8, 16);

  mscState = {
    teams: allTeams,
    groupA: buildMscGroupBracket(groupATeams),
    groupB: buildMscGroupBracket(groupBTeams),
    knockout: null,
    news: [],
  };

  saveMscState();
  renderMscAll();
});

mscResetBtn.addEventListener("click", () => {
  const confirmed = confirm("Reset seluruh progress MSC (Group Stage + Knockout)? Data qualifikasi tiap league TIDAK ikut hilang.");
  if (!confirmed) return;
  mscState = null;
  saveMscState();
  renderMscAll();
});

function mscGroupMatchKeyPrefix(groupKey) {
  return groupKey === "groupA" ? "msc-ga" : "msc-gb";
}

function simulateMscGroupMatch(groupKey, matchId) {
  const group = mscState[groupKey];
  const match = group.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  const result = simulateMatch(match.teamA, match.teamB, match.bestOf);
  applyMscGroupMatchResult(groupKey, match, result.winner.id, result.winner.id === match.teamA.id ? result.winnerScore : result.loserScore, result.winner.id === match.teamB.id ? result.winnerScore : result.loserScore);
}

function submitMscGroupManualScore(groupKey, matchId, scoreA, scoreB) {
  const group = mscState[groupKey];
  const match = group.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const winnerId = scoreA > scoreB ? match.teamA.id : match.teamB.id;
  applyMscGroupMatchResult(groupKey, match, winnerId, scoreA, scoreB);
}

function applyMscGroupMatchResult(groupKey, match, winnerId, scoreA, scoreB) {
  const group = mscState[groupKey];
  const winner = winnerId === match.teamA.id ? match.teamA : match.teamB;
  const loser = winner === match.teamA ? match.teamB : match.teamA;

  match.played = true;
  match.winnerId = winnerId;
  match.scoreA = scoreA;
  match.scoreB = scoreB;

  if (match.winTo) group.matches[match.winTo.match]["team" + match.winTo.slot] = winner;
  if (match.loseTo) group.matches[match.loseTo.match]["team" + match.loseTo.slot] = loser;

  recordMscMatchNews(mscGroupMatchKeyPrefix(groupKey) + ":" + match.id, match.teamA, match.teamB, scoreA, scoreB, winner, match.bestOf, false);

  // kalau ini match "advance slot" (m5/m6/m9/m10) dan KEDUA grup udah
  // selesai semua match advance-nya, generate Knockout Stage
  maybeBuildMscKnockout();

  saveMscState();
  renderMscAll();
}

function maybeBuildMscKnockout() {
  if (mscState.knockout) return;
  const groupAReady = mscState.groupA.advanceIds.every((id) => mscState.groupA.matches[id].played);
  const groupBReady = mscState.groupB.advanceIds.every((id) => mscState.groupB.matches[id].played);
  if (!groupAReady || !groupBReady) return;

  const advancedA = mscState.groupA.advanceIds.map((id) => {
    const m = mscState.groupA.matches[id];
    return m.winnerId === m.teamA.id ? m.teamA : m.teamB;
  });
  const advancedB = mscState.groupB.advanceIds.map((id) => {
    const m = mscState.groupB.matches[id];
    return m.winnerId === m.teamA.id ? m.teamA : m.teamB;
  });

  // seed 1-4 dari upper-slot (m5,m6), 5-8 dari lower-slot (m9,m10) — gantian grup A/B
  const seeds = [advancedA[0], advancedB[0], advancedA[1], advancedB[1], advancedA[2], advancedB[2], advancedA[3], advancedB[3]];
  const [s1, s2, s3, s4, s5, s6, s7, s8] = seeds;

  mscState.knockout = {
    champion: null,
    order: ["qf1", "qf2", "qf3", "qf4", "sf1", "sf2", "third", "gf"],
    matches: {
      qf1: { id: "qf1", label: "Quarterfinal", teamA: s1, teamB: s8, bestOf: 5, played: false, winTo: { match: "sf1", slot: "A" }, loseTo: null },
      qf2: { id: "qf2", label: "Quarterfinal", teamA: s4, teamB: s5, bestOf: 5, played: false, winTo: { match: "sf1", slot: "B" }, loseTo: null },
      qf3: { id: "qf3", label: "Quarterfinal", teamA: s2, teamB: s7, bestOf: 5, played: false, winTo: { match: "sf2", slot: "A" }, loseTo: null },
      qf4: { id: "qf4", label: "Quarterfinal", teamA: s3, teamB: s6, bestOf: 5, played: false, winTo: { match: "sf2", slot: "B" }, loseTo: null },
      sf1: { id: "sf1", label: "Semifinal", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "gf", slot: "A" }, loseTo: { match: "third", slot: "A" } },
      sf2: { id: "sf2", label: "Semifinal", teamA: null, teamB: null, bestOf: 5, played: false, winTo: { match: "gf", slot: "B" }, loseTo: { match: "third", slot: "B" } },
      third: { id: "third", label: "3rd Place Final", teamA: null, teamB: null, bestOf: 5, played: false, winTo: null, loseTo: null },
      gf: { id: "gf", label: "GRAND FINAL", teamA: null, teamB: null, bestOf: 7, played: false, winTo: null, loseTo: null },
    },
  };
}

function simulateMscKnockoutMatch(matchId) {
  const kb = mscState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  const result = simulateMatch(match.teamA, match.teamB, match.bestOf);
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === match.teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === match.teamB.id ? result.winnerScore : result.loserScore;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = result.winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = result.loser;
  if (matchId === "gf") kb.champion = result.winner;

  recordMscMatchNews("msc-ko:" + matchId, match.teamA, match.teamB, match.scoreA, match.scoreB, result.winner, match.bestOf, matchId === "gf");

  saveMscState();
  renderMscAll();
}

function submitMscKnockoutManualScore(matchId, scoreA, scoreB) {
  const kb = mscState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const winner = scoreA > scoreB ? match.teamA : match.teamB;
  const loser = winner === match.teamA ? match.teamB : match.teamA;

  match.played = true;
  match.winnerId = winner.id;
  match.scoreA = scoreA;
  match.scoreB = scoreB;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = loser;
  if (matchId === "gf") kb.champion = winner;

  recordMscMatchNews("msc-ko:" + matchId, match.teamA, match.teamB, scoreA, scoreB, winner, match.bestOf, matchId === "gf");

  saveMscState();
  renderMscAll();
}

// ---- News ----
function recordMscMatchNews(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal) {
  if (!mscState.news) mscState.news = [];
  const newsItem = buildMatchNewsItem(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, null, "MSC — Mid-Season Cup", "");
  mscState.news.unshift(newsItem);
  if (mscState.news.length > 200) mscState.news.length = 200;
  return newsItem;
}

function findMscNewsByMatchKey(matchKey) {
  return mscState && mscState.news ? mscState.news.find((n) => n.matchKey === matchKey) : null;
}

function mscMatchNewsActionsHtml(matchKey) {
  const item = findMscNewsByMatchKey(matchKey);
  if (!item) return "";
  return `
    <div class="match-news-actions">
      <button data-open-msc-news="${item.id}">📰 Berita</button>
      ${item.interview ? `<button data-open-msc-interview="${matchKey}">🎤 Interview</button>` : ""}
    </div>`;
}

function wireMscNewsActions(container) {
  container.querySelectorAll("[data-open-msc-news]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = mscState.news.find((n) => n.id === btn.dataset.openMscNews);
      if (item) openNewsModalDirect(item);
    });
  });
  container.querySelectorAll("[data-open-msc-interview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = findMscNewsByMatchKey(btn.dataset.openMscInterview);
      if (item) openInterviewModalFromItem(item);
    });
  });
}

// ---- Rendering ----
function mscMatchCardHtml(match, kind, groupKey) {
  const teamA = match.teamA;
  const teamB = match.teamB;

  const rowHtml = (team, scoreValue) => {
    if (!team) return `<div class="match-card__row"><span class="match-card__row-name" style="color:var(--text-dim)">TBD</span></div>`;
    const isWinner = match.played && match.winnerId === team.id;
    return `
      <div class="match-card__row ${isWinner ? "match-card__row--winner" : ""}">
        <img src="${team.logo}" alt="${team.name} logo" />
        <span class="match-card__row-name">${team.name}</span>
        <span class="match-card__row-score">${match.played ? scoreValue : "-"}</span>
      </div>`;
  };

  const matchKey = kind === "group" ? mscGroupMatchKeyPrefix(groupKey) + ":" + match.id : "msc-ko:" + match.id;

  let actionHtml;
  if (match.played) {
    const winnerName = match.winnerId === teamA.id ? teamA.name : teamB.name;
    actionHtml = `
      <div class="match-card__winner-tag">🏆 ${winnerName} WIN</div>
      ${mscMatchNewsActionsHtml(matchKey)}`;
  } else if (!teamA || !teamB) {
    actionHtml = `<div class="match-card__winner-tag" style="color:var(--text-dim)">Menunggu tim...</div>`;
  } else if (kind === "group") {
    actionHtml = `
      <button class="btn btn--ghost match-card__simulate" data-msc-group-sim="${groupKey}:${match.id}">🎲 Random (BO${match.bestOf})</button>
      <div class="manual-score-row">
        <input type="number" min="0" class="manual-score-input" data-msc-group-a="${groupKey}:${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input" data-msc-group-b="${groupKey}:${match.id}" placeholder="0" />
        <button class="btn btn--ghost manual-score-submit" data-msc-group-submit="${groupKey}:${match.id}">✓ Input Skor</button>
      </div>`;
  } else {
    actionHtml = `
      <button class="btn btn--ghost match-card__simulate" data-msc-ko-sim="${match.id}">🎲 Random (BO${match.bestOf})</button>
      <div class="manual-score-row">
        <input type="number" min="0" class="manual-score-input" data-msc-ko-a="${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input" data-msc-ko-b="${match.id}" placeholder="0" />
        <button class="btn btn--ghost manual-score-submit" data-msc-ko-submit="${match.id}">✓ Input Skor</button>
      </div>`;
  }

  return `
    <div class="match-card">
      <div class="match-card__id">${match.id.toUpperCase()} · ${match.label}</div>
      ${rowHtml(teamA, match.scoreA)}
      ${rowHtml(teamB, match.scoreB)}
      ${actionHtml}
    </div>`;
}

const mscGroupAMatchesEl = document.getElementById("mscGroupAMatches");
const mscGroupBMatchesEl = document.getElementById("mscGroupBMatches");

function renderMscGroup(groupKey, container) {
  const group = mscState[groupKey];
  container.innerHTML =
    roundGroupHtmlGeneric("Round 1", ["m1", "m2", "m3", "m4"], group, "group", groupKey) +
    roundGroupHtmlGeneric("Advance Slot", ["m5", "m6"], group, "group", groupKey) +
    roundGroupHtmlGeneric("Lower Bracket R1", ["m7", "m8"], group, "group", groupKey) +
    roundGroupHtmlGeneric("Advance Slot", ["m9", "m10"], group, "group", groupKey);
}

// versi generic dari roundGroupHtml biar bisa dipakai match "group" (MSC) maupun "ko"
function roundGroupHtmlGeneric(title, matchIds, bracketObj, kind, groupKey) {
  return `
    <div class="round-group">
      <div class="round-group__label">${title}</div>
      <div class="round-group__matches">${matchIds.map((id) => mscMatchCardHtml(bracketObj.matches[id], kind, groupKey)).join("")}</div>
    </div>`;
}

const mscQuarterfinalsEl = document.getElementById("mscQuarterfinals");
const mscSemifinalsEl = document.getElementById("mscSemifinals");
const mscThirdPlaceEl = document.getElementById("mscThirdPlace");
const mscGrandFinalMatchEl = document.getElementById("mscGrandFinalMatch");
const mscChampionBanner = document.getElementById("mscChampionBanner");
const mscChampionLogo = document.getElementById("mscChampionLogo");
const mscChampionName = document.getElementById("mscChampionName");
const mscSimulateAllBtn = document.getElementById("mscSimulateAllBtn");

function renderMscKnockout() {
  const kb = mscState && mscState.knockout;
  mscKnockoutSection.hidden = !kb;
  if (!kb) return;

  mscQuarterfinalsEl.innerHTML = ["qf1", "qf2", "qf3", "qf4"].map((id) => mscMatchCardHtml(kb.matches[id], "ko")).join("");
  mscSemifinalsEl.innerHTML = ["sf1", "sf2"].map((id) => mscMatchCardHtml(kb.matches[id], "ko")).join("");
  mscThirdPlaceEl.innerHTML = mscMatchCardHtml(kb.matches.third, "ko");
  mscGrandFinalMatchEl.innerHTML = mscMatchCardHtml(kb.matches.gf, "ko");

  document.querySelectorAll("[data-msc-ko-sim]").forEach((btn) => {
    btn.addEventListener("click", () => simulateMscKnockoutMatch(btn.dataset.mscKoSim));
  });

  document.querySelectorAll("[data-msc-ko-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.mscKoSubmit;
      const inputA = document.querySelector(`[data-msc-ko-a="${matchId}"]`);
      const inputB = document.querySelector(`[data-msc-ko-b="${matchId}"]`);
      submitMscKnockoutManualScore(matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  wireMscNewsActions(mscQuarterfinalsEl);
  wireMscNewsActions(mscSemifinalsEl);
  wireMscNewsActions(mscThirdPlaceEl);
  wireMscNewsActions(mscGrandFinalMatchEl);

  if (kb.champion) {
    mscChampionBanner.hidden = false;
    mscChampionLogo.src = kb.champion.logo;
    mscChampionLogo.alt = kb.champion.name + " logo";
    mscChampionName.textContent = kb.champion.name;
  } else {
    mscChampionBanner.hidden = true;
  }
}

mscSimulateAllBtn.addEventListener("click", () => {
  if (!mscState || !mscState.knockout) return;
  mscState.knockout.order.forEach((id) => simulateMscKnockoutMatch(id));
});

function wireMscGroupControls(container, groupKey) {
  container.querySelectorAll(`[data-msc-group-sim^="${groupKey}:"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const [, matchId] = btn.dataset.mscGroupSim.split(":");
      simulateMscGroupMatch(groupKey, matchId);
    });
  });
  container.querySelectorAll(`[data-msc-group-submit^="${groupKey}:"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const [, matchId] = btn.dataset.mscGroupSubmit.split(":");
      const inputA = container.querySelector(`[data-msc-group-a="${groupKey}:${matchId}"]`);
      const inputB = container.querySelector(`[data-msc-group-b="${groupKey}:${matchId}"]`);
      submitMscGroupManualScore(groupKey, matchId, Number(inputA.value), Number(inputB.value));
    });
  });
  wireMscNewsActions(container);
}

const mscNewsTimeline = document.getElementById("mscNewsTimeline");

function renderMscNewsTimeline() {
  const news = (mscState && mscState.news) || [];
  if (news.length === 0) {
    mscNewsTimeline.innerHTML = `<p class="news-empty">Belum ada berita MSC. Mainkan Group Stage atau Knockout dulu.</p>`;
    return;
  }

  mscNewsTimeline.innerHTML = news
    .map(
      (item) => `
        <div class="news-card" data-msc-news-id="${item.id}">
          <div class="news-card__top">
            <span class="news-card__category">${item.categoryLabel}</span>
            <span class="news-card__time">${formatNewsTime(item.timestamp)}</span>
          </div>
          <div class="news-card__headline">${item.headline}</div>
          <div class="news-card__match">${item.teamAName} ${item.scoreA} - ${item.scoreB} ${item.teamBName}</div>
          <span class="news-card__link">Baca Selengkapnya →</span>
        </div>`
    )
    .join("");

  mscNewsTimeline.querySelectorAll("[data-msc-news-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const item = mscState.news.find((n) => n.id === card.dataset.mscNewsId);
      if (item) openNewsModalDirect(item);
    });
  });
}

function renderMscAll() {
  renderMscQualificationGrid();

  const hasGroups = !!mscState;
  mscGroupSection.hidden = !hasGroups;
  if (hasGroups) {
    renderMscGroup("groupA", mscGroupAMatchesEl);
    renderMscGroup("groupB", mscGroupBMatchesEl);
    wireMscGroupControls(mscGroupAMatchesEl, "groupA");
    wireMscGroupControls(mscGroupBMatchesEl, "groupB");
  }

  renderMscKnockout();
  renderMscNewsTimeline();
}

// ----------------------------------------------------------
// SEA GAMES — MLBB MEN
// Beda dari MPL/MSC/M-Series: pesertanya TIM NEGARA (bukan klub),
// jumlah tim per grup gak sama, dan formatnya persis kayak 33rd
// SEA Games 2025:
//
// GROUP STAGE: round robin sekali jalan per grup (BO3). Poin standings
// dihitung dari TOTAL GAME MENANG (bukan match menang) — sama persis
// kayak tabel standings resmi SEA Games.
//   Group A (4 tim): Myanmar, Vietnam, Thailand, Timor-Leste
//   Group B (5 tim): Philippines, Malaysia, Indonesia, Singapore, Laos
//
// KNOCKOUT: juara tiap grup dapat BYE langsung ke Semifinal.
//   Match 1 (BO5): Runner-up Grup A vs Peringkat-3 Grup B
//   Match 2 (BO5): Peringkat-3 Grup A vs Runner-up Grup B
//   Semifinal 1 (BO5): Juara Grup A vs Menang Match 2
//   Semifinal 2 (BO5): Juara Grup B vs Menang Match 1
//   Bronze Medal Match (BO5): Kalah SF1 vs Kalah SF2
//   Gold Medal Match (BO7): Menang SF1 vs Menang SF2
// ----------------------------------------------------------

// Rating negara di bawah cuma buat simulator (bukan rating resmi),
// dikira-kira dari hasil standings asli 33rd SEA Games 2025.
const SEA_GAMES_TEAMS = [
  { id: "sea-mm", name: "Myanmar", short: "MYA", group: "A", strength: 90, logo: makeLogo("MM", "#FECB00", "#1C1C1C") },
  { id: "sea-vn", name: "Vietnam", short: "VIE", group: "A", strength: 82, logo: makeLogo("VN", "#DA251D", "#FFCD00") },
  { id: "sea-th", name: "Thailand", short: "THA", group: "A", strength: 74, logo: makeLogo("TH", "#241D4F", "#FFFFFF") },
  { id: "sea-tl", name: "Timor-Leste", short: "TLS", group: "A", strength: 58, logo: makeLogo("TL", "#DC241F", "#FFC726") },
  { id: "sea-ph", name: "Philippines", short: "PHI", group: "B", strength: 92, logo: makeLogo("PH", "#0038A8", "#CE1126") },
  { id: "sea-my", name: "Malaysia", short: "MAS", group: "B", strength: 85, logo: makeLogo("MY", "#010066", "#FFCC00") },
  { id: "sea-id", name: "Indonesia", short: "INA", group: "B", strength: 80, logo: makeLogo("ID", "#CE1126", "#FFFFFF") },
  { id: "sea-sg", name: "Singapore", short: "SGP", group: "B", strength: 68, logo: makeLogo("SG", "#EF3340", "#FFFFFF") },
  { id: "sea-la", name: "Laos", short: "LAO", group: "B", strength: 60, logo: makeLogo("LA", "#002868", "#CE1126") },
];

function seaStateKey() {
  return "mlbb-sim:seagames";
}

function saveSeaState() {
  try {
    localStorage.setItem(seaStateKey(), JSON.stringify(seaState));
  } catch (e) {
    // skip, gak fatal
  }
}

function loadSeaState() {
  try {
    const raw = localStorage.getItem(seaStateKey());
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

let seaState = loadSeaState(); // { groupA: {teams, schedule}, groupB: {...}, knockout, news }

// round robin sekali jalan (bukan double), diacak urutannya
function generateSeaGroupSchedule(teams) {
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({ teamAId: teams[i].id, teamBId: teams[j].id });
    }
  }
  let n = 1;
  return shuffleArray(matches).map((m) => ({
    id: "g" + n++,
    teamAId: m.teamAId,
    teamBId: m.teamBId,
    played: false,
    winnerId: null,
    scoreA: null,
    scoreB: null,
  }));
}

function seaTeamById(teamId) {
  return SEA_GAMES_TEAMS.find((t) => t.id === teamId);
}

// Standings SEA Games: Poin = total GAME menang (bukan match menang) —
// sama persis kayak tabel resminya.
function computeSeaGroupStandings(teams, schedule) {
  const table = {};
  teams.forEach((t) => (table[t.id] = { team: t, gamesWon: 0, gamesLost: 0 }));

  schedule.forEach((match) => {
    if (!match.played) return;
    const rowA = table[match.teamAId];
    const rowB = table[match.teamBId];
    if (!rowA || !rowB) return;
    rowA.gamesWon += match.scoreA;
    rowA.gamesLost += match.scoreB;
    rowB.gamesWon += match.scoreB;
    rowB.gamesLost += match.scoreA;
  });

  const rows = Object.values(table).map((r) => ({ ...r, points: r.gamesWon }));
  rows.sort((a, b) => b.points - a.points || a.gamesLost - b.gamesLost);
  return rows;
}

const seaGenerateBtn = document.getElementById("seaGenerateBtn");
const seaResetBtn = document.getElementById("seaResetBtn");
const seaStandingsSection = document.getElementById("seaStandingsSection");
const seaKnockoutSection = document.getElementById("seaKnockoutSection");
const seaBuildKnockoutBtn = document.getElementById("seaBuildKnockoutBtn");
const seaSimulateAllBtn = document.getElementById("seaSimulateAllBtn");

seaGenerateBtn.addEventListener("click", () => {
  // acak pembagian Group A/B tiap kali generate, biar seru — tetap 4 tim
  // di Group A dan 5 tim di Group B (jumlahnya sama kayak format asli)
  const shuffled = shuffleArray(SEA_GAMES_TEAMS);
  const groupATeams = shuffled.slice(0, 4);
  const groupBTeams = shuffled.slice(4, 9);

  seaState = {
    groupA: { teams: groupATeams, schedule: generateSeaGroupSchedule(groupATeams) },
    groupB: { teams: groupBTeams, schedule: generateSeaGroupSchedule(groupBTeams) },
    knockout: null,
    news: [],
  };
  saveSeaState();
  renderSeaAll();
});

seaResetBtn.addEventListener("click", () => {
  const confirmed = confirm("Reset seluruh progress SEA Games (Group Stage + Knockout)?");
  if (!confirmed) return;
  seaState = null;
  saveSeaState();
  renderSeaAll();
});

function seaGroupMatchKeyPrefix(groupKey) {
  return groupKey === "groupA" ? "sea-ga" : "sea-gb";
}

function simulateSeaGroupMatch(groupKey, matchId) {
  const group = seaState[groupKey];
  const match = group.schedule.find((m) => m.id === matchId);
  if (!match || match.played) return;
  const teamA = seaTeamById(match.teamAId);
  const teamB = seaTeamById(match.teamBId);
  if (!teamA || !teamB) return;

  const result = simulateMatch(teamA, teamB, 3);
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === teamB.id ? result.winnerScore : result.loserScore;

  recordSeaMatchNews(seaGroupMatchKeyPrefix(groupKey) + ":" + match.id, teamA, teamB, match.scoreA, match.scoreB, result.winner, 3, false);

  saveSeaState();
  renderSeaAll();
}

function submitSeaGroupManualScore(groupKey, matchId, scoreA, scoreB) {
  const group = seaState[groupKey];
  const match = group.schedule.find((m) => m.id === matchId);
  if (!match || match.played) return;
  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }
  const teamA = seaTeamById(match.teamAId);
  const teamB = seaTeamById(match.teamBId);

  match.played = true;
  match.scoreA = scoreA;
  match.scoreB = scoreB;
  match.winnerId = scoreA > scoreB ? match.teamAId : match.teamBId;

  recordSeaMatchNews(seaGroupMatchKeyPrefix(groupKey) + ":" + match.id, teamA, teamB, scoreA, scoreB, seaTeamById(match.winnerId), 3, false);

  saveSeaState();
  renderSeaAll();
}

seaBuildKnockoutBtn.addEventListener("click", () => {
  if (!seaState) return;
  const standingsA = computeSeaGroupStandings(seaState.groupA.teams, seaState.groupA.schedule);
  const standingsB = computeSeaGroupStandings(seaState.groupB.teams, seaState.groupB.schedule);

  const [a1, a2, a3] = standingsA.map((r) => r.team);
  const [b1, b2, b3] = standingsB.map((r) => r.team);

  if (!a3 || !b3) {
    alert("Data grup belum lengkap.");
    return;
  }

  seaState.knockout = {
    champion: null,
    order: ["match1", "match2", "sf1", "sf2", "bronze", "gf"],
    matches: {
      match1: { id: "match1", label: "Match 1", teamA: a2, teamB: b3, bestOf: 5, played: false, winTo: { match: "sf2", slot: "B" }, loseTo: null },
      match2: { id: "match2", label: "Match 2", teamA: a3, teamB: b2, bestOf: 5, played: false, winTo: { match: "sf1", slot: "B" }, loseTo: null },
      sf1: { id: "sf1", label: "Semifinal 1", teamA: a1, teamB: null, bestOf: 5, played: false, winTo: { match: "gf", slot: "A" }, loseTo: { match: "bronze", slot: "A" } },
      sf2: { id: "sf2", label: "Semifinal 2", teamA: b1, teamB: null, bestOf: 5, played: false, winTo: { match: "gf", slot: "B" }, loseTo: { match: "bronze", slot: "B" } },
      bronze: { id: "bronze", label: "Bronze Medal Match", teamA: null, teamB: null, bestOf: 5, played: false, winTo: null, loseTo: null },
      gf: { id: "gf", label: "Gold Medal Match", teamA: null, teamB: null, bestOf: 7, played: false, winTo: null, loseTo: null },
    },
  };

  saveSeaState();
  renderSeaAll();
});

function simulateSeaKnockoutMatch(matchId) {
  const kb = seaState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  const result = simulateMatch(match.teamA, match.teamB, match.bestOf);
  match.played = true;
  match.winnerId = result.winner.id;
  match.scoreA = result.winner.id === match.teamA.id ? result.winnerScore : result.loserScore;
  match.scoreB = result.winner.id === match.teamB.id ? result.winnerScore : result.loserScore;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = result.winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = result.loser;
  if (matchId === "gf") kb.champion = result.winner;

  recordSeaMatchNews("sea-ko:" + matchId, match.teamA, match.teamB, match.scoreA, match.scoreB, result.winner, match.bestOf, matchId === "gf");

  saveSeaState();
  renderSeaAll();
}

function submitSeaKnockoutManualScore(matchId, scoreA, scoreB) {
  const kb = seaState.knockout;
  if (!kb) return;
  const match = kb.matches[matchId];
  if (!match || match.played || !match.teamA || !match.teamB) return;

  if (isNaN(scoreA) || isNaN(scoreB) || scoreA < 0 || scoreB < 0 || scoreA === scoreB) {
    alert("Skor tidak valid. Masukkan dua angka berbeda (misal 2 - 0).");
    return;
  }

  const winner = scoreA > scoreB ? match.teamA : match.teamB;
  const loser = winner === match.teamA ? match.teamB : match.teamA;

  match.played = true;
  match.winnerId = winner.id;
  match.scoreA = scoreA;
  match.scoreB = scoreB;

  if (match.winTo) kb.matches[match.winTo.match]["team" + match.winTo.slot] = winner;
  if (match.loseTo) kb.matches[match.loseTo.match]["team" + match.loseTo.slot] = loser;
  if (matchId === "gf") kb.champion = winner;

  recordSeaMatchNews("sea-ko:" + matchId, match.teamA, match.teamB, scoreA, scoreB, winner, match.bestOf, matchId === "gf");

  saveSeaState();
  renderSeaAll();
}

seaSimulateAllBtn.addEventListener("click", () => {
  if (!seaState || !seaState.knockout) return;
  seaState.knockout.order.forEach((id) => simulateSeaKnockoutMatch(id));
});

// ---- News ----
function recordSeaMatchNews(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal) {
  if (!seaState.news) seaState.news = [];
  const newsItem = buildMatchNewsItem(matchKey, teamA, teamB, scoreA, scoreB, winner, bestOf, isGrandFinal, null, "SEA Games — MLBB Men", "");
  seaState.news.unshift(newsItem);
  if (seaState.news.length > 200) seaState.news.length = 200;
  return newsItem;
}

function findSeaNewsByMatchKey(matchKey) {
  return seaState && seaState.news ? seaState.news.find((n) => n.matchKey === matchKey) : null;
}

function seaMatchNewsActionsHtml(matchKey) {
  const item = findSeaNewsByMatchKey(matchKey);
  if (!item) return "";
  return `
    <div class="match-news-actions">
      <button data-open-sea-news="${item.id}">📰 Berita</button>
      ${item.interview ? `<button data-open-sea-interview="${matchKey}">🎤 Interview</button>` : ""}
    </div>`;
}

function wireSeaNewsActions(container) {
  container.querySelectorAll("[data-open-sea-news]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = seaState.news.find((n) => n.id === btn.dataset.openSeaNews);
      if (item) openNewsModalDirect(item);
    });
  });
  container.querySelectorAll("[data-open-sea-interview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = findSeaNewsByMatchKey(btn.dataset.openSeaInterview);
      if (item) openInterviewModalFromItem(item);
    });
  });
}

// ---- Rendering ----
function renderSeaGroupTable(tableEl, standings) {
  tableEl.innerHTML = `
    <thead>
      <tr><th>Negara</th><th>Win</th><th>Lose</th><th>Points</th></tr>
    </thead>
    <tbody>
      ${standings
        .map(
          (r) => `
        <tr>
          <td class="standings-table__team"><img src="${r.team.logo}" alt="" /><span>${r.team.name}</span></td>
          <td>${r.gamesWon}</td>
          <td>${r.gamesLost}</td>
          <td class="standings-table__accent">${r.points}</td>
        </tr>`
        )
        .join("")}
    </tbody>`;
}

function seaScheduleItemHtml(groupKey, match) {
  const teamA = seaTeamById(match.teamAId);
  const teamB = seaTeamById(match.teamBId);
  if (!teamA || !teamB) return "";
  const scoreText = match.played ? `${match.scoreA} - ${match.scoreB}` : "vs";

  const controlsHtml = match.played
    ? ""
    : `
      <input type="number" min="0" class="manual-score-input manual-score-input--small" data-sea-a="${groupKey}:${match.id}" placeholder="0" />
      <span>-</span>
      <input type="number" min="0" class="manual-score-input manual-score-input--small" data-sea-b="${groupKey}:${match.id}" placeholder="0" />
      <button class="schedule-item__manual-submit" data-sea-submit="${groupKey}:${match.id}" title="Input skor manual">✓</button>
      <button class="schedule-item__play" data-sea-sim="${groupKey}:${match.id}" title="Simulasikan acak">🎲</button>`;

  const newsHtml = match.played ? seaMatchNewsActionsHtml(seaGroupMatchKeyPrefix(groupKey) + ":" + match.id) : "";

  return `
    <div class="schedule-item ${match.played ? "" : "schedule-item--pending"}">
      <div class="schedule-item__top">
        <span class="schedule-item__teams">${teamA.short} ${scoreText} ${teamB.short}</span>
        ${controlsHtml}
      </div>
      ${newsHtml}
    </div>`;
}

function renderSeaGroupSchedule(container, groupKey) {
  const group = seaState[groupKey];
  container.innerHTML = group.schedule.map((m) => seaScheduleItemHtml(groupKey, m)).join("");

  container.querySelectorAll(`[data-sea-sim^="${groupKey}:"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const [, matchId] = btn.dataset.seaSim.split(":");
      simulateSeaGroupMatch(groupKey, matchId);
    });
  });
  container.querySelectorAll(`[data-sea-submit^="${groupKey}:"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const [, matchId] = btn.dataset.seaSubmit.split(":");
      const inputA = container.querySelector(`[data-sea-a="${groupKey}:${matchId}"]`);
      const inputB = container.querySelector(`[data-sea-b="${groupKey}:${matchId}"]`);
      submitSeaGroupManualScore(groupKey, matchId, Number(inputA.value), Number(inputB.value));
    });
  });
  wireSeaNewsActions(container);
}

function seaMatchCardHtml(match) {
  const teamA = match.teamA;
  const teamB = match.teamB;

  const rowHtml = (team, scoreValue) => {
    if (!team) return `<div class="match-card__row"><span class="match-card__row-name" style="color:var(--text-dim)">TBD</span></div>`;
    const isWinner = match.played && match.winnerId === team.id;
    return `
      <div class="match-card__row ${isWinner ? "match-card__row--winner" : ""}">
        <img src="${team.logo}" alt="${team.name} logo" />
        <span class="match-card__row-name">${team.name}</span>
        <span class="match-card__row-score">${match.played ? scoreValue : "-"}</span>
      </div>`;
  };

  let actionHtml;
  if (match.played) {
    const winnerName = match.winnerId === teamA.id ? teamA.name : teamB.name;
    actionHtml = `
      <div class="match-card__winner-tag">🏆 ${winnerName} WIN</div>
      ${seaMatchNewsActionsHtml("sea-ko:" + match.id)}`;
  } else if (!teamA || !teamB) {
    actionHtml = `<div class="match-card__winner-tag" style="color:var(--text-dim)">Menunggu tim...</div>`;
  } else {
    actionHtml = `
      <button class="btn btn--ghost match-card__simulate" data-sea-ko-sim="${match.id}">🎲 Random (BO${match.bestOf})</button>
      <div class="manual-score-row">
        <input type="number" min="0" class="manual-score-input" data-sea-ko-a="${match.id}" placeholder="0" />
        <span>-</span>
        <input type="number" min="0" class="manual-score-input" data-sea-ko-b="${match.id}" placeholder="0" />
        <button class="btn btn--ghost manual-score-submit" data-sea-ko-submit="${match.id}">✓ Input Skor</button>
      </div>`;
  }

  return `
    <div class="match-card">
      <div class="match-card__id">${match.label}</div>
      ${rowHtml(teamA, match.scoreA)}
      ${rowHtml(teamB, match.scoreB)}
      ${actionHtml}
    </div>`;
}

const seaPlayinsEl = document.getElementById("seaPlayins");
const seaSemifinalsEl = document.getElementById("seaSemifinals");
const seaBronzeEl = document.getElementById("seaBronze");
const seaGrandFinalMatchEl = document.getElementById("seaGrandFinalMatch");
const seaChampionBanner = document.getElementById("seaChampionBanner");
const seaChampionLogo = document.getElementById("seaChampionLogo");
const seaChampionName = document.getElementById("seaChampionName");

function renderSeaKnockout() {
  const kb = seaState && seaState.knockout;
  seaKnockoutSection.hidden = !seaState;
  if (!seaState) return;

  if (!kb) {
    seaPlayinsEl.innerHTML = `<p style="color:var(--text-dim)">Klik "Bentuk Bracket Knockout dari Standings" kalau Group Stage udah cukup dimainkan.</p>`;
    seaSemifinalsEl.innerHTML = "";
    seaBronzeEl.innerHTML = "";
    seaGrandFinalMatchEl.innerHTML = "";
    seaChampionBanner.hidden = true;
    return;
  }

  seaPlayinsEl.innerHTML = ["match1", "match2"].map((id) => seaMatchCardHtml(kb.matches[id])).join("");
  seaSemifinalsEl.innerHTML = ["sf1", "sf2"].map((id) => seaMatchCardHtml(kb.matches[id])).join("");
  seaBronzeEl.innerHTML = seaMatchCardHtml(kb.matches.bronze);
  seaGrandFinalMatchEl.innerHTML = seaMatchCardHtml(kb.matches.gf);

  document.querySelectorAll("[data-sea-ko-sim]").forEach((btn) => {
    btn.addEventListener("click", () => simulateSeaKnockoutMatch(btn.dataset.seaKoSim));
  });

  document.querySelectorAll("[data-sea-ko-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const matchId = btn.dataset.seaKoSubmit;
      const inputA = document.querySelector(`[data-sea-ko-a="${matchId}"]`);
      const inputB = document.querySelector(`[data-sea-ko-b="${matchId}"]`);
      submitSeaKnockoutManualScore(matchId, Number(inputA.value), Number(inputB.value));
    });
  });

  wireSeaNewsActions(seaPlayinsEl);
  wireSeaNewsActions(seaSemifinalsEl);
  wireSeaNewsActions(seaBronzeEl);
  wireSeaNewsActions(seaGrandFinalMatchEl);

  if (kb.champion) {
    seaChampionBanner.hidden = false;
    seaChampionLogo.src = kb.champion.logo;
    seaChampionLogo.alt = kb.champion.name + " logo";
    seaChampionName.textContent = kb.champion.name;
  } else {
    seaChampionBanner.hidden = true;
  }
}

const seaNewsTimeline = document.getElementById("seaNewsTimeline");

function renderSeaNewsTimeline() {
  const news = (seaState && seaState.news) || [];
  if (news.length === 0) {
    seaNewsTimeline.innerHTML = `<p class="news-empty">Belum ada berita SEA Games. Mainkan Group Stage atau Knockout dulu.</p>`;
    return;
  }

  seaNewsTimeline.innerHTML = news
    .map(
      (item) => `
        <div class="news-card" data-sea-news-id="${item.id}">
          <div class="news-card__top">
            <span class="news-card__category">${item.categoryLabel}</span>
            <span class="news-card__time">${formatNewsTime(item.timestamp)}</span>
          </div>
          <div class="news-card__headline">${item.headline}</div>
          <div class="news-card__match">${item.teamAName} ${item.scoreA} - ${item.scoreB} ${item.teamBName}</div>
          <span class="news-card__link">Baca Selengkapnya →</span>
        </div>`
    )
    .join("");

  seaNewsTimeline.querySelectorAll("[data-sea-news-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const item = seaState.news.find((n) => n.id === card.dataset.seaNewsId);
      if (item) openNewsModalDirect(item);
    });
  });
}

function renderSeaAll() {
  seaStandingsSection.hidden = !seaState;
  if (seaState) {
    renderSeaGroupTable(document.getElementById("seaGroupATable"), computeSeaGroupStandings(seaState.groupA.teams, seaState.groupA.schedule));
    renderSeaGroupTable(document.getElementById("seaGroupBTable"), computeSeaGroupStandings(seaState.groupB.teams, seaState.groupB.schedule));
    renderSeaGroupSchedule(document.getElementById("seaGroupASchedule"), "groupA");
    renderSeaGroupSchedule(document.getElementById("seaGroupBSchedule"), "groupB");
  }
  renderSeaKnockout();
  renderSeaNewsTimeline();
}

// ----------------------------------------------------------
// INIT
// ----------------------------------------------------------
renderLeagueOptions();
syncSeasonInputFromState();
loadTeamsForCurrentSelection();
renderMseriesAll();
renderMscAll();
renderSeaAll();
