package com.glassdoor.recruitment.controller;

import com.glassdoor.recruitment.entity.JopList;
import com.glassdoor.recruitment.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class JobController {

    @Autowired
    private JobService service;

    @GetMapping("/allJobs")
    public List<JopList> getAllJobs() {
        return service.getAllJobs();

    }

    @GetMapping("/{id}")
    public Optional<JopList> getJobById(@PathVariable String id) {
        return service.getJobById( id);
    }

    @PostMapping("/addJob")
    public JopList  createJob(@RequestBody JopList newjob) {
  return service.createJob(newjob);
    }

    @PutMapping("/{id}")
    public JopList updateJob(@PathVariable String id, @RequestBody JopList job) {

        return    service.updateJob(id , job);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        service.deleteJob(new String(id));
        return ResponseEntity.noContent().build();
    }

    // Get jobs by status
    @GetMapping("/status/{status}")
    public List<JopList> getJobsByStatus(@PathVariable("status") String status) {

        return  service.getJopByStatus(status);

    }
    ;
    // List<JopList> findBySalaryCurrency(String salaryCurrency);

    @GetMapping("/titles/{titles}")
    public List<JopList>finbyTitles (@PathVariable("titles") String titles){
        return service.findByTitle(titles);

    }

    @GetMapping("/locations/{location}")
    public List<JopList>findByLocation ( @PathVariable("location") String location){

        return service.findByLocation(location);

    }

    @GetMapping("/types/{types}")
    public List<JopList> findByEmploymentType(@PathVariable ("types") String types){
        return service.findByEmploymentType(types);
    }

    @GetMapping("/currency/{currency}")
    public List<JopList> findBySalaryCurrency(@PathVariable("currency") String currency){
        return service.findBySalaryCurrency(currency);
    }

    @GetMapping("/allLocations")
    public List<String> findDistinctLocations(){
        return service.findDistinctLocations();
    }

    @GetMapping("/allTitles")
    public List<String> findDistinctTitles(){
        return service.findDistinctTitles();
    }

    @GetMapping("/allEmplymentTypes")
    public List<String>findDistinctEmploymentTypes(){
        return service.findDistinctEmploymentTypes();
    }

    @GetMapping("/allCurrencies")
    public List<String>findDistinctSalaryCurrencies(){
        return service.findDistinctSalaryCurrencies();
    }

    @GetMapping("/allStatus")
    public List<String> findDistinctStatuses(){
        return service.findDistinctStatuses();
    }

    @GetMapping("/filter")
    public List<JopList> filterJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String currency,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String title
    ) {
        return service.findbyfilters(location, currency, status, type, title);
    }






}