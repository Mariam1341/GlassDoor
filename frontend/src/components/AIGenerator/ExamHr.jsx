
import React, { useState } from 'react';
import { NavHr } from '../commonHr/NavHr';
import { Footer} from '../footer';
import { PromptForm } from './PromptForm';
 export const ExamHr = () =>{
  const dummyJob ={
      "id": "682f1441c29b5b510ca066b6",
    "companyName":"asset",
    "title": "Java Backend Developer",
    "description": "We are seeking a highly motivated Java Backend Developer to join our engineering team.You will be responsible for building scalable APIs and microservices using Spring Boot and MongoDB.",
    "prerequisite": "Proficiency in Java and Spring Boot Understanding of RESTful APIs Familiarity with MongoDB Knowledge of software development principles Bachelor’s degree in Computer Science or related field"
    
  }
  return(
    <div style={{ backgroundColor: '#f7fdf9'}}>
      <NavHr/>
      <PromptForm job={dummyJob}/>
      <Footer/>

    </div>
  )

 }