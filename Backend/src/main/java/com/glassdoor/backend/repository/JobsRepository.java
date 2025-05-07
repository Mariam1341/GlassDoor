package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.JobList;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobsRepository extends MongoRepository<JobList, String> {
    List<JobList> findByStatus(String status);

    List<JobList> findByTitle(String title);

    List<JobList> findByLocation(String location);

    List<JobList> findByEmploymentType(String employmentType);

    List<JobList> findBySalaryCurrency(String salaryCurrency);

    @Aggregation(pipeline = {
            "{ $match: { " +
                    "'$or': [ " +
                    "{ 'location': ?0 }, " +
                    "{ 'salaryCurrency': ?1 }, " +
                    "{ 'status': ?2 }, " +
                    "{ 'employmentType': ?3 }, " +
                    "{ 'title': ?4 } " +
                    "] " +
                    "} }"
    })
    List<JobList> findByFilters(String location, String salaryCurrency, String status, String employmentType,
            String title);

    @Aggregation("{ $group: { _id: '$location' } }")
    List<String> findDistinctLocations();

    @Aggregation("{ $group: { _id: '$title' } }")
    List<String> findDistinctTitles();

    @Aggregation("{ $group: { _id: '$employmentType' } }")
    List<String> findDistinctEmploymentTypes();

    @Aggregation("{ $group: { _id: '$salaryCurrency' } }")
    List<String> findDistinctSalaryCurrencies();

    @Aggregation("{ $group: { _id: '$status' } }")
    List<String> findDistinctStatuses();
}
