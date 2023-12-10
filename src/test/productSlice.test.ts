import axios from "axios";
import {
  ProductsState,
  deleteProductAsync,
  postNewProductAsync,
  updateProductAsync,
} from "../features/product/productSlice";
import reducer from "../features/product/productSlice";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../types/productTypes";
import { store } from "../app/store";

const getCategories = async () => {
  const { data } = await axios.get<{ catId: string }[]>(
    "https://api.escuelajs.co/api/v1/categories"
  );

  if (data.length === 0) {
    throw new Error("Got 0 categories.");
  }

  return data;
};

const getProducts = async () => {
  const { data } = await axios.get<{ _id: string }[]>(
    "https://api.escuelajs.co/api/v1/products"
  );

  if (data.length === 0) {
    throw new Error("Got 0 products.");
  }

  return data;
};

test("postNewProductAsync test", async () => {
  const catId = await getCategories();
  const initialState: ProductsState = {
    products: {},
    searchResults: [],
    newProduct: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: "",
    },
    updProduct: {
      _id: "0",
      name: "",
      price: 0,
    },
    delProduct: false,
  };

  const temp: CreateProductRequest = {
    name: "Clothes Title",
    price: 10,
    description: "CLothes desc",
    categoryId: catId[0].catId,
    image: "https://i.imgur.com/s8WRA2O.jpeg",
  };

  const expectedState: ProductsState = {
    ...initialState,
    newProduct: temp,
  };

  expect(
    reducer(initialState, await store.dispatch(postNewProductAsync(temp)))
  ).toEqual(expectedState);
});

test("updateProductAsync test", async () => {
  const prodId = await getProducts();
  const initialState: ProductsState = {
    products: {},
    searchResults: [],
    newProduct: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: "",
    },
    updProduct: {
      _id: "0",
      name: "",
      price: 0,
    },
    delProduct: false,
  };

  const temp: UpdateProductRequest = {
    _id: prodId[0]._id,
    name: "Table",
    price: 1000,
  };

  const expectedState: ProductsState = {
    ...initialState,
    updProduct: temp,
  };

  expect(
    reducer(initialState, await store.dispatch(updateProductAsync(temp)))
  ).toMatchObject(expectedState);
});

test("deleteProductAsync test", async () => {
  const prods = await getProducts();
  const initialState: ProductsState = {
    products: {},
    searchResults: [],
    newProduct: {
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      image: "",
    },
    updProduct: {
      _id: "0",
      name: "",
      price: 0,
    },
    delProduct: false,
  };

  const temp: string = prods[0]._id;

  const expectedState: ProductsState = {
    ...initialState,
    delProduct: false,
  };

  expect(
    reducer(initialState, await store.dispatch(deleteProductAsync(temp)))
  ).toEqual(expectedState);
});
