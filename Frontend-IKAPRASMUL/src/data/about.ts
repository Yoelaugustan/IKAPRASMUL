import type { BoardMember } from "@/types";

// --- PENGURUS INTI (Executive Board) ---
export const EXECUTIVE_BOARD: BoardMember[] = [
  { name: "Edy Sutrisman", role: "President", photo: "/images/about/pengurus_inti/KETUM-Edy_Sutrisman.jpeg", tier: "executive" },
  { name: "Sona Maesana", role: "Vice President 1", photo: "/images/about/pengurus_inti/WK_1-Sona_Maesana.jpeg", tier: "executive" },
  { name: "Muhammad Emyranza", role: "Vice President 2", photo: "/images/about/pengurus_inti/WK_2-Muhammad_Emyranza.jpeg", tier: "executive" },
  { name: "Desy Sulistyorini", role: "Vice President 3", photo: "/images/about/pengurus_inti/WK_3-Desy_Sulistyorini.jpeg", tier: "executive" },
  { name: "Meidy Ferdiansyah", role: "Vice President 4", photo: "/images/about/pengurus_inti/WK_4-Meidy_Ferdiansyah.jpeg", tier: "executive" },
  { name: "Fera Damayanti", role: "Secretary General", photo: "/images/about/pengurus_inti/SEKJEN-Fera_Damayanti.png", tier: "executive" },
  { name: "SM Widyasari", role: "Deputy Secretary General 1", photo: "/images/about/pengurus_inti/WASEKJEN_1-SM_Widyasari.jpeg", tier: "executive" },
  { name: "Nandana Kusuma", role: "Deputy Secretary General 2", photo: "/images/about/pengurus_inti/WASEKJEN_2-Nandana.JPG", tier: "executive" },
  { name: "Zefanya Angeline", role: "General Treasurer", photo: "/images/about/pengurus_inti/BENDUM-Zefanya_Angeline.jpeg", tier: "executive" },
];

// --- DEWAN INTI (Board Members by Division) ---
export const BOARD_DIVISIONS = [
  {
    id: "pelindung", // Dewan Pelindung
    members: [
      { name: "Dr. Hassan Wirajuda", role: "Head of Protectorate Board", photo: "/images/about/dewan_inti/Ketua_Dewan_Pelindung-Dr_Hassan_Wirajuda.jpg", tier: "board" },
      { name: "Eddy J Danu", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Eddy_J_Danu.png", tier: "board" },
      { name: "Eddy Sutjipto", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Eddy_Sutjipto.webp", tier: "board" },
      { name: "Fathony Rahman", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Fathony_Rahman.png", tier: "board" },
      { name: "Harris Turino", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Harris_Turino.jpg", tier: "board" },
      { name: "Maspiyono", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Maspiyono.jpg", tier: "board" },
      { name: "Pulung Peranginangin", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Pulung_Peranginangin.png", tier: "board" },
      { name: "Stevanus Wisnu Wijaya", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Stevanus_Wisnu_Wijaya.png", tier: "board" },
      { name: "Taslim Yunus", role: "Member of Protectorate Board", photo: "/images/about/dewan_inti/Anggota_Dewan_Pelindung-Taslim_Yunus.jpeg", tier: "board" },
    ]
  },
  {
    id: "penasihat", // Dewan Penasihat
    members: [
      { name: "Sanny Iskandar", role: "Head of Advisory Board", photo: "/images/about/dewan_inti/Ketua_Dewan_Penasihat-Sanny_Iskandar.jpeg", tier: "board" },
      { name: "Syah Amondaris", role: "Deputy Head of Advisory Board", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Penasihat-Syah_Amondaris.jpg", tier: "board" },
      { name: "Danny Wangsahardja", role: "Advisory Board Member", photo: "/images/about/dewan_inti/Wakil_Dewan_Penasihat-Danny_Wangsahardja.jpeg", tier: "board" },
      { name: "Safitri Siswono", role: "Advisory Board Member", photo: "/images/about/dewan_inti/Wakil_Dewan_Penasihat-Safitri_Siswono.jpeg", tier: "board" },
      { name: "Suchandra Tanjung", role: "Advisory Board Member", photo: "/images/about/dewan_inti/Wakil_Dewan_Penasihat-Suchandra_Tanjung.jpeg", tier: "board" },
    ]
  },
  {
    id: "penyantun", // Dewan Penyantun
    members: [
      { name: "Dedy Rochimat", role: "Head of Board of Trustees", photo: "/images/about/dewan_inti/Ketua_Dewan_Penyantun-Dedy_Rochimat.jpeg", tier: "board" },
      { name: "Adharta Ongkosaputra", role: "Deputy Head of Board of Trustees", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Penyantun-Adharta_Ongkosaputra.jpeg", tier: "board" },
      { name: "Budiarsa Sastrawinata", role: "Deputy Head of Board of Trustees", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Penyantun-Budiarsa_Sastrawinata.webp", tier: "board" },
      { name: "Fransiscus Soerjopranoto", role: "Deputy Head of Board of Trustees", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Penyantun-Fransiscus_Soerjopranoto.jpeg", tier: "board" },
      { name: "Paulus W. Broto", role: "Deputy Head of Board of Trustees", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Penyantun-Paulus_W_Broto.webp", tier: "board" },
    ]
  },
  {
    id: "pakar", // Dewan Pakar
    members: [
      { name: "Waluyo", role: "Head of Expert Board", photo: "/images/about/dewan_inti/Ketua_Dewan_Pakar-Waluyo.jpeg", tier: "board" },
      { name: "Erwin Tenggono", role: "Deputy Head of Expert Board", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Pakar-Erwin_Tenggono.png", tier: "board" },
      { name: "Githa Nafeeza", role: "Deputy Head of Expert Board", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Pakar-Githa_Nafeeza.jpeg", tier: "board" },
      { name: "Metta Dharmaasputra", role: "Deputy Head of Expert Board", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Pakar-Metta_Dharmaasputra.jpeg", tier: "board" },
      { name: "Ratih Ibrahim", role: "Deputy Head of Expert Board", photo: "/images/about/dewan_inti/Wakil_Ketua_Dewan_Pakar-Ratih_Ibrahim.png", tier: "board" },
    ]
  }
];