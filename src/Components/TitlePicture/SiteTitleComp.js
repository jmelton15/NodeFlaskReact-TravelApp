
const SiteTitleComponent = ({imgSourceData}) => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center"
        // style={{"backgroundImage":`url(${imgSourceData.source})`,"width":imgSourceData.width,"height":imgSourceData.height}}
        >
            <img src={imgSourceData.source} width={imgSourceData.width} height={imgSourceData.height} alt="Site Title"/>
        </div>
    )
}

export default SiteTitleComponent;