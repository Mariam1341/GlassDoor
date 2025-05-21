
import React, { useState } from 'react';
import { NavHr } from '../commonHr/NavHr';
import { Footer} from '../footer';
import { PromptForm } from './PromptForm';
 export const ExamHr = () =>{
  return(
    <div style={{ backgroundColor: '#f7fdf9'}}>
      <NavHr/>
      <PromptForm/>
      <Footer/>

    </div>
  )

 }