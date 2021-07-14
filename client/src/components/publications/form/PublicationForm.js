/**
 * The PublicationForm component displays a mutli-step publication form
 */

import {
  updatePublication,
  createPublication,
} from '../../../actions/publications';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInfoPage from './MainInfoPage';
import CategoryPage from './CategoryPage';
import { categoryType } from '../../../config/publications';

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
      type: categoryType.JOURNAL,
      categoryTitle: '',
      volume: '',
      issue: '',
      pages: '',
      publisher: '',
    },
    teamId: teamId, // teamId should be get from redux state later
  });

  const [currentStep, setCurrentStep] = useState(0);

  const submitForm = (newData) => {
    console.log(newData);
    if (props.type === 'update') {
      dispatch(updatePublication(props.pub._id, newData));
    } else if (props.type === 'create') {
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
