package com.task_3.restapi.itrello.repositories;


import com.task_3.restapi.itrello.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface RolesRepository extends JpaRepository<Roles,Long> {
}
