import { Header } from "../GdforEmployers/Header";
import { Footer } from "../GdforEmployers/Footer";
import { Postjobbody } from "./Postjobbody";

export function Postjob() {
  return (
    <div className="postjob-container">
      <Header />
      <main>
        <Postjobbody />
      </main>
      <Footer />
    </div>
  );
}