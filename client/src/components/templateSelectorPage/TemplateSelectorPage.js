import React from 'react';
import { useSelector } from 'react-redux';
import TemplateSelector from './TemplateSelector';

/**
 * This file holds the page component for the template Selection
 */
const TemplateSelectorPage = () => {
  const teamId = useSelector((state) => state.team.teamId);
  return (
    <TemplateSelector teamId={teamId} />
  );
};

export default TemplateSelectorPage;
