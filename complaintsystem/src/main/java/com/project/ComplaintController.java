package com.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintRepository repo;

    // ================= CREATE COMPLAINT =================

    @PostMapping("/complaint")
    public String addComplaint(@RequestBody Complaint c) {

        c.setStatus("PENDING");

        repo.save(c);

        return "Complaint submitted!";
    }


    // ================= USER COMPLAINTS =================

    @GetMapping("/complaints/{userId}")
    public List<Complaint> getComplaints(@PathVariable Long userId) {

        return repo.findByUserId(userId);
    }


    // ================= ADMIN - VIEW ALL COMPLAINTS =================

    @GetMapping("/allComplaints")
    public List<Complaint> allComplaints() {

        return repo.findAll();
    }


    // ================= ADMIN - UPDATE STATUS =================

    @PutMapping("/updateStatus/{id}")
    public String updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Complaint c = repo.findById(id).orElse(null);

        if (c == null) {
            return "Complaint not found";
        }

        c.setStatus(status);

        repo.save(c);

        return "Status updated successfully!";
    }


    // ================= ADMIN - DELETE COMPLAINT =================

    @DeleteMapping("/deleteComplaint/{id}")
    public String deleteComplaint(@PathVariable Long id) {

        repo.deleteById(id);

        return "Complaint deleted successfully!";
    }
}