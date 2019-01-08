package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<BookInList, Long> {
    List<BookInList> findByUser(User user);

    List<BookInList> findByUserAndIsFavourite(User user, Boolean isFavourite);
    List<BookInList> findByUserAndAlreadyRead(User user, Boolean alreadyRead);
    List<BookInList> findByUserAndWishToRead(User user, Boolean wishToRead);

    BookInList getByUserAndVolumeId(User user, String volumeId);
}
