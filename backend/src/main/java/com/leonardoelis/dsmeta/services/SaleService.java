package com.leonardoelis.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.leonardoelis.dsmeta.entities.Sale;
import com.leonardoelis.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;
	
	public Page<Sale> findSales(String minDate, String maxDate, Pageable pageable){
		// Pega a data de hj do sistema
		// Instant.now() retorna o instante atual
		// ZoneId.systemDefault() retorna o fuso horário do sistema
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		
		// Converte as Strings em datas do tipo LocalDate do Java
		LocalDate min;
		LocalDate max;
		
		// Se as datas n forem informadas, utiliza-se a data de 1 ano atrás para a data mínima e a data de hoje para a data máxima
		if(minDate.equals("")) {
			// minusDays(365) subtrai 365 dias da data, ou seja, retorna a data de um ano atrás
			min = today.minusDays(365);
		} else {
			min = LocalDate.parse(minDate);
		}
		
		if(maxDate.equals("")) {
			max = today;
		} else {
			max = LocalDate.parse(maxDate);
		}
		
		return repository.findSales(min, max, pageable);
	}
}
