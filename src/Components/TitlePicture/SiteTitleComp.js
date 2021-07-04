import mobileImg from "../../Images/RibbonForCapstoneMobile.png";
import desktopImg from "../../Images/RibbonWithText.png";
import GetScreenSize from '../../helpers/GetScreenSize';


const SiteTitleComponent = () => {
    const [screenWidth] = GetScreenSize();

    let imgSpecs = screenWidth > 420 ? {source:desktopImg,width:"100%",height:"850px"} : {source:mobileImg,width:"100%",height:"150px"} 


    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center TitleImage-Container mt-3">
            <img className="TitleImage" src={imgSpecs.source} width={imgSpecs.width} height={imgSpecs.height} alt="Site Title"/>
        </div>
    )
}

export default SiteTitleComponent;