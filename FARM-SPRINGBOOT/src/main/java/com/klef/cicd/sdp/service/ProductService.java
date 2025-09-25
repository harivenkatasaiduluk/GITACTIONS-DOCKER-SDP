package com.klef.cicd.sdp.service;

import java.util.List;
import com.klef.cicd.sdp.model.Product;

public interface ProductService {
    String addProduct(Product product);
    List<Product> viewAllProducts();
    Product viewProductById(int pid);
    List<Product> viewProductsByCategory(String category);
    long getProductCount();
	Product getProductById(int pid);
}
