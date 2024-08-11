import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState(1);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productPrice, setProductPrice] = useState(0);

  const handleAddProduct = async () => {
    try {
      let imageURL = "";
      if (productImage) {
        const storageRef = ref(storage, `images/${productImage.name}`);
        const snapshot = await uploadBytes(storageRef, productImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "products"), {
        name: productName,
        stock: productStock,
        sold: 0,
        imageURL: imageURL,
        price: productPrice,
      });

      setProductName("");
      setProductStock(1);
      setProductImage(null);
      setProductPrice(0);
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Hubo un error al agregar el producto");
    }
  };

  return (
    <div>
      <h2>Add product</h2>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad en Stock"
        value={productStock}
        onChange={(e) => setProductStock(parseInt(e.target.value))}
      />
      <input
        type="file"
        onChange={(e) =>
          setProductImage(e.target.files ? e.target.files[0] : null)
        }
      />
      <input
        type="number"
        placeholder="Precio"
        value={productPrice}
        onChange={(e) => setProductPrice(parseFloat(e.target.value))}
      />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
};
