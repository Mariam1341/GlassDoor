package com.glassdoor.recruitment.controller;

import com.glassdoor.recruitment.dto.CompanyDTO;
import com.glassdoor.recruitment.dto.common.ApiResponse;
import com.glassdoor.recruitment.entity.Company;
import com.glassdoor.recruitment.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping
    public ApiResponse<CompanyDTO> addCompany(@RequestBody CompanyDTO dto) {
        return companyService.addCompany(dto);
    }

    @PutMapping("/{id}")
    public ApiResponse<CompanyDTO> updateCompany(@PathVariable String id, @RequestBody CompanyDTO dto) {
        return companyService.updateCompany(id, dto);
    }

    @GetMapping
    public ApiResponse<List<CompanyDTO>> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public ApiResponse<CompanyDTO> getCompanyById(@PathVariable String id) {
        return companyService.getCompanyById(id);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCompany(@PathVariable String id) {
        return companyService.deleteCompany(id);
    }

    @GetMapping("/search")
    public ApiResponse<List<CompanyDTO>> searchCompaniesByName(@RequestParam String name) {
        return companyService.searchByName(name);
    }
}

