package com.klef.cicd.sdp.service;


import com.klef.cicd.sdp.model.Buyer;

public interface BuyerService {
    public String buyerRegistration(Buyer buyer);
    public Buyer checkBuyerLogin(String username, String password);
    public String buyerupdateprofile(Buyer buyer);

}