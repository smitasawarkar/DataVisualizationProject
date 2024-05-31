package com.maveric.datavisualization.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bank{

	@Id
	@GeneratedValue
	private int id;
	private String bankId;
	private String bankName;
	private char isActive;
	
	
	
	
	
}
