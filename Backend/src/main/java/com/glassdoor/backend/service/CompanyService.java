package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.CompanyDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Company;
import com.glassdoor.backend.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public ApiResponse<CompanyDTO> addCompany(CompanyDTO dto) {
        Company company = convertToEntity(dto);
        companyRepository.save(company);
        return new ApiResponse<>(true, "Company added successfully", convertToDTO(company));
    }

    public ApiResponse<CompanyDTO> updateCompany(String id, CompanyDTO dto) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));

        company.setName(dto.getName());
        company.setWebsite(dto.getWebsite());
        company.setTotalEmployee(dto.getTotalEmployee());
        company.setSalaryRange(dto.getSalaryRange());
        company.setRevenue(dto.getRevenue());
        company.setFoundedYear(dto.getFoundedYear());
        company.setStatus(dto.getStatus());
        company.setCompanyType(dto.getCompanyType());
        company.setCeo(dto.getCeo());
        company.setLogo(dto.getLogo());
        company.setRating(dto.getRating());

        companyRepository.save(company);
        return new ApiResponse<>(true, "Company updated", convertToDTO(company));
    }

    public ApiResponse<List<CompanyDTO>> getAllCompanies() {
        List<CompanyDTO> list = companyRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "Companies fetched", list);
    }

    public ApiResponse<CompanyDTO> getCompanyById(String id) {
        Company company = companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));
        return new ApiResponse<>(true, "Company fetched", convertToDTO(company));
    }

    public ApiResponse<String> deleteCompany(String id) {
        companyRepository.deleteById(id);
        return new ApiResponse<>(true, "Company deleted", null);
    }

    public ApiResponse<List<CompanyDTO>> searchByName(String name) {
        List<CompanyDTO> results = companyRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ApiResponse<>(true, "Companies matching name found", results);
    }

    private Company convertToEntity(CompanyDTO dto) {
        return Company.builder()
                .id(dto.getId())
                .name(dto.getName())
                .website(dto.getWebsite())
                .totalEmployee(dto.getTotalEmployee())
                .salaryRange(dto.getSalaryRange())
                .revenue(dto.getRevenue())
                .foundedYear(dto.getFoundedYear())
                .status(dto.getStatus())
                .companyType(dto.getCompanyType())
                .ceo(dto.getCeo())
                .logo(dto.getLogo())
                .rating(dto.getRating())
                .build();
    }

    private CompanyDTO convertToDTO(Company company) {
        return CompanyDTO.builder()
                .id(company.getId())
                .name(company.getName())
                .website(company.getWebsite())
                .totalEmployee(company.getTotalEmployee())
                .salaryRange(company.getSalaryRange())
                .revenue(company.getRevenue())
                .foundedYear(company.getFoundedYear())
                .status(company.getStatus())
                .companyType(company.getCompanyType())
                .ceo(company.getCeo())
                .logo(company.getLogo())
                .rating(company.getRating())
                .build();
    }
}

