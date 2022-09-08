package com.leonardoelis.dsmeta.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.leonardoelis.dsmeta.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

	// Consulta customizada (Essa consulta não existe dentro da interface JpaRepository)
	// Linguagem JPQL (similar ao SQL)
	// Retorna as 20 maiores vendas que ocorreram entre o período especificado (entre min e max)
	@Query("SELECT obj FROM Sale obj WHERE obj.date BETWEEN :min AND :max ORDER BY obj.amount DESC")
	Page<Sale> findSales(LocalDate min, LocalDate max, Pageable pageable);
}
