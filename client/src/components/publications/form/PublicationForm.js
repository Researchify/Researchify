/**
 * The PublicationForm component displays a mutli-step publication form
 */

import { updatePublication, createPublication } from '../../../actions/publications'
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import PageOne from "./MainInfoPage"
import PageTwo from "./CategoryPage"

export const CATEGORY_TYPE = {
    Journal: "JOURNAL",
    Conference: "CONFERENCE",
    Other: "OTHER"
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
        teamId: "609f5ad827b1d48257c321d3" // teamId should be get from redux state later
    })

    const [currentStep, setCurrentStep] = useState(0)

    const submitForm = (newData) => {
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
            submitForm(newData)
            return
        }
        setCurrentStep((prev) => prev + 1)
      };
    
      const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1)
      };
    
    const steps = [
        <PageOne next={handleNextStep} data={data} type={props.type} pub={props.pub} closeModal={props.closeModal}/>,
        <PageTwo next={handleNextStep} prev={handlePrevStep} data={data} closeModal={props.closeModal}/>
    ];
    
    return(
        steps[currentStep]
    )
}

export default PublicationForm