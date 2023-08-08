# Crud App

create read update delete
oluştur oku düzenle sil


-Form içerisinden geleni al ve state'e aktar
--Ekle butonuna tıklanılınca formdan gelen kitap ismiyle beraber yeni bir obje oluştur
--Değerler: Eklenme tarihi - kitap ismi - id - okundu/okunmadı bilgisi
--Oluşan objeyi kitaplar isminde bir diziyi tutan state'e aktar
--Son aşamada inptu temizle

<!--  -->

- Books stateinde tutulan kitapları al ve mao methodu ile listelerle ekrana bas
-- Eğer state boşsa ekrana henüz kitap eklenmedi yaz
--BookCard bileşenine kitap bilgilerini prop olarak gönder
--BookCard bileşeninin kitapla ilgili bütün özelliklerini göster


<!--  -->

-Kitap silme
--Herhangi bir hitabun sil butonuna basıldığında elemaı silecek fonks. çalıştır ve id'sini gönder
--Bir onay penceresi aç vazgeçe tu-ıklanırsa kapat
--Onaylanırsa silinecek id'ye eşit olmayanlarla yeni bir dizi oluştur
--Oluşan yeni diziyi state'e aktar

<!--  -->


-okundu olarak işaretle
--okundu butonuna basılınca çalışan fonk. kştap id'sini gönder
--kitap isRead değerini tersine çevir
--dizi içerisinde değişecek elemanı bul
--değişecek elemanı çıkar yerine güncel halini ekle
--state'i güncelle

<!--  -->

-düzenle işlemini yapma
--düzenle butonuna tıklandığında bir fonk. çalışsın
--düzenlenecek kitabı state'e aktar ve modal'ı aç
--modalda kitap ismini değiştirmek için bir input olsun(value'su kitabın ismi olmalı)
--- vazgeç butonu: modalı kapatır
--- kaydet butonu: 'handleEditBook' fonk. çalıştırsın
--çalışan fonk. kitaplar dizisini güncellesin (eski elemanı çıkarıp güncel halini koymalı)
--güncellerken isim ve date bilgilerini değişir# crud_app
# crud_App
