#!/bin/bash

################################################################################
# SCRIPT SINKRONISASI BRANCH dev/backend DENGAN dev
#
# FUNGSI UTAMA:
# Script ini digunakan untuk memperbarui branch `dev/backend` agar selalu sinkron
# dengan perubahan terbaru dari branch `dev`, sambil tetap menjaga agar folder
# `backend/` adalah satu-satunya folder yang dipertahankan.
#
# KAPAN HARUS DIGUNAKAN:
# - Saat kamu akan mulai bekerja di `dev/backend`
# - Atau setelah ada update terbaru di branch `dev`
# - Untuk memastikan `dev/backend` selalu up-to-date tanpa membawa folder frontend
#
# APA YANG DILAKUKAN SCRIPT:
# 1. Mengecek apakah kamu punya perubahan lokal yang belum di-commit. Jika ada, script berhenti.
# 2. Pindah ke branch `dev`, lalu menarik update terbaru dari remote.
# 3. Kembali ke `dev/backend`, lalu menggabungkan (`merge`) perubahan terbaru dari `dev`.
# 4. Menghapus folder `frontend/` dari `dev/backend`, karena tidak relevan dengan branch ini.
# 5. Membuat commit kosong sebagai penanda bahwa `dev/backend` sudah disinkronkan.
# 6. Push branch `dev/backend` ke remote.
#
# CATATAN PENTING:
# - Script ini TIDAK AKAN MENIMPA pekerjaan kamu yang belum di-commit.
# - Namun, jika folder `frontend/` masih ada dan berisi kerjaan yang belum kamu merge ke `dev`,
#   maka akan dihapus dari branch ini. Pastikan semua hal penting sudah di-commit & merge ke `dev`.
#
# REKOMENDASI:
# - Commit atau stash semua pekerjaan SEBELUM menjalankan script ini.
# - Jalankan script ini secara berkala untuk menjaga branch tetap bersih dan up-to-date.
################################################################################

set -e
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color / reset

# Tampilkan branch saat ini
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${GREEN}Saat ini di branch: ${NC}$CURRENT_BRANCH"

echo -e "${RED}DANGER:${NC} Semua perubahan di branch ini akan hilang jika belum kamu commit atau simpan ke branch saat ini (${GREEN}$CURRENT_BRANCH${NC})"
echo -e "${YELLOW}Script ini hanya untuk melakukan sinkronisasi dengan branch terbaru Dev. Menjadi titik penanda history.${NC}"
read -p "Lanjutkan? (y/N): " confirm
confirm=${confirm:-n}

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Dibatalkan."
  exit 1
fi

# Cek uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Ada perubahan yang belum di-commit. Harap commit atau stash dulu."
  exit 1
fi

# Pindah ke dev, tarik update
git checkout dev
git pull origin dev

# Kembali ke backend branch
git checkout dev/backend

# Merge dari dev
git merge dev --no-edit

# Hapus frontend jika ada
if [ -d "../frontend" ]; then
  rm -rf ../frontend
  git rm -r ../frontend || true
  git commit --allow-empty -m "[AUTO] sync with dev branch (Only left backend here)"
fi

# Commit kosong sebagai penanda sync
git commit --allow-empty -m "[AUTO] sync with dev branch"

# Push
git push origin dev/backend

echo -e "${GREEN}Branch 'dev/backend' disinkronkan dan dipush.${NC}"
