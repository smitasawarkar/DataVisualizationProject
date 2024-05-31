package com.maveric.datavisualization.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maveric.datavisualization.entities.Bank;

@Repository
public interface BankRepo extends JpaRepository<Bank, Long> {

}
