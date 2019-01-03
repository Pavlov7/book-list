package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.BookInList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<BookInList, Long> {
}
