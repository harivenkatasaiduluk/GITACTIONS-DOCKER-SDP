package com.klef.cicd.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.cicd.sdp.model.Admin;
import com.klef.cicd.sdp.model.Buyer;
import com.klef.cicd.sdp.model.Farmer;
import com.klef.cicd.sdp.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController 
{
    @Autowired
    private AdminService adminService;

    @PostMapping("/checkadminlogin")
    public ResponseEntity<?> checkadminlogin(@RequestBody Admin admin)
    {
        try 
        {
            Admin a = adminService.checkadminlogin(admin.getUsername(), admin.getPassword());
            if (a != null) 
            {
                return ResponseEntity.ok(a);
            } 
            else 
            {
                return ResponseEntity.status(401).body("Invalid Username or Password");
            }
        } 
        catch (Exception e) 
        {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/viewallbuyers")
    public ResponseEntity<List<Buyer>> viewallbuyers()
    {
        List<Buyer> buyers = adminService.displayBuyers();
        return ResponseEntity.ok(buyers);
    }

    @PostMapping("/addfarmer")
    public ResponseEntity<String> addfarmer(@RequestBody Farmer farmer)
    {
        try
        {
            String output = adminService.addFarmer(farmer);
            return ResponseEntity.ok(output);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Add Farmer ... !!");
        }
    }

    @GetMapping("/viewallfarmers")
    public ResponseEntity<List<Farmer>> viewallfarmers()
    {
        List<Farmer> farmers = adminService.displayFarmers();
        return ResponseEntity.ok(farmers);
    }

    @DeleteMapping("/deletebuyer")
    public ResponseEntity<String> deletebuyer(@RequestParam int bid)
    {
        try
        {
            String output = adminService.deleteBuyer(bid);
            return ResponseEntity.ok(output);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Delete Buyer ... !!");
        }
    }

    @DeleteMapping("/deletefarmer")
    public ResponseEntity<String> deletefarmer(@RequestParam int fid)
    {
        try
        {
            String output = adminService.deleteFarmer(fid);
            return ResponseEntity.ok(output);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Delete Farmer ... !!");
        }
    }
    
    @DeleteMapping("/deleteproduct")
    public ResponseEntity<String> deleteproduct(@RequestParam int pid)
    {
        try
        {
            String output = adminService.deleteProduct(pid);
            return ResponseEntity.ok(output);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body("Failed to Delete Product ... !!");
        }
    }

    @GetMapping("/buyercount")
    public ResponseEntity<Long> getBuyerCount()
    {
        long count = adminService.displayBuyerCount();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/farmercount")
    public ResponseEntity<Long> getFarmerCount()
    {
        long count = adminService.displayFarmerCount();
        return ResponseEntity.ok(count);
    }
}
