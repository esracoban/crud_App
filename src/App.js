import { v4 } from 'uuid';
import { useState } from 'react';
import BookCard from './components/BookCard';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { toast } from 'react-toastify';

function App() {
  // kitap state'leri
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('');
  const [inputError, setInputError] = useState(false);
  // modal state'leri
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // inputtaki değimi izler
  const handleChange = (e) => {
    // kitap ismi state'ini güncelle
    setBookName(e.target.value);
  };

  // formun gönderilme olayını izler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn('Lütfen Kitap İsmi Giriniz', { autoClose: 2000 });
      return;
    }

    // kitabı  için gerekleri verileri sahip obje oluşturma
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    // oluşturulan kitap objesinin kitaplar dizisine aktar
    // spread operator kullanrak öncdene eklenen elemanları muhafaza et
    setBooks([...books, newBook]);

    // eleman eklenince inputu sıfırla
    setBookName('');

    // bildirim ver
    toast.success('Kitap Başarıyla Eklendi', {
      autoClose: 2000,
    });
  };

  // silinmede modal açma işlemini yapar
  const handleModal = (id) => {
    //  id'yi state'e aktar
    setDeleteId(id);
    // modalı ekrana bas
    setShowDeleteModal(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // silincek id'ye eşit olmayanları al ve bir diziye aktar
    const filred = books.filter((book) => book.id !== deleteId);

    // state'i güncelleme
    setBooks(filred);

    // modal'ı kapat
    setShowDeleteModal(false);

    // bildirim ver
    toast.error('Kitap Başarıyla Silindi', {
      autoClose: 2000,
    });
  };

  // Okundu butonuna tıklanılınca çalışır
  const handleRead = (book) => {
    // objenin okundu değerini terine çevir
    const updatedBook = { ...book, isRead: !book.isRead };

    // güncellenicek elmanın dizideki sırasını bulma
    const index = books.findIndex((item) => item.id === book.id);

    // books dizinin kopyasını oluştur
    const cloneBooks = [...books];

    // dizinin kopyasında gerekli elemanı güncelle
    cloneBooks[index] = updatedBook;

    // state'i güncelle
    setBooks(cloneBooks);
  };

  // edit modal'ı işlemleri
  const handleEditModal = (book) => {
    // düznleecek elemanı state aktar
    setEditItem(book);

    // modal'ı aç
    setShowEditModal(true);
  };

  // kitabı günceller
  const handleEditBook = () => {
    // sırasını bulma
    const index = books.findIndex((book) => book.id === editItem.id);

    // state'in kopyasını oluştur
    const cloneBooks = [...books];

    // eski kitabı diziden çıkart yerine yenisini koy
    cloneBooks.splice(index, 1, editItem);

    // state'i güncelle
    setBooks(cloneBooks);

    // modal'ı kapat
    setShowEditModal(false);

    // bildirim ver
    toast.info('Kitap Güncellendi', {
      autoClose: 2000,
    });
  };

  return (
    <div>
      <header className="bg-dark text-light py-3 fs-5  text-center">
        <h1>Kitap Kurdu</h1>
      </header>
      {/* form */}
      <div className="container">
        {/* hata bildirimini ekrana basma */}
        {inputError && (
          <div className="alert alert-danger mt-5">{inputError}</div>
        )}

        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            placeholder="Bir kitap ismi giriniz..."
            onChange={handleChange}
            value={bookName}
            className="form-control shadow"
            type="search"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {/* eğer state içerisi boş ise ekran bunu yaz */}
        {books.length === 0 && (
          <h4>Henüz herhangi bir kitap eklenmedi</h4>
        )}

        {/* eğer state içerisinde en az bir eleman varsa ekrana yaz */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </div>

      {/* Modallar */}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && (
        <EditModal
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;