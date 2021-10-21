// Image Imports for Layout Previews
// Layout 1
// Layout 1
// Light Theme
import layout1LightLandingPage from '../../images/layoutPreviews/layout1/light/layout_1_light_landingPage.png';
import layout1LightPublications from '../../images/layoutPreviews/layout1/light/layout_1_light_publications.png';
import layout1LightTeamPage from '../../images/layoutPreviews/layout1/light/layout_1_light_team.png';
import layout1LightAchievements from '../../images/layoutPreviews/layout1/light/layout_1_light_achievements.png';
// Dark Theme
import layout1DarkLandingPage from '../../images/layoutPreviews/layout1/dark/layout_1_dark_landingPage.png';
import layout1DarkPublications from '../../images/layoutPreviews/layout1/dark/layout_1_dark_publications.png';
import layout1DarkTeamPage from '../../images/layoutPreviews/layout1/dark/layout_1_dark_team.png';
import layout1DarkAchievements from '../../images/layoutPreviews/layout1/dark/layout_1_dark_achievements.png';

// Layout 2
import layout2LightLandingPage from '../../images/layoutPreviews/layout2/light/layout_2_light_landingPage.png';
import layout2LightPublications from '../../images/layoutPreviews/layout2/light/layout_2_light_publications.png';
import layout2LightTeamPage from '../../images/layoutPreviews/layout2/light/layout_2_light_team.png';
import layout2LightAchievements from '../../images/layoutPreviews/layout2/light/layout_2_light_achievements.png';
// Dark Theme
import layout2DarkLandingPage from '../../images/layoutPreviews/layout2/dark/layout_2_dark_landingPage.png';
import layout2DarkPublications from '../../images/layoutPreviews/layout2/dark/layout_2_dark_publications.png';
import layout2DarkTeamPage from '../../images/layoutPreviews/layout2/dark/layout_2_dark_team.png';
import layout2DarkAchievements from '../../images/layoutPreviews/layout2/dark/layout_2_dark_achievements.png';

// Layout 3
import layout3LightLandingPage from '../../images/layoutPreviews/layout3/light/layout_3_light_landingPage.png';
import layout3LightPublications from '../../images/layoutPreviews/layout3/light/layout_3_light_publications.png';
import layout3LightTeamPage from '../../images/layoutPreviews/layout3/light/layout_3_light_team.png';
import layout3LightAchievements from '../../images/layoutPreviews/layout3/light/layout_3_light_achievements.png';
// Dark Theme
import layout3DarkLandingPage from '../../images/layoutPreviews/layout3/dark/layout_3_dark_landingPage.png';
import layout3DarkPublications from '../../images/layoutPreviews/layout3/dark/layout_3_dark_publications.png';
import layout3DarkTeamPage from '../../images/layoutPreviews/layout3/dark/layout_3_dark_team.png';
import layout3DarkAchievements from '../../images/layoutPreviews/layout3/dark/layout_3_dark_achievements.png';

const TemplateData = (layoutNumber) => {
  const LayoutsInformation = [
    {
      layoutName: 'Layout 1',
      layoutDescription: 'A simple design allowing you showcase your publications, team members and achievements. Ideal for researchers who would like to showcase their Social Media Feed.',
      lightImages: {
        layoutLandingImage: layout1LightLandingPage,
        layoutPublicationImage: layout1LightPublications,
        layoutTeamImage: layout1LightTeamPage,
        layoutAchievementsImage: layout1LightAchievements,
      },
      darkImages: {
        layoutLandingImage: layout1DarkLandingPage,
        layoutPublicationImage: layout1DarkPublications,
        layoutTeamImage: layout1DarkTeamPage,
        layoutAchievementsImage: layout1DarkAchievements,
      },
    },
    {
      layoutName: 'Layout 2',
      layoutDescription: 'Designed to allow easy navigability and to match the current design of several leading research groups. Ideal for larger research groups.',
      lightImages: {
        layoutLandingImage: layout2LightLandingPage,
        layoutPublicationImage: layout2LightPublications,
        layoutTeamImage: layout2LightTeamPage,
        layoutAchievementsImage: layout2LightAchievements,
      },
      darkImages: {
        layoutLandingImage: layout2DarkLandingPage,
        layoutPublicationImage: layout2DarkPublications,
        layoutTeamImage: layout2DarkTeamPage,
        layoutAchievementsImage: layout2DarkAchievements,
      },
    },
    {
      layoutName: 'Layout 3',
      layoutDescription: 'A classic design to compactly display your research group\'s publications, team members and achievements. Note: This Layout does not currently support Descriptions for Publications.',
      lightImages: {
        layoutLandingImage: layout3LightLandingPage,
        layoutPublicationImage: layout3LightPublications,
        layoutTeamImage: layout3LightTeamPage,
        layoutAchievementsImage: layout3LightAchievements,
      },
      darkImages: {
        layoutLandingImage: layout3DarkLandingPage,
        layoutPublicationImage: layout3DarkPublications,
        layoutTeamImage: layout3DarkTeamPage,
        layoutAchievementsImage: layout3DarkAchievements,
      },
    },
  ];
  const layoutDetail = LayoutsInformation[layoutNumber - 1];
  return (layoutDetail);
};

export default TemplateData;
