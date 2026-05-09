package com.project;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    // User complaints
    List<Complaint> findByUserId(Long userId);

}