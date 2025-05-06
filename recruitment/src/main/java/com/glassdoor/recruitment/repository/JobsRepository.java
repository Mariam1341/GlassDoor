package com.glassdoor.recruitment.repository;

import com.glassdoor.recruitment.entity.JopList;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface JobsRepository extends MongoRepository<JopList, String> {
    List<JopList> findByStatus(String status);
    List<JopList> findByTitle(String title);
    List<JopList> findByLocation(String location);
    List<JopList> findByEmploymentType(String employmentType);
    List<JopList> findBySalaryCurrency(String salaryCurrency);


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
    List<JopList> findByFilters(String location, String salaryCurrency, String status, String employmentType, String title);
    
    
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
