package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Daniel on 29-Dec-18.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findByIdIn(List<Long> userIds);

    Boolean existsByUsername(String username);
}
