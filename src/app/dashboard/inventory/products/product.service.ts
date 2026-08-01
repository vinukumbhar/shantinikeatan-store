import axios from "axios";
import { ProductFormValues } from "./product.schema";

const API_URL = "http://localhost:8000/products";

export const ProductService = {
  async getAll() {
    const { data } = await axios.get(API_URL);
    return data;
  },

  async getById(id: string) {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  },

  async create(payload: ProductFormValues) {
    const { data } = await axios.post(API_URL, payload);
    return data;
  },

  async update(id: string, payload: ProductFormValues) {
    const { data } = await axios.patch(`${API_URL}/${id}`, payload);
    return data;
  },

  async delete(id: string) {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  },
};