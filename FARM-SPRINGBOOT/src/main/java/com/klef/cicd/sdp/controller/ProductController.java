package com.klef.cicd.sdp.controller;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.klef.cicd.sdp.dto.ProductDTO;
import com.klef.cicd.sdp.model.Product;
import com.klef.cicd.sdp.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add Product with Image
    @PostMapping("/addproduct")
    public ResponseEntity<String> addProduct(
            @RequestParam String category,
            @RequestParam String name,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam double cost,
            @RequestParam int quantity,
            @RequestParam("productimage") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("Product image is required");
            }

            // Validate file type (e.g., image)
            String contentType = file.getContentType();
            if (!contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Invalid image file type");
            }

            byte[] bytes = file.getBytes();
            Blob imageBlob = new SerialBlob(bytes);

            Product product = new Product();
            product.setCategory(category);
            product.setName(name);
            product.setTitle(title);
            product.setDescription(description);
            product.setCost(cost);
            product.setQuantity(quantity);
            product.setImage(imageBlob);

            String result = productService.addProduct(product);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // View All Products
    @GetMapping("/viewallproducts")
    public ResponseEntity<List<ProductDTO>> viewAllProducts() {
        List<Product> products = productService.viewAllProducts();
        List<ProductDTO> productDTOs = new ArrayList<>();

        for (Product p : products) {
            ProductDTO dto = new ProductDTO();
            dto.setId(p.getId());
            dto.setCategory(p.getCategory());
            dto.setName(p.getName());
            dto.setTitle(p.getTitle());
            dto.setDescription(p.getDescription());
            dto.setCost(p.getCost());
            dto.setQuantity(p.getQuantity());

            if (p.getFarmer() != null) {
                dto.setFarmerId(p.getFarmer().getId());
                dto.setFarmerUsername(p.getFarmer().getUsername());
                dto.setFarmerGmail(p.getFarmer().getEmail());
            } else {
                dto.setFarmerUsername("Not Assigned");
                dto.setFarmerGmail("Not Assigned");
            }

            productDTOs.add(dto);
        }

        return ResponseEntity.ok(productDTOs);
    }

    // Get Product Image by ID
    @GetMapping("/displayproductimage")
    public ResponseEntity<byte[]> displayProductImage(@RequestParam int id) {
        try {
            Product product = productService.viewProductById(id);
            byte[] imageBytes = product.getImage().getBytes(1, (int) product.getImage().length());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Get Single Product by ID
    @GetMapping("/displayproductbyid")
    public ResponseEntity<ProductDTO> displayProductById(@RequestParam int pid) {
        Product p = productService.viewProductById(pid);
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setCategory(p.getCategory());
        dto.setName(p.getName());
        dto.setTitle(p.getTitle());
        dto.setDescription(p.getDescription());
        dto.setCost(p.getCost());
        dto.setQuantity(p.getQuantity());

        return ResponseEntity.ok(dto);
    }

    // Get Total Product Count
    @GetMapping("/count")
    public ResponseEntity<Long> getProductCount() {
        long count = productService.getProductCount();
        return ResponseEntity.ok(count);
    }
}
