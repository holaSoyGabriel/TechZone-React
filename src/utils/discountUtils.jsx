import { getDocs, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const productsCollection = collection(db, "products");

export const assignRandomDiscounts = async () => {
  const snapshot = await getDocs(productsCollection);
  const products = snapshot.docs;

  const discountOptions = [0, 5, 10, 20, 25, 50];

  for (let product of products) {
    const randomDiscount = discountOptions[Math.floor(Math.random() * discountOptions.length)];

    await updateDoc(doc(productsCollection, product.id), {
      discount: randomDiscount
    });
  }
};
