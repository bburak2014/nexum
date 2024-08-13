# Gulp ile Web Geliştirme Otomasyonu

Bu `gulpfile.js` dosyası, web geliştirme sürecinizi kolaylaştırmak için bir dizi görevi otomatikleştirir. Gulp, JavaScript tabanlı bir görev çalıştırıcısıdır ve bu dosya, Gulp'un hangi görevleri nasıl gerçekleştireceğini tanımlar.

## Görevler (Tasks)

* **`styles`**:
    * LESS (Leaner Style Sheets) dosyalarınızı CSS'e dönüştürür. LESS, CSS'e dinamik özellikler eklemenizi sağlayan bir ön işlemcidir.
    * Dönüştürülen CSS dosyalarını `cleanCSS` ile sıkıştırır. Bu, dosya boyutunu küçültür ve web sitenizin daha hızlı yüklenmesine yardımcı olur.
    * Sıkıştırılmış CSS dosyalarını `./src/dist/css` dizinine kaydeder.
    * `connect.reload()` ile tarayıcınızı yeniler, böylece değişiklikleri anında görebilirsiniz.

* **`scripts`**:
    * `./src/js` dizinindeki tüm JavaScript dosyalarını tek bir `app.js` dosyasında birleştirir (`concat`). Bu, tarayıcının daha az dosya indirmesini sağlar ve performansı artırır.
    * Birleştirilmiş JavaScript dosyasını `uglify` ile sıkıştırır. Bu da dosya boyutunu küçültür ve yükleme süresini kısaltır.
    * Sıkıştırılmış `app.js` dosyasını `./src/dist/js` dizinine kaydeder.
    * `connect.reload()` ile tarayıcınızı yeniler.

* **`html`**:
    * HTML dosyalarınızdaki değişiklikleri izler.
    * Bir değişiklik olduğunda `connect.reload()` ile tarayıcınızı yeniler.

* **`watch`**:
    * LESS, JavaScript ve HTML dosyalarınızdaki değişiklikleri sürekli olarak izler.
    * Bir değişiklik algıladığında, ilgili görevi (`styles`, `scripts` veya `html`) otomatik olarak çalıştırır. Bu sayede değişiklikleriniz anında tarayıcınıza yansır.

* **`connect`**:
    * `src` dizinini kök olarak kullanarak bir yerel geliştirme sunucusu başlatır.
    * `livereload` özelliği sayesinde, dosyalardaki değişiklikler tarayıcınızı otomatik olarak yeniler.

* **`default`**:
    * Varsayılan görevdir. `gulp` komutu çalıştırıldığında bu görev yürütülür.
    * `styles`, `scripts`, `connect` ve `watch` görevlerini paralel olarak çalıştırır.

## Modüller

* **`SharedModule`**:
    * OMDB API'sinden (The Open Movie Database) film verilerini almak için bir `fetchMovies` fonksiyonu sağlar.

* **`FavoritesModule`**:
    * Favori filmlerin görüntülenmesi ve yönetilmesiyle ilgilenir.

* **`MoviesModule`**:
    * Film arama, görüntüleme ve favorilere ekleme veya daha sonra izlenecekler listesine ekleme gibi etkileşimleri yönetir.

* **`CalendarModule`**:
    * Filmleri daha sonra izlemek üzere planlamak için bir takvim açılır penceresi sağlar.

* **`ListModule`**:
    * Film listelerinin oluşturulmasını işler.

* **`CookieConsentModule`**:
    * Çerez onayı açılır penceresini yönetir.

## Başlatma (Initialization)

* Belge hazır olduğunda (DOM yüklendiğinde):
    * `MoviesModule`, `CalendarModule`, `ListModule` ve `CookieConsentModule` başlatılır.
    * `FavoritesModule.renderFavorites()` fonksiyonu çağrılarak mevcut favori filmler görüntülenir.

**Önemli Not:** Bu `md` dosyası, `gulpfile.js` kodunun yüksek seviyeli bir açıklamasını sağlar. Gulp'un bu görevleri yerine getirebilmesi için projenizde gerçek `gulpfile.js` dosyasının bulunması gerekmektedir.

# Gulp Task Runner for Web Development

... (önceki açıklamalar) ...

## Özelleştirme

* **Kendi API Anahtarlarınızı Ekleme:**
    * `apiKey` değişkenini kendi OMDb API anahtarınızla değiştirin. Bu, uygulamanızın OMDb'den film verilerini alabilmesini sağlar.
    * Başka API'lerle çalışıyorsanız, `SharedModule`'e yeni fonksiyonlar ekleyerek bu API'lerle etkileşimi sağlayabilirsiniz.

## Gulp Komutuyla Çalıştırma

* **Gulp'u Yükleme:**
    * Projenizin kök dizininde bir terminal açın.
    * `npm install gulp --save-dev` komutunu çalıştırarak Gulp'u proje bağımlılıklarınıza ekleyin.

* **Görevleri Çalıştırma:**
    * Aynı terminalde `gulp` komutunu çalıştırın. Bu, `default` görevi başlatır ve LESS derleme, JavaScript birleştirme, sunucu başlatma ve dosya izleme gibi işlemleri gerçekleştirir.
    * Belirli bir görevi çalıştırmak için `gulp <görev_adı>` şeklinde komut kullanabilirsiniz. Örneğin, sadece CSS dosyalarını derlemek için `gulp styles` komutunu kullanabilirsiniz.

**Örnek:**

```bash
npm install gulp --save-dev
gulp 
