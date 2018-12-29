package com.fmi.bookservice.repository;

import com.fmi.bookservice.model.Role;
import com.fmi.bookservice.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by Daniel on 29-Dec-18.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
