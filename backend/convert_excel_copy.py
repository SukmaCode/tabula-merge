import pandas as pd
import os
import sys

# ── 1. Konfigurasi File Sumber (Dinamis / Fleksibel) ──────────────────────────
# Bisa diatur langsung di bawah ini atau dilewatkan via argument command line:
# Contoh: python convert_excel_copy.py "file1.xlsx" "file2.xlsx"
DEFAULT_FILE_1 = "TABULASI NEW (rw007 nabilla) (2)new (1).xlsx"
DEFAULT_FILE_2 = "copy sari.xlsx"

FILE_1 = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FILE_1
FILE_2 = sys.argv[2] if len(sys.argv) > 2 else DEFAULT_FILE_2

# Batasan Responden (Opsional):
# Jika diset None, skrip akan MENDETEKSI OTOMATIS jumlah responden aktif di setiap file.
# Jika ingin ditentukan manual, isi dengan angka (contoh: FILE_1_MAX_RESP = 89).
FILE_1_MAX_RESP = None
FILE_2_MAX_RESP = None

import glob

# Variabel sub-klasifikasi untuk standardisasi nilai
sub_klasifikasi_1 = "Ya"
sub_klasifikasi_2 = "Tidak"

os.makedirs("csv_data", exist_ok=True)
file_non_header = "csv_data/nonheader"
os.makedirs(file_non_header, exist_ok=True)

# Bersihkan file CSV lama di csv_data agar tidak tercampur
for old_file in glob.glob(os.path.join("csv_data", "*.csv")):
    try:
        os.remove(old_file)
    except Exception:
        pass


# ── 2. Fungsi Pembantu Deteksi Dinamis ─────────────────────────────────────────

def find_kk_row(df, max_scan_rows=8):
    """
    Mendeteksi baris nomor KK secara dinamis tanpa terpaku pada angka tertentu (seperti 163).
    1. Mencari sel bertuliskan 'JUMLAH KK' / 'NO KK', baris di bawahnya adalah baris nomor KK.
    2. Fallback: Mencari baris yang memuat sekumpulan angka integer berurutan (ada angka 1 dan >= 5 angka).
    """
    # Pendekatan 1: Berdasarkan teks header 'JUMLAH KK'
    for r in range(min(max_scan_rows, len(df))):
        for c in range(min(15, df.shape[1])):
            v = df.iloc[r, c]
            if pd.notna(v) and any(kw in str(v).upper() for kw in ("JUMLAH KK", "NO KK", "NOMOR KK")):
                if r + 1 < len(df):
                    return r + 1

    # Pendekatan 2: Berdasarkan deretan angka nomor urut responden
    for r in range(min(max_scan_rows, len(df))):
        row_vals = df.iloc[r].tolist()
        ints = []
        for v in row_vals:
            if pd.notna(v):
                try:
                    num = float(v)
                    if num.is_integer() and num > 0:
                        ints.append(int(num))
                except (ValueError, TypeError):
                    pass
        if 1 in ints and len(ints) >= 5:
            return r

    return None


def detect_max_respondents(filename, explicit_limit=None):
    """
    Mendeteksi jumlah responden aktif dalam file Excel secara dinamis.
    Menganalisis baris kode responden dan kolom aktif pada seluruh sheet kuesioner.
    """
    if explicit_limit is not None:
        return explicit_limit

    try:
        xl = pd.ExcelFile(filename)
    except Exception as e:
        print(f"Error membaca {filename}: {e}")
        return None

    candidates_by_code = []
    candidates_by_data = []

    for sheet in xl.sheet_names:
        if sheet.lower().startswith("sheet"):
            continue
        try:
            df = xl.parse(sheet, header=None)
        except Exception:
            continue

        kk_r = find_kk_row(df)
        if kk_r is None:
            continue

        # Kumpulkan kolom-kolom yang merupakan nomor KK
        kk_cols = []
        for c in range(df.shape[1]):
            v = df.iloc[kk_r, c]
            if pd.notna(v) and str(v).replace(".0", "").isdigit():
                kk_cols.append(c)

        if not kk_cols:
            continue

        # 1. Cek kode responden di baris-baris atas kk_r
        best_code_count = 0
        for r in range(kk_r):
            cnt = sum(
                1 for c in kk_cols
                if pd.notna(df.iloc[r, c]) and str(df.iloc[r, c]).strip() != ""
            )
            if cnt > best_code_count:
                best_code_count = cnt

        if best_code_count > 0:
            candidates_by_code.append(best_code_count)

        # 2. Cek kolom KK yang memiliki isian data di bawah kk_r
        active_kks = []
        for c in kk_cols:
            num = int(float(df.iloc[kk_r, c]))
            if df.iloc[kk_r + 1:, c].notna().any():
                active_kks.append(num)

        if active_kks:
            candidates_by_data.append(max(active_kks))

    if candidates_by_code:
        return max(candidates_by_code)
    elif candidates_by_data:
        return max(candidates_by_data)
    return None


# ── 3. Persiapan Sumber Data & Batasan Responden ──────────────────────────────
limit_1 = detect_max_respondents(FILE_1, FILE_1_MAX_RESP) or 89
limit_2 = detect_max_respondents(FILE_2, FILE_2_MAX_RESP) or 125

print("=" * 60)
print("KONFIGURASI PENGGABUNGAN DATA (DINAMIS):")
print(f"File 1: {FILE_1}")
print(f"  -> Terdeteksi Responden Aktif: {limit_1} KK (Urutan KK: 1 s/d {limit_1})")
print(f"File 2: {FILE_2}")
print(f"  -> Terdeteksi Responden Aktif: {limit_2} KK (Urutan KK: {limit_1 + 1} s/d {limit_1 + limit_2})")
print(f"Total Responden Gabungan: {limit_1 + limit_2} KK")
print("=" * 60)

# Konfigurasi sumber dengan prefix terstandarisasi (FILE1 dan FILE2)
SOURCES = [
    {
        "prefix": "FILE1",
        "label": os.path.splitext(os.path.basename(FILE_1))[0][:15],
        "filename": FILE_1,
        "offset": 0,
        "max_limit": limit_1,
    },
    {
        "prefix": "FILE2",
        "label": os.path.splitext(os.path.basename(FILE_2))[0][:15],
        "filename": FILE_2,
        "offset": limit_1,
        "max_limit": limit_2,
    }
]


# ── 4. Ekstraksi Data dari Masing-Masing File ke CSV ──────────────────────────
for src in SOURCES:
    prefix    = src["prefix"]
    label     = src["label"]
    filename  = src["filename"]
    offset    = src["offset"]
    max_limit = src["max_limit"]

    print(f"\nMemproses sumber: {label} [{prefix}] ({filename})...")
    excel = pd.ExcelFile(filename)

    for sheet in excel.sheet_names:
        df = pd.read_excel(filename, sheet_name=sheet, header=None)

        kk_row = find_kk_row(df)

        safe_name = (
            sheet
            .replace("/", "_")
            .replace("\\", "_")
            .replace(" ", "_")
        )

        # Jika sheet tidak memiliki baris nomor KK (misal sheet pengantar/rekap tanpa KK)
        if kk_row is None:
            output = f"{file_non_header}/{prefix}__{safe_name}.csv"
            df.to_csv(output, index=False, header=False, encoding="utf-8-sig")
            print(f"  [NON-HEADER]: {output}")
            continue

        # Petakan kolom ke nomor urut KK secara dinamis
        kk_columns = {}
        for col in range(df.shape[1]):
            value = df.iloc[kk_row, col]
            if pd.notna(value):
                try:
                    num = int(float(value))
                    # Batasi hanya sampai jumlah responden aktif di file ini
                    if 1 <= num <= max_limit:
                        kk_columns[col] = num + offset
                except (ValueError, TypeError):
                    pass

        first_kk_col = min(kk_columns.keys()) if kk_columns else 2

        # Deteksi baris kode responden (misal 01/Za, 01/ar, dll.) di atas kk_row
        best_r = None
        best_count = 0
        for r in range(kk_row):
            cnt = 0
            for col in kk_columns.keys():
                v = df.iloc[r, col]
                if pd.notna(v):
                    s = str(v).strip()
                    if s and "JUMLAH" not in s.upper() and "KLASIFIKASI" not in s.upper() and s.upper() not in ("NO", "NO KK"):
                        cnt += 1
            if cnt > best_count:
                best_count = cnt
                best_r = r

        kk_codes = {}
        for col, jumlah_kk in kk_columns.items():
            if best_r is not None:
                v = df.iloc[best_r, col]
                if pd.notna(v) and str(v).strip() != "":
                    kk_codes[col] = str(v).strip()
                else:
                    kk_codes[col] = ""
            else:
                kk_codes[col] = ""

        # Deteksi kolom sub-klasifikasi
        has_sub = False
        if first_kk_col > 2:
            for r in range(kk_row + 1, len(df)):
                for c in range(2, first_kk_col):
                    v = df.iloc[r, c]
                    if pd.notna(v) and str(v).strip() != "":
                        has_sub = True
                        break
                if has_sub:
                    break

        # Ambil baris data setelah header KK
        data = []
        current_klasifikasi = None

        for row in range(kk_row + 1, len(df)):
            main_klas = df.iloc[row, 1]

            if pd.notna(main_klas):
                current_klasifikasi = str(main_klas).strip()

            if current_klasifikasi is None:
                continue

            sub_klas = None
            if has_sub:
                for c in range(2, first_kk_col):
                    v = df.iloc[row, c]
                    if pd.notna(v) and str(v).strip() != "":
                        raw_sub = str(v).strip()
                        raw_lower = raw_sub.lower()

                        if raw_lower == "ya":
                            sub_klas = sub_klasifikasi_1
                        elif raw_lower == "tidak":
                            sub_klas = sub_klasifikasi_2
                        elif raw_lower == "ada":
                            sub_klas = "Ada"
                        else:
                            sub_klas = raw_sub
                        break

                if pd.isna(main_klas) and sub_klas is None:
                    continue
            else:
                if pd.isna(main_klas):
                    continue

            for col, jumlah_kk in kk_columns.items():
                value = df.iloc[row, col]
                if pd.isna(value):
                    value = ""

                data.append({
                    "SUMBER": label,
                    "SHEET": sheet,
                    "KLASIFIKASI": current_klasifikasi,
                    "SUB_KLASIFIKASI": sub_klas,
                    "JUMLAH KK": jumlah_kk,
                    "KODE": kk_codes.get(col, ""),
                    "NILAI": value
                })

        if data:
            result = pd.DataFrame(data)
            output = f"csv_data/{prefix}__{safe_name}.csv"
            result.to_csv(output, index=False, encoding="utf-8-sig")
            print(f"  OK: {output} ({len(result)} baris)")

print("\nEkstraksi selesai! File perantara tersimpan di folder 'csv_data/'.")
