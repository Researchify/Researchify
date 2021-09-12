/**
 * The PublicationForm component displays a mutli-step publication form
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatePublication,
  createPublication,
} from '../../../actions/publications';
import MainInfoPage from './MainInfoPage';
import CategoryPage from './CategoryPage';
import { categoryTypes } from '../../../config/publications';

const PublicationForm = (props) => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team.teamId);
  const [data, setData] = useState({
    title: '',
    yearPublished: new Date().getFullYear().toString(),
    authors: [''],
    description: '',
    link: '',
    category: {
      type: categoryTypes.Journal,
      categoryTitle: '',
      volume: '',
      issue: '',
      pages: '',
      publisher: '',
    },
    teamId,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const submitForm = (newData) => {
    if (props.type === 'update') {
      dispatch(updatePublication(props.pub._id, newData));
    } else if (props.type === 'create') {
      console.log(newData);
      dispatch(createPublication(newData));
    }
    props.closeModal();
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      submitForm(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <MainInfoPage
      next={handleNextStep}
      data={data}
      type={props.type}
      pub={props.pub}
      closeModal={props.closeModal}
    />,
    <CategoryPage
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      closeModal={props.closeModal}
    />,
  ];

  return steps[currentStep];
};

export default PublicationForm;
