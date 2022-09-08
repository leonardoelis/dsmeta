package com.leonardoelis.dsmeta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardoelis.dsmeta.entities.Sale;
import com.leonardoelis.dsmeta.services.SaleService;
import com.leonardoelis.dsmeta.services.SmsService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;
	
	@Autowired
	private SmsService smsService;
	
	// Pageable usado para fazer paginação nas buscas
	// @RequestParam mapeia o valor passado no parâmetro minDate da URL para a variável String minDate do método
	// O mesmo vale para o maxDate
	@GetMapping
	public Page<Sale> findSales(
			@RequestParam(value="minDate", defaultValue="") String minDate, 
			@RequestParam(value="maxDate", defaultValue="") String maxDate, 
			Pageable pageable){
		return service.findSales(minDate, maxDate, pageable);
	}
	
	@GetMapping(path = "/{id}/notification")
	public void notifySms(@PathVariable Long id) {
		smsService.sendSms(id);
	}
}
