import "./About.css";
import AboutJournal from "../../Images/AboutUsJournal.png";


const AboutPage = () => {
    return (
        <div className="AboutPage-JournalContainer container-fluid d-flex justify-content-center">
            <img src={AboutJournal} alt="About Us Journal" id="aboutpage-journalPic"/>
        </div>
    )
}

export default AboutPage;