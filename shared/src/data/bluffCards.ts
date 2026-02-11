import { BluffCard } from '../types';

export const BLUFF_CARD_CATEGORIES = [
  { id: 'science', icon: '🔬', name: { en: 'Science', tr: 'Bilim' } },
  { id: 'history', icon: '📜', name: { en: 'History', tr: 'Tarih' } },
  { id: 'geography', icon: '🌍', name: { en: 'Geography', tr: 'Coğrafya' } },
  { id: 'nature', icon: '🌿', name: { en: 'Nature', tr: 'Doğa' } },
  { id: 'human-body', icon: '🫀', name: { en: 'Human Body', tr: 'İnsan Vücudu' } },
  { id: 'pop-culture', icon: '🎬', name: { en: 'Pop Culture', tr: 'Popüler Kültür' } },
] as const;

export const BLUFF_CARDS: BluffCard[] = [
  // ========== SCIENCE ==========
  {
    id: 'sci_1',
    statement: {
      en: 'Lightning is hotter than the surface of the Sun.',
      tr: 'Yıldırım, Güneş\'in yüzeyinden daha sıcaktır.',
    },
    isTrue: true,
    explanation: {
      en: 'Lightning can reach about 30,000°C (54,000°F), while the Sun\'s surface is about 5,500°C (9,932°F).',
      tr: 'Yıldırım yaklaşık 30.000°C\'ye ulaşabilirken, Güneş\'in yüzeyi yaklaşık 5.500°C\'dir.',
    },
    category: 'science',
    difficulty: 'medium',
  },
  {
    id: 'sci_2',
    statement: {
      en: 'Sound travels faster in water than in air.',
      tr: 'Ses suda havadan daha hızlı yayılır.',
    },
    isTrue: true,
    explanation: {
      en: 'Sound travels about 4 times faster in water (~1,480 m/s) than in air (~343 m/s).',
      tr: 'Ses suda (~1.480 m/s) havaya göre (~343 m/s) yaklaşık 4 kat daha hızlı yayılır.',
    },
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 'sci_3',
    statement: {
      en: 'Diamonds can be made from peanut butter.',
      tr: 'Fıstık ezmesinden elmas yapılabilir.',
    },
    isTrue: true,
    explanation: {
      en: 'Scientists have successfully converted peanut butter into diamonds by subjecting it to extreme pressure, since it contains carbon.',
      tr: 'Bilim insanları, karbon içerdiği için fıstık ezmesini aşırı basınca maruz bırakarak elmasa dönüştürmeyi başarmıştır.',
    },
    category: 'science',
    difficulty: 'hard',
  },
  {
    id: 'sci_4',
    statement: {
      en: 'Glass is actually a liquid that flows very slowly.',
      tr: 'Cam aslında çok yavaş akan bir sıvıdır.',
    },
    isTrue: false,
    explanation: {
      en: 'This is a popular myth. Glass is an amorphous solid, not a liquid. Old windows appear thicker at the bottom due to manufacturing methods, not flowing.',
      tr: 'Bu popüler bir mittir. Cam amorf bir katıdır, sıvı değildir. Eski camların alttan kalın görünmesi üretim yönteminden kaynaklanır.',
    },
    category: 'science',
    difficulty: 'medium',
  },
  {
    id: 'sci_5',
    statement: {
      en: 'Hot water freezes faster than cold water.',
      tr: 'Sıcak su, soğuk sudan daha hızlı donar.',
    },
    isTrue: true,
    explanation: {
      en: 'This is known as the Mpemba effect. Under certain conditions, hot water can indeed freeze faster than cold water, though the exact mechanism is still debated.',
      tr: 'Bu Mpemba etkisi olarak bilinir. Belirli koşullarda sıcak su gerçekten soğuk sudan daha hızlı donabilir, ancak kesin mekanizması hâlâ tartışmalıdır.',
    },
    category: 'science',
    difficulty: 'hard',
  },
  {
    id: 'sci_6',
    statement: {
      en: 'Humans share about 60% of their DNA with bananas.',
      tr: 'İnsanlar DNA\'larının yaklaşık %60\'ını muzlarla paylaşır.',
    },
    isTrue: true,
    explanation: {
      en: 'Humans and bananas share about 60% of the same DNA. This is because all living things evolved from a common ancestor.',
      tr: 'İnsanlar ve muzlar DNA\'larının yaklaşık %60\'ını paylaşır. Bunun nedeni tüm canlıların ortak bir atadan evrimleşmiş olmasıdır.',
    },
    category: 'science',
    difficulty: 'medium',
  },
  {
    id: 'sci_7',
    statement: {
      en: 'A teaspoon of neutron star material weighs about 6 billion tons.',
      tr: 'Bir çay kaşığı nötron yıldızı materyali yaklaşık 6 milyar ton ağırlığındadır.',
    },
    isTrue: true,
    explanation: {
      en: 'Neutron stars are incredibly dense. A teaspoon of their material would weigh about 6 billion tons on Earth.',
      tr: 'Nötron yıldızları inanılmaz yoğundur. Bir çay kaşığı materyalleri Dünya\'da yaklaşık 6 milyar ton ağırlığında olurdu.',
    },
    category: 'science',
    difficulty: 'hard',
  },
  {
    id: 'sci_8',
    statement: {
      en: 'We only use 10% of our brain.',
      tr: 'Beynimizin sadece %10\'unu kullanıyoruz.',
    },
    isTrue: false,
    explanation: {
      en: 'This is one of the most widespread myths. Brain imaging shows that we use virtually all parts of our brain, and most of the brain is active most of the time.',
      tr: 'Bu en yaygın mitlerden biridir. Beyin görüntüleme, beynimizin neredeyse tüm bölümlerini kullandığımızı gösterir.',
    },
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 'sci_9',
    statement: {
      en: 'Honey never expires. Edible honey has been found in ancient Egyptian tombs.',
      tr: 'Balın son kullanma tarihi yoktur. Antik Mısır mezarlarında yenilebilir bal bulunmuştur.',
    },
    isTrue: true,
    explanation: {
      en: 'Honey has an extremely low moisture content and high acidity, making it inhospitable to bacteria. 3,000-year-old honey from Egyptian tombs was still edible.',
      tr: 'Balın nem oranı çok düşük, asitliği yüksektir ve bu da bakterilerin yaşamasını engeller. Mısır mezarlarından çıkan 3.000 yıllık bal hâlâ yenilebilir durumdaydı.',
    },
    category: 'science',
    difficulty: 'easy',
  },

  // ========== HISTORY ==========
  {
    id: 'his_1',
    statement: {
      en: 'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.',
      tr: 'Kleopatra, Büyük Piramit\'in inşasından çok Ay\'a inişe daha yakın bir zamanda yaşadı.',
    },
    isTrue: true,
    explanation: {
      en: 'The Great Pyramid was built around 2560 BC. Cleopatra lived around 30 BC. The Moon landing was in 1969. That\'s ~2,530 years vs ~2,000 years.',
      tr: 'Büyük Piramit MÖ 2560 civarında inşa edildi. Kleopatra MÖ 30 civarında yaşadı. Ay\'a iniş 1969\'daydı. Yani ~2.530 yıl vs ~2.000 yıl.',
    },
    category: 'history',
    difficulty: 'medium',
  },
  {
    id: 'his_2',
    statement: {
      en: 'Napoleon Bonaparte was unusually short for his time.',
      tr: 'Napolyon Bonapart, yaşadığı döneme göre alışılmadık derecede kısaydı.',
    },
    isTrue: false,
    explanation: {
      en: 'Napoleon was about 5\'7" (170 cm), which was average or slightly above average for French men of his era. The myth comes from British propaganda and confusion between French and English measurement units.',
      tr: 'Napolyon yaklaşık 170 cm boyundaydı, bu da döneminin Fransız erkekleri için ortalama veya ortalamanın biraz üzeriydi. Efsane İngiliz propagandasından kaynaklanır.',
    },
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'his_3',
    statement: {
      en: 'The Great Wall of China is visible from space with the naked eye.',
      tr: 'Çin Seddi uzaydan çıplak gözle görülebilir.',
    },
    isTrue: false,
    explanation: {
      en: 'Multiple astronauts have confirmed that the Great Wall is not visible from space with the naked eye. It\'s too narrow. Even from low Earth orbit, it\'s extremely difficult to see.',
      tr: 'Birçok astronot Çin Seddi\'nin uzaydan çıplak gözle görülemediğini doğrulamıştır. Çok dar olduğu için düşük Dünya yörüngesinden bile görmek son derece zordur.',
    },
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'his_4',
    statement: {
      en: 'Oxford University is older than the Aztec Empire.',
      tr: 'Oxford Üniversitesi, Aztek İmparatorluğu\'ndan daha eskidir.',
    },
    isTrue: true,
    explanation: {
      en: 'Oxford University started teaching around 1096 AD. The Aztec Empire was founded in 1428 AD, over 300 years later.',
      tr: 'Oxford Üniversitesi\'nde eğitim yaklaşık 1096\'da başladı. Aztek İmparatorluğu 1428\'de kuruldu, yani 300 yıldan fazla sonra.',
    },
    category: 'history',
    difficulty: 'hard',
  },
  {
    id: 'his_5',
    statement: {
      en: 'Vikings wore horned helmets in battle.',
      tr: 'Vikingler savaşta boynuzlu miğfer takardı.',
    },
    isTrue: false,
    explanation: {
      en: 'There is no historical evidence that Vikings wore horned helmets. This image was popularized by 19th-century Romantic artists and opera costumes.',
      tr: 'Vikinglerin boynuzlu miğfer taktığına dair tarihsel kanıt yoktur. Bu imaj 19. yüzyıl Romantik sanatçılar ve opera kostümleri tarafından popülerleştirildi.',
    },
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'his_6',
    statement: {
      en: 'The Ottoman Empire lasted for over 600 years.',
      tr: 'Osmanlı İmparatorluğu 600 yıldan fazla sürdü.',
    },
    isTrue: true,
    explanation: {
      en: 'The Ottoman Empire lasted from 1299 to 1922, a total of 623 years, making it one of the longest-lasting empires in history.',
      tr: 'Osmanlı İmparatorluğu 1299\'dan 1922\'ye kadar toplam 623 yıl sürdü ve tarihteki en uzun ömürlü imparatorluklardan biri oldu.',
    },
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'his_7',
    statement: {
      en: 'Albert Einstein failed math in school.',
      tr: 'Albert Einstein okulda matematikten kaldı.',
    },
    isTrue: false,
    explanation: {
      en: 'Einstein excelled at mathematics from a young age. He had mastered calculus by age 15. This myth likely arose from a misunderstanding of the Swiss grading system.',
      tr: 'Einstein küçük yaştan itibaren matematikte başarılıydı. 15 yaşında kalkülüsü öğrenmişti. Bu mit muhtemelen İsviçre not sisteminin yanlış anlaşılmasından kaynaklanır.',
    },
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'his_8',
    statement: {
      en: 'The shortest war in history lasted 38 minutes.',
      tr: 'Tarihteki en kısa savaş 38 dakika sürdü.',
    },
    isTrue: true,
    explanation: {
      en: 'The Anglo-Zanzibar War of 1896 lasted between 38 and 45 minutes. It was fought between the United Kingdom and the Sultanate of Zanzibar.',
      tr: '1896 İngiliz-Zanzibar Savaşı 38 ila 45 dakika sürdü. İngiltere ile Zanzibar Sultanlığı arasında yapıldı.',
    },
    category: 'history',
    difficulty: 'hard',
  },
  {
    id: 'his_9',
    statement: {
      en: 'The ancient Romans used urine as mouthwash.',
      tr: 'Antik Romalılar idrarı ağız gargarası olarak kullanırdı.',
    },
    isTrue: true,
    explanation: {
      en: 'Romans used urine for its ammonia content, which is an effective cleaning agent. They even imported Portuguese urine, which was considered the finest.',
      tr: 'Romalılar idrarı içerdiği amonyak nedeniyle kullandı, amonyak etkili bir temizleme maddesidir. Hatta en iyisi sayılan Portekiz idrarını ithal bile ederlerdi.',
    },
    category: 'history',
    difficulty: 'hard',
  },

  // ========== GEOGRAPHY ==========
  {
    id: 'geo_1',
    statement: {
      en: 'Russia has more surface area than Pluto.',
      tr: 'Rusya\'nın yüzölçümü Plüton\'dan büyüktür.',
    },
    isTrue: true,
    explanation: {
      en: 'Russia covers about 17.1 million km², while Pluto\'s surface area is about 16.7 million km².',
      tr: 'Rusya\'nın yüzölçümü yaklaşık 17,1 milyon km² iken Plüton\'un yüzey alanı yaklaşık 16,7 milyon km²\'dir.',
    },
    category: 'geography',
    difficulty: 'hard',
  },
  {
    id: 'geo_2',
    statement: {
      en: 'Istanbul is the only city in the world that sits on two continents.',
      tr: 'İstanbul, dünyada iki kıtada yer alan tek şehirdir.',
    },
    isTrue: false,
    explanation: {
      en: 'While Istanbul is the most famous transcontinental city, there are others too, such as parts of Russia\'s cities that straddle Europe and Asia.',
      tr: 'İstanbul en ünlü kıtalararası şehir olsa da başka şehirler de var. Örneğin Rusya\'nın bazı şehirleri de Avrupa ve Asya arasında yer alır.',
    },
    category: 'geography',
    difficulty: 'medium',
  },
  {
    id: 'geo_3',
    statement: {
      en: 'There are more trees on Earth than stars in the Milky Way.',
      tr: 'Dünya\'daki ağaç sayısı Samanyolu\'ndaki yıldız sayısından fazladır.',
    },
    isTrue: true,
    explanation: {
      en: 'Earth has roughly 3 trillion trees, while the Milky Way has an estimated 100-400 billion stars.',
      tr: 'Dünya\'da yaklaşık 3 trilyon ağaç varken, Samanyolu\'nda tahminen 100-400 milyar yıldız vardır.',
    },
    category: 'geography',
    difficulty: 'hard',
  },
  {
    id: 'geo_4',
    statement: {
      en: 'Africa is bigger than China, the USA, India, and most of Europe combined.',
      tr: 'Afrika, Çin, ABD, Hindistan ve Avrupa\'nın büyük bölümünün toplamından büyüktür.',
    },
    isTrue: true,
    explanation: {
      en: 'Africa\'s total area is about 30.4 million km². China (9.6M) + USA (9.8M) + India (3.3M) + most of Europe still fit inside Africa.',
      tr: 'Afrika\'nın toplam alanı yaklaşık 30,4 milyon km²\'dir. Çin (9,6M) + ABD (9,8M) + Hindistan (3,3M) + Avrupa\'nın büyük kısmı hâlâ Afrika\'nın içine sığar.',
    },
    category: 'geography',
    difficulty: 'medium',
  },
  {
    id: 'geo_5',
    statement: {
      en: 'Mount Everest is the tallest mountain on Earth when measured from base to peak.',
      tr: 'Everest Dağı, tabandan zirveye ölçüldüğünde Dünya\'nın en yüksek dağıdır.',
    },
    isTrue: false,
    explanation: {
      en: 'Mauna Kea in Hawaii is about 10,203 meters from base to peak (most is underwater), while Everest is 8,849 meters above sea level. Everest is the highest above sea level, but not the tallest base-to-peak.',
      tr: 'Hawaii\'deki Mauna Kea tabandan zirveye yaklaşık 10.203 metredir (çoğu su altında). Everest deniz seviyesinden 8.849 metredir. Everest deniz seviyesinden en yüksek dağdır ama tabandan zirveye en uzun değildir.',
    },
    category: 'geography',
    difficulty: 'hard',
  },
  {
    id: 'geo_6',
    statement: {
      en: 'The Sahara Desert is the largest desert in the world.',
      tr: 'Sahra Çölü dünyanın en büyük çölüdür.',
    },
    isTrue: false,
    explanation: {
      en: 'Antarctica is technically the largest desert in the world (14 million km²). The Sahara is the largest hot desert at about 9 million km².',
      tr: 'Antarktika teknik olarak dünyanın en büyük çölüdür (14 milyon km²). Sahra yaklaşık 9 milyon km² ile en büyük sıcak çöldür.',
    },
    category: 'geography',
    difficulty: 'medium',
  },
  {
    id: 'geo_7',
    statement: {
      en: 'Canada has more lakes than the rest of the world combined.',
      tr: 'Kanada\'da dünyanın geri kalanından daha fazla göl vardır.',
    },
    isTrue: true,
    explanation: {
      en: 'Canada has over 880,000 lakes, covering about 9% of its total area. This is more than all other countries in the world combined.',
      tr: 'Kanada\'da toplam alanının yaklaşık %9\'unu kaplayan 880.000\'den fazla göl vardır. Bu, dünyadaki diğer tüm ülkelerin toplamından fazladır.',
    },
    category: 'geography',
    difficulty: 'medium',
  },
  {
    id: 'geo_8',
    statement: {
      en: 'Turkey has coastlines on four different seas.',
      tr: 'Türkiye\'nin dört farklı denize kıyısı vardır.',
    },
    isTrue: true,
    explanation: {
      en: 'Turkey has coastlines on the Black Sea, the Mediterranean Sea, the Aegean Sea, and the Sea of Marmara.',
      tr: 'Türkiye\'nin Karadeniz, Akdeniz, Ege Denizi ve Marmara Denizi olmak üzere dört denize kıyısı vardır.',
    },
    category: 'geography',
    difficulty: 'easy',
  },

  // ========== NATURE ==========
  {
    id: 'nat_1',
    statement: {
      en: 'Octopuses have three hearts and blue blood.',
      tr: 'Ahtapotların üç kalbi ve mavi kanı vardır.',
    },
    isTrue: true,
    explanation: {
      en: 'Octopuses have two branchial hearts that pump blood to the gills, and one systemic heart. Their blood is blue because it uses copper-based hemocyanin.',
      tr: 'Ahtapotların solungaçlara kan pompalayan iki solungaç kalbi ve bir sistemik kalbi vardır. Kanları bakır bazlı hemosyanin kullandığı için mavidir.',
    },
    category: 'nature',
    difficulty: 'easy',
  },
  {
    id: 'nat_2',
    statement: {
      en: 'A group of flamingos is called a "flamboyance."',
      tr: 'Bir flamingo grubuna İngilizce\'de "flamboyance" (gösteriş) denir.',
    },
    isTrue: true,
    explanation: {
      en: 'The collective noun for a group of flamingos is indeed a "flamboyance," fitting for such colorful birds.',
      tr: 'Flamingo grubu için kullanılan İngilizce topluluk ismi gerçekten "flamboyance"dir (gösteriş), bu kadar renkli kuşlar için çok uygun.',
    },
    category: 'nature',
    difficulty: 'medium',
  },
  {
    id: 'nat_3',
    statement: {
      en: 'Goldfish have a 3-second memory.',
      tr: 'Japon balıklarının hafızası 3 saniyedir.',
    },
    isTrue: false,
    explanation: {
      en: 'Goldfish can actually remember things for months. Studies have shown they can be trained to respond to certain stimuli and remember feeding schedules.',
      tr: 'Japon balıkları aslında aylarca hatırlayabilir. Araştırmalar belirli uyarılara tepki vermeleri için eğitilebildiklerini ve beslenme programlarını hatırladıklarını göstermiştir.',
    },
    category: 'nature',
    difficulty: 'easy',
  },
  {
    id: 'nat_4',
    statement: {
      en: 'Bananas are berries, but strawberries are not.',
      tr: 'Muzlar botanik olarak üzümsü meyvedir, ama çilekler değildir.',
    },
    isTrue: true,
    explanation: {
      en: 'Botanically, berries develop from a single flower\'s ovary. Bananas, grapes, and even avocados qualify. Strawberries are "accessory fruits."',
      tr: 'Botanik olarak üzümsü meyveler tek bir çiçeğin yumurtalığından gelişir. Muzlar, üzümler ve hatta avokadolar bu sınıfa girer. Çilekler ise "yalancı meyve"dir.',
    },
    category: 'nature',
    difficulty: 'medium',
  },
  {
    id: 'nat_5',
    statement: {
      en: 'Sharks are older than trees. They existed before trees evolved.',
      tr: 'Köpekbalıkları ağaçlardan daha eskidir. Ağaçlar evrimleşmeden önce var olmuşlardır.',
    },
    isTrue: true,
    explanation: {
      en: 'Sharks have been around for about 450 million years, while trees first appeared about 350 million years ago.',
      tr: 'Köpekbalıkları yaklaşık 450 milyon yıldır varken, ağaçlar ilk kez yaklaşık 350 milyon yıl önce ortaya çıktı.',
    },
    category: 'nature',
    difficulty: 'hard',
  },
  {
    id: 'nat_6',
    statement: {
      en: 'Cows have best friends and get stressed when separated.',
      tr: 'İneklerin en iyi arkadaşları vardır ve ayrıldıklarında strese girerler.',
    },
    isTrue: true,
    explanation: {
      en: 'Research has shown that cows form strong bonds with specific individuals and show signs of stress, such as increased heart rate, when separated from their preferred partners.',
      tr: 'Araştırmalar ineklerin belirli bireylerle güçlü bağlar kurduğunu ve tercih ettikleri arkadaşlarından ayrıldıklarında kalp atışı artışı gibi stres belirtileri gösterdiğini ortaya koymuştur.',
    },
    category: 'nature',
    difficulty: 'medium',
  },
  {
    id: 'nat_7',
    statement: {
      en: 'Chameleons change color to match their surroundings.',
      tr: 'Bukalemunlar çevrelerine uyum sağlamak için renk değiştirir.',
    },
    isTrue: false,
    explanation: {
      en: 'Chameleons primarily change color to regulate body temperature and communicate with other chameleons, not for camouflage.',
      tr: 'Bukalemunlar renk değiştirmeyi öncelikle vücut ısılarını düzenlemek ve diğer bukalemunlarla iletişim kurmak için yapar, kamuflaj için değil.',
    },
    category: 'nature',
    difficulty: 'easy',
  },
  {
    id: 'nat_8',
    statement: {
      en: 'A single strand of spider silk is stronger than a steel wire of the same thickness.',
      tr: 'Tek bir örümcek ağı ipliği, aynı kalınlıktaki çelik telden daha sağlamdır.',
    },
    isTrue: true,
    explanation: {
      en: 'Spider silk has a tensile strength comparable to high-grade steel and is much tougher when considering its weight.',
      tr: 'Örümcek ipeğinin çekme dayanımı yüksek kaliteli çelikle karşılaştırılabilir ve ağırlığı düşünüldüğünde çok daha dayanıklıdır.',
    },
    category: 'nature',
    difficulty: 'medium',
  },
  {
    id: 'nat_9',
    statement: {
      en: 'Sloths can hold their breath longer than dolphins.',
      tr: 'Tembel hayvanlar nefeslerini yunuslardan daha uzun süre tutabilir.',
    },
    isTrue: true,
    explanation: {
      en: 'Sloths can hold their breath for up to 40 minutes by slowing their heart rate, while dolphins typically hold theirs for 8-10 minutes.',
      tr: 'Tembel hayvanlar kalp atışlarını yavaşlatarak nefeslerini 40 dakikaya kadar tutabilirken, yunuslar genellikle 8-10 dakika tutabilir.',
    },
    category: 'nature',
    difficulty: 'hard',
  },

  // ========== HUMAN BODY ==========
  {
    id: 'hum_1',
    statement: {
      en: 'Your stomach gets a new lining every 3-4 days.',
      tr: 'Midenizin astarı her 3-4 günde bir yenilenir.',
    },
    isTrue: true,
    explanation: {
      en: 'The stomach produces a new mucous lining every 3-4 days to prevent it from digesting itself with its own acid.',
      tr: 'Mide, kendi asidiyle kendini sindirmesini önlemek için her 3-4 günde bir yeni mukoza tabakası üretir.',
    },
    category: 'human-body',
    difficulty: 'medium',
  },
  {
    id: 'hum_2',
    statement: {
      en: 'Humans glow in the dark, but the light is too weak for our eyes to see.',
      tr: 'İnsanlar karanlıkta ışık yayar, ama gözlerimizin göremeyeceği kadar zayıftır.',
    },
    isTrue: true,
    explanation: {
      en: 'The human body emits bioluminescence (visible light) that is 1,000 times weaker than what our eyes can detect, caused by chemical reactions in our cells.',
      tr: 'İnsan vücudu, hücrelerindeki kimyasal reaksiyonlar sonucu gözlerimizin algılayabileceğinden 1.000 kat daha zayıf biyolüminesans (görünür ışık) yayar.',
    },
    category: 'human-body',
    difficulty: 'hard',
  },
  {
    id: 'hum_3',
    statement: {
      en: 'Your tongue has specific zones for different tastes (sweet, salty, sour, bitter).',
      tr: 'Dilimizde farklı tatlar için belirli bölgeler vardır (tatlı, tuzlu, ekşi, acı).',
    },
    isTrue: false,
    explanation: {
      en: 'The "tongue map" is a myth. All taste buds can detect all basic tastes. The entire tongue can perceive sweet, salty, sour, bitter, and umami.',
      tr: '"Dil haritası" bir mittir. Tüm tat tomurcukları tüm temel tatları algılayabilir. Dilin tamamı tatlı, tuzlu, ekşi, acı ve umami tatlarını algılar.',
    },
    category: 'human-body',
    difficulty: 'easy',
  },
  {
    id: 'hum_4',
    statement: {
      en: 'The human nose can detect over 1 trillion different scents.',
      tr: 'İnsan burnu 1 trilyondan fazla farklı koku algılayabilir.',
    },
    isTrue: true,
    explanation: {
      en: 'A 2014 study published in Science found that the human nose can discriminate at least 1 trillion different odors, far more than previously thought.',
      tr: 'Science dergisinde 2014\'te yayımlanan bir çalışma, insan burnunun en az 1 trilyon farklı kokuyu ayırt edebildiğini bulmuştur.',
    },
    category: 'human-body',
    difficulty: 'medium',
  },
  {
    id: 'hum_5',
    statement: {
      en: 'Your bones are stronger than steel, pound for pound.',
      tr: 'Kemikleriniz, ağırlığına oranla çelikten daha güçlüdür.',
    },
    isTrue: true,
    explanation: {
      en: 'Bone is incredibly strong. A cubic inch of bone can bear a load of 19,000 pounds — roughly the weight of five pickup trucks.',
      tr: 'Kemik inanılmaz güçlüdür. Bir küp inç kemik yaklaşık 8.600 kilogramlık bir yüke dayanabilir — yaklaşık beş kamyonetin ağırlığı kadar.',
    },
    category: 'human-body',
    difficulty: 'medium',
  },
  {
    id: 'hum_6',
    statement: {
      en: 'Cracking your knuckles causes arthritis.',
      tr: 'Parmak çıtlatmak artrite neden olur.',
    },
    isTrue: false,
    explanation: {
      en: 'Multiple studies have found no connection between knuckle cracking and arthritis. The sound is caused by gas bubbles popping in the joint fluid.',
      tr: 'Birçok çalışma parmak çıtlatma ile artrit arasında bağlantı bulamamıştır. Ses, eklem sıvısındaki gaz kabarcıklarının patlamasından kaynaklanır.',
    },
    category: 'human-body',
    difficulty: 'easy',
  },
  {
    id: 'hum_7',
    statement: {
      en: 'Babies are born with about 300 bones, but adults have only 206.',
      tr: 'Bebekler yaklaşık 300 kemikle doğar, ama yetişkinlerin sadece 206 kemiği vardır.',
    },
    isTrue: true,
    explanation: {
      en: 'Babies are born with about 270-300 bones. As they grow, many bones fuse together, resulting in the 206 bones adults have.',
      tr: 'Bebekler yaklaşık 270-300 kemikle doğar. Büyüdükçe birçok kemik birleşir ve yetişkinlerdeki 206 kemik sayısına ulaşılır.',
    },
    category: 'human-body',
    difficulty: 'easy',
  },
  {
    id: 'hum_8',
    statement: {
      en: 'Your body produces enough saliva in a lifetime to fill two swimming pools.',
      tr: 'Vücudunuz bir ömür boyunca iki yüzme havuzunu dolduracak kadar tükürük üretir.',
    },
    isTrue: true,
    explanation: {
      en: 'The average person produces about 25,000 quarts (roughly 23,600 liters) of saliva in a lifetime, enough to fill two swimming pools.',
      tr: 'Ortalama bir insan ömrü boyunca yaklaşık 23.600 litre tükürük üretir, bu iki yüzme havuzunu doldurmaya yeter.',
    },
    category: 'human-body',
    difficulty: 'hard',
  },
  {
    id: 'hum_9',
    statement: {
      en: 'Humans can survive without sleeping for months as long as they rest.',
      tr: 'İnsanlar dinlendikleri sürece aylarca uyumadan hayatta kalabilir.',
    },
    isTrue: false,
    explanation: {
      en: 'Sleep deprivation is extremely dangerous. After about 11 days without sleep, the body begins to shut down. Chronic sleep deprivation can be fatal.',
      tr: 'Uyku yoksunluğu son derece tehlikelidir. Yaklaşık 11 gün uyumadan sonra vücut çökmeye başlar. Kronik uyku yoksunluğu ölümcül olabilir.',
    },
    category: 'human-body',
    difficulty: 'easy',
  },

  // ========== POP CULTURE ==========
  {
    id: 'pop_1',
    statement: {
      en: 'The creator of the Pringles can is buried in one.',
      tr: 'Pringles kutusunun mucidi bir Pringles kutusuna gömüldü.',
    },
    isTrue: true,
    explanation: {
      en: 'Fredric Baur, who designed the Pringles can, requested that his ashes be buried in one. His family honored his wish in 2008.',
      tr: 'Pringles kutusunu tasarlayan Fredric Baur, küllerinin bir Pringles kutusuna konmasını istedi. Ailesi 2008\'de bu isteğini yerine getirdi.',
    },
    category: 'pop-culture',
    difficulty: 'hard',
  },
  {
    id: 'pop_2',
    statement: {
      en: 'Nintendo was founded before the Eiffel Tower was built.',
      tr: 'Nintendo, Eyfel Kulesi inşa edilmeden önce kuruldu.',
    },
    isTrue: true,
    explanation: {
      en: 'Nintendo was founded in 1889 as a playing card company. The Eiffel Tower was completed in the same year, 1889, but Nintendo was registered earlier.',
      tr: 'Nintendo 1889\'da bir oyun kağıdı şirketi olarak kuruldu. Eyfel Kulesi de aynı yıl 1889\'da tamamlandı, ancak Nintendo daha önce tescil edildi.',
    },
    category: 'pop-culture',
    difficulty: 'hard',
  },
  {
    id: 'pop_3',
    statement: {
      en: 'The "Mona Lisa" has no eyebrows because it was the fashion of the time.',
      tr: '"Mona Lisa"nın kaşları yoktur çünkü o dönemin modasıydı.',
    },
    isTrue: false,
    explanation: {
      en: 'High-resolution scans have revealed that da Vinci originally painted eyebrows and eyelashes, but they faded over time due to restoration and cleaning.',
      tr: 'Yüksek çözünürlüklü taramalar, da Vinci\'nin aslında kaşları ve kirpikleri çizdiğini ortaya koymuştur, ancak restorasyon ve temizleme nedeniyle zamanla solmuşlardır.',
    },
    category: 'pop-culture',
    difficulty: 'medium',
  },
  {
    id: 'pop_4',
    statement: {
      en: 'The world\'s most expensive coffee is made from beans eaten and excreted by a cat-like animal.',
      tr: 'Dünyanın en pahalı kahvesi, kedi benzeri bir hayvan tarafından yenip dışkılanan çekirdeklerden yapılır.',
    },
    isTrue: true,
    explanation: {
      en: 'Kopi Luwak is made from coffee beans eaten and excreted by the Asian palm civet. It can cost over $600 per pound.',
      tr: 'Kopi Luwak, Asya hurma misk kedisi tarafından yenip dışkılanan kahve çekirdeklerinden yapılır. Kilosu 1.300 doların üzerinde olabilir.',
    },
    category: 'pop-culture',
    difficulty: 'medium',
  },
  {
    id: 'pop_5',
    statement: {
      en: 'Coca-Cola was originally green.',
      tr: 'Coca-Cola başlangıçta yeşil renkti.',
    },
    isTrue: false,
    explanation: {
      en: 'Coca-Cola has always been the same caramel brown color. The green myth likely comes from the early bottles, which were made of green-tinted glass.',
      tr: 'Coca-Cola her zaman aynı karamel kahverengi renkte olmuştur. Yeşil miti muhtemelen yeşil renkli camdan yapılan ilk şişelerden kaynaklanmaktadır.',
    },
    category: 'pop-culture',
    difficulty: 'easy',
  },
  {
    id: 'pop_6',
    statement: {
      en: 'There are more possible chess games than atoms in the observable universe.',
      tr: 'Olası satranç oyunu sayısı, gözlemlenebilir evrendeki atom sayısından fazladır.',
    },
    isTrue: true,
    explanation: {
      en: 'The Shannon number estimates ~10^120 possible chess games, while the observable universe has about 10^80 atoms.',
      tr: 'Shannon sayısı yaklaşık 10^120 olası satranç oyunu tahmin ederken, gözlemlenebilir evrende yaklaşık 10^80 atom vardır.',
    },
    category: 'pop-culture',
    difficulty: 'hard',
  },
  {
    id: 'pop_7',
    statement: {
      en: 'The hashtag symbol (#) is officially called an "octothorpe."',
      tr: 'Hashtag simgesinin (#) resmi adı "octothorpe"dir.',
    },
    isTrue: true,
    explanation: {
      en: 'The # symbol was officially named "octothorpe" by Bell Labs engineers in the 1960s. "Octo" refers to its eight points.',
      tr: '# sembolü, 1960\'larda Bell Labs mühendisleri tarafından resmi olarak "octothorpe" adlandırıldı. "Octo" sekiz noktasına atıfta bulunur.',
    },
    category: 'pop-culture',
    difficulty: 'hard',
  },
  {
    id: 'pop_8',
    statement: {
      en: 'The unicorn is the national animal of Scotland.',
      tr: 'Unicorn (tek boynuzlu at) İskoçya\'nın ulusal hayvanıdır.',
    },
    isTrue: true,
    explanation: {
      en: 'Scotland\'s national animal has been the unicorn since the 12th century. It was chosen as a symbol of purity, innocence, power, and independence.',
      tr: 'İskoçya\'nın ulusal hayvanı 12. yüzyıldan beri unicorn\'dur. Saflık, masumiyet, güç ve bağımsızlık sembolü olarak seçilmiştir.',
    },
    category: 'pop-culture',
    difficulty: 'medium',
  },
  {
    id: 'pop_9',
    statement: {
      en: 'Walt Disney was cryogenically frozen after his death.',
      tr: 'Walt Disney ölümünden sonra kriyojenik olarak donduruldu.',
    },
    isTrue: false,
    explanation: {
      en: 'This is an urban legend. Walt Disney was cremated on December 17, 1966, two days after his death. His ashes were interred at Forest Lawn Memorial Park.',
      tr: 'Bu bir şehir efsanesidir. Walt Disney, ölümünden iki gün sonra 17 Aralık 1966\'da kremasyona tabi tutuldu. Külleri Forest Lawn Anıt Parkı\'na defnedildi.',
    },
    category: 'pop-culture',
    difficulty: 'medium',
  },
];
