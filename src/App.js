
import { v4 } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/editModal";


function App() {
  // kitap state'leri
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [inputError, setInputError] = useState(false);
  // modal state'leri
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // inputtaki değişimi izleme
  const handleChange = (e) => {
    // kitap ismi state'ini güncelle
    setBookName(e.target.value);
  };

  // formun gönderilme olayını izleme
  const handleSubmit = (e) => {
    e.preventDefault();

  

    // kitabı saklamak için gerekli verilere sahip obje oluşturma
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleDateString(),
      isRead: false,
    };

    // oluşturulan kitap objesini kitaplar dizisine eklemek için spread operatörünü kullanarak önceden eklenen elemanları koru
    setBooks([...books, newBook]);

    // eleman eklenince inputu sıfırla
    setBookName("");
  };

  // silinince modal açma işlemini yapar
  const handleModal = (id) => {
    // id'yi state'e aktar
    setDeleteId(id);
    // modalı aç
    setShowDeleteModal(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // silinecek id'ye eşit olmayanları al ve bir diziye aktar
    const filtered = books.filter((book) => book.id !== deleteId);
    // state'i güncelleme
    setBooks(filtered);

    // modalı kapat
    setShowDeleteModal(false);
  };

  // okundu butonuna tıklanınca çalışır
  const handleRead = (book) => {
  //  okundu değerini tersine çevirme
  const updateBook = {...book, isRead: !book.isRead};
 
    // dizideki güncellenecek elemanın dizideki sırasını bulma
    const index = books.findIndex(
      (item) => item.id === book.id);

      // book dizisinin kopyasını oluştur
      const cloneBooks = [...books];

      // dizinin kopyasında gerekli elemanı güncelle
      cloneBooks[index] = updateBook;
      
      // state'i güncelle
      setBooks(cloneBooks);
  };

// düzenle modalı işlemleri
const handleEditModal = (book) => {
  // düzenlenecek modalı state aktar
  setEditItem(book);

  // modalı aç
  setShowEditModal(true);
};

// kitabı güncelleme
const handleEditBook = () => {
  // sırasını bulma
  const index = books.findIndex((book) => book.id === editItem.id);

  // statein kopyasınıo oluştur
  const cloneBooks = [...books];

  // eski kitabı diziden çıkart yerine yenisini koy,
  cloneBooks.splice(index,1,editItem);

  // statei güncelle
  setBooks(cloneBooks);

  // modalı kapat
  setShowEditModal(false);
};
// kaydet kısmında hatan var ona bak  02.29

  return (
    <div>
      <header className="bg-dark text-light py-3 fs-5 text-center">
        <h1>Kitap Kurdu</h1>
      </header>

      {/* form alanı */}
      <div className="container">
        {/* hata bildirimini ekrana basma */}
        {inputError && (
          <div className="alert alert-danger mt-5">{inputError}</div>
        )}

        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            placeholder="Bir Kitap İsmi Giriniz"
            onChange={handleChange}
            value={bookName}
            className="form-control shadow"
            type="search"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {/* eğer state içerisi boş ise ekrana bunu yaz */}
        {books.length === 0 && <h4>Henüz herhangi bir kitap eklenmedi</h4>}

        {/* eğer state içerisinde en az 1 eleman varsa ekrana bunu yaz */}
        {books.map((book) => (
          <BookCard key={book.id} book={book} handleModal={handleModal} handleRead={handleRead} handleEditModal={handleEditModal} />
        ))}
      </div>

      {/* modallar */}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          handleModal={handleModal}
          setShowDeleteModal={setShowDeleteModal}
          handleEditBook={handleEditBook}
        />
      )}

      
        {showEditModal && ( <EditModal editItem = {editItem} setEditItem = {setEditItem} setShowEditModal={setShowEditModal}/>
      )}
    </div>
  );
}

export default App;

