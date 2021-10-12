// Image Imports for Layout Previews
// Layout 1
import layout1LightLandingPage from '../../images/layoutPreviews/layout1/light/layout_1_light_landingPage.png';
import layout1LightPublications from '../../images/layoutPreviews/layout1/light/layout_1_light_publications.png';
import layout1LightTeamPage from '../../images/layoutPreviews/layout1/light/layout_1_light_team.png';
import layout1LightAchievements from '../../images/layoutPreviews/layout1/light/layout_1_light_achievements.png';

// Layout 2
import layout2LightLandingPage from '../../images/layoutPreviews/layout2/light/layout_2_light_landingPage.png';
import layout2LightPublications from '../../images/layoutPreviews/layout2/light/layout_2_light_publications.png';
import layout2LightTeamPage from '../../images/layoutPreviews/layout2/light/layout_2_light_team.png';
import layout2LightAchievements from '../../images/layoutPreviews/layout2/light/layout_2_light_achievements.png';

// Layout 3
import layout3LightLandingPage from '../../images/layoutPreviews/layout3/light/layout_3_light_landingPage.png';
import layout3LightPublications from '../../images/layoutPreviews/layout3/light/layout_3_light_publications.png';
import layout3LightTeamPage from '../../images/layoutPreviews/layout3/light/layout_3_light_team.png';
import layout3LightAchievements from '../../images/layoutPreviews/layout3/light/layout_3_light_achievements.png';

const TemplateData = (layoutNumber) => {
  const LayoutsInformation = [
    {
      layoutName: 'Layout 1',
      layoutDescription: 'A simple design allowing you showcase your publications, team members and achievements. Ideal for researchers who would like to showcase their Social Media Feed.',
      layoutLandingImage: layout1LightLandingPage,
      layoutPublicationImage: layout1LightPublications,
      layoutTeamImage: layout1LightTeamPage,
      layoutAchievementsImage: layout1LightAchievements,
    },
    {
      layoutName: 'Layout 2',
      layoutDescription: 'Designed to allow easy navigability and to match the current design of several leading research groups. Ideal for larger research groups.',
      layoutLandingImage: layout2LightLandingPage,
      layoutPublicationImage: layout2LightPublications,
      layoutTeamImage: layout2LightTeamPage,
      layoutAchievementsImage: layout2LightAchievements,
    },
    {
      layoutName: 'Layout 3',
      layoutDescription: 'A classic design to compactly display your research group\'s publications, team members and achievements. Note: This Layout does not currently support Descriptions for Publications.',
      layoutLandingImage: layout3LightLandingPage,
      layoutPublicationImage: layout3LightPublications,
      layoutTeamImage: layout3LightTeamPage,
      layoutAchievementsImage: layout3LightAchievements,
    },
  ];
  const layoutDetail = LayoutsInformation[layoutNumber - 1];
  return (layoutDetail);
};

export default TemplateData;
