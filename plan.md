# Taboo Oyunu Uygulama Planı

## Özet
PRD'ye uygun olarak, İngilizce kelime öğretmeye yönelik bir Taboo oyunu eklenecek. Oyun **sadece İngilizce (`/en/taboo`) sayfasında** görünecek. Oyuncular hedef kelimeyi, yasaklı kelimeleri kullanmadan anlatmaya çalışır.

---

## Adım 1: Tip Tanımlamaları (`shared/src/types.ts`)

- `TabooCard` interface'i ekle:
  ```typescript
  export interface TabooCard {
    id: string;
    word: string;           // Hedef kelime (sadece İngilizce)
    tabooWords: string[];   // Yasaklı kelimeler listesi (5 kelime)
    category: string;       // Kategori
    difficulty: DifficultyLevel; // easy | medium | hard
  }
  ```
- `GameMode` union type'ına `'taboo'` ekle

## Adım 2: Oyun Modu Tanımı (`shared/src/constants.ts`)

- `GAME_MODES` dizisine yeni mod ekle:
  ```typescript
  {
    id: 'taboo',
    nameKey: 'gameModes.taboo',
    descKey: 'gameModes.tabooDesc',
    icon: '🚫',
    locales: ['en'],  // Sadece İngilizce
  }
  ```
- Mevcut modlara da `locales` alanı ekle (tümü `['en', 'tr']`)

## Adım 3: Navigasyon Filtreleme (`frontend/components/Navigation.tsx`)

- `GAME_MODES` listesini locale'e göre filtrele:
  - Taboo modu sadece `locale === 'en'` olduğunda dropdown'da görünsün
  - Diğer modlar her iki dilde de görünsün

## Adım 4: Static Params Güncelleme (`frontend/app/[locale]/[game]/layout.tsx`)

- `generateStaticParams` fonksiyonunu güncelle: locale-bazlı game modları üretsin
  - `/en/taboo` → oluşturulsun
  - `/tr/taboo` → oluşturulmasın (veya oluşturulup yönlendirilsin)

## Adım 5: Taboo Kart Verileri (`shared/src/data/tabooCards.ts`)

- ~150 İngilizce kelime, her biri için:
  - `word`: Hedef kelime
  - `tabooWords`: 5 yasaklı kelime
  - `category`: Kategori
  - `difficulty`: easy / medium / hard
- Kategoriler (İngilizce öğrenimi odaklı):
  - `everyday` 🏠 (Everyday Life) - Günlük yaşam kelimeleri
  - `food-drink` 🍕 (Food & Drink) - Yiyecek ve içecek
  - `travel` ✈️ (Travel & Places) - Seyahat
  - `emotions` 💭 (Emotions & Feelings) - Duygular
  - `work-school` 💼 (Work & School) - İş ve okul
  - `nature` 🌿 (Nature & Animals) - Doğa ve hayvanlar
- Zorluk seviyeleri dağılımı: ~50 easy, ~50 medium, ~50 hard

## Adım 6: Shared Index Export (`shared/src/index.ts`)

- `export * from './data/tabooCards'` ekle

## Adım 7: Taboo Bileşeni (`frontend/components/Taboo.tsx`)

Oyun akışı:
1. **Başlangıç Ekranı**: Zorluk seviyesi seçimi (Easy/Medium/Hard/All) + kategori filtreleme
2. **Oyun Ekranı**:
   - Üstte: Hedef kelime (büyük, belirgin)
   - Altında: Yasaklı kelimeler listesi (kırmızı/yasak görünümü)
   - "Skip" (Geç) butonu → Kelimeyi geçer, skoru etkilemez
   - "Got It!" (Bildi) butonu → Puan kazandırır, sonraki kelimeye geçer
   - Kart sayacı (X / Y)
   - Skor göstergesi
3. **Oyun Sonu Ekranı**: Toplam skor, doğru/geçilen sayısı, tekrar oyna butonu

Bileşen State:
- `selectedDifficulty`: 'all' | 'easy' | 'medium' | 'hard'
- `selectedCategory`: string
- `currentIndex`: number
- `score`: number (doğru bilinenler)
- `skipped`: number (geçilenler)
- `gameComplete`: boolean

Tasarım:
- Gradient: purple-to-indigo temalı (eğitim odaklı, canlı)
- Yasaklı kelimeler kırmızı arka plan ile vurgulanacak
- Framer Motion animasyonları (kart geçişleri)
- Mevcut BluffCards/EmojiDecoder bileşen yapısına uygun

## Adım 8: Sayfa Router Güncellemesi (`frontend/app/[locale]/[game]/page.tsx`)

- Taboo bileşeni import et
- Render koşulu ekle:
  ```tsx
  {activeGameMode === 'taboo' && <Taboo locale={locale} />}
  ```

## Adım 9: Çeviri Dosyaları

### `frontend/public/locales/en/common.json`
```json
{
  "gameModes": {
    "taboo": "Taboo",
    "tabooDesc": "Describe the word without saying the forbidden words!"
  },
  "taboo": {
    "title": "Taboo",
    "subtitle": "Describe the word without using these forbidden words!",
    "tabooWords": "Forbidden Words",
    "gotIt": "Got It!",
    "skip": "Skip",
    "nextWord": "Next Word",
    "score": "Score",
    "skipped": "Skipped",
    "cardOf": "of",
    "allCategories": "All",
    "allDifficulties": "All Levels",
    "playAgain": "Play Again",
    "congratulations": "Game Over!",
    "finalScore": "Final Score",
    "wordsGuessed": "Words Guessed",
    "wordsSkipped": "Words Skipped",
    "difficulty": "Difficulty",
    "category": "Category",
    "startGame": "Start Game"
  }
}
```

### `frontend/public/locales/tr/common.json`
- Taboo için sadece gameModes key'leri eklenir (navigasyonda görünmese de build hata vermemesi için)

## Adım 10: Build & Test

- `npm run build:shared` → shared paketini derle
- `npm run build:frontend` → frontend'i derle, hata kontrolü yap
- Lint kontrolleri

---

## Dosya Değişiklik Özeti

| Dosya | İşlem |
|-------|-------|
| `shared/src/types.ts` | `TabooCard` interface + `GameMode` güncelleme |
| `shared/src/constants.ts` | `GAME_MODES`'a taboo + `locales` alanı ekleme |
| `shared/src/data/tabooCards.ts` | **Yeni dosya** - 150 kart verisi |
| `shared/src/index.ts` | Export ekleme |
| `frontend/components/Taboo.tsx` | **Yeni dosya** - Oyun bileşeni |
| `frontend/components/Navigation.tsx` | Locale bazlı filtreleme |
| `frontend/app/[locale]/[game]/page.tsx` | Taboo render koşulu |
| `frontend/app/[locale]/[game]/layout.tsx` | Static params güncelleme |
| `frontend/public/locales/en/common.json` | İngilizce çeviriler |
| `frontend/public/locales/tr/common.json` | Minimal Türkçe çeviriler |
