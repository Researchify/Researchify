import { updatePublication, createPublication } from '../../../actions/publications'
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import StepOne from "./PageOne"
import StepTwo from "./PageTwo"

export const CATEGORY_TYPE = {
    Journal: "JOURNAL",
    Conference: "CONFERENCE"
}

const PublicationForm = (props) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        title: "",
        yearPublished: (new Date()).getFullYear().toString(),
        authors: [""],
        description: "",
        link: "",
        category: {
            type: CATEGORY_TYPE.Journal,
            categoryTitle: "",
            volume: "",
            issue: "",
            pages: "",
            publisher: ""
        },
        teamId: "606bb59c22201f529db920c9" // teamId should be get from redux state later
    })

    const [currentStep, setCurrentStep] = useState(0)

    const makeRequest = (newData) => {
        console.log(newData)
        if (props.type === "update"){
            dispatch(updatePublication(props.pub._id, newData))
        } else if (props.type === "create"){
            dispatch(createPublication(newData))
        }
        props.closeModal() 
    }

    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }))
        if (final) {
          makeRequest(newData)
          return
        }
        setCurrentStep((prev) => prev + 1)
      };
    
      const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1)
      };
    
    const steps = [
        <StepOne next={handleNextStep} data={data} type={props.type} pub={props.pub} closeModal={props.closeModal}/>,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} closeModal={props.closeModal}/>
    ];
    
    return(
        steps[currentStep]
    )
}

export default PublicationForm