package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Daniel on 29-Dec-18.
 */
public interface RoleRepository extends JpaRepository<User, Long> {
}
