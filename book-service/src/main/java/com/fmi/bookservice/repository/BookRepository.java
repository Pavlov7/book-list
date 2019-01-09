package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.BookInList;
import com.fmi.bookservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<BookInList, Long> {
    List<BookInList> findByUserId(Long userId);

    List<BookInList> findByUserIdAndIsFavouriteTrue(Long userId);
    List<BookInList> findByUserIdAndAlreadyReadTrue(Long userId);
    List<BookInList> findByUserIdAndWishToReadTrue(Long userId);

    BookInList getByUserAndVolumeId(User user, String volumeId);
}
