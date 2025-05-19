 

 import { Header } from "../GdforEmployers/Header";
// import { Postjobbody } from "./Postjobbody"; // ❌ remove old import
import SignIn3mix from '../After_Sign_In/New_mix';
import PostJobPage from '../JobsListPage/pages/PostJobPage'; // ✅ new component

export function Postjob() {
  return (
    <>
      <Header />
      <PostJobPage /> {/* ✅ new job post form */}
   
       
    </>
  );
}
export default Postjob;
