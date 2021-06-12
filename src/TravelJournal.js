import HTMLFlipBook from "react-pageflip";
import {useRef,forwardRef} from "react";
import "./TravelJournal.css"

const Page = forwardRef((props, ref) => {
    if(props.isCover) {
        return (
            <div className="demoPage cover-page" ref={ref}></div>
        )
    }
    else {
        return (
            <div className="demoPage" ref={ref}> 
              <p>{props.children}</p>
              <p>Page number: {props.number}</p>
            </div>
        );
    }
  });

//******************************************************************************* */
/// TODO ---> ADD map() to dynamically create Page components for each saved trip 
//******************************************************************************* */
const TravelJournal = () => {
    const book = useRef();

    return (
        <div className="container-fluid d-flex justify-content-center mt-4">
            <HTMLFlipBook 
                width={700} 
                height={800} 
                ref={book}
                showCover={true}
            >
            <Page number="1" isCover={true}>Page text</Page>
            <Page number="2">Page text</Page>
            <Page number="3">Page text</Page>
            <Page number="4">Page text</Page>
            <Page number="5">Page text</Page>
            <Page number="6">Page text</Page>
            </HTMLFlipBook>
        </div>
       
      );
}

export default TravelJournal;