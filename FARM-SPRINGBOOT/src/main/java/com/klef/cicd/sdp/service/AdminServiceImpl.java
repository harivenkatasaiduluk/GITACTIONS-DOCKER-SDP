package com.klef.cicd.sdp.service;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.sdp.model.Admin;
import com.klef.cicd.sdp.model.Buyer;
import com.klef.cicd.sdp.model.Farmer;
import com.klef.cicd.sdp.model.Product;
import com.klef.cicd.sdp.repository.AdminRepository;
import com.klef.cicd.sdp.repository.BuyerRepository;
import com.klef.cicd.sdp.repository.FarmerRepository;
import com.klef.cicd.sdp.repository.ProductRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Admin checkadminlogin(String username, String password) {
        return adminRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public String addFarmer(Farmer farmer) {
        farmerRepository.save(farmer);
        return "Farmer Added Successfully";
    }

    @Override
    public List<Farmer> displayFarmers() {
        return farmerRepository.findAll();
    }

    @Override
    public List<Buyer> displayBuyers() {
        return buyerRepository.findAll();
    }

    @Override
    public String deleteBuyer(int bid) {
        Optional<Buyer> buyer = buyerRepository.findById(bid);
        if (buyer.isPresent()) {
            buyerRepository.deleteById(bid);
            return "Buyer Deleted Successfully";
        } else {
            return "Buyer ID Not Found";
        }
    }

    @Override
    public long displayBuyerCount() {
        return buyerRepository.count();
    }

    @Override
    public long displayFarmerCount() {
        return farmerRepository.count();
    }

    @Override
    public long displayProductCount() {
        return productRepository.count();
    }

    @Override
    public String deleteFarmer(int fid) {
        Optional<Farmer> farmer = farmerRepository.findById(fid);
        if (farmer.isPresent()) {
            farmerRepository.deleteById(fid);
            return "Farmer Deleted Successfully";
        } else {
            return "Farmer ID Not Found";
        }
    }

    @Override
    public String deleteProduct(int pid) {
        Optional<Product> product = productRepository.findById(pid);
        if (product.isPresent()) {
            productRepository.deleteById(pid);
            return "Product Deleted Successfully";
        } else {
            return "Product ID Not Found";
        }
    }
}
