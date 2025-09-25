package com.klef.cicd.sdp.service;

import com.klef.cicd.sdp.model.Farmer;

public interface FarmerService {
    public Farmer getFarmerProfile(Integer farmerId); // Method to get farmer's profile
    public Farmer checkFarmerLogin(String username, String password);
	public Farmer getFarmerById(int fid);
	public long displayproductcount();
//	public long displayProductCountByEmail(String email);
	 
}
